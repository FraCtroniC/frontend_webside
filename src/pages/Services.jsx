import { useSiteData } from '../hooks/useSiteData'

const pnfTrimestral = [
  'Administracion',
  'Agroalimentacion',
  'Construccion Civil',
  'Informatica',
  'Procesamiento y Distribucion de Alimentos',
]

const pnfSemestral = [
  'Seguridad Alimentaria y Cultural Nutricional',
  'Medicina Veterinaria',
]

export default function Services() {
  const { content } = useSiteData()

  return (
    <section className="section services-page">
      <div className="container stack">
        <header className="page-header fade-in">
          <h1>Programas y servicios</h1>
          <p>
            Programas Nacionales de Formacion (PNF) y servicios universitarios
            disponibles para la comunidad academica.
          </p>
        </header>

        <div className="cards-grid">
          <article className="card fade-in">
            <h3>PNF Trimestrales</h3>
            <ul>
              {pnfTrimestral.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card fade-in">
            <h3>PNF Semestrales</h3>
            <ul>
              {pnfSemestral.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card fade-in">
            <h3>Servicios de apoyo</h3>
            <p>
              Actividades deportivas, culturales, recreativas y servicios de bienestar
              como el comedor universitario.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
