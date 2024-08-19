import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Zap, TrendingUp, Users, Target } from "lucide-react";
import "./App.css";

const LazyLoad = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {isVisible && children}
    </motion.div>
  );
};

const Feature = ({ icon: Icon, title, description }) => (
  <LazyLoad>
    <motion.div
      className="feature"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={24} />
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  </LazyLoad>
);

const SynergyLandingPage = () => {
  return (
    <div className="synergy-landing-page">
      <LazyLoad>
        <header className="header">
          <div className="logo">
            <Zap size={24} />
            <span>Synergy</span>
          </div>
          <div className="applications-open">Applications Open</div>
        </header>
      </LazyLoad>

      <main className="main-content">
        <LazyLoad>
          <section className="welcome-section">
            <h1 className="title">
              Welcome to Synergy <Zap size={32} />
            </h1>
            <p className="subtitle">
              We are a collective of innovators inspired by the power of
              collaboration and shared vision.
            </p>
          </section>
        </LazyLoad>

        <div className="features">
          <Feature
            icon={TrendingUp}
            title="Accelerate Growth"
            description="Boost your potential through our combined expertise"
          />
          <Feature
            icon={Users}
            title="Collaborative Network"
            description="Join a community of like-minded innovators"
          />
          <Feature
            icon={Target}
            title="Achieve Excellence"
            description="Reach new heights in your professional journey"
          />
        </div>

        <LazyLoad>
          <div className="private-alpha-group">
            ELITE INNOVATION HUB
          </div>
        </LazyLoad>

        <LazyLoad>
          <div className="application-form">
            <div className="form-header">
              <h2 className="form-title">Membership Application</h2>
              <Zap size={24} />
            </div>
            <form>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="expertise">Area of Expertise</label>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    placeholder="e.g., AI, Blockchain"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    placeholder="5"
                    required
                  />
                </div>
              </div>
              <div className="form-field full-width">
                <label htmlFor="motivation">
                  What motivates you to join Synergy?
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
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
          </div>
        </LazyLoad>
      </main>
    </div>
  );
};

const AboutUs = () => {
  return (
    <LazyLoad>
      <div className="about-us">
        <h2>About Synergy</h2>
        <p>
          Synergy is a cutting-edge collective of innovators who believe in the
          power of collaboration, shared knowledge, and continuous growth. We
          strive to create an environment where ideas flourish and innovations
          thrive.
        </p>
        <h3>Our Core Values</h3>
        <ul>
          <li>
            <Zap size={16} /> Innovation: We push the boundaries of what's
            possible.
          </li>
          <li>
            <TrendingUp size={16} /> Growth: We constantly evolve and adapt to
            stay ahead.
          </li>
          <li>
            <Users size={16} /> Collaboration: We believe in the power of
            collective intelligence.
          </li>
          <li>
            <Target size={16} /> Excellence: We strive for nothing less than the
            best in all we do.
          </li>
        </ul>
        <p>
          Join Synergy and be part of a movement that's shaping the future of
          innovation!
        </p>
      </div>
    </LazyLoad>
  );
};

function App() {
  const [showButton, setShowButton] = useState(false);
  const [enterSite, setEnterSite] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleEnter = () => {
    setEnterSite(true);
  };

  return (
    <div className="app-container">
      {isLargeScreen && (
        <div className="spline-background">
          <Spline
            className="s"
            scene="https://prod.spline.design/vrrnxlXkYvdoZTNu/scene.splinecode"
          />
        </div>
      )}
      <AnimatePresence>
        {!enterSite && showButton && (
          <motion.div
            className="explore-button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="explore-button"
              onClick={handleEnter}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">Join Us</span>
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
            <SynergyLandingPage />
            <AboutUs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;