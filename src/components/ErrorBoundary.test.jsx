import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

const Boom = () => {
  throw new Error('boom')
}

describe('ErrorBoundary', () => {
  it('shows a fallback instead of blanking the app', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary resetKey="/a">
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })

  it('recovers when the resetKey changes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { rerender } = render(
      <ErrorBoundary resetKey="/a">
        <Boom />
      </ErrorBoundary>
    )
    rerender(
      <ErrorBoundary resetKey="/b">
        <div>Next page</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Next page')).toBeInTheDocument()
  })
})
