import AppLink from '../components/ui/AppLink'

export default function Contact() {
  const usefulLinks = [
    { label: 'Historia de la UPTNTMS', href: '/about#history' },
    { label: 'Mision y vision', href: '/about#mission' },
    { label: 'Proyeccion institucional', href: '/about#vision' },
  ]

  return (
    <section className="section contact-page">
      <div className="container stack">
        <header className="page-header fade-in">
          <h1>Contacto y soporte</h1>
          <p>
            Canales institucionales para informacion, orientacion academica y soporte
            general de la comunidad universitaria.
          </p>
        </header>

        <div className="cards-grid">
          <article className="card fade-in">
            <h3>Correo institucional</h3>
            <p>
              <AppLink href="mailto:uptntmanuelasaenz.ce@gmail.com" external>
                uptntmanuelasaenz.ce@gmail.com
              </AppLink>
            </p>
          </article>

          <article className="card fade-in">
            <h3>Enlaces utiles</h3>
            <ul>
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <AppLink href={item.href}>{item.label}</AppLink>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
