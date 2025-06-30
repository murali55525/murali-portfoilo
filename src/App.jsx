import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'stats', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full backdrop-blur-xl bg-slate-900/30 border-b border-slate-700/30 text-white p-4 z-50 transition-all duration-500 ${scrolled ? 'shadow-xl shadow-slate-900/20 bg-slate-900/50' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="relative group">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Murali's Portfolio
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
        </div>
        
        <button 
          className="md:hidden focus:outline-none relative z-10 group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative">
            <div className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 mb-1 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 mb-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>
        
        <ul className={`absolute md:relative top-full left-0 right-0 md:top-auto backdrop-blur-xl bg-slate-900/30 md:bg-transparent md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 p-4 md:p-0 ${isMenuOpen ? 'flex' : 'hidden md:flex'} transition-all duration-500 border-b border-slate-700/30 md:border-none`}>
          {['Home', 'About', 'Projects', 'Stats', 'Contact'].map((item) => (
            <li key={item} className="relative group">
              <a
                href={`#${item.toLowerCase()}`}
                className={`block hover:text-transparent hover:bg-gradient-to-r hover:from-blue-300 hover:to-indigo-300 hover:bg-clip-text transition-all duration-300 py-2 md:py-0 relative ${
                  activeSection === item.toLowerCase() ? 'text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text' : 'text-slate-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0'
                }`}></div>
              </a>
            </li>
          ))}
          <li className="relative group">
            <a
              href="/resume.pdf"
              download
              className="flex items-center relative overflow-hidden px-4 py-2 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 rounded-full hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H3a2 2 0 01-2-2V3a2 2 0 012-2h18a2 2 0 012 2v16a2 2 0 01-2 2z"/>
              </svg>
              Resume
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        hue: Math.random() * 60 + 200, // Blue to purple range
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        particle.hue += 0.2;
        particle.alpha = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.2;
        
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.fill();
        ctx.restore();
        
        // Connect nearby particles with softer lines
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = 0.05;
            const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y);
            gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`);
            gradient.addColorStop(1, `hsl(${otherParticle.hue}, 70%, 60%)`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200/30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
      <div className="absolute top-2 left-2 w-8 h-8 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin animation-delay-150"></div>
    </div>
  </div>
);

// Smooth Reveal Animation Hook
const useRevealOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const fullText = "Full-Stack Developer";
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Enhanced background with animated mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Animated geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div 
              className="opacity-20 transform rotate-45"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                background: `linear-gradient(45deg, hsl(${200 + Math.random() * 60}, 70%, 60%), hsl(${240 + Math.random() * 60}, 70%, 60%))`,
                borderRadius: Math.random() > 0.5 ? '50%' : '10%',
                filter: 'blur(1px)',
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Enhanced mouse follower with multiple layers */}
      <div
        className="fixed pointer-events-none z-10 transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 70%)',
        }}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.02) 0%, transparent 60%)',
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
          }}
        ></div>
      </div>
      
      <div className="text-center relative z-20 px-4 max-w-6xl mx-auto">
        {/* Floating profile avatar placeholder */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent filter drop-shadow-lg">
              Welcome
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl rounded-lg"></div>
          </h1>
          
          <div className="relative mb-6">
            <h2 className="text-3xl md:text-5xl font-light text-slate-200">
              I'm <span className="font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Murali</span>
            </h2>
            <div className="text-xl md:text-2xl text-blue-300 mt-2 font-mono">
              {typedText}<span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
        
        <div className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
          A passionate{' '}
          <span className="text-blue-300 font-medium relative inline-block">
            full-stack developer
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 transform scale-x-0 animate-scale-x"></div>
          </span>
          {' '}crafting innovative digital experiences with modern technologies
        </div>
        
        {/* Enhanced CTA buttons with more effects */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 rounded-full text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <span className="mr-2">🚀</span>
              View My Work
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          
          <button className="group relative px-8 py-4 border-2 border-blue-300/60 rounded-full text-blue-300 font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-300/10 hover:border-blue-300 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <span className="mr-2">💬</span>
              Get In Touch
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </span>
          </button>
        </div>

        {/* Quick stats preview */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
          {[
            { number: '50+', label: 'Projects' },
            { number: '2+', label: 'Years' },
            { number: '∞', label: 'Ideas' },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400/50 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full mt-2 animate-scroll-dot"></div>
            </div>
            <span className="text-xs text-slate-400">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, isVisible] = useRevealOnScroll();
  
  const skills = [
    { 
      name: 'Frontend', 
      icon: '⚛️', 
      techs: ['React', 'Next.js', 'TypeScript', 'Tailwind'], 
      color: 'from-blue-400 to-cyan-400',
      description: 'Creating beautiful, responsive user interfaces'
    },
    { 
      name: 'Backend', 
      icon: '🔧', 
      techs: ['Node.js', 'Python', 'Express', 'FastAPI'], 
      color: 'from-emerald-400 to-teal-400',
      description: 'Building robust server-side applications'
    },
    { 
      name: 'Database', 
      icon: '🗄️', 
      techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], 
      color: 'from-purple-400 to-violet-400',
      description: 'Designing efficient data storage solutions'
    },
    { 
      name: 'Tools', 
      icon: '🛠️', 
      techs: ['Docker', 'AWS', 'Git', 'Kubernetes'], 
      color: 'from-orange-400 to-amber-400',
      description: 'Leveraging modern development tools'
    },
  ];
  
  return (
    <section ref={ref} id="about" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-spin-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
            }}
          >
            <div 
              className="opacity-30 rounded-full"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                background: `linear-gradient(45deg, hsl(${200 + Math.random() * 60}, 60%, 50%), transparent)`,
                filter: 'blur(2px)',
              }}
            ></div>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Enhanced bio section */}
          <div className={`backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-12 mb-12 border border-white/10 relative group hover:bg-white/8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">💡</div>
            <div className="relative">
              <div className="text-xl md:text-2xl text-slate-200 leading-relaxed text-center font-light">
                I'm a passionate{' '}
                <span className="font-medium text-blue-300 relative">
                  Computer Science student
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </span>
                {' '}with a love for creating innovative digital solutions. My journey in tech spans across full-stack development, competitive programming, and open-source contributions. I believe in crafting experiences that not only look beautiful but also solve real-world problems.
              </div>
              
              {/* Experience timeline */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-8 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>2022 - Started Coding</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span>2023 - First Project</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span>2024 - Full Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color.replace('400', '500/20')} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
                
                {/* Skill percentage indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-300">
                    {85 + index * 3}%
                  </div>
                </div>
                
                <div className="relative text-center">
                  <div className="text-5xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ animationDelay: `${index * 100}ms` }}>
                    {skill.icon}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                    {skill.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.description}
                  </p>
                  
                  <div className="space-y-2">
                    {skill.techs.map((tech, techIndex) => (
                      <div
                        key={tech}
                        className="backdrop-blur-sm bg-white/5 rounded-full px-3 py-1 text-sm text-slate-300 border border-white/10 transform transition-all duration-300 hover:scale-110 hover:bg-white/10 relative overflow-hidden group/tech"
                        style={{ animationDelay: `${(index * 100) + (techIndex * 50)}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/tech:translate-x-[100%] transition-transform duration-500"></div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Skill level indicator */}
                <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 delay-300`}
                    style={{ width: isVisible ? `${85 + index * 3}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, isVisible] = useRevealOnScroll();
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const projects = [
    {
      name: 'E-Commerce Platform',
      desc: 'A full-stack e-commerce solution with React frontend and Node.js backend, featuring payment integration, real-time inventory management, and advanced analytics dashboard.',
      link: '#',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      emoji: '🛒',
      gradient: 'from-blue-500/70 via-indigo-500/70 to-purple-500/70',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop'
    },
    {
      name: 'AI Task Automation',
      desc: 'Python-based automation tool that streamlines repetitive tasks using machine learning algorithms, natural language processing, and custom workflow management.',
      link: '#',
      tags: ['Python', 'TensorFlow', 'NLP', 'Docker'],
      emoji: '🤖',
      gradient: 'from-emerald-500/70 via-teal-500/70 to-green-500/70',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop'
    },
    {
      name: 'Social Media Platform',
      desc: 'Modern social platform with real-time messaging, photo sharing, advanced privacy controls, and AI-powered content moderation built with MERN stack.',
      link: '#',
      tags: ['MERN', 'Socket.io', 'AWS', 'Redis'],
      emoji: '📱',
      gradient: 'from-pink-500/70 via-rose-500/70 to-red-500/70',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop'
    },
    {
      name: 'Blockchain Wallet',
      desc: 'Secure cryptocurrency wallet with multi-chain support, DeFi integration, NFT management, and advanced security features including biometric authentication.',
      link: '#',
      tags: ['Web3', 'Solidity', 'React', 'Metamask'],
      emoji: '₿',
      gradient: 'from-amber-500/70 via-orange-500/70 to-yellow-500/70',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop'
    },
    {
      name: 'IoT Dashboard',
      desc: 'Real-time IoT monitoring dashboard with sensor data visualization, predictive analytics, alerts system, and mobile app for remote monitoring.',
      link: '#',
      tags: ['IoT', 'React', 'Python', 'MQTT'],
      emoji: '🌐',
      gradient: 'from-cyan-500/70 via-blue-500/70 to-indigo-500/70',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=500&h=300&fit=crop'
    },
    {
      name: 'VR Experience',
      desc: 'Immersive virtual reality application for education and training with 3D interactions, spatial audio, haptic feedback, and cross-platform compatibility.',
      link: '#',
      tags: ['Unity', 'C#', 'WebXR', 'Three.js'],
      emoji: '🥽',
      gradient: 'from-violet-500/70 via-purple-500/70 to-fuchsia-500/70',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=300&fit=crop'
    }
  ];
  
  return (
    <section ref={ref} id="projects" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto">
            Exploring the intersection of creativity and technology through innovative solutions
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Softer gradient overlay */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-700`}></div>
              
              {/* Project image with parallax effect */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40`}></div>
                
                <div className="absolute top-4 right-4 text-4xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {project.emoji}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-300 flex items-center">
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="relative p-6">
                <h3 className="text-2xl font-bold mb-3 text-slate-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-500">
                  {project.name}
                </h3>
                
                <p className="text-slate-300 mb-6 leading-relaxed text-sm group-hover:text-slate-200 transition-colors duration-300">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="backdrop-blur-sm bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
                      style={{ animationDelay: `${(index * 100) + (tagIndex * 50)}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className={`w-full bg-gradient-to-r ${project.gradient} text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group`}>
                  <span className="relative z-10 flex items-center justify-center">
                    Explore Project
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const [ref, isVisible] = useRevealOnScroll();
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeError, setLeetcodeError] = useState(false);
  const [githubError, setGithubError] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    // Simulate API calls with mock data for demo
    setTimeout(() => {
      setLeetcodeStats({
        totalSolved: 150,
        easySolved: 75,
        mediumSolved: 60,
        hardSolved: 15
      });
    }, 1000);

    setTimeout(() => {
      setGithubStats({
        public_repos: 25,
        followers: 120,
        following: 80
      });
    }, 1500);
  }, []);

  useEffect(() => {
    if (leetcodeStats || githubStats) {
      const stats = { ...leetcodeStats, ...githubStats };
      Object.keys(stats).forEach(key => {
        let current = 0;
        const target = stats[key];
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      });
    }
  }, [leetcodeStats, githubStats]);

  const achievements = [
    { title: "Code Ninja", desc: "Solved 100+ LeetCode problems", icon: "🥷", color: "from-red-400 to-orange-400", count: "150+" },
    { title: "Open Source Contributor", desc: "Contributed to 10+ repositories", icon: "🌟", color: "from-yellow-400 to-amber-400", count: "25+" },
    { title: "Full Stack Master", desc: "Built 20+ complete applications", icon: "🏆", color: "from-purple-400 to-pink-400", count: "30+" },
    { title: "Innovation Award", desc: "Won college hackathon 2024", icon: "🎯", color: "from-green-400 to-emerald-400", count: "3x" }
  ];

  return (
    <section ref={ref} id="stats" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(147, 51, 234, 0.4) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'drift 25s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            My Stats
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-300 mt-6">Numbers that define my coding journey</p>
        </div>

        {/* Enhanced main stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Enhanced LeetCode Stats */}
          <div className={`group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-700 transform hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-60 transition duration-700"></div>
            <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">💻</div>
            
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="text-5xl mr-4 animate-bounce">💻</div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    LeetCode Journey
                  </h3>
                  <p className="text-sm text-slate-400">Competitive Programming Stats</p>
                </div>
              </div>
              
              {leetcodeStats ? (
                <div className="space-y-6">
                  {/* Enhanced circular progress */}
                  <div className="text-center mb-8">
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      {/* Background circle */}
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                        {/* Animated progress circle */}
                        <circle 
                          cx="50" cy="50" r="45" fill="none" 
                          stroke="url(#leetcodeGradientEnhanced)" strokeWidth="6"
                          strokeDasharray={`${(animatedStats.totalSolved || 0) * 1.8} 283`}
                          strokeLinecap="round"
                          className="transition-all duration-2000 ease-out"
                          style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))' }}
                        />
                        <defs>
                          <linearGradient id="leetcodeGradientEnhanced" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981"/>
                            <stop offset="50%" stopColor="#06b6d4"/>
                            <stop offset="100%" stopColor="#3b82f6"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Center content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{animatedStats.totalSolved || 0}</span>
                        <span className="text-xs text-slate-400">Problems</span>
                      </div>
                    </div>
                    <p className="text-emerald-400 font-semibold">Total Problems Solved</p>
                  </div>
                  
                  {/* Enhanced difficulty breakdown */}
                  <div className="space-y-4">
                    {[
                      { label: 'Easy', value: animatedStats.easySolved || 0, color: 'from-green-400 to-emerald-400', max: 100, emoji: '😊' },
                      { label: 'Medium', value: animatedStats.mediumSolved || 0, color: 'from-yellow-400 to-orange-400', max: 100, emoji: '🤔' },
                      { label: 'Hard', value: animatedStats.hardSolved || 0, color: 'from-red-400 to-pink-400', max: 50, emoji: '😤' }
                    ].map((item, index) => (
                      <div key={item.label} className="backdrop-blur-sm bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group/item">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{item.emoji}</span>
                            <span className="text-white/90 font-medium">{item.label}</span>
                          </div>
                          <span className="text-white font-bold text-lg">{item.value}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-1500 ease-out relative`}
                            style={{ width: isVisible ? `${(item.value / item.max) * 100}%` : '0%' }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner />
                  <span className="ml-4 text-slate-300 mt-4">Loading LeetCode stats...</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced GitHub Stats - similar structure */}
          <div className={`group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-700 transform hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-60 transition duration-700"></div>
            <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">🐙</div>
            
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="text-5xl mr-4 animate-pulse">🐙</div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GitHub Activity
                  </h3>
                  <p className="text-sm text-slate-400">Open Source Contributions</p>
                </div>
              </div>
              
              {githubStats ? (
                <div className="space-y-6">
                  {[
                    { label: 'Public Repositories', value: animatedStats.public_repos || 0, icon: '📁', color: 'text-purple-400' },
                    { label: 'Followers', value: animatedStats.followers || 0, icon: '👥', color: 'text-pink-400' },
                    { label: 'Following', value: animatedStats.following || 0, icon: '➡️', color: 'text-cyan-400' }
                  ].map((stat, index) => (
                    <div key={stat.label} className="backdrop-blur-sm bg-white/5 rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{stat.icon}</span>
                          <span className="text-white/90 font-medium">{stat.label}</span>
                        </div>
                        <span className={`text-3xl font-bold ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <a
                    href="https://github.com/murali55525"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Visit GitHub Profile
                      <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner />
                  <span className="ml-4 text-slate-300 mt-4">Loading GitHub stats...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced achievements section */}
        <div className="max-w-6xl mx-auto">
          <h3 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Achievements & Milestones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.color} rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500`}></div>
                
                {/* Achievement count */}
                <div className="absolute top-3 right-3 bg-white/10 rounded-full px-2 py-1 text-xs font-bold text-white">
                  {achievement.count}
                </div>
                
                <div className="relative text-center">
                  <div className="text-5xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {achievement.icon}
                  </div>
                  
                  <h4 className={`text-lg font-bold mb-2 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                    {achievement.title}
                  </h4>
                  
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                    {achievement.desc}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 w-full bg-white/10 rounded-full h-1">
                    <div 
                      className={`h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-1000`}
                      style={{ width: isVisible ? '100%' : '0%', transitionDelay: `${index * 200}ms` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      
      {/* Floating contact icons */}
      <div className="absolute inset-0">
        {['📧', '📱', '💬', '🌐'].map((emoji, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${20 + (i * 15)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            <div className="text-6xl">{emoji}</div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-xl text-white/70 mt-6 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h4 className="text-xl font-bold text-green-400 mb-2">Message Sent!</h4>
                    <p className="text-white/70">Thanks for reaching out. I'll get back to you soon!</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                    
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="6"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/10 transition-all duration-300 focus:outline-none resize-none"
                      ></textarea>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 relative group hover:bg-white/15 transition-all duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  {[
                    { icon: '📧', label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
                    { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                    { icon: '📍', label: 'Location', value: 'Your City, Country', href: '#' },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group/item"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="text-white/70 text-sm">{item.label}</p>
                        <p className="text-white font-medium group-hover/item:text-cyan-400 transition-colors duration-300">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 relative group hover:bg-white/15 transition-all duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Follow Me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'GitHub', icon: '🐙', href: 'https://github.com/murali55525', color: 'hover:text-purple-400' },
                    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/yourusername', color: 'hover:text-blue-400' },
                    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/yourusername', color: 'hover:text-cyan-400' },
                    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/yourusername', color: 'hover:text-pink-400' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${social.color} group/social`}
                    >
                      <div className="text-2xl">{social.icon}</div>
                      <span className="font-medium">{social.name}</span>
                      <svg className="w-4 h-4 ml-auto transition-transform duration-300 group-hover/social:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-black/50 backdrop-blur-xl border-t border-white/10 py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Murali's Portfolio
            </h3>
            <p className="text-white/60">Building the future, one line of code at a time</p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Home', 'About', 'Projects', 'Stats', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white hover:scale-105 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { 
                name: 'GitHub', 
                href: 'https://github.com/murali55525', 
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                ),
                color: 'hover:text-purple-400'
              },
              { 
                name: 'LinkedIn', 
                href: 'https://linkedin.com/in/yourusername', 
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-0.966 0-1.75-0.79-1.75-1.764s0.784-1.764 1.75-1.764 1.75 0.79 1.75 1.764-0.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
                  </svg>
                ),
                color: 'hover:text-blue-400'
              },
              { 
                name: 'Twitter', 
                href: 'https://twitter.com/yourusername', 
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                ),
                color: 'hover:text-cyan-400'
              },
              { 
                name: 'Email', 
                href: 'mailto:your.email@example.com', 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                color: 'hover:text-pink-400'
              }
            ].map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/60 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 relative group`}
                aria-label={social.name}
              >
                {social.icon}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm">
              © {currentYear} Murali's Portfolio. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Made with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;