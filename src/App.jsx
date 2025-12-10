import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");

  const API_BASE = "https://my-backend-app-g5ke.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleAdd = async () => {
    if (!newName) return;

    await fetch(`${API_BASE}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    });

    setItems([...items, { name: newName, id: items.length + 1 }]);
    setNewName("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 w-[400px] text-white">
        <h1 className="text-2xl font-bold mb-4">Simple Items App</h1>
          <div className="text-5xl text-red-500 font-bold">Hello Tailwind!</div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter item name..."
            className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="bg-gray-700 p-2 rounded-md flex justify-between border border-gray-600"
            >
              <span>{item.name}</span>
              <span className="text-xs opacity-50">#{item.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
