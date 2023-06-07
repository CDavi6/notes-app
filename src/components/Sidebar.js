import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store";

function Sidebar({ onItemClick }) {
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
      onItemClick(newItem.id);
      clearInput();
    }
  };

  const clearInput = () => {
    inputTitleRef.current.value = "";
    inputTextRef.current.value = "";
  };

  return (
    <div className="w-20 h-full sm:w-40 md:w-60 lg:w-80 fixed top-0 left-0 bg-base-200 overflow-x-hidden flex flex-col justify-top">
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
      <button className="btn btn-success m-4" onClick={addItemToList}>
        Create Note
      </button>
      <br />
      <br />
      <div>
        <ul>
          {items.map((item, index) => (
            <button
              className="btn btn-primary w-10 m-4"
              key={index}
              onClick={() => onItemClick(item.title)}
            >
              {item.title}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
