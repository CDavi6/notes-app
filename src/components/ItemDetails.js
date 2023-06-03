import React from "react";
import { useSelector } from "react-redux";

function ItemDetails({ selectedItem }) {
  const items = useSelector((state) => state.items);

  const selectedItemData = items.find((item) => item.title === selectedItem);

  return (
    <div>
      {selectedItemData && (
        <>
          <div className="flex justify-center">
            <button className="btn btn-primary my-4">{selectedItemData.title}</button>
          </div>
          <div className="flex justify-center">
            <textarea
              className="textarea textarea-bordered w-full mx-4 max-h-[48.2rem]"
              placeholder="Type here..."
            ></textarea>
          </div>
          <div className="flex justify-around">
            <button className="btn btn-success my-4 w-40">Save</button>
            <button className="btn btn-info my-4 w-40">Copy</button>
            <button className="btn btn-accent my-4 w-40 text-black">Paste</button>
            <button className="btn btn-warning my-4 w-40">Clear</button>
            <button className="btn btn-error my-4 w-40">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
