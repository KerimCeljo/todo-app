import React, { useState } from 'react'
import './App.css'

type Task = {
  id: number
  text: string
  done: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const remaining = tasks.filter((t) => !t.done).length

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTask.trim()) return
    const next: Task = { id: Date.now(), text: newTask.trim(), done: false }
    setTasks((prev) => [...prev, next])
    setNewTask('')
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app-container">
      <h1>Todo List</h1>

      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          placeholder="Add new task"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="controls todo-stats">
        <span className="items-left">{remaining} item{remaining !== 1 ? 's' : ''} left</span>
        <button
          className="clear-btn"
          onClick={clearCompleted}
          disabled={remaining === tasks.length}
        >
          Clear Completed
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              aria-label={task.text}
            />
            <span className={`todo-text${task.done ? ' completed' : ''}`}>{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.text}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
