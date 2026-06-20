//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-sgums.onrender.com/api'
const PORTAL_LOGIN_URL =
  //import.meta.env.VITE_PORTAL_LOGIN_URL || 'http://localhost:5173/login'
  import.meta.env.VITE_PORTAL_LOGIN_URL || 'https://sgumsfrontend.netlify.app/login'

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

export async function requestJson(endpoint, options = {}) {
  const { headers: customHeaders, ...restOptions } = options
  const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(customHeaders ?? {}),
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const errorMessage =
      payload && typeof payload === 'object' && payload.message
        ? payload.message
        : `Error HTTP ${response.status}`
    throw new Error(errorMessage)
  }

  return payload
}
