import { useState, useEffect } from 'react'
import "./styles.css";

export function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">
      <h1>Список завдань(o･ω･o)</h1>
      <form onSubmit={addTask} className="form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Нове завдання..."
        />
        <button type="submit">Додати</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              className={task.completed ? "completed" : "uncompleted"}
              onClick={() => toggleTask(index)}>
              {task.text}
            </span>
           <button
   onClick={() => deleteTask(index)}
  aria-label="Видалити задачу"
>
  <img src="trash.svg" alt="Видалити" />
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}