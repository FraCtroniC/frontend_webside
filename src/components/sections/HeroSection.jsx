import AppLink from '../ui/AppLink'

export default function HeroSection({ hero }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="fade-in">
          <span className="badge">{hero.badge}</span>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.description}</p>

          <div className="actions">
            <AppLink href={hero.ctaSecondaryHref} className="btn btn-ghost">
              {hero.ctaSecondaryLabel}
            </AppLink>
          </div>
        </div>

        <aside className="hero-card fade-in" aria-label="Indicadores de servicio">
          <h3>Complejo educativo virtual</h3>
          <p>
            Plataforma tecnologica para potenciar el aprendizaje, la comunicacion
            institucional y el acceso organizado a servicios universitarios.
          </p>

          <div className="kpi-grid">
            <article className="kpi">
              <strong>4</strong>
              <span>Sedes activas</span>
            </article>
            <article className="kpi">
              <strong>+7</strong>
              <span>PNF habilitados</span>
            </article>
            <article className="kpi">
              <strong>2026</strong>
              <span>Ciclo de referencia</span>
            </article>
            <article className="kpi">
              <strong>24/7</strong>
              <span>Acceso digital</span>
            </article>
          </div>
        </aside>
      </div>
    </section>
  )
}
