const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.uptnt.local'
const PORTAL_LOGIN_URL =
  import.meta.env.VITE_PORTAL_LOGIN_URL || 'http://localhost:5173/login'

export const apiConfig = {
  baseURL: API_BASE_URL,
  portalLoginURL: PORTAL_LOGIN_URL,
}

export async function fetchFromApi(endpoint) {
  const response = await fetch(`${apiConfig.baseURL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`)
  }

  return response.json()
}
