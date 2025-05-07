"use client"

import { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Home() {
  //state for a new task
  const [task, setTask] = useState('');
  //state for a list of tasks
  const [tasks, setTasks] = useState([]);

  const isFirst = useRef(true);

  // Loading from localStorage at start
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  //  Saving to localStorage when a list changes
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  const addTask = () => {
    const text = task.trim();
    if (!text){
      alert('Enter task text');
      return;
    }
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask ]);
    setTask('');
  };

  //Complete a task
  const toggleTask = id =>
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));

  //Delete a task
  const deleteTask = id =>
    setTasks(tasks.filter(task => task.id !== id));

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <ThemeSwitcher />
      <h1 style={{ fontSize: '50px', textAlign: 'center' }}>ToDo List</h1>

    {/*Input field and add task button*/}
      <div style={{ display: 'flex', marginBottom: '1rem', border: 'solid 1px'  }}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="New task…"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={addTask} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          ADD
        </button>
      </div>

    {/*The list of the tasks*/}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            {/*Completeness checkbox*/}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                flex: 1,
                marginLeft: '0.5rem'
              }}
            >
              {task.text}
            </span>

            {/*Add a timestump*/}
            <small style={{color: '#666'}}>
              {new Date(task.createdAt).toLocaleString()}
            </small>

            {/*Delete button */}
            <button onClick={() => deleteTask(task.id)} 
            style={{ 
              marginLeft: '0.5rem', 
              paddingLeft: '0.5rem', 
              paddingRight: '0.5rem',
              cursor: 'pointer'
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
