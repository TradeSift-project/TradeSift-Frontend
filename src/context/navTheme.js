import { createContext } from 'react'

export const NavThemeContext = createContext({
  theme: 'dark',
  variant: 'transparent',
  activeSection: null,
})
