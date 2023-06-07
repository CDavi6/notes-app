import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Note from "./components/Note";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (title) => {
    setSelectedItem(title);
  };

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div className="flex">
      <div className="w-80">
        <Sidebar onAddItem={handleAddItem} onItemClick={handleItemClick} />
      </div>
      <div className="flex-1">
        <Note items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;
