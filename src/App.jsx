import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FuturisticKitchenLandingPage from './FuturisticKitchenLandingPage';
import AboutUs from './AboutUs';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const planets = [
      { name: 'Mercury', colors: ['#8c7e6c', '#736a5b', '#a59784'], radius: 5, orbitRadius: 100, speed: 0.01 },
      { name: 'Venus', colors: ['#e6be8a', '#d9ac6a', '#f2d6a8'], radius: 8, orbitRadius: 140, speed: 0.007 },
      { name: 'Earth', colors: ['#4b6cb7', '#2c8bdb', '#1a577d'], radius: 9, orbitRadius: 180, speed: 0.005 },
      { name: 'Mars', colors: ['#c1440e', '#a93a0e', '#d94e0e'], radius: 7, orbitRadius: 220, speed: 0.004 },
      { name: 'Jupiter', colors: ['#e0ae6f', '#d39c5e', '#edc088'], radius: 20, orbitRadius: 300, speed: 0.002 },
      { name: 'Saturn', colors: ['#f4d4a9', '#e6c090', '#fcdfb1'], radius: 17, orbitRadius: 380, speed: 0.0015 }
    ];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random()
      });
    }

    planets.forEach(planet => {
      planet.angle = Math.random() * Math.PI * 2;
    });

    function drawStar(star) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    }

    function drawPlanet(planet) {
      const x = canvas.width / 2 + Math.cos(planet.angle) * planet.orbitRadius;
      const y = canvas.height / 2 + Math.sin(planet.angle) * planet.orbitRadius;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius);
      gradient.addColorStop(0, planet.colors[0]);
      gradient.addColorStop(0.5, planet.colors[1]);
      gradient.addColorStop(1, planet.colors[2]);

      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw orbit
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, planet.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach(star => {
        star.alpha = Math.abs(Math.sin(Date.now() * 0.001 + star.x + star.y));
        drawStar(star);
      });

      // Draw and animate planets
      planets.forEach(planet => {
        planet.angle += planet.speed;
        drawPlanet(planet);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleExplore = () => {
    setIsLoading(false);
  };

  return (
    <>
      <canvas ref={canvasRef} className="space-background"></canvas>
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