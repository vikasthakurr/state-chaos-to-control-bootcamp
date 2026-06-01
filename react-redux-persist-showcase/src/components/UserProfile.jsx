// ============================================================
// UserProfile.jsx — Login/Logout with persisted user state
// ============================================================
// Demonstrates how user session data can be persisted
// so users don't lose their login state on refresh.
// ============================================================

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  login,
  logout,
  setTheme,
  selectUser,
  selectIsLoggedIn,
} from '../store/slices/userSlice'

function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      dispatch(login({ name: name.trim(), email: email.trim() }))
      setName('')
      setEmail('')
    }
  }

  if (isLoggedIn) {
    return (
      <div className="card">
        <h2>👤 User Profile (Persisted)</h2>
        <p className="description">
          Your login state survives page refreshes thanks to redux-persist.
        </p>

        <div className="profile-info">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user.name}</strong>
            <br />
            <span className="email">{user.email}</span>
          </div>
        </div>

        <div className="theme-selector">
          <label>Theme preference:</label>
          <div className="button-group">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                className={user.theme === t ? 'active' : ''}
                onClick={() => dispatch(setTheme(t))}
              >
                {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '💻'} {t}
              </button>
            ))}
          </div>
        </div>

        <button className="danger" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>👤 User Profile (Persisted)</h2>
      <p className="description">
        Login to see your profile persist across refreshes.
      </p>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default UserProfile
