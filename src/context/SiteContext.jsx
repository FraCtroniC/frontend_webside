import { createContext, useEffect, useMemo, useState } from 'react'
import { getPublicContent } from '../services/contentService'

export const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const response = await getPublicContent()
        if (isMounted) {
          setContent(response)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No fue posible cargar el contenido.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      content,
      isLoading,
      error,
    }),
    [content, isLoading, error],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}
