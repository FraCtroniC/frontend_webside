import { useContext } from 'react'
import { SiteContext } from '../context/SiteContext'

export function useSiteData() {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error('useSiteData debe usarse dentro de SiteProvider.')
  }

  return context
}
