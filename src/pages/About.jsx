import { useSiteData } from '../hooks/useSiteData'

export default function About() {
  const { content } = useSiteData()

  return (
    <section className="section">
      <div className="container stack">
        <header className="page-header fade-in">
          <h1>Sobre la UPTNTMS</h1>
          <p>
            Institucion reconocida por la calidad de su talento humano, su actividad
            cientifica y tecnologica, y su vinculo con las comunidades y su espacio
            territorial.
          </p>
        </header>

        <div className="cards-grid">
          <article className="card fade-in">
            <h3>Sede administrativa</h3>
            <p>
              Oficinas de procesos administrativos, postgrado y areas de soporte para
              la operacion institucional.
            </p>
          </article>

          <article className="card fade-in">
            <h3>Sede academica</h3>
            <p>
              Aulas, laboratorios, biblioteca y espacios de formacion para los
              diferentes programas de estudios.
            </p>
          </article>

          <article className="card fade-in">
            <h3>Unidad de produccion</h3>
            <p>
              Ambito practico para programas del area agropecuaria y articulacion con
              cadenas de produccion y valor del medio rural.
            </p>
          </article>
        </div>

        <article className="card fade-in">
          <h3>Fuente de contenido</h3>
          <p>
            El contenido institucional de esta website se construye tomando como base
            el sitio oficial para evitar informacion inventada.
          </p>
          <a href={content?.source} target="_blank" rel="noreferrer">
            Ver fuente oficial
          </a>
        </article>
      </div>
    </section>
  )
}
