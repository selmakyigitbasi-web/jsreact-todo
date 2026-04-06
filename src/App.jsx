import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gorev, setGorev] = useState("");
  const [list, setList] = useState(() => {
    const data = localStorage.getItem("todo");
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      //console.error("Error reading from localStorage:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(list));
  }, [list]);

  const ekle = (e) => {
    e.preventDefault();
    if (gorev.trim() === "") return;
    setList([...list, { text: gorev, done: false }]);
    setGorev("");
  };

  const sil = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const toggleTamamlandi = (index) => {
    const newList = [...list];
    newList[index].done = !newList[index].done;
    setList(newList);
  };

  return (
    <div className="app-container">
      <h1>Yapılacaklar Listesi</h1>
      <form className="input-group" onSubmit={ekle}>
        <input
          type="text"
          placeholder="Yeni görev ekle..."
          value={gorev}
          onChange={(e) => setGorev(e.target.value)}
        />
        <button className="add-btn" onClick={ekle}>
          Ekle
        </button>
      </form>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleTamamlandi(index)}
            />
            <span
              className="todo-task"
              style={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.text}
            </span>
            <button className="delete-btn" onClick={() => sil(index)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
