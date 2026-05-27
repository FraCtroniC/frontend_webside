import AppLink from '../components/ui/AppLink'
import { useSiteData } from '../hooks/useSiteData'

export default function Admissions() {
  const { content } = useSiteData()

  return (
    <section className="section">
      <div className="container stack">
        <header className="page-header fade-in">
          <h1>Admisiones y requisitos</h1>
          <p>{content?.admissions?.intro}</p>
        </header>

        <article className="card fade-in">
          <h3>Requisitos de nuevo ingreso</h3>
          <ul>
            {content?.admissions?.requirements?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Para documentos oficiales, consulta la publicacion institucional y los
            avisos vigentes.
          </p>
          <AppLink href="https://www.uptntmanuelasaenz-lafria.com.ve/index-2.html#upt" external>
            Revisar avisos oficiales
          </AppLink>
        </article>
      </div>
    </section>
  )
}
