import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, Users, Target } from "lucide-react";
import "./App.css";

// Lazy loading component that animates elements on scroll
const LazyLoadComponent = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
          vy: Math.floor(Math.random() * 50) - 25,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
      });
    };

    const moveStars = () => {
      stars.forEach((star) => {
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

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-background" />;
};

const SynergyText = () => {
  const letters = "Synergy".split("");

  return (
    <motion.div className="synergy-text-container">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="synergy-letter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const EnergySpark = () => {
  return (
    <motion.div
      className="energy-spark"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
};

const Feature = ({ icon: Icon, title, description, delay }) => (
  <LazyLoadComponent delay={delay}>
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
  </LazyLoadComponent>
);

const SynergyLogo = () => (
  <img src="/logo.svg" alt="Synergy Logo" className="synergy-logo" />
);

const SynergyLandingPage = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    formRef.current.submit();

    setNotification("Application submitted successfully!");
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    setIsSubmitting(false);
  };

  return (
    <div className="synergy-landing-page">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <header className="header">
          <div className="logo">
            <SynergyLogo />
            <span className="header-title">Synergy</span>
          </div>
          <div className="applications-open">Applications Open</div>
        </header>

        <main className="main-content">
          <LazyLoadComponent delay={0.2}>
            <section className="welcome-section">
              <h1 className="title glow">Welcome to Synergy</h1>
              <p className="subtitle">
                We are a collective of innovators inspired by the power of
                collaboration and shared vision.
              </p>
            </section>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.2}>
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
                  <TrendingUp size={16} /> Innovation: We push the boundaries of what's
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
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.3}>
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
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.2}>
            <div className="application-form">
              <div className="form-header">
                <h2 className="form-title glow">Membership Application</h2>
                <SynergyLogo />
              </div>
              <form
                action="https://script.google.com/macros/s/AKfycbwGd4xZSxShiv2Y1xCDvAfX-EnfI9uVwJGl__-imu6m45XYBGwP8rHChVQ-8cWSN7edHg/exec"
                method="POST"
                ref={formRef}
                onSubmit={handleSubmit}
              >
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </motion.button>
              </form>
              {notification && (
                <div className="notification">
                  <p>{notification}</p>
                </div>
              )}
            </div>
          </LazyLoadComponent>
        </main>
      </div>
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
            transition={{ duration: 0.8 }}
          >
            <StarryBackground />
            <SynergyText />
            <EnergySpark />
            {showButton && (
              <motion.button
                className="explore-button"
                onClick={handleEnter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="button-text">Explore</span>
                <span className="button-glow"></span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enterSite && (
          <motion.div
            className="site-content site-content-active"
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
