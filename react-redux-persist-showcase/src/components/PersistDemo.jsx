// ============================================================
// PersistDemo.jsx — Shows what's in localStorage
// ============================================================
// This component visualizes the persisted state so your
// session attendees can see exactly what redux-persist stores.
// ============================================================

import { useSelector } from 'react-redux'
import { persistor } from '../store'

function PersistDemo() {
  const state = useSelector((state) => state)

  const handlePurge = () => {
    // persistor.purge() removes all persisted state
    persistor.purge().then(() => {
      window.location.reload()
    })
  }

  // Read raw localStorage to show what's actually stored
  const rawData = localStorage.getItem('persist:root')
  let parsedData = null
  try {
    parsedData = rawData ? JSON.parse(rawData) : null
  } catch {
    parsedData = null
  }

  return (
    <div className="card persist-demo">
      <h2>🗄️ What Redux Persist Stores</h2>
      <p className="description">
        Open DevTools → Application → Local Storage to see this yourself.
        <br />
        Below is the raw data redux-persist saves under the key{' '}
        <code>persist:root</code>
      </p>

      <div className="storage-view">
        <h4>localStorage["persist:root"]:</h4>
        {parsedData ? (
          <div className="storage-keys">
            {Object.entries(parsedData).map(([key, value]) => (
              <details key={key}>
                <summary>
                  <code>{key}</code>
                </summary>
                <pre>{JSON.stringify(JSON.parse(value), null, 2)}</pre>
              </details>
            ))}
          </div>
        ) : (
          <p className="empty-state">No persisted data yet.</p>
        )}
      </div>

      <div className="persist-actions">
        <button className="danger" onClick={handlePurge}>
          🗑️ Purge All Persisted State
        </button>
        <p className="hint">
          This calls <code>persistor.purge()</code> — clears localStorage and
          reloads.
        </p>
      </div>
    </div>
  )
}

export default PersistDemo
