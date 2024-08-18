import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Star, ChefHat, Utensils, TrendingUp } from 'lucide-react';
import './App.css';

const FuturisticKitchenLandingPage = () => {
  return (
    <div className="kitchen-landing-page">
      <header className="header glass-effect">
        <div className="logo">
          <ChefHat size={24} />
          <span>The Kitchen</span>
        </div>
        <div className="applications-open">Applications Open</div>
      </header>
      <main className="main-content">
        <section className="welcome-section glass-effect">
          <motion.h1 
            className="title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to The Kitchen <ChefHat size={32} />
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We are a collective of traders inspired by Ikigai, the Japanese concept of balancing passion, skill, and purpose.
          </motion.p>
        </section>
        <div className="features">
          <div className="feature glass-effect">
            <Utensils size={24} />
            <h3>Master Your Craft</h3>
            <p>Hone your trading skills with our expert community</p>
          </div>
          <div className="feature glass-effect">
            <TrendingUp size={24} />
            <h3>Grow Together</h3>
            <p>Learn, share, and succeed as a collective</p>
          </div>
          <div className="feature glass-effect">
            <Star size={24} />
            <h3>Achieve Excellence</h3>
            <p>Reach new heights in your trading journey</p>
          </div>
        </div>
        <div className="private-alpha-group glass-effect">PRIVATE ALPHA GROUP</div>
        <motion.div 
          className="glass-effect application-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h2 className="form-title">Member Application</h2>
            <ChefHat size={24} />
          </div>
          <form>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="twitter">Twitter Username</label>
                <input type="text" id="twitter" name="twitter" placeholder="@username" required />
              </div>
              <div className="form-field">
                <label htmlFor="discord">Discord Username</label>
                <input type="text" id="discord" name="discord" placeholder="username#0000" required />
              </div>
              <div className="form-field">
                <label htmlFor="tradingExperience">Trading Experience</label>
                <input type="text" id="tradingExperience" name="tradingExperience" placeholder="e.g., 2 years" required />
              </div>
              <div className="form-field">
                <label htmlFor="specialization">Specialization</label>
                <input type="text" id="specialization" name="specialization" placeholder="e.g., Crypto, Forex" required />
              </div>
            </div>
            <div className="form-field full-width">
              <label htmlFor="communities">Communities You're Part Of</label>
              <input type="text" id="communities" name="communities" placeholder="e.g., TradingView, WSB" required />
            </div>
            <motion.button 
              type="submit" 
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Application
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

const AboutUs = () => {
  return (
    <motion.div 
      className="glass-effect about-us"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>About The Kitchen</h2>
      <p>The Kitchen is a unique collective of traders who believe in the power of community, shared knowledge, and continuous growth. Inspired by the Japanese concept of Ikigai, we strive to find the perfect balance between what we love, what we're good at, what the world needs, and what we can be rewarded for.</p>
      <h3>Our Philosophy</h3>
      <ul>
        <li><Star size={16} /> Passion: We love what we do and are excited about the markets.</li>
        <li><Star size={16} /> Skill: We constantly hone our trading skills and share our knowledge.</li>
        <li><Star size={16} /> Purpose: We aim to make a positive impact in the trading community.</li>
        <li><Star size={16} /> Value: We create value for ourselves and our members through our collective insights.</li>
      </ul>
      <p>Join us in The Kitchen, where we're cooking up success in the world of trading!</p>
    </motion.div>
  );
};

function App() {
  const [showButton, setShowButton] = useState(false);
  const [enterSite, setEnterSite] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setEnterSite(true);
  };

  return (
    <div className="app-container">
      <div className="spline-background">
        <Spline
          className="spline-scene"
          scene="https://prod.spline.design/1xZzVQHJBP17-0LI/scene.splinecode"
        />
      </div>
      <AnimatePresence>
        {!enterSite && showButton && (
          <motion.div
            className="button-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="explore-button glass-effect"
              onClick={handleEnter}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(66, 153, 225, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">Enter The Kitchen</span>
              <span className="button-glow"></span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {enterSite && (
          <motion.div
            className="site-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <FuturisticKitchenLandingPage />
            <AboutUs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;