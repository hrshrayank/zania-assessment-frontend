# Document Viewer with Drag-and-Drop and Image Overlay (Frontend Only)

This project is a React-Typescript based document viewer that allows users to drag-and-drop documents to reorder them, and click on a document to display it as an overlay. The overlay can be closed by pressing the ESC key. The application also periodically saves document data every 5 seconds, ensuring that no changes are lost.

## Features

### 1. Drag-and-Drop Support:

Users can drag and reorder documents on the page.

### 2. Image Overlay:

Clicking on a document opens it in an overlay in the center of the page.

### 3. Automatic Saving:

The system saves document arrangements every 5 seconds if there are any unsaved changes.
ESC to Close Overlay: Pressing ESC closes the image overlay.

## Installation

Clone the repository

```bash
git clone https://github.com/hrshrayank/zania-assessment-frontend
```

- ### Directly Installing

```javascript
npm i
npm run dev
```
(OR)

- ### Using Docker Compose

```docker
docker-compose up --build
```

## Functional Usage

### 1. Reordering Documents:

- Drag any document card to a new position.
- Changes are automatically saved every 5 seconds if there are unsaved changes.

### 2. Viewing Document Details:

- Click on a document card to open an overlay showing the document image.
- Press ESC to close the overlay or click on the background.

### 3. Auto-Save:

- The system auto-saves your document positions every 5 seconds if there are unsaved changes.
- A "Last saved" message will display, indicating how long ago the save occurred.

## Features Explanation

### 1. Custom Drag-and-Drop Implementation:

- Instead of using an external package, I implemented drag-and-drop by managing the document state directly. Drag events (onDragStart, onDragOver, onDrop) are used to reorder the document array.
- The state change triggers the unsavedChanges flag, which initiates an auto-save routine every 5 seconds using setInterval.

### 2. Handling Overlay and ESC Key

- #### Image Overlay:

  - Clicking on a document card opens the overlay in the middle of the screen. This is implemented by setting the selectedDocument state with the clicked document.
  - The image is displayed in a fixed-position div that covers the entire viewport, ensuring it remains centered.

- #### Closing the Overlay:

  - The ESC key is detected using a global keydown event listener in the useEffect hook, which sets selectedDocument to null when pressed. This causes the overlay to disappear.
