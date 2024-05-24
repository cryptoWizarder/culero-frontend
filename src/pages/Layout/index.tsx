import { Navbar, Footer, Container } from '@/components'
import './index.css'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
export default Layout
