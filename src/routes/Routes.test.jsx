import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { getMe } from '../services/userService'
import { AuthProvider } from '../context/AuthContext'
import AppRoutes from './Routes'

vi.mock('../services/userService', () => ({ getMe: vi.fn(), logoutUser: vi.fn() }))

const LoginStub = () => {
  const navigate = useNavigate()
  return (
    <div>
      Login page
      <button onClick={() => navigate('/dashboard')}>go</button>
    </div>
  )
}

vi.mock('../layouts/auth/Login', () => ({ default: LoginStub }))
vi.mock('../layouts/auth/Signup', () => ({ default: () => <div>Signup page</div> }))
vi.mock('../layouts/auth/OTP', () => ({ default: () => <div>OTP page</div> }))
vi.mock('../layouts/auth/ResetPassword', () => ({ default: () => <div>Reset page</div> }))
vi.mock('../layouts/Landing/Home', () => ({ default: () => <div>Home page</div> }))
vi.mock('../layouts/Dashboard/Dashboard', () => ({ default: () => <div>Dashboard page</div> }))

const authOk = { success: true, data: { id: 'u1', firstName: 'Test' } }
const httpError = (status) => Object.assign(new Error(`HTTP ${status}`), { response: { status } })
const timeoutError = () => new Error('timeout')

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MemoryRouter>
  )

describe('AuthGuard', () => {
  beforeEach(() => {
    getMe.mockReset()
  })

  it('renders the dashboard for a logged-in user', async () => {
    getMe.mockResolvedValue(authOk)
    renderAt('/dashboard')
    expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
  })

  it('redirects to /login when the session is rejected', async () => {
    getMe.mockRejectedValue(httpError(401))
    renderAt('/dashboard')
    expect(await screen.findByText('Login page')).toBeInTheDocument()
  })

  it('redirects a logged-in user away from /login', async () => {
    getMe.mockResolvedValue(authOk)
    renderAt('/login')
    expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
  })

  it('never checks the session on the landing page', async () => {
    renderAt('/')
    expect(await screen.findByText('Home page')).toBeInTheDocument()
    expect(getMe).not.toHaveBeenCalled()
  })

  it('re-verifies a stale logged-out status after login instead of bouncing', async () => {
    getMe.mockRejectedValueOnce(httpError(401)).mockResolvedValue(authOk)
    renderAt('/login')

    fireEvent.click(await screen.findByText('go'))

    expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
    expect(getMe).toHaveBeenCalledTimes(2)
  })

  it('shows a retry screen instead of logging out when the server is unreachable', async () => {
    getMe.mockRejectedValue(timeoutError())
    renderAt('/dashboard')

    expect(await screen.findByText('Unable to reach the server.', {}, { timeout: 5000 })).toBeInTheDocument()
    expect(screen.queryByText('Login page')).not.toBeInTheDocument()
    expect(getMe).toHaveBeenCalledTimes(3)

    getMe.mockResolvedValue(authOk)
    fireEvent.click(screen.getByText('Retry'))
    expect(await screen.findByText('Dashboard page')).toBeInTheDocument()
  }, 10000)

  it('retries transient failures before giving up', async () => {
    getMe.mockRejectedValueOnce(timeoutError()).mockResolvedValue(authOk)
    renderAt('/dashboard')
    expect(await screen.findByText('Dashboard page', {}, { timeout: 3000 })).toBeInTheDocument()
  })
})
