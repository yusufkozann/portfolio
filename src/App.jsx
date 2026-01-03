import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Download, Mail, Linkedin, Github, Menu, X, FileText, MapPin, Award, GraduationCap } from 'lucide-react';

// --- Animasyonlar ve Hook'lar ---
const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Mesajınız alındı! (Demo modundasınız, gerçek e-posta gönderilmedi.)');
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-neutral-950 text-neutrale-100 min-h-screen font-sans selection:bg-amber-500 selection:text-white">
      <nav className="fixed top-0 w-full bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold tracking-tight cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-amber-500">Yusuf</span>
              <span className="text-neutral-100"> Kozan</span>
            </motion.div>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-t border-neutral-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-amber-600 text-white'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-neutral-950 to-neutral-950"></div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          ></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-800 text-amber-300 text-sm font-medium"
            >
              Available for Global Opportunities
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Yusuf Kozan
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-amber-400 mb-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Electrical & Electronics Engineer | Robotics Researcher
            </motion.h2>
            
<motion.p 
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Synergizing autonomous robotics with advanced communication technologies. Specializing in <span className="text-neutral-200">ROS/SLAM</span>, <span className="text-neutral-200">RF Signal Processing</span>, and <span className="text-neutral-200">Deep Learning</span>.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href="./docs/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-amber-600/20"
              >
                <Download size={20} />
                Download CV
              </motion.a>
              
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 px-8 py-4 rounded-lg font-semibold transition-all"
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

{/* About Section - GÜNCELLENMİŞ VERSİYON */}
      <Section id="about" title="About Me">
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-amber-900/5">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
              I engineer autonomy out of complexity. From optimizing SLAM algorithms in <span className="text-amber-500 font-bold">Portugal</span> to classifying invisible RF signals with <span className="text-amber-500 font-bold">Deep Learning</span>, I thrive at the intersection of perception and logic. My mission is not just to build robots, but to create intelligent systems that <span className="text-neutral-100 font-medium italic">perceive, adapt, and act</span> with precision in the real world.
            </p>
          </div>
        </motion.div>
      </Section>

{/* Experience Section - FINAL (CV UYUMLU) */}
      <Section id="experience" title="Professional Journey">
        <motion.div variants={staggerContainer} className="max-w-4xl mx-auto space-y-6">
          
          {/* 1. STAJ (Portekiz) */}
          <ExperienceCard
            type="Internship"
            icon={<MapPin size={24} />}
            iconColor="text-blue-500"
            title="Ingeniarius, Lda."
            subtitle="R&D Engineering Intern"
            location="Porto, Portugal"
            period="Jul 2024 - Sep 2024"
            description="Engineered high-fidelity robotic system simulations using C++ and ROS. Optimized mechatronic performance by integrating advanced sensor data fusion algorithms for precise navigation."
          />

          {/* 2. BAŞARI (Robot Craft Birinciliği) */}
          <ExperienceCard
            type="Achievement"
            icon={<Award size={24} />}
            iconColor="text-amber-500"
            title="Robot Craft 2024 Champion"
            subtitle="1st Place International Winner"
            location="Coimbra, Portugal"
            period="2024"
            description="Secured 1st place among 8 international teams. Led the development of the autonomous navigation stack, conducting rigorous debugging in a Linux-based environment."
          />

          {/* 3. EĞİTİM (Erasmus - Polonya) */}
          <ExperienceCard
            type="Education"
            icon={<GraduationCap size={24} />}
            iconColor="text-emerald-500"
            title="Lublin University of Technology"
            subtitle="Erasmus+ Exchange Program"
            location="Lublin, Poland"
            period="Oct 2023 - Feb 2024"
            description="Electrical Engineering studies focusing on international engineering standards and advanced automation systems. Gained adaptability in a multicultural technical environment."
          />

          {/* 4. BAŞARI (Yüksek Onur Belgesi) */}
          <ExperienceCard
            type="Achievement"
            icon={<Award size={24} />}
            iconColor="text-amber-500"
            title="Faculty High Honor Student"
            subtitle="Academic Excellence Award"
            location="Erzurum, Turkey"
            period="2021"
            description="Awarded for outstanding academic performance, demonstrating a strong foundation in engineering principles and analytical problem-solving skills early in the academic career."
          />

          {/* 5. EĞİTİM (Lisans - Türkiye) */}
          <ExperienceCard
            type="Education"
            icon={<GraduationCap size={24} />}
            iconColor="text-emerald-500"
            title="Erzurum Technical University"
            subtitle="B.Sc. Electrical & Electronics Engineering"
            location="Erzurum, Turkey"
            period="2021 - Present"
            description="Relevant Coursework: Control Systems, Digital Signal Processing, Embedded Systems, Circuit Analysis. Building a comprehensive background in robotics and communication technologies."
          />

        </motion.div>
      </Section>
<Section id="projects" title="Key Projects">
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Proje 1: Bitirme Projesi */}
          <ProjectCard
            title="Autonomous Multi-Level SLAM"
            tech={["ROS", "C++", "Python", "Lidar"]}
            description="Senior Design Project. Developed an autonomous mobile robot capable of real-time SLAM navigation and mapping across multiple floor levels, controlled via a custom web interface."
            brochurePath="./docs/proje_1.pdf"
          />

          {/* Proje 2: Staj Yarışma Projesi */}
          <ProjectCard
            title="Competitive Autonomous Robotics"
            tech={["ROS 2", "Gazebo", "Sensor Fusion"]}
            description="Award-winning internship project (Robot Craft). Engineered the navigation stack for a competitive robot, utilizing advanced sensor fusion to secure 1st place among international teams."
            brochurePath="./docs/proje_2.pdf"
          />

          {/* Proje 3: RF Derin Öğrenme */}
          <ProjectCard
            title="RF Signal Modulation Classifier"
            tech={["TensorFlow", "Python", "CNN"]}
            description="Designed a Convolutional Neural Network (CNN) model to classify complex radio signal modulations (BPSK, QPSK) with high accuracy using the RadioML dataset for signal processing."
            brochurePath="./docs/proje_3.pdf"
          />

          {/* Proje 4: Deprem Sistemi */}
          <ProjectCard
            title="ArsScientia: Seismic Warning System"
            tech={["IoT", "REST APIs", "React"]}
            description="IoT-based earthquake early warning system developed in a 48-hour hackathon. Engineered a responsive frontend interface for real-time seismic data visualization and alert management."
            brochurePath="./docs/proje_4.pdf"
          />

          {/* Proje 5: Erasmus/Liderlik */}
          <ProjectCard
            title="Global Leadership & Management"
            tech={["Project Mgmt", "Public Speaking", "Budgeting"]}
            description="Served as President of the Erasmus+ Club. Led cross-cultural teams, organized large-scale international events, and managed budgets to foster global vision and student mobility."
            brochurePath="./docs/proje_5.pdf"
          />

        </motion.div>
      </Section>

      <Section id="skills" title="Technical Skills">
        <motion.div variants={staggerContainer} className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {["ROS (Robot Operating System)", "SLAM", "C++", "Python", "MATLAB & Simulink", "LTSpice", "Linux", "STM32", "AutoCAD","LateX"].map((skill) => (
              <motion.span
                key={skill}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: 'rgb(59, 130, 246)' }}
                className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 text-sm font-medium transition-all cursor-default hover:bg-neutral-800 hover:text-white"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section id="contact" title="Get In Touch">
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-neutral-100 transition-all placeholder-neutral-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-neutral-100 transition-all placeholder-neutral-600"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-neutral-100 resize-none transition-all placeholder-neutral-600"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-semibold transition-all shadow-lg shadow-amber-600/20 active:scale-[0.98]"
              >
                Send Message
              </button>
            </div>
            <div className="mt-10 pt-8 border-t border-neutral-800">
              <p className="text-center text-neutral-500 mb-6 text-sm">Or reach out directly:</p>
              <a
                href="mailto:yusufkozann@outlook.com"
                className="flex items-center justify-center gap-3 text-neutral-300 hover:text-amber-400 transition-colors font-medium p-4 bg-neutral-950 rounded-lg border border-neutral-800 hover:border-amber-500/50 group"
              >
                <div className="p-2 bg-neutral-900 rounded-full group-hover:bg-amber-500/10 transition-colors">
                  <Mail size={20} className="text-amber-500" />
                </div>
                yusufkozann@outlook.com
              </a>
            </div>
          </div>
        </motion.div>
      </Section>

      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm mb-1">
                © 2026 Yusuf Kozan. All rights reserved.
              </p>
              <p className="text-neutral-600 text-xs">
                Built with React, Tailwind CSS & Framer Motion.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com/in/yusufkozan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition-colors p-2 hover:bg-neutral-900 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/yusufkozan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition-colors p-2 hover:bg-neutral-900 rounded-full"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Section = ({ id, title, children }) => {
  const [ref, controls] = useScrollAnimation();

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="py-24 px-4 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 tracking-tight mb-4 inline-block relative">
            {title}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-600 rounded-full"></div>
          </h2>
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
};

const ExperienceCard = ({ icon, iconColor, title, subtitle, location, period, description, type }) => {
  // Etiket renklerini ayarlayalım
  const typeColors = {
    "Internship": "bg-blue-900/30 text-blue-400 border-blue-800",
    "Achievement": "bg-amber-900/30 text-amber-500 border-amber-800",
    "Education": "bg-emerald-900/30 text-emerald-400 border-emerald-800"
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.01 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {React.cloneElement(icon, { size: 100 })}
      </div>
      
      <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
        <div className={`p-4 bg-neutral-950 rounded-xl border border-neutral-800 ${iconColor} shadow-inner`}>
          {icon}
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-neutral-100">{title}</h3>
              <p className="text-amber-500 font-medium mb-1">{subtitle}</p>
            </div>
            {/* TÜR ETİKETİ (Burada ne olduğu yazacak) */}
            <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono border ${typeColors[type] || "bg-neutral-800 border-neutral-700"}`}>
              {type}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4 font-mono">
            <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
            <span className="border-l border-neutral-700 pl-4">{period}</span>
          </div>
          
          <p className="text-neutral-300 leading-relaxed text-sm sm:text-base border-t border-neutral-800 pt-4 font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ title, tech, description, brochurePath }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 transition-all hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-900/10 flex flex-col h-full group"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-100 mb-3 group-hover:text-amber-400 transition-colors">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span 
              key={t} 
              className="px-3 py-1 bg-neutral-950 text-neutral-300 text-xs font-medium rounded-md border border-neutral-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="text-neutral-400 mb-8 leading-relaxed flex-grow text-sm">
        {description}
      </p>
      <a
        href={brochurePath}
        download
        className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-lg hover:border-amber-500 hover:text-amber-400 transition-all font-medium text-sm group/btn"
      >
        <FileText size={18} className="group-hover/btn:scale-110 transition-transform" />
        Technical Brochure
      </a>
    </motion.div>
  );
};

export default App;