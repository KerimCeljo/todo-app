import { useState, type FormEvent } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newText, setNewText] = useState('');

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;               // don’t add empty
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
    setNewText('');
  }

  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Add new todo"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
