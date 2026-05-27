import PublicLayout from './layout/PublicLayout'
import { SiteProvider } from './context/SiteContext'
import { useCurrentPath } from './hooks/useCurrentPath'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Admissions from './pages/Admissions'
import Contact from './pages/Contact'
import LoginRedirect from './pages/LoginRedirect'
import NotFound from './pages/NotFound'

const routeMap = {
  '/': Home,
  '/about': About,
  '/services': Services,
  '/admissions': Admissions,
  '/contact': Contact,
  '/login': LoginRedirect,
}

function App() {
  const path = useCurrentPath()
  const Page = routeMap[path] ?? NotFound

  return (
    <SiteProvider>
      <PublicLayout>
        <Page />
      </PublicLayout>
    </SiteProvider>
  )
}

export default App
