import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './FuturisticKitchenLandingPage.css';

const FuturisticKitchenLandingPage = () => {
  return (
    <div className="kitchen-landing-page">
      <div className="background-overlay"></div>
      <header className="header glass-effect">
        <div className="logo">
          <Star size={24} />
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
            Welcome to The Kitchen <Star size={24} />
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
        <div className="private-alpha-group glass-effect">PRIVATE ALPHA GROUP</div>
        <motion.div 
          className="application-form glass-effect"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h2 className="form-title">Member Application</h2>
            <Star size={24} />
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
                <input type="text" id="specialization" name="specialization" placeholder="e.g., Forex, Crypto" required />
              </div>
            </div>
            <div className="form-field full-width">
              <label htmlFor="communities">Communities</label>
              <input type="text" id="communities" name="communities" placeholder="Enter communities you're part of" required />
            </div>
            <motion.button 
              type="submit" 
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Step
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default FuturisticKitchenLandingPage;