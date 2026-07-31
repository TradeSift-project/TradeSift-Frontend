import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SidebarLogo from './SidebarLogo'
import SidebarNavigation from './SidebarNavigation'
import SidebarSuggestions from './SidebarSuggestions'
import SidebarFooter from './SidebarFooter'

const Sidebar = ({ onSoonClick, user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('tradesift-sidebar-collapsed')
    if (stored === 'true') setIsCollapsed(true)
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev
      localStorage.setItem('tradesift-sidebar-collapsed', String(next))
      return next
    })
  }

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="flex shrink-0 flex-col gap-4 border-r border-[#E5E6E8] bg-white py-5 min-h-screen dark:bg-neutral-950 dark:border-neutral-800 overflow-hidden"
    >
      <SidebarLogo isCollapsed={isCollapsed} />
      <SidebarNavigation onSoonClick={onSoonClick} isCollapsed={isCollapsed} />
      <div className="flex-1">
        <SidebarSuggestions isCollapsed={isCollapsed} />
      </div>
      <SidebarFooter user={user} onLogout={onLogout} isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
    </motion.aside>
  )
}

export default Sidebar
