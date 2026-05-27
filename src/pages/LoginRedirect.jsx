import { useEffect } from 'react'
import { apiConfig } from '../services/api'

export default function LoginRedirect() {
  useEffect(() => {
    window.location.replace(apiConfig.portalLoginURL)
  }, [])

  return (
    <section className="section">
      <div className="container">
        <h1>Redirigiendo al portal interno...</h1>
        <p>
          Si la redireccion no ocurre automaticamente, usa el siguiente enlace:
        </p>
        <p>
          <a href={apiConfig.portalLoginURL}>{apiConfig.portalLoginURL}</a>
        </p>
      </div>
    </section>
  )
}
