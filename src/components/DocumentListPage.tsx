import React, { useState, useEffect } from "react";
import DocumentCard from "../components/DocumentCard";
import { getThumbnail } from "../utils/thumbnails";
import { fetchDocuments, saveDocuments } from "../services/documentService";

interface Document {
  position: number;
  title: string;
  type: string;
}

const DocumentListPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState<number | null>(
    null
  );

  // Helper function to format the elapsed time since the last save
  const formatElapsedTime = (elapsed: number) => {
    if (elapsed < 60) return `${elapsed} seconds ago`;
    else if (elapsed < 3600) return `${Math.floor(elapsed / 60)} minutes ago`;
    else return `${Math.floor(elapsed / 3600)} hours ago`;
  };

  // Load documents and last save time from localStorage or the API
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const { storedDocs, storedSaveTime } = await fetchDocuments();
        setDocuments(storedDocs);

        if (storedSaveTime) {
          const savedTime = new Date(storedSaveTime);
          setLastSaveTime(savedTime);
          setTimeSinceLastSave(
            Math.floor((new Date().getTime() - savedTime.getTime()) / 1000)
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

  // Auto-save documents every 5 seconds if there are unsaved changes
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (unsavedChanges) {
        handleSaveDocuments();
      }
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [unsavedChanges, documents]);

  // Update the time since the last save every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaveTime) {
        const elapsed = Math.floor(
          (new Date().getTime() - lastSaveTime.getTime()) / 1000
        );
        setTimeSinceLastSave(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  // Close overlay on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDocument(null); // Close overlay
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Function to save the documents via POST request and update localStorage
  const handleSaveDocuments = async () => {
    if (saving) return; // Avoid triggering save if a save is already in progress

    setSaving(true);
    try {
      await saveDocuments(documents); // Use service function
      const currentTime = new Date();
      setLastSaveTime(currentTime); // Update the last save time
      setUnsavedChanges(false); // Reset unsavedChanges flag after saving
    } catch (error) {
      console.error("Error saving data", error);
    } finally {
      setSaving(false); // Hide loading spinner after save
    }
  };

  const handleDragStart = (index: number) => setDraggedItemIndex(index);

  const handleDragOver = (index: number) => {
    if (draggedItemIndex === null) return;

    const draggedItem = documents[draggedItemIndex];
    const remainingItems = documents.filter(
      (_, idx) => idx !== draggedItemIndex
    );

    const reorderedDocuments = [
      ...remainingItems.slice(0, index),
      draggedItem,
      ...remainingItems.slice(index),
    ];

    setDocuments(reorderedDocuments);
    setDraggedItemIndex(index);
    setUnsavedChanges(true);
  };

  const handleDrop = () => setDraggedItemIndex(null);

  const handleCardClick = (document: Document) => setSelectedDocument(document);

  const handleOverlayClick = () => setSelectedDocument(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {saving && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {timeSinceLastSave !== null && (
        <div className="mt-4">
          <p>Last saved: {formatElapsedTime(timeSinceLastSave)} </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents?.map((doc, index) => (
          <div
            key={doc.position}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDrop={handleDrop}
            onClick={() => handleCardClick(doc)}
            className="bg-slate-200 rounded-lg shadow cursor-move transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
            style={{
              userSelect: "none",
              opacity: draggedItemIndex === index ? 0.5 : 1,
              transform:
                draggedItemIndex === index ? "scale(0.95)" : "scale(1)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            <DocumentCard title={doc.title} type={doc.type} />
          </div>
        ))}
      </div>

      {selectedDocument && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-4 rounded shadow-lg max-w-lg max-h-full">
            <img
              src={getThumbnail(selectedDocument.type)}
              alt={selectedDocument.title}
              className="w-full h-auto"
            />
            <p className="text-center mt-4">{selectedDocument.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentListPage;
