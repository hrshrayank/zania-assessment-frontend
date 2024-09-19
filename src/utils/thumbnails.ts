export const getThumbnail = (type: string): string => {
  const thumbnails: { [key: string]: string } = {
    "bank-draft": "/images/image1.jpg",
    "bill-of-lading": "/images/image2.jpg",
    invoice: "/images/image3.jpg",
    "bank-draft-2": "/images/image4.jpg",
    "bill-of-lading-2": "/images/image5.jpg",
  };

  return thumbnails[type] || "/images/default.jpg";
};
