import { useState, useEffect } from 'react'
import DesktopLayout from './Layout/DesktopLayout'
import MobileLayout from './Layout/MobileLayout'

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () =>{
      setIsMobile(window.innerWidth <= 1024);
    }
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])
  return(
    isMobile ? <MobileLayout /> : <DesktopLayout />
  )
}

export default App
