import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { fadeDown } from '../../../../../animations/variants'
import { useEffect, useState } from 'react'
import { useNavTheme } from '../../../../../hooks/useNavTheme'
import Logo from '../../../../../../assets/Logo.png'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/landingConstants'

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.54 5.54a.72.72 0 0 1-1.06 0L.23 1.29A.76.76 0 0 1 .76 0a.76.76 0 0 1 .53.23l3.72 3.72L8.73.23a.76.76 0 0 1 1.06 1.06L5.54 5.54Z"
      fill="currentColor"
    />
  </svg>
)

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, variant } = useNavTheme()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const getNavClasses = () => {
    if (variant === 'glass') {
      if (theme === 'dark') {
        return 'mt-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]'
      } else {
        return 'mt-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]'
      }
    }
    return 'bg-transparent border-transparent shadow-none'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <motion.nav
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={fadeDown}
        className={`mx-auto flex h-20 max-w-360 overflow-hidden items-center justify-between px-5 sm:px-6 lg:px-10 xl:px-16 transition-all duration-300 ease-out ${getNavClasses()}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2.75 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          <img src={Logo} alt="TradeSift" className="w-10 h-10 object-contain" />
          <span className="font-geist text-xl font-bold pt-1.5">TradeSift</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/90 hover:text-white' : 'text-black/70 hover:text-black'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex font-inter">
          <Link
            to="/login"
            className={`rounded-[18px] border px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
              theme === 'dark'
                ? 'border-white/50 bg-[rgba(3,4,5,0.2)] text-white hover:bg-white/10'
                : 'border-black/30 bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            SIGN IN
          </Link>
          <Link
            to="/signup"
            className={`rounded-[18px] px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#FAF0CB] text-black hover:bg-white' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            GET STARTED
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            className={`h-0.5 w-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 8 : 0,
            }}
          />
          <motion.span
            className={`h-0.5 w-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
            animate={{
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <motion.span
            className={`h-0.5 w-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -8 : 0,
            }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-0 right-0 top-[88px] mx-4 flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur lg:hidden transition-all duration-300 ${
              theme === 'dark' ? 'border-white/10 bg-black/60 text-white' : 'border-black/15 bg-white/95 text-black shadow-lg'
            }`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/90 hover:text-white' : 'text-black/80 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={`rounded-full border py-2 text-center text-base font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/50 bg-black/20 text-white hover:bg-white/10'
                    : 'border-black/30 bg-black/5 text-black hover:bg-black/10'
                }`}
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className={`rounded-full py-2 text-center text-base font-medium transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#FAF0CB] text-black hover:bg-white' : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                GET STARTED
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
