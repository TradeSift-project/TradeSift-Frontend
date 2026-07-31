import { useState, useRef, useEffect } from 'react'
import { Bell, Check, Trash2 } from 'lucide-react'

// TODO BACKEND INTEGRATION
// Replace this with real notification API when available
const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Document requires review', desc: 'Packing List in IMP-00124 needs attention', time: '5m ago', read: false },
  { id: 2, title: 'Extraction completed', desc: 'Successfully extracted 14 fields from Invoice', time: '12m ago', read: false },
  { id: 3, title: 'Validation issue detected', desc: 'Weight mismatch found across documents', time: '1h ago', read: true },
  { id: 4, title: 'Export completed', desc: 'IMP-00124 data exported to Excel', time: '3h ago', read: true },
]

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const panelRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={panelRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E6E8] bg-white transition hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800"
      >
        <Bell size={16} strokeWidth={1.6} className="text-[#686C72] dark:text-neutral-400 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl bg-white border border-[#E5E6E8] shadow-lg z-50 overflow-hidden flex flex-col max-h-[400px] dark:bg-neutral-900 dark:border-neutral-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
            <h3 className="font-geist text-sm font-bold text-[#0B0D12] dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition dark:text-blue-400">
                Mark all read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">
                No notifications found.
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-neutral-50 dark:divide-neutral-800/50">
                {notifications.map(notif => (
                  <div key={notif.id} className={`flex flex-col p-4 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${!notif.read ? 'bg-[#FDF6F0]/50 dark:bg-amber-900/10' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span className={`text-xs font-semibold truncate ${!notif.read ? 'text-[#0B0D12] dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {notif.title}
                        </span>
                        <p className="text-[11px] text-gray-500 leading-tight dark:text-gray-400">
                          {notif.desc}
                        </p>
                        <span className="text-[10px] text-gray-400 mt-1 dark:text-gray-500">{notif.time}</span>
                      </div>
                      {!notif.read && (
                        <button onClick={() => handleMarkAsRead(notif.id)} className="shrink-0 p-1 rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationPanel
