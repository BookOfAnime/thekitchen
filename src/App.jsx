import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  Mail,
  Phone,
  MapPin,
  Menu,
  ChevronRight,
  Users as Community,
  GitCommit as Commitment,
  Layers as Create,
  Star,
} from "lucide-react";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Lazy loading component
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

// Starry background component
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
      const numStars = Math.floor((canvas.width * canvas.height) / 1000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.1,
          glintTimer: Math.random() * 200,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.glintTimer--;
        if (star.glintTimer <= 0) {
          star.opacity = Math.min(star.opacity + 0.1, 0.7);
          if (star.opacity >= 0.7) {
            star.glintTimer = Math.random() * 200 + 50;
          }
        } else {
          star.opacity = Math.max(star.opacity - 0.01, 0.1);
        }
      });
    };

    const animate = () => {
      updateStars();
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

// Synergy title animation
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

// Energy spark animation
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

// Feature section
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

// Synergy logo
const SynergyLogo = () => (
  <img src="/logo.svg" alt="Synergy Logo" className="synergy-logo" />
);

// Header component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToApplicationForm = () => {
    navigate("/");
    setTimeout(() => {
      const applicationForm = document.getElementById("application-form");
      if (applicationForm) {
        applicationForm.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <SynergyLogo className="one" />
        <span className="header-title">Synergy</span>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <nav className={`nav-buttons ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/roadmap"
          className="nav-button"
          onClick={() => setIsMenuOpen(false)}
        >
          Roadmap
        </Link>
        <Link
          to="/about"
          className="nav-button"
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <button
          onClick={scrollToApplicationForm}
          className="nav-button applications-open"
        >
          Applications Open
        </button>
      </nav>
    </header>
  );
};

// Roadmap component
const RoadmapPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Community Building",
      description: "Inaugural membership application process",
    },
    {
      phase: "Phase 2",
      title: "Platform Development",
      description: "Connecting and fostering collaborative relationships",
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      description: "Enhancing members opportunities through networks",
    },
    {
      phase: "Phase 4",
      title: "Global Integration",
      description: "Expansion into multi-network agency platform",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % roadmapItems.length);
  };

  const calculatePosition = (index) => {
    if (isMobile) return { x: 0, y: 0 };
    const angle = ((index - activeIndex) * 90 + 360) % 360;
    const radius = 300;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div className="roadmap-page">
      <StarryBackground />
      <h1 className="section-title glow">Synergy Roadmap</h1>
      <div className="circular-roadmap">
        <div className="roadmap-logo"></div>
        {roadmapItems.map((item, index) => {
          const position = calculatePosition(index);
          return (
            <motion.div
              key={item.phase}
              className={`roadmap-item ${index === activeIndex ? "active" : ""}`}
              initial={isMobile ? { opacity: 0, y: 20 } : false}
              animate={
                isMobile
                  ? { opacity: 1, y: 0 }
                  : {
                      x: position.x,
                      y: position.y,
                      opacity: index === activeIndex ? 1 : 0.7,
                      zIndex: index === activeIndex ? 1 : 0,
                    }
              }
              transition={{ duration: 0.5, delay: isMobile ? index * 0.2 : 0 }}
            >
              <div className="item-content">
                <h3 className="roadmap-phase">{item.phase}</h3>
                <h4 className="roadmap-title">{item.title}</h4>
                <p className="roadmap-description">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {!isMobile && (
        <div className="roadmap-controls">
          <button className="next-button" onClick={handleNext}>
            Next Phase
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

// Landing page component
const SynergyLandingPage = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    const data = Array.from(formData.entries())
      .map(([key, value]) => {
        if (key === "TermsAgree") {
          value = value === "on" ? "Yes" : "No";
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");

    fetch(
      "https://script.google.com/macros/s/AKfycbxMXF-FXPALf0T2AQtNuP-T9MiBXzReTUQmX-SbpvFmofO0Iue7-oIuQ3KHfxoY3cPRmg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      }
    )
      .then((response) => response.text())
      .then((text) => {
        console.log("Response:", text);
        setNotification("Application submitted successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setNotification("Error submitting application. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setNotification(""), 3000);
      });
  };

  return (
    <div className="synergy-landing-page">
      <StarryBackground />
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <main className="main-content">
          <LazyLoadComponent delay={0.2}>
            <section className="welcome-section">
              <h1 className="title glow">Welcome to Synergy</h1>
              <p className="subtitle">
                <i>/noun</i> The combined effect of working together to produce a
                greater effect than the sum of their individual effects.
              </p>
            </section>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.2}>
            <div className="about-us">
              <h2 className="glow">About Synergy</h2>
              <p>
                We are an exclusive group of entrepreneurs, investors, traders,
                and creators with the goal to combine our skill sets and passions
                for a greater combined effect.
              </p>
              <h3 className="glow core-values">Our Core Values</h3>
              <ul className="core-values">
                <li>
                  <TrendingUp size={16} /> Innovation: We push the boundaries of
                  what's possible.
                </li>
                <li>
                  <TrendingUp size={16} /> Growth: We constantly evolve and adapt
                  to stay ahead.
                </li>
                <li>
                  <Users size={16} /> Collaboration: We believe in the power of
                  collective intelligence.
                </li>
                <li>
                  <Target size={16} /> Excellence: We strive for nothing less than
                  the best in all we do.
                </li>
              </ul>
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.3}>
            <h1 className="section-title glow">Why Choose Synergy?</h1>
            <div className="features">
              <Feature
                icon={Community}
                title="Community"
                description="We aim to create an environment of like minded people who help each other and strive for success."
                delay={0.1}
              />
              <Feature
                icon={Commitment}
                title="Commitment"
                description="Our members are committed to continuously learn and improve."
                delay={0.2}
              />
              <Feature
                icon={Create}
                title="Create"
                description="We value combining our member's unique skillsets to enhance individual and group projects."
                delay={0.3}
              />
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.2}>
            <div id="application-form" className="application-form" ref={formRef}>
              <div className="form-header">
                <h2 className="form-title glow">Membership Application</h2>
              </div>
              <form onSubmit={handleSubmit} className="form">
              <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="years">
                      How many years of experience do you have?
                    </label>
                    <input
                      type="number"
                      id="years"
                      name="years"
                      placeholder="1,2, etc"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="expertise">
                      Are you studying, and if so what are you studying?
                    </label>
                    <input
                      type="text"
                      id="expertise"
                      name="Expertise"
                      placeholder="e.g., AI, Blockchain"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="twitter">
                      What is your Twitter handle?
                    </label>
                    <input
                      type="text"
                      id="twitter"
                      name="Twitter"
                      placeholder="@yourhandle"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="motivation">
                      What motivates you to be successful?
                    </label>
                    <input
                      type="text"
                      id="motivation"
                      name="Motivation"
                      placeholder="Your motivation..."
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="time_investment">
                      Where do you invest most of your time?
                    </label>
                    <input
                      type="text"
                      id="time_investment"
                      name="TimeInvestment"
                      placeholder="(crypto/stocks/property/content creation etc…)?"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="specialty">
                      Please list areas of specialty/personal skill sets:
                    </label>
                    <input
                      type="text"
                      id="specialty"
                      name="Specialty"
                      placeholder="Your specialties..."
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="communities">
                      Are you part of any existing communities or businesses?
                    </label>
                    <input
                      type="text"
                      id="communities"
                      name="Communities"
                      placeholder="List communities/businesses..."
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="synergy_interest">
                      Why are you interested in Synergy?
                    </label>
                    <textarea
                      id="synergy_interest"
                      name="SynergyInterest"
                      placeholder="Share your thoughts..."
                      required
                    ></textarea>
                  </div>
                  <div className="form-field">
                    <label htmlFor="terms_agree">
                      Are you willing to pay a monthly subscription rate?
                    </label>
                    <input
                      type="checkbox"
                      id="terms_agree"
                      name="TermsAgree"
                      required
                    />
                  </div>
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

          {/* Footer Section */}
          <LazyLoadComponent delay={0.2}>
            <footer className="footer">
              <div className="footer-links">
                <a
                  href="https://twitter.com/YOUR_TWITTER_HANDLE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={32} />
                </a>
                <a
                  href="https://discord.gg/YOUR_DISCORD_INVITE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDiscord size={32} />
                </a>
              </div>
            </footer>
          </LazyLoadComponent>
        </main>
      </div>
    </div>
  );
};

// New About Us component
const AboutUs = () => {
  const testimonials = [
    { id: 1, text: "Synergy has completely transformed my trading strategy!", author: "John D." },
    { id: 2, text: "The networking opportunities here are unparalleled.", author: "Sarah M." },
    { id: 3, text: "I've found amazing collaborators for my projects.", author: "Mike R." },
  ];

  const AboutFeature = ({ icon: Icon, title, items }) => (
    <LazyLoadComponent>
      <motion.div
        className="about-feature"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="feature-icon">
          <Icon size={32} />
        </div>
        <h3 className="feature-title glow">{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </LazyLoadComponent>
  );

  const TestimonialCard = ({ text, author }) => (
    <LazyLoadComponent>
      <motion.div 
        className="testimonial-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p>"{text}"</p>
        <span>- {author}</span>
      </motion.div>
    </LazyLoadComponent>
  );

  const ImageGallery = () => {
    const [cardOrder, setCardOrder] = useState([1, 2, 3, 4, 5]);

    const handleCardClick = (clickedCard) => {
      const newOrder = [
        clickedCard,
        ...cardOrder.filter(card => card !== clickedCard)
      ];
      setCardOrder(newOrder);
    };

    return (
      <LazyLoadComponent>
        <div className="main">
          {cardOrder.map((cardNumber, index) => (
            <div 
              key={cardNumber}
              className="card" 
              id={`c${cardNumber}`}
              style={{backgroundImage: `url('/card${cardNumber}.webp')`, zIndex: 5 - index}}
              onClick={() => handleCardClick(cardNumber)}
            ></div>
          ))}
        </div>
      </LazyLoadComponent>
    );
  };

  const AdditionalGallery = () => {
    const images = [
      '/gallery1.webp',
      '/gallery2.webp',
      '/gallery3.webp',
      '/gallery4.webp',
      '/gallery5.webp',
      '/gallery6.webp',
    ];

    return (
      <LazyLoadComponent>
        <div className="additional-gallery">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={image} alt={`Gallery image ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </LazyLoadComponent>
    );
  };

  return (
    <div className="about-us-page">
      <StarryBackground />
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="section-title glow">SYNERGY INFO</h1>
        
        <section className="about-section">
          <h2 className="subsection-title glow">What can you expect?</h2>
          <p>Currently we are using a discord server to connect members, with future goals to expand our digital network into a Web3 agency, connecting skilled members to jobs, investors and VC's.</p>
        </section>

        <div className="features-grid">
          <AboutFeature 
            icon={TrendingUp} 
            title="Trading" 
            items={[
              "Live VC trading across crypto, meme coins and stocks/options",
              "Technical analysis masterclasses and discussions",
              "Suite of bots for market analysis, whale tracking and insider plays"
            ]}
          />
          <AboutFeature 
            icon={Users} 
            title="Networking" 
            items={[
              "Skilled members across crypto trading, stocks and broader financial markets",
              "Speak with designers, website developers, coders and creatives",
              "Future in-person meets and events"
            ]}
          />
          <AboutFeature 
            icon={Create} 
            title="Creative" 
            items={[
              "Memecoin studio for group launches",
              "Pitch ideas and collaborate on group and individual projects",
              "Trade with us, fund your idea, get connected with skilled individuals"
            ]}
          />
        </div>

        <section className="testimonials-section">
          <h2 className="subsection-title glow">Testimonials & Wins</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <ImageGallery />
          <AdditionalGallery />
        </section>
      </motion.div>
    </div>
  );
};

// Main App component
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
    // setEnterSite(true);
  };

  return (
    <Router>
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
                  <span className="button-text">Coming Soon</span>
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
              <Header />
              <Routes>
                <Route path="/" element={<SynergyLandingPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;