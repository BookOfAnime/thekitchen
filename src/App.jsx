import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FuturisticKitchenLandingPage from './FuturisticKitchenLandingPage';
import AboutUs from './AboutUs';
import Spline from '@splinetool/react-spline';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleExplore = () => {
    setIsLoading(false);
  };

  return (
    <>
          {/* <Spline className='s' scene="https://prod.spline.design/jn4J8ZnEUx8XF0Zu/scene.splinecode" /> */}
          

          <Spline  className='s' scene="https://prod.spline.design/Fb8mdpoOjDGpf1q8/scene.splinecode" />

      {/* <div className="space-background">
        <video className="video-background" autoPlay loop muted playsInline>
          <source src="/space.mp4" type="video/mp4" />
        </video>
      </div> */}
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="loading-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.h1
                className="loading-title"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                Welcome to The Kitchen
              </motion.h1>
              <motion.p
                className="loading-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
              >
                A collective of traders inspired by Ikigai
              </motion.p>
              <motion.button
                className="explore-button"
                onClick={handleExplore}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(66, 153, 225, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="button-text">Enter The Kitchen</span>
                <span className="button-glow"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <FuturisticKitchenLandingPage />
            <AboutUs />
          </motion.div>
        )}
      </AnimatePresence>
      </>
    
  );
}

export default App;