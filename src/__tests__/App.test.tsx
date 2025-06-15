// src/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

describe('Todo App', () => {
  it('renders header and input', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/add new task/i)).toBeInTheDocument()
  })

  it('allows adding a task and marking it complete', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/add new task/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    // add a task
    await userEvent.type(input, 'Buy milk')
    await userEvent.click(addButton)

    // should appear with its checkbox and count
    const checkbox = screen.getByRole('checkbox', { name: /buy milk/i })
    expect(checkbox).toBeInTheDocument()
    expect(screen.getByText(/1 item left/i)).toBeInTheDocument()

    // toggle complete
    await userEvent.click(checkbox)
    expect(screen.getByText(/0 items left/i)).toBeInTheDocument()

    // and the text should have the "completed" style
    const itemText = screen.getByText(/buy milk/i)
    expect(itemText).toHaveClass('todo-text')
    expect(itemText).toHaveClass('completed')
  })

  it('clears only completed tasks when clicking "Clear Completed"', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/add new task/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    // add two tasks
    await userEvent.type(input, 'Task 1')
    await userEvent.click(addButton)
    await userEvent.type(input, 'Task 2')
    await userEvent.click(addButton)

    // complete only the first
    const checkbox1 = screen.getByRole('checkbox', { name: /task 1/i })
    await userEvent.click(checkbox1)
    expect(screen.getByText(/1 item left/i)).toBeInTheDocument()

    // clear completed
    const clearBtn = screen.getByRole('button', { name: /clear completed/i })
    await userEvent.click(clearBtn)

    // Task 1 should be gone, Task 2 remains
    expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument()
    expect(screen.getByText(/task 2/i)).toBeInTheDocument()
    expect(screen.getByText(/1 item left/i)).toBeInTheDocument()
  })

  it('allows deleting a task', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/add new task/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    await userEvent.type(input, 'Task to delete')
    await userEvent.click(addButton)

    expect(screen.getByText(/task to delete/i)).toBeInTheDocument()

    // click the "×" delete button
    const deleteBtn = screen.getByRole('button', { name: /delete task to delete/i })
    await userEvent.click(deleteBtn)

    expect(screen.queryByText(/Task to delete/i)).not.toBeInTheDocument()
    expect(screen.getByText(/0 items left/i)).toBeInTheDocument()
  })
})
