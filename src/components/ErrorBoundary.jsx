import { Component } from 'react'

// Catches render errors so one broken page doesn't blank the whole app.
// Clears itself when resetKey changes (e.g. on navigation).
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info.componentStack)
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div role="alert" className="flex min-h-screen w-full items-center justify-center bg-white px-4 font-geist dark:bg-neutral-950">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Something went wrong</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This page hit an unexpected error. Try again, or go back to the dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => this.setState({ error: null })}
              className="rounded-full border border-gray-200 px-6 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
            >
              Try again
            </button>
            <a
              href="/dashboard"
              className="rounded-full bg-[#F87103] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
