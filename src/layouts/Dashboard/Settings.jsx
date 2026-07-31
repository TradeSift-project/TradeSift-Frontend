import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { getMe, updateUser, logoutUser } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { User, Bell, Monitor, LogOut, Loader2, Save } from 'lucide-react'
import ThemeToggle from './components/layout/DashboardHeader/ThemeToggle'

const Settings = () => {
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organisation: ''
  })
  
  const [notifPrefs, setNotifPrefs] = useState({
    emailAlerts: true,
    desktopAlerts: false,
    dailyDigest: true
  })

  useEffect(() => {
    let isMounted = true
    getMe()
      .then(res => {
        if (isMounted && res.success && res.data) {
          setUser({
            firstName: res.data.firstName || '',
            lastName: res.data.lastName || '',
            email: res.data.email || '',
            organisation: res.data.organisation || ''
          })
        }
      })
      .catch(() => {
        toast.error('Failed to load user profile.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await updateUser(user)
      if (res.success) {
        toast.success('Profile updated successfully.')
      }
    } catch (err) {
      toast.error('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleNotifToggle = (key) => {
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Notification preferences updated.')
    // TODO BACKEND: Sync notification preferences to backend when API is available.
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast.success('Logged out successfully.')
      navigate('/login')
    } catch (err) {
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-4xl"
    >
      <div>
        <h1 className="font-geist text-3xl font-bold text-[#0B0D12] dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-[#686C72] dark:text-gray-400">Manage your profile, preferences, and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Column: Navigation/Sections (if needed for larger settings menus, but for now we'll just stack them vertically in a clean layout) */}

        <div className="md:col-span-4 flex flex-col gap-8">
          
          {/* Profile Section */}
          <section className="rounded-2xl border border-[#E5E6E8] bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4 dark:border-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B0D12] dark:text-white">Profile Settings</h2>
                <p className="text-xs text-[#686C72] dark:text-gray-400">Update your personal and organizational details.</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={user.firstName}
                    onChange={handleProfileChange}
                    className="rounded-xl border border-[#E5E6E8] bg-[#FDFDFD] px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-white dark:focus:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={user.lastName}
                    onChange={handleProfileChange}
                    className="rounded-xl border border-[#E5E6E8] bg-[#FDFDFD] px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-white dark:focus:ring-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={user.email}
                  disabled
                  className="rounded-xl border border-[#E5E6E8] bg-neutral-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-400"
                />
                <p className="text-[10px] text-gray-400">Email address cannot be changed.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Organization</label>
                <input 
                  type="text" 
                  name="organisation"
                  value={user.organisation}
                  onChange={handleProfileChange}
                  className="rounded-xl border border-[#E5E6E8] bg-[#FDFDFD] px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-white dark:focus:ring-white"
                />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200 uppercase tracking-wider"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Appearance Section */}
          <section className="rounded-2xl border border-[#E5E6E8] bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4 dark:border-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                <Monitor size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B0D12] dark:text-white">Appearance</h2>
                <p className="text-xs text-[#686C72] dark:text-gray-400">Customize the TradeSift interface.</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Dark Mode</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Toggle the application theme.</span>
              </div>
              <ThemeToggle />
            </div>
          </section>

          {/* Notifications Section */}
          <section className="rounded-2xl border border-[#E5E6E8] bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4 dark:border-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B0D12] dark:text-white">Notifications</h2>
                <p className="text-xs text-[#686C72] dark:text-gray-400">Manage how you receive alerts.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Email Alerts</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Receive critical alerts via email.</span>
                </div>
                <button 
                  onClick={() => handleNotifToggle('emailAlerts')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifPrefs.emailAlerts ? 'bg-amber-500' : 'bg-gray-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifPrefs.emailAlerts ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Desktop Notifications</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Show push notifications on this device.</span>
                </div>
                <button 
                  onClick={() => handleNotifToggle('desktopAlerts')}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifPrefs.desktopAlerts ? 'bg-amber-500' : 'bg-gray-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifPrefs.desktopAlerts ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Account Section */}
          <section className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-red-900/30">
            <div className="flex items-center gap-3 mb-6 border-b border-red-50 pb-4 dark:border-red-900/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-900/20">
                <LogOut size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Account Actions</h2>
                <p className="text-xs text-red-400">Sign out of your current session.</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Log Out</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Securely end your session on this device.</span>
              </div>
              <button 
                onClick={handleLogout}
                className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 uppercase tracking-wider"
              >
                Sign Out
              </button>
            </div>
          </section>

        </div>
      </div>
    </motion.div>
  )
}

export default Settings
