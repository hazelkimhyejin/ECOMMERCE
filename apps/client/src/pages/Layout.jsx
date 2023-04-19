import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Suspense } from "react"
import LoadingSpinner from "../components/LoadingSpinner"

const Layout = () => {
  
  return (
    <>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>        
      
    </>
  )
}

export default Layout