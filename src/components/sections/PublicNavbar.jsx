import { useEffect, useState } from 'react'
import { useCurrentPath } from '../../hooks/useCurrentPath'
import AppLink from '../ui/AppLink'
import universityLogo from '../../assets/logo.png'

const menu = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Programas' },
  { href: '/admissions', label: 'Admisiones' },
  { href: '/contact', label: 'Contacto' },
]

export default function PublicNavbar() {
  const path = useCurrentPath()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [path])

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <div className="container site-header-inner">
        <AppLink href="/" className="brand" aria-label="Ir al inicio" onClick={closeMenu}>
          <img className="brand-mark" src={universityLogo} alt="Logo de la universidad" />
          <span>
            <strong>SGUMS</strong>
            <small>UPTNTMS - Website Publica</small>
          </span>
        </AppLink>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </span>
        </button>

        <nav id="site-nav" className="nav" aria-label="Navegacion principal">
          <div className="nav-panel-header">
            <span className="nav-panel-title">Menú</span>
            <button
              type="button"
              className="nav-close"
              aria-label="Cerrar menú"
              onClick={closeMenu}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="nav-panel-links">
            {menu.map((item, index) => (
              <AppLink
                key={item.href}
                href={item.href}
                className={path === item.href ? 'active' : ''}
                style={{ '--nav-index': index }}
                onClick={closeMenu}
              >
                {item.label}
              </AppLink>
            ))}
            <AppLink
              href="/login"
              className="btn btn-primary nav-cta"
              style={{ '--nav-index': menu.length }}
              onClick={closeMenu}
            >
              Entrar al portal
            </AppLink>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className="nav-backdrop"
        aria-label="Cerrar menú"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  )
}
