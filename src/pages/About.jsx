export default function About() {
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

        <div className="cards-grid">
          <article className="card fade-in">
            <h3>Historia</h3>
            <p>
              Aqui se presentara la trayectoria de la UPTNTMS, su origen y la
              evolucion de su presencia academica en la region.
            </p>
          </article>

          <article className="card fade-in">
            <h3>Mision</h3>
            <p>
              Aqui se explicara el proposito institucional, la formacion integral y el
              compromiso con la comunidad universitaria.
            </p>
          </article>

          <article className="card fade-in">
            <h3>Vision</h3>
            <p>
              Aqui se mostrara el rumbo deseado para la universidad y sus objetivos de
              desarrollo academico, tecnologico y territorial.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
