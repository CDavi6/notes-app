import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItems } from "../store";

function ItemDetails({ selectedItem }) {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const selectedItemIndex = items.findIndex((item) => item.title === selectedItem);
  const selectedItemData = items[selectedItemIndex];

  const handleSave = () => {
    const updatedItem = { ...selectedItemData, text: editedText, title: editedTitle };
    const updatedItems = [...items];
    updatedItems[selectedItemIndex] = updatedItem;
    dispatch(updateItems(updatedItems));
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedItemData.title);
  };

  const handlePaste = () => {
    // Perform paste logic here
  };

  const handleClear = () => {
    // Perform clear logic here
  };

  const handleDelete = () => {
    // Perform delete logic here
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(selectedItemData.text);
    setEditedTitle(selectedItemData.title);
  };

  return (
    <div>
      {selectedItemData && (
        <>
          <div className="flex justify-center">
            {isEditing ? (
              <input
                type="text"
                className="input input-bordered my-4 text-center"
                value={editedTitle}
                onChange={handleTitleChange}
              />
            ) : (
              <button className="btn btn-primary my-4">{selectedItemData.title}</button>
            )}
          </div>
          <div className="flex justify-center">
            <textarea
              className="textarea textarea-bordered w-full mx-4 max-h-[48.2rem]"
              placeholder="Type here..."
              value={isEditing ? editedText : selectedItemData.text}
              onChange={handleTextChange}
              readOnly={!isEditing}
            ></textarea>
          </div>
          <div className="flex justify-center">
            {isEditing ? (
              <>
                <button className="btn btn-success my-4 mx-4 w-40" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-info my-4 mx-4 w-40" onClick={handleCopy}>
                  Copy
                </button>
                <button className="btn btn-accent my-4 mx-4 w-40 text-black" onClick={handlePaste}>
                  Paste
                </button>
                <button className="btn btn-warning my-4 mx-4 w-40" onClick={handleClear}>
                  Clear
                </button>
                <button className="btn btn-error my-4 mx-4 w-40" onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <button className="btn btn-secondary my-4 mx-4" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
