import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, Users, Target, Mail, Phone, MapPin, Menu, ChevronRight } from "lucide-react";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import "./App.css";

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
        <SynergyLogo className='one'/>
        <span className="header-title">Synergy</span>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <nav className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/roadmap" className="nav-button" onClick={() => setIsMenuOpen(false)}>Roadmap</Link>
        <button onClick={scrollToApplicationForm} className="nav-button applications-open">Applications Open</button>
      </nav>
    </header>
  );
};

const RoadmapPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const roadmapItems = [
    { phase: "Phase 1", title: "Community Building", description: "Inaugural membership application process" },
    { phase: "Phase 2", title: "Platform Development", description: "Connecting and fostering collaborative relationships" },
    { phase: "Phase 3", title: "Expansion", description: "Enhancing members opportunities through networks" },
    { phase: "Phase 4", title: "Global Integration", description: "Expansion into multi-network agency platform" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % roadmapItems.length);
  };

  const calculatePosition = (index) => {
    if (isMobile) return { x: 0, y: 0 };
    const angle = ((index - activeIndex) * 90 + 360) % 360;
    const radius = 200;
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
              className={`roadmap-item ${index === activeIndex ? 'active' : ''}`}
              initial={isMobile ? { opacity: 0, y: 20 } : false}
              animate={isMobile ? { opacity: 1, y: 0 } : {
                x: position.x,
                y: position.y,
                opacity: index === activeIndex ? 1 : 0.7,
                zIndex: index === activeIndex ? 1 : 0,
              }}
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <StarryBackground />
      <h1 className="section-title glow">Contact Us</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Reach out to us using the information below or fill out the contact form.</p>
          <div className="contact-details">
            <div className="contact-item">
              <Mail size={24} />
              <span>info@synergy.com</span>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <span>123 Synergy St, Innovation City, 12345</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

const SynergyLandingPage = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    
    // Convert FormData to URL-encoded string
    const data = Array.from(formData.entries())
      .map(([key, value]) => {
        // Handle checkbox
        if (key === 'TermsAgree') {
          value = value === 'on' ? 'Yes' : 'No';
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');

    fetch("https://script.google.com/macros/s/AKfycbxMXF-FXPALf0T2AQtNuP-T9MiBXzReTUQmX-SbpvFmofO0Iue7-oIuQ3KHfxoY3cPRmg/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
    .then(response => response.text())
    .then(text => {
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
               <i>/noun</i> The combined effect of working together to produce a greater
                effect than the sum of their individual effects.
              </p>
            </section>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.2}>
            <div className="about-us">
              <h2 className="glow">About Synergy</h2>
              <p>
                We are an exclusive group of entrepreneurs, investors, traders
                and creators with the goal to combine our skill sets and
                passions for a greater combined effect.
              </p>
              <h3 className="glow core-values">Our Core Values</h3>
              <ul className="core-values">
                <li >
                  <TrendingUp size={16} /> Innovation: We push the boundaries of
                  what's possible.
                </li><li>
                  <TrendingUp size={16} /> Growth: We constantly evolve and
                  adapt to stay ahead.
                </li>
                <li>
                  <Users size={16} /> Collaboration: We believe in the power of
                  collective intelligence.
                </li>
                <li>
                  <Target size={16} /> Excellence: We strive for nothing less
                  than the best in all we do.
                </li>
              </ul>
            
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.3}>
            <h1 className="section-title glow">Why Choose Synergy?</h1>
            <div className="features">
              <Feature
                icon={TrendingUp}
                title="Learn"
                description=""
                delay={0.1}
              />
              <Feature
                icon={Users}
                title="Network"
                description=""
                delay={0.2}
              />
              <Feature
                icon={Target}
                title="Create"
                description=""
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
                  {/* <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      placeholder="john@example.com"
                      required
                    />
                  </div> */}
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
                 <span className="button-text">Enter Synergy</span>
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
               <Route path="/contact" element={<ContactPage />} />
             </Routes>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   </Router>
 );
}

export default App;