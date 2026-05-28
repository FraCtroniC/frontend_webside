import AppLink from '../components/ui/AppLink'

export default function Contact() {
  const usefulLinks = ['Historia de la UPTNTMS', 'Mision y vision']

  return (
    <section className="section">
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
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card fade-in">
            <h3>Acceso al sistema</h3>
            <p>
              El inicio de sesion y la recuperacion de credenciales se gestionan en el
              portal interno SGUMS.
            </p>
            <AppLink href="/login">Ir al portal interno</AppLink>
          </article>
        </div>
      </div>
    </section>
  )
}
