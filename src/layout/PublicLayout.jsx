import PublicNavbar from '../components/sections/PublicNavbar'
import SiteFooter from '../components/sections/SiteFooter'

export default function PublicLayout({ children }) {
  return (
    <div className="site-shell">
      <PublicNavbar />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  )
}
