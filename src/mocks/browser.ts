import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

// Define the DocumentsRequestBody interface
interface DocumentsRequestBody {
  documents: Document[];
}

interface Document {
  position: number; // Add 'position' to match the data structure
  title: string;
  type: string;
}

// Helper function to load initial data into localStorage
const loadInitialData = () => {
  const storedData = localStorage.getItem("documents");
  if (storedData) {
    return JSON.parse(storedData);
  }
  const initialData: Document[] = [
    { position: 0, title: "Bank Draft", type: "bank-draft" },
    { position: 1, title: "Bill of Lading", type: "bill-of-lading" },
    { position: 2, title: "Invoice", type: "invoice" },
    { position: 3, title: "Bank Draft 2", type: "bank-draft-2" },
    { position: 4, title: "Bill of Lading 2", type: "bill-of-lading-2" },
  ];
  localStorage.setItem("documents", JSON.stringify(initialData));
  return initialData;
};

let documents = loadInitialData();

export const worker = setupWorker(
  // Handle GET requests to fetch documents
  http.get("/api/documents", () => {
    return HttpResponse.json(documents, { status: 200 });
  }),

  // Handle POST requests to update the documents
  http.post("/api/documents", async ({ request }) => {
    const { documents: updatedDocuments }: DocumentsRequestBody =
      (await request.json()) as DocumentsRequestBody; // Use the DocumentsRequestBody type
    documents = updatedDocuments;

    // Update localStorage with the new document list
    localStorage.setItem("documents", JSON.stringify(documents));

    return HttpResponse.json({ status: 201 });
  })
);

// Start the worker in the browser environment
worker.start();
