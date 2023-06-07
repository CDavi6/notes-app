import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItems, deleteItem } from "../store";

function Note({ selectedItem }) {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const selectedItemData = items.find((item) => item.title === selectedItem);

  const handleSave = () => {
    dispatch(updateItems({ id: selectedItemData.id, text: editedText }));
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedItemData.text);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setEditedText((prevText) => prevText + text);
  };

  const handleClear = () => {
    setEditedText("");
  };

  const handleDelete = () => {
    dispatch(deleteItem(selectedItemData.id)); // Delete only the selected item
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(selectedItemData.text);
  };

  return (
    <div>
      {selectedItemData && (
        <>
          <div className="flex justify-center">
            <button className="btn btn-primary w-full lg:w-60 m-4 truncate">
              {selectedItemData.title}
            </button>
          </div>
          <div className="flex justify-center">
            <textarea
              className="border rounded p-2 m-4 w-full max-h-[48.2rem]"
              placeholder="Type here..."
              value={isEditing ? editedText : selectedItemData.text}
              onChange={handleTextChange}
              readOnly={!isEditing}
            ></textarea>
          </div>
          <div className="flex flex-wrap justify-center">
            {isEditing ? (
              <>
                <button
                  className="btn btn-success m-2 w-40"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button className="btn btn-info m-2 w-40" onClick={handleCopy}>
                  Copy
                </button>
                <button
                  className="btn btn-accent m-2 w-40"
                  onClick={handlePaste}
                >
                  Paste
                </button>
                <button
                  className="btn btn-warning m-2 w-40"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  className="btn btn-error m-2 w-40"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                className="btn btn-secondary m-2 w-40"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
