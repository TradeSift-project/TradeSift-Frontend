import { useContext } from 'react'
import { NavThemeContext } from '../context/navTheme'

export const useNavTheme = () => {
  const context = useContext(NavThemeContext)
  if (!context) {
    throw new Error('useNavTheme must be used within a NavThemeProvider')
  }
  return context
}

export default useNavTheme
