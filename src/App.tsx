// src/App.tsx
import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text) return

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ])
    setInputValue('')
  }

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const itemsLeft = todos.filter((todo) => !todo.completed).length

  return (
    <div className="app-container">
      {/* Updated to match your tests */}
      <h1>Todo List</h1>

      <form className="todo-form" onSubmit={handleAddTodo}>
        {/* Updated placeholder to match tests */}
        <input
          type="text"
          placeholder="Add new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="controls todo-stats">
        <span className="items-left">
          {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
        </span>
        <button
          className="clear-btn"
          onClick={handleClearCompleted}
          disabled={!todos.some((t) => t.completed)}
        >
          Clear Completed
        </button>
      </div>

      <ul className="todo-list">
{todos.map((todo) => (
  <li className="todo-item" key={todo.id}>
    <input
      type="checkbox"
      aria-label={todo.text}       // ← here
      checked={todo.completed}
      onChange={() => handleToggle(todo.id)}
    />
    <span
      className={`todo-text${todo.completed ? ' completed' : ''}`}
    >
      {todo.text}
    </span>
    …
  </li>
))}
      </ul>
    </div>
  )
}
