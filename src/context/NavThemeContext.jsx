import { useState, useEffect, useRef } from 'react'
import { NavThemeContext } from './navTheme'

export const NavThemeProvider = ({ children }) => {
  const [navigationState, setNavigationState] = useState({
    theme: 'dark',
    variant: 'transparent',
    activeSection: null,
  })

  const intersectingEntries = useRef(new Map())
  const activeSectionRef = useRef(null)
  const frameId = useRef(null)

  // Measure the navbar height dynamically
  const getNavbarHeight = () => {
    const header = document.querySelector('header')
    return header ? header.offsetHeight : 80
  }

  const updateActiveTheme = () => {
    const navbarHeight = getNavbarHeight()
    let dominantSection = null
    let maxOverlapHeight = -1

    // Calculate height overlap of each intersecting section inside the navbar region [0, navbarHeight]
    intersectingEntries.current.forEach((entry) => {
      const rect = entry.boundingClientRect
      const overlapTop = Math.max(rect.top, 0)
      const overlapBottom = Math.min(rect.bottom, navbarHeight)
      const overlapHeight = Math.max(0, overlapBottom - overlapTop)

      if (overlapHeight > maxOverlapHeight) {
        maxOverlapHeight = overlapHeight
        dominantSection = entry.target
      }
    })

    // Fallback to client rect analysis if nothing is intersecting or overlap is zero (e.g., fast scroll, reload)
    if (!dominantSection || maxOverlapHeight === 0) {
      const sections = document.querySelectorAll('[data-nav-theme]')
      let closestSection = null
      let minDistance = Infinity

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if the section physically spans across the top of the viewport
        if (rect.top <= navbarHeight && rect.bottom > 0) {
          closestSection = section
        }
      })

      if (!closestSection) {
        // Fallback: find the one closest to the top of the screen
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          const dist = Math.abs(rect.top)
          if (dist < minDistance) {
            minDistance = dist
            closestSection = section
          }
        })
      }
      dominantSection = closestSection
    }

    if (dominantSection) {
      const newTheme = dominantSection.getAttribute('data-nav-theme') || 'dark'
      const newVariant = dominantSection.getAttribute('data-nav-variant') || 'transparent'
      const newActiveId = dominantSection.id || 'unknown'

      // Check if we need to update active state
      if (activeSectionRef.current !== dominantSection) {
        // Hysteresis Cushion: If switching between two intersecting sections,
        // only switch if the new section has a significantly larger overlap
        // than the current one to prevent rapid flickering at the boundary.
        const currentActive = activeSectionRef.current
        if (
          currentActive &&
          intersectingEntries.current.has(currentActive) &&
          intersectingEntries.current.has(dominantSection)
        ) {
          const currentRect = intersectingEntries.current.get(currentActive).boundingClientRect
          const newRect = intersectingEntries.current.get(dominantSection).boundingClientRect

          const currentOverlapTop = Math.max(currentRect.top, 0)
          const currentOverlapBottom = Math.min(currentRect.bottom, navbarHeight)
          const currentOverlap = Math.max(0, currentOverlapBottom - currentOverlapTop)

          const newOverlapTop = Math.max(newRect.top, 0)
          const newOverlapBottom = Math.min(newRect.bottom, navbarHeight)
          const newOverlap = Math.max(0, newOverlapBottom - newOverlapTop)

          // Only change theme if new section overlaps at least 15px more than the current one,
          // or if the current section has lost all overlap in the navbar area.
          if (newOverlap <= currentOverlap + 15 && currentOverlap > 0) {
            return
          }
        }

        activeSectionRef.current = dominantSection
        setNavigationState({
          theme: newTheme,
          variant: newVariant,
          activeSection: newActiveId,
        })
      }
    }
  }

  // RequestAnimationFrame scheduling for optimized, batched updates
  const scheduleThemeUpdate = () => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
    }
    frameId.current = requestAnimationFrame(() => {
      updateActiveTheme()
    })
  }

  useEffect(() => {
    // Select only major navigation landmark sections
    const sections = document.querySelectorAll('[data-nav-theme]')
    if (sections.length === 0) return

    const observerOptions = {
      root: null, // viewport
      // Observe entries as they cross thresholds from completely hidden to fully visible
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingEntries.current.set(entry.target, entry)
        } else {
          intersectingEntries.current.delete(entry.target)
        }
      })
      scheduleThemeUpdate()
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    // Initial evaluation on mount (e.g., page loaded halfway down)
    updateActiveTheme()

    // Re-evaluate on window resize to update dimensions
    const handleResize = () => {
      scheduleThemeUpdate()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
    }
    // Mount-only: the helpers read refs and a stable setter, so re-subscribing is unnecessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavThemeContext.Provider value={navigationState}>
      {children}
    </NavThemeContext.Provider>
  )
}
