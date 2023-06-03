import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ItemDetails from "./components/ItemDetails";

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
    <div>
      <Sidebar onAddItem={handleAddItem} onItemClick={handleItemClick} />
      <div className="ml-80 bg-base-100 h-full w-full fixed">
        <ItemDetails items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;
