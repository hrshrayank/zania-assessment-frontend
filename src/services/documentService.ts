import axios from "axios";

interface Document {
  position: number;
  title: string;
  type: string;
}

export const fetchDocuments = async (): Promise<{
  storedDocs: Document[];
  storedSaveTime: string | null;
}> => {
  const storedDocs = localStorage.getItem("documents");
  const storedSaveTime = localStorage.getItem("lastSaveTime");

  if (storedDocs) {
    return { storedDocs: JSON.parse(storedDocs), storedSaveTime };
  } else {
    const response = await axios.get("/api/documents");
    return { storedDocs: response.data, storedSaveTime: null };
  }
};

export const saveDocuments = async (documents: Document[]): Promise<void> => {
  await axios.post("/api/documents", { documents });
  localStorage.setItem("documents", JSON.stringify(documents));
  const currentTime = new Date();
  localStorage.setItem("lastSaveTime", currentTime.toString());
};
