import HeroSection from '../components/sections/HeroSection'
import InfoCard from '../components/ui/InfoCard'
import AppLink from '../components/ui/AppLink'
import { useSiteData } from '../hooks/useSiteData'

export default function Home() {
  const { content, isLoading, error } = useSiteData()

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <p>Cargando contenido institucional...</p>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section className="section">
        <div className="container">
          <h1>No fue posible cargar la pagina principal</h1>
          <p>{error || 'Intenta nuevamente en unos minutos.'}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <HeroSection hero={content.hero} />

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Informacion institucional destacada</h2>
            <p>
              Website publica orientada a presentacion, captacion y acompanamiento de
              nuevos ingresos, con acceso claro al sistema interno.
            </p>
          </div>

          <div className="cards-grid">
            {content.highlights.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <div className="section-title">
            <h2>Noticias UPTNTMS</h2>
            <p>Contenido de referencia tomado del sitio institucional oficial.</p>
          </div>

          <div className="cards-grid">
            {content.news.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.body}
                href={item.href}
                label={item.linkLabel}
              />
            ))}
          </div>

          <div className="cta">
            <div>
              <h3>Acceso al portal academico y administrativo</h3>
              <p>
                La website publica brinda informacion institucional; las funciones
                autenticadas permanecen en el portal interno SGUMS.
              </p>
            </div>
            <AppLink href="/login" className="btn btn-primary">
              Ir al login interno
            </AppLink>
          </div>
        </div>
      </section>
    </>
  )
}
