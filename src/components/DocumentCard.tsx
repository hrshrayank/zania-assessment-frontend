import React, { useState } from "react";
import { getThumbnail } from "../utils/thumbnails";

interface DocumentCardProps {
  title: string;
  type: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, type }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <h3 className="text-xl mb-2 p-2">{title}</h3>
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <img
        src={getThumbnail(type)}
        alt={title}
        className={`w-full h-40 object-cover rounded-bl-lg rounded-br-lg ${
          loading ? "hidden" : "block"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default DocumentCard;
