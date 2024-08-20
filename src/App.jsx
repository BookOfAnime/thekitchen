import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Users, Target } from "lucide-react";
import "./App.css";

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = [];
    const generateStars = () => {
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: Math.floor(Math.random() * 50) - 25,
          vy: Math.floor(Math.random() * 50) - 25
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
      });
    };

    const moveStars = () => {
      stars.forEach(star => {
        star.x += star.vx / 30;
        star.y += star.vy / 30;
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
      });
    };

    const animate = () => {
      moveStars();
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    generateStars();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-background" />;
};

const AnimatedText = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      className="animated-text"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const Feature = ({ icon: Icon, title, description, delay }) => (
  <AnimatedSection delay={delay}>
    <motion.div
      className="feature"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="feature-icon">
        <Icon size={32} />
      </div>
      <h3 className="feature-title glow">{title}</h3>
      <p>{description}</p>
    </motion.div>
  </AnimatedSection>
);

const SynergyLandingPage = () => {
  return (
    <div className="synergy-landing-page">
      <AnimatedSection>
        <header className="header">
          <div className="logo">
            <Zap size={24} />
            <span>Synergy</span>
          </div>
          <div className="applications-open">Applications Open</div>
        </header>
      </AnimatedSection>

      <main className="main-content">
        <AnimatedSection delay={0.2}>
          <section className="welcome-section">
            <h1 className="title glow">
              Welcome to Synergy <Zap size={32} />
            </h1>
            <p className="subtitle">
              We are a collective of innovators inspired by the power of
              collaboration and shared vision.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="about-us">
            <h2 className="glow">About Synergy</h2>
            <p>
              Synergy is a cutting-edge collective of innovators who believe in
              the power of collaboration, shared knowledge, and continuous growth.
              We strive to create an environment where ideas flourish and
              innovations thrive.
            </p>
            <h3 className="glow">Our Core Values</h3>
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
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <h1 className="section-title glow">Features</h1>
          <div className="features">
            <Feature
              icon={TrendingUp}
              title="Accelerate Growth"
              description="Boost your potential through our combined expertise."
              delay={0.1}
            />
            <Feature
              icon={Users}
              title="Collaborative Network"
              description="Join a community of like-minded innovators."
              delay={0.2}
            />
            <Feature
              icon={Target}
              title="Achieve Excellence"
              description="Reach new heights in your professional journey."
              delay={0.3}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="application-form">
            <div className="form-header">
              <h2 className="form-title glow">Membership Application</h2>
              <Zap size={24} />
            </div>
            <form action="https://formsubmit.co/ephriam123@gmail.com" method="POST">
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
        </AnimatedSection>
      </main>
    </div>
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
      <AnimatePresence>
        {!enterSite && (
          <motion.div
            className="intro-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StarryBackground />
            <AnimatedText text="Synergy" />
            {showButton && (
              <motion.button
                className="explore-button"
                onClick={handleEnter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="button-text">Join Us</span>
                <span className="button-glow"></span>
              </motion.button>
            )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;