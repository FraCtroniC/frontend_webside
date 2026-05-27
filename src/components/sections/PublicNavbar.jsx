import { useCurrentPath } from '../../hooks/useCurrentPath'
import AppLink from '../ui/AppLink'

const menu = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Programas' },
  { href: '/admissions', label: 'Admisiones' },
  { href: '/contact', label: 'Contacto' },
]

export default function PublicNavbar() {
  const path = useCurrentPath()

  return (
    <header className="site-header">
      <div className="container">
        <AppLink href="/" className="brand" aria-label="Ir al inicio">
          <span className="brand-mark">SG</span>
          <span>
            <strong>SGUMS</strong>
            <small>UPTNTMS - Website Publica</small>
          </span>
        </AppLink>

        <nav className="nav" aria-label="Navegacion principal">
          {menu.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className={path === item.href ? 'active' : ''}
            >
              {item.label}
            </AppLink>
          ))}
          <AppLink href="/login" className="btn btn-primary" style={{ padding: '0.45rem 1rem' }}>
            Entrar al portal
          </AppLink>
        </nav>
      </div>
    </header>
  )
}
