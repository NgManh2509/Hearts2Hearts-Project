import { useState, useEffect } from 'react'
import DesktopLayout from './Layout/DesktopLayout'
import MobileLayout from './Layout/MobileLayout'

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let resizeTimer;
    const checkIsMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth <= 1024);
      }, 150);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
      clearTimeout(resizeTimer);
    };
  }, [])

  return(
    <>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  )
}

export default App
