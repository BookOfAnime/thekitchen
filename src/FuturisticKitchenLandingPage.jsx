import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './FuturisticKitchenLandingPage.css';

const FuturisticKitchenLandingPage = () => {
  return (
    <div className="kitchen-landing-page">
      <header className="header">
        <div className="logo">
          <Star size={24} />
        </div>
        <div className="applications-open">Applications Open</div>
      </header>
      <main className="main-content">
        <section className="welcome-section">
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
        <div className="private-alpha-group">PRIVATE ALPHA GROUP</div>
        <motion.div 
          className="application-form"
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
                <label htmlFor="twitter">What is your Twitter Username</label>
                <input type="text" id="twitter" name="twitter" placeholder="Enter Text" required />
              </div>
              <div className="form-field">
                <label htmlFor="discord">What is your Discord Username</label>
                <input type="text" id="discord" name="discord" placeholder="Enter Text" required />
              </div>
              <div className="form-field">
                <label htmlFor="tradingExperience">How long have you been trading for?</label>
                <input type="text" id="tradingExperience" name="tradingExperience" placeholder="Enter Text" required />
              </div>
              <div className="form-field">
                <label htmlFor="specialization">What do you specialize in?</label>
                <input type="text" id="specialization" name="specialization" placeholder="Enter Text" required />
              </div>
            </div>
            <div className="form-field full-width">
              <label htmlFor="communities">What communities are you a part of?</label>
              <input type="text" id="communities" name="communities" placeholder="Enter Text" required />
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
      {/* <footer className="footer">
        <p>All rights reserved © 2024 The Kitchen</p>
        <p>Have a question? Send us a DM on X and we'll get back to you asap.</p>
        <a href="https://twitter.com/0xKitchen" target="_blank" rel="noopener noreferrer">@0xKitchen</a>
      </footer> */}
    </div>
  );
};

export default FuturisticKitchenLandingPage;