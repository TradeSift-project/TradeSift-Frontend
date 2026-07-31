import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial preference
    const storedTheme = localStorage.getItem('tradesift-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev
      if (nextTheme) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('tradesift-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('tradesift-theme', 'light')
      }
      return nextTheme
    })
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E6E8] bg-white transition hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800"
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.6} className="text-amber-500" />
      ) : (
        <Moon size={16} strokeWidth={1.6} className="text-[#686C72] dark:text-gray-400" />
      )}
    </button>
  )
}

export default ThemeToggle
