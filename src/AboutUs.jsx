import React from 'react';
import { Star, BarChart2 } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-section">
      <h2 className="about-title">About Us</h2>
      <div className="about-content">
        <div className="about-left">
          <div className="globe-graphic"></div>
          <div className="vision-label">OUR VISION</div>
          <div className="star-icon">
            <Star size={24} />
          </div>
        </div>
        <div className="about-right">
          <div className="offer-label">WHAT WE OFFER</div>
          <div className="info-columns">
            <div className="community-column">
              <div className="icon-label">
                <Star size={18} />
                <span>Community</span>
              </div>
              <p>The concept of Ikigai, a Japanese term that translates to "a reason for being", captures the essence of what drives individuals to pursue their passions and find meaning in their lives.</p>
              <p>Our vision is to create a space where members can network, fulfill their purpose, excel in trading, and grow together.</p>
              <p>Join us and transform your future with a community that empowers you to reach your fullest potential.</p>
            </div>
            <div className="trading-column">
              <div className="icon-label">
                <BarChart2 size={18} />
                <span>Trading</span>
              </div>
              <p>We lead by experience and strive for excellence</p>
              <ul>
                <li>Educational Content</li>
                <li>Memecoin Trading</li>
                <li>Signals</li>
                <li>Market Analysis</li>
                <li>Expert-Led Community</li>
                <li>Networking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-info">
        <div className="contact-info">
          <p>Have a question?</p>
          <p>Send us a DM on X and we'll get back to you asap.</p>
        </div>
        <a href="https://twitter.com/0xKitchen" target="_blank" rel="noopener noreferrer" className="twitter-handle">@0xKitchen</a>
      </div>
      <div className="copyright">
        All rights reserved © 2024 The Kitchen
      </div>
      <div className="applications-open">
        Applications Open
      </div>
    </section>
  );
};

export default AboutUs;