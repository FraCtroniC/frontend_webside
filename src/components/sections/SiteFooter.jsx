import AppLink from '../ui/AppLink'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <section>
            <h3>UPTNTMS</h3>
            <p>
              Universidad Politecnica Territorial del Norte del Tachira Manuela Saenz.
              Nuestro norte es la inclusion y la excelencia academica.
            </p>
          </section>

          <section>
            <h3>Enlaces utiles</h3>
            <ul>
              <li>
                <AppLink href="/about">
                  Historia de la UPTNTMS
                </AppLink>
              </li>
              <li>
                <AppLink href="/about">
                  Mision y vision
                </AppLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Contacto</h3>
            <ul>
              <li>
                <AppLink href="mailto:uptntmanuelasaenz.ce@gmail.com" external>
                  uptntmanuelasaenz.ce@gmail.com
                </AppLink>
              </li>
              <li>
                <AppLink href="/contact">Soporte y atencion</AppLink>
              </li>
              <li>
                <AppLink href="/login">Acceso al portal interno</AppLink>
              </li>
            </ul>
          </section>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} UPTNTMS - SGUMS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
