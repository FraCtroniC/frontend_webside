import { useEffect, useState } from 'react'

function normalizePath(pathname) {
  if (!pathname) return '/'
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export function useCurrentPath() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const handleNavigation = () => {
      setPath(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('site:navigate', handleNavigation)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('site:navigate', handleNavigation)
    }
  }, [])

  return path
}
