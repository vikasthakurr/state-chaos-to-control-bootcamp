// ============================================================
// TodoList.jsx — CRUD operations with persisted state
// ============================================================
// Shows how redux-persist handles arrays of objects.
// Add todos, mark them complete, delete them — all persisted.
// ============================================================

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
  selectTodos,
  selectCompletedTodos,
} from '../store/slices/todosSlice'

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const completedTodos = useSelector(selectCompletedTodos)

  const [text, setText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text.trim()))
      setText('')
    }
  }

  return (
    <div className="card">
      <h2>📝 Todo List (Persisted)</h2>
      <p className="description">
        Your todos are saved in localStorage. Close the tab, come back later —
        they'll still be here.
      </p>

      <form onSubmit={handleAdd} className="todo-form">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one above!</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <label className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                  />
                  <span className="todo-text">{todo.text}</span>
                </label>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeTodo(todo.id))}
                  aria-label={`Remove ${todo.text}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="todo-footer">
            <span>
              {completedTodos.length}/{todos.length} completed
            </span>
            {completedTodos.length > 0 && (
              <button
                className="text-btn"
                onClick={() => dispatch(clearCompleted())}
              >
                Clear completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default TodoList
