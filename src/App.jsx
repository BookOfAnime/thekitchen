import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, Users, Target, Mail, Phone, MapPin, Menu } from "lucide-react";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
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
        <SynergyLogo />
        <span className="header-title">Synergy</span>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <nav className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/roadmap" className="nav-button" onClick={() => setIsMenuOpen(false)}>Roadmap</Link>
        <Link to="/contact" className="nav-button" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <button onClick={scrollToApplicationForm} className="nav-button applications-open">Applications Open</button>
      </nav>
    </header>
  );
};

const RoadmapPage = () => {
  const roadmapItems = [
    { phase: "Phase 1", title: "Community Building", description: "Establish core community and initial partnerships" },
    { phase: "Phase 2", title: "Platform Development", description: "Launch beta version of Synergy platform" },
    { phase: "Phase 3", title: "Expansion", description: "Scale operations and introduce advanced features" },
    { phase: "Phase 4", title: "Global Integration", description: "Integrate with major global networks and systems" },
  ];

  return (
    <div className="roadmap-page">
      <h1 className="section-title glow">Synergy Roadmap</h1>
      <div className="timeline">
        {roadmapItems.map((item, index) => (
          <LazyLoadComponent key={index} delay={index * 0.2}>
            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="roadmap-phase">{item.phase}</div>
                <h3 className="roadmap-title">{item.title}</h3>
                <p className="roadmap-description">{item.description}</p>
              </div>
            </div>
          </LazyLoadComponent>
        ))}
      </div>
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
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
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

    const formData = new FormData(e.target);

    fetch(
      "https://script.google.com/macros/s/AKfycbz87IuCFNBdrPPdnfCwnqLqctZS5lGp3KcBvcPUsSN3mB2kBreKVi22KuSu_aOKIUY7dg/exec",
      {
        method: "POST",
        body: new URLSearchParams(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Form submission response:", data);
        if (data.startsWith("Success")) {
          setNotification("Application submitted successfully!");
          e.target.reset(); // Reset the form
        } else {
          setNotification(
            "Unexpected response. Please try again or contact support."
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setNotification("Error submitting application. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      });
  };

  return (
    <div className="synergy-landing-page">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <main className="main-content">
          <LazyLoadComponent delay={0.2}>
            <section className="welcome-section">
              <h1 className="title glow">Welcome to Synergy</h1>
              <p className="subtitle">
                The combined effect of working together to produce a greater
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
              <h3 className="glow">Our Core Values</h3>
              <ul>
                <li>
                  <TrendingUp size={16} /> Innovation: We push the boundaries of
                  what's possible.
                </li>
                <li>
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
              <p>
                Join Synergy and be part of a movement that's shaping the future
                of innovation!
              </p>
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent delay={0.3}>
            <h1 className="section-title glow">Why Choose Synergy?</h1>
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
            <div id="application-form" className="application-form" ref={formRef}>
              <div className="form-header">
                <h2 className="form-title glow">Membership Application</h2>
                <SynergyLogo />
              </div>
              <form onSubmit={handleSubmit} className="form">
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
                    <label htmlFor="expertise">
                    Are you studying, and if so what are you studying? 

                    </label>
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
                 <div className="form-field">
                   <label htmlFor="twitter">
                     What is your Twitter handle?
                   </label>
                   <input
                     type="text"
                     id="twitter"
                     name="twitter"
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
                     name="motivation"
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
                     name="time_investment"
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
                     name="specialty"
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
                     name="communities"
                     placeholder="List communities/businesses..."
                   />
                 </div>
                 <div className="form-field">
                   <label htmlFor="synergy_interest">
                     Why are you interested in Synergy?
                   </label>
                   <textarea
                     id="synergy_interest"
                     name="synergy_interest"
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
                     name="terms_agree"
                     required
                   />
                 </div>
                 <div className="form-field">
                   <label htmlFor="subscribe_newsletter">
                     Would you like to reach?
                   </label>
                   <input
                     type="checkbox"
                     id="subscribe_newsletter"
                     name="subscribe_newsletter"
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