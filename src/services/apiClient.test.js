import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import axios, { AxiosError } from 'axios'
import apiClient from './apiClient'

// Fake transport: routes[url] is a list of responses consumed in order.
// A number is an HTTP status; 'timeout' simulates a request with no response.
let routes
let calls

const respond = (config) => {
  const url = config.url.replace(config.baseURL ?? '', '').replace(/^\/api/, '')
  calls.push(url)
  const next = routes[url]?.shift() ?? 200

  if (next === 'timeout') {
    return Promise.reject(new AxiosError('timeout', 'ECONNABORTED', config, {}))
  }
  const response = { data: { url }, status: next, statusText: '', headers: {}, config }
  if (next >= 400) {
    return Promise.reject(new AxiosError(`HTTP ${next}`, 'ERR_BAD_RESPONSE', config, {}, response))
  }
  return Promise.resolve(response)
}

const setPath = (pathname) => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { pathname, href: `http://localhost${pathname}` },
  })
}

const originalLocation = window.location

describe('apiClient 401 handling', () => {
  beforeEach(() => {
    routes = {}
    calls = []
    apiClient.defaults.adapter = respond
    axios.defaults.adapter = respond
    vi.spyOn(console, 'error').mockImplementation(() => {})
    setPath('/dashboard')
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation })
  })

  it('refreshes the session and retries the original request', async () => {
    routes['/operations'] = [401, 200]
    routes['/auth/refresh'] = [200]

    const res = await apiClient.get('/operations')

    expect(res.status).toBe(200)
    expect(calls).toEqual(['/operations', '/auth/refresh', '/operations'])
  })

  it('makes a single refresh call for concurrent 401s', async () => {
    routes['/a'] = [401, 200]
    routes['/b'] = [401, 200]
    routes['/auth/refresh'] = [200]

    await Promise.all([apiClient.get('/a'), apiClient.get('/b')])

    expect(calls.filter((c) => c === '/auth/refresh')).toHaveLength(1)
  })

  it('redirects to /login when the refresh is rejected', async () => {
    routes['/operations'] = [401]
    routes['/auth/refresh'] = [401]

    await expect(apiClient.get('/operations')).rejects.toBeDefined()

    expect(window.location.href).toBe('/login')
    expect(calls).not.toContain('/auth/logout')
  })

  it('does not log the user out when the refresh times out', async () => {
    routes['/operations'] = [401]
    routes['/auth/refresh'] = ['timeout']

    await expect(apiClient.get('/operations')).rejects.toBeDefined()

    expect(window.location.href).toBe('http://localhost/dashboard')
    expect(calls).not.toContain('/auth/logout')
  })

  it('does not redirect from a public page', async () => {
    setPath('/login')
    routes['/users/me'] = [401]
    routes['/auth/refresh'] = [401]

    await expect(apiClient.get('/users/me')).rejects.toBeDefined()

    expect(window.location.href).toBe('http://localhost/login')
  })

  it('passes 401s from auth endpoints straight through', async () => {
    routes['/auth/login'] = [401]

    await expect(apiClient.post('/auth/login', {})).rejects.toMatchObject({
      response: { status: 401 },
    })
    expect(calls).toEqual(['/auth/login'])
  })

  it('skips the refresh call when another tab refreshed moments ago', async () => {
    localStorage.setItem('tradesift_last_refresh', String(Date.now()))
    routes['/operations'] = [401, 200]

    const res = await apiClient.get('/operations')

    expect(res.status).toBe(200)
    expect(calls).toEqual(['/operations', '/operations'])
  })
})
