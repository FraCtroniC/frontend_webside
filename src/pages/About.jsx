export default function About() {
  return (
    <section className="section about-page">
      <div className="container stack about-shell">
        <header className="page-header about-hero fade-in">
          <span className="eyebrow">Quienes somos</span>
          <h1>Sobre la UPTNTMS</h1>
          <p>
            Institucion reconocida por la calidad de su talento humano, su actividad
            cientifica y tecnologica, y su vinculacion con las comunidades y su
            espacio territorial.
          </p>
          <p className="about-intro-copy">
            La UPTNTMS impulsa una formacion publica con sentido humano, compromiso
            regional y proyectos que conectan aula, territorio y produccion. Su
            proposito es formar profesionales capaces de transformar realidades con
            criterio tecnico, etico y social.
          </p>
        </header>

        <div className="about-banner fade-in">
          <div>
            <span className="eyebrow eyebrow--soft">Perfil institucional</span>
            <h2>Una universidad con identidad territorial y vocacion de servicio.</h2>
          </div>
          <p>
            Nuestro enfoque integra docencia, investigacion y extension para que cada
            sede, proyecto y programa aporte soluciones visibles a la comunidad
            universitaria y al entorno donde actuamos.
          </p>
        </div>

        <div className="about-highlights cards-grid">
          <article className="card about-tile fade-in">
            <h3>Sede administrativa</h3>
            <p>
              Oficinas de procesos administrativos, postgrado y areas de soporte para
              la operacion institucional.
            </p>
          </article>

          <article className="card about-tile fade-in">
            <h3>Sede academica</h3>
            <p>
              Aulas, laboratorios, biblioteca y espacios de formacion para los
              diferentes programas de estudios.
            </p>
          </article>

          <article className="card about-tile fade-in">
            <h3>Unidad de produccion</h3>
            <p>
              Ambito practico para programas del area agropecuaria y articulacion con
              cadenas de produccion y valor del medio rural.
            </p>
          </article>
        </div>

        <section className="about-section fade-in" id="history">
          <div className="section-title about-title">
            <div>
              <span className="eyebrow">Historia</span>
              <h2>Origen y evolucion de la UPTNTMS</h2>
            </div>
            <p>
              La UPTNTMS nacio para ampliar el acceso a la educacion superior en el
              norte de Tachira y responder al desarrollo productivo, tecnico y humano
              de la region.
            </p>
          </div>
          <div className="about-panel">
            <p>
              Desde sus primeros pasos, la universidad ha construido una identidad
              cercana a la comunidad, con programas que crecen junto al territorio y
              con una red de docentes, estudiantes y trabajadores comprometidos con la
              formacion publica.
            </p>
            <p>
              Con el paso del tiempo, su presencia academica se ha fortalecido en areas
              estrategicas como tecnologia, produccion, gestion y extension social,
              consolidando una oferta que busca impacto real y pertinencia regional.
            </p>
          </div>
        </section>

        <section className="about-section fade-in" id="mission">
          <div className="section-title about-title">
            <div>
              <span className="eyebrow">Mision</span>
              <h2>Formar con excelencia, compromiso y sentido social</h2>
            </div>
            <p>
              La mision define el trabajo diario de la universidad: educar con calidad,
              incluir a mas comunidades y generar conocimiento util para la vida
              productiva.
            </p>
          </div>
          <div className="about-panel about-panel--accent">
            <p>
              Formamos profesionales integrales, creativos y responsables, capaces de
              aportar soluciones tecnicas y humanas a los desafios del pais. Cada
              programa promueve la participacion, la investigacion aplicada y el
              aprendizaje con proposito.
            </p>
            <p>
              Tambien impulsamos la vinculacion con instituciones, sectores
              productivos y comunidades para que el conocimiento no se quede en el
              aula, sino que se convierta en accion, acompanamiento y desarrollo.
            </p>
          </div>
        </section>

        <section className="about-section fade-in" id="vision">
          <div className="section-title about-title">
            <div>
              <span className="eyebrow">Vision</span>
              <h2>Ser referencia territorial en innovacion y transformacion</h2>
            </div>
            <p>
              La vision orienta una universidad moderna, cercana y reconocida por su
              capacidad para innovar sin perder su compromiso social.
            </p>
          </div>
          <div className="about-panel about-panel--soft">
            <p>
              Aspiramos a una institucion abierta, sostenible y reconocida por su
              liderazgo academico, por la calidad de sus procesos y por proyectos que
              fortalezcan la economia local, la investigacion y la vida comunitaria.
            </p>
            <p>
              Queremos que cada egresado lleve consigo un sello de excelencia, sentido
              de pertenencia y capacidad de transformar su entorno con soluciones
              utiles, innovadoras y humanas.
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}
