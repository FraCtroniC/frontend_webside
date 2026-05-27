import AppLink from '../components/ui/AppLink'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container stack">
        <header className="page-header fade-in">
          <h1>Pagina no encontrada</h1>
          <p>
            La ruta solicitada no existe en la website publica. Puedes volver al
            inicio o acceder directamente al portal interno.
          </p>
        </header>

        <div className="actions">
          <AppLink href="/" className="btn btn-primary">
            Volver al inicio
          </AppLink>
          <AppLink href="/login" className="btn btn-ghost" style={{ color: '#0d1b36', borderColor: '#d8e1f0' }}>
            Ir al portal
          </AppLink>
        </div>
      </div>
    </section>
  )
}
