// ============================================================
// Counter.jsx — Using useSelector and useDispatch
// ============================================================
// useSelector: reads data from the Redux store
// useDispatch: gives you the dispatch function to fire actions
// ============================================================

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCount,
  selectHistory,
} from '../store/slices/counterSlice'

function Counter() {
  const dispatch = useDispatch()

  // useSelector subscribes to the store — component re-renders
  // only when the selected value changes
  const count = useSelector(selectCount)
  const history = useSelector(selectHistory)

  const [amount, setAmount] = useState(5)

  return (
    <div className="card">
      <h2>🔢 Counter (Persisted)</h2>
      <p className="description">
        This counter value is stored in Redux and persisted to localStorage.
        <br />
        <strong>Try refreshing the page</strong> — the count stays!
      </p>

      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>

      <div className="button-group">
        <button onClick={() => dispatch(decrement())}>− 1</button>
        <button onClick={() => dispatch(increment())}>+ 1</button>
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          + {amount}
        </button>
        <button className="danger" onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>

      <div className="amount-input">
        <label>
          Custom amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h4>History (last 5):</h4>
          <ul>
            {history.slice(-5).map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Counter
