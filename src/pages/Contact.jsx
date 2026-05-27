import AppLink from '../components/ui/AppLink'
import { useSiteData } from '../hooks/useSiteData'

export default function Contact() {
  const { content } = useSiteData()

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
              <AppLink href={`mailto:${content?.contact?.email}`} external>
                {content?.contact?.email}
              </AppLink>
            </p>
          </article>

          <article className="card fade-in">
            <h3>Enlaces utiles</h3>
            <ul>
              {content?.contact?.usefulLinks?.map((item) => (
                <li key={item.href}>
                  <AppLink href={item.href} external>
                    {item.title}
                  </AppLink>
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
