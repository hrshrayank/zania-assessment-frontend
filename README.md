# Document Viewer with Drag-and-Drop and Image Overlay (Frontend Focused Only)

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

## Design the hypothetical API

### API Endpoints:

### 1. Get All Documents

  - ### Endpoint:
    GET /api/documents
    
  - ### Description:
    Fetches all documents in the collection.
    
  - ### Response Example:
  ```json
  [
    {
      "id": "1",
      "position": 0,
      "title": "Bank Draft",
      "type": "bank-draft"
    },
    {
      "id": "2",
      "position": 1,
      "title": "Bill of Lading",
      "type": "bill-of-lading"
    }
  ]
  
  ```
  - ### Considerations:
     Add sorting and filtering capabilities, such as sorting by position, title, or type, or filtering documents based on type.

### 2. Create a New Document

  - ### Endpoint:
    POST /api/documents
    
  - ### Description:
    Adds a new document to the collection..
    
  - ### Request Example:
  ```json
    {
    "position": 2,
    "title": "Invoice",
    "type": "invoice"
    }
  ```
  - ### Response Example:
  ```json
    {
      "id": "3",
      "position": 2,
      "title": "Invoice",
      "type": "invoice",
      "createdAt": "2023-09-19T12:34:56Z"
    }

  ```

  - ### Considerations:
      Implement input validation to check if title, position, and type are valid. Make sure positions are unique or adjust the positions dynamically when a new document is added.

### 3. Update an Existing Document

  - ### Endpoint:
    PUT /api/documents/{id}
    
  - ### Description:
    Updates the details of an existing document.
    
  - ### Response Example:
  ```json
    {
      "position": 1,
      "title": "Updated Invoice",
      "type": "invoice"
    }  
  ```
  - ### Response Example:
  ```json
    {
      "id": "2",
      "position": 1,
      "title": "Updated Invoice",
      "type": "invoice",
      "updatedAt": "2023-09-19T14:00:00Z"
    }

  ```

  - ### Considerations:
     Ensure the API supports partial updates (e.g., updating only the title while keeping the other fields intact). Implement input validation to avoid updating with invalid data.

### 4. Delete a Document

  - ### Endpoint:
    DELETE /api/documents/{id}
    
  - ### Description:
    Deletes a document by its ID.
    
  - ### Response Example:
  ```reponse
    {
      "message": "Document deleted successfully"
    }  
  ```
  - ### Considerations:
     Before deletion, ensure that the document exists. After deletion, you may need to adjust the position of the remaining documents to fill the gap

### 4. Reorder Documents

  - ### Endpoint:
    PATCH /api/documents/reorder
    
  - ### Description:
    Allows reordering of documents based on new positions
    
  - ### Request Example:
  ```json
    {
      "documents": [
        { "id": "1", "position": 1 },
        { "id": "2", "position": 0 }
      ]
    }
  ```
   - ### Response Example:
  ```json
    {
      "message": "Documents reordered successfully"
    }

  ```
  - ### Considerations:
     Validate that the new positions are unique and within a valid range.
