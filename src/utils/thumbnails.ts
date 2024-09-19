export const getThumbnail = (type: string): string => {
  const thumbnails: { [key: string]: string } = {
    "bank-draft": "/src/assets/images/image1.jpg",
    "bill-of-lading": "/src/assets/images/image2.jpg",
    invoice: "/src/assets/images/image3.jpg",
    "bank-draft-2": "/src/assets/images/image4.jpg",
    "bill-of-lading-2": "/src/assets/images/image5.jpg",
  };

  return thumbnails[type] || "/src/assets/images/default.jpg";
};
