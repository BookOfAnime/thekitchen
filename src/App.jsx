import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FuturisticKitchenLandingPage from './FuturisticKitchenLandingPage'
import AboutUs from './AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage /> */}
      <FuturisticKitchenLandingPage />
      <AboutUs />
    </>
  )
}

export default App
