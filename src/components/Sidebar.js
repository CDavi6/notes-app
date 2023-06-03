import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store";

function Sidebar({ onAddItem, onItemClick }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const inputTitleRef = useRef(null);
  const inputTextRef = useRef(null);

  const addItemToList = () => {
    const title = inputTitleRef.current.value;
    const text = inputTextRef.current.value;
    if (title !== "" && text !== "") {
      const newItem = { title, text };
      dispatch(addItem(newItem));
      onAddItem(newItem); // Pass the new item to the parent component
      clearInput();
    }
  };

  const clearInput = () => {
    inputTitleRef.current.value = "";
    inputTextRef.current.value = "";
  };

  return (
    <>
      <div className="h-full w-80 fixed top-0 left-0 bg-neutral overflow-x-hidden flex flex-col justify-top">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered m-2"
          ref={inputTitleRef}
        />
        <input
          type="text"
          placeholder="Text"
          className="input input-bordered m-2"
          ref={inputTextRef}
        />
        <button className="btn btn-success m-2" onClick={addItemToList}>
          Create Note
        </button>
        <br />
        <br />
        <div>
          <ul>
            {items.map((item, index) => (
              <button
                className="btn btn-primary m-2 w-72"
                key={index}
                onClick={() => onItemClick(item.title)} // Update the onClick handler
              >
                {item.title}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
