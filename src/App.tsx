// src/App.tsx
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  // load from localStorage (or start with empty)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('my-todos')
    return stored ? JSON.parse(stored) : []
  })
  const [newText, setNewText] = useState('')

  // sync to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos))
  }, [todos])

  // add a new todo
  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const text = newText.trim()
    if (!text) return
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ])
    setNewText('')
  }

  // toggle completed state
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  // delete one
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  // clear all done
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const itemsLeft = todos.filter((t) => !t.completed).length

  return (
    <div className="app-container">
      <h1>My Todo App</h1>

      <form onSubmit={handleAdd} className="todo-form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={newText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewText(e.target.value)
          }
        />
        <button type="submit">Add</button>
      </form>

      <div className="todo-stats">
        <span>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</span>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
