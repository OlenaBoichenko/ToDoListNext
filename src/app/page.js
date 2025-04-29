"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Сохранение в localStorage при изменении списка
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = task.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setTask('');
  };

  const toggleTask = id =>
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));

  const deleteTask = id =>
    setTasks(tasks.filter(task => task.id !== id));

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>ToDo List</h1>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="New task…"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={addTask} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
          ADD
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span
              style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                flex: 1,
                marginLeft: '0.5rem'
              }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)} style={{ marginLeft: '0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
