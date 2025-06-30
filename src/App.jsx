"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrolled(scrollTop > 20)
      setScrollProgress(progress)

      // Update active section based on scroll position
      const sections = ["home", "about", "education", "projects", "stats", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-900/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 w-full backdrop-blur-2xl bg-slate-900/10 border-b border-white/5 text-white p-4 z-40 transition-all duration-700 ${
          scrolled 
            ? "shadow-2xl shadow-slate-900/10 bg-slate-900/20 backdrop-blur-3xl border-white/10" 
            : ""
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(20px) saturate(150%)',
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative group">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Muralikarthick's Portfolio
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </div>

          <button 
            className="md:hidden focus:outline-none relative z-10 group p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              <div
                className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 mb-1 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 mb-1 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </div>
          </button>

          <ul
            className={`absolute md:relative top-full left-0 right-0 md:top-auto backdrop-blur-3xl bg-slate-900/20 md:bg-transparent md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-6 md:p-0 ${
              isMenuOpen ? "flex" : "hidden md:flex"
            } transition-all duration-700 border-b border-white/10 md:border-none rounded-b-2xl md:rounded-none`}
            style={{
              backdropFilter: 'blur(40px) saturate(180%)',
            }}
          >
            {["Home", "About", "Education", "Projects", "Stats", "Contact"].map((item) => (
              <li key={item} className="relative group">
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`block hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-300 hover:to-cyan-300 hover:bg-clip-text transition-all duration-500 py-3 md:py-2 px-4 md:px-0 relative rounded-xl md:rounded-none ${
                    activeSection === item.toLowerCase()
                      ? "text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text"
                      : "text-slate-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 ${
                      activeSection === item.toLowerCase() ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></div>
                  {/* Hover background for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden"></div>
                </a>
              </li>
            ))}
            <li className="relative group">
              <a
                href="/resume.pdf"
                download
                className="flex items-center relative overflow-hidden px-6 py-3 bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 rounded-2xl hover:from-emerald-400 hover:to-cyan-400 transition-all duration-500 transform hover:scale-105 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/40"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H3a2 2 0 01-2-2V3a2 2 0 012-2h18a2 2 0 012 2v16a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

const FloatingParticles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles = []
    const particleCount = Math.min(120, Math.floor(window.innerWidth / 10))

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        hue: Math.random() * 60 + 160,
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.pulse += 0.02

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        particle.hue += 0.3
        particle.alpha = 0.4 + Math.sin(particle.pulse) * 0.3

        // Enhanced particle rendering with glow
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
        gradient.addColorStop(0.5, `hsl(${particle.hue}, 70%, 40%)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()

        // Enhanced connection lines with gradient
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = (150 - distance) / 150 * 0.1
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            )
            lineGradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
            lineGradient.addColorStop(1, `hsl(${otherParticle.hue}, 70%, 60%)`)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />
}

// Enhanced Loading Component with matte finish
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-emerald-200/20 rounded-full backdrop-blur-xl"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin"></div>
      <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-delay-150"></div>
      <div className="absolute top-4 left-4 w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-300"></div>
    </div>
  </div>
)

// Enhanced Reveal Animation Hook with intersection observer
const useRevealOnScroll = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

// Enhanced Glass Card Component
const GlassCard = ({ children, className = "", hover = true, ...props }) => (
  <div
    className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl transition-all duration-700 ${
      hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-500/5' : ''
    } ${className}`}
    style={{
      backdropFilter: 'blur(40px) saturate(180%)',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    }}
    {...props}
  >
    {children}
  </div>
)

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const fullText = "Full-Stack Developer & IT Student"

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced typewriter effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Enhanced animated geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <div
              className="backdrop-blur-sm border border-white/10 transform rotate-45"
              style={{
                width: `${15 + Math.random() * 30}px`,
                height: `${15 + Math.random() * 30}px`,
                background: `linear-gradient(45deg, hsl(${160 + Math.random() * 60}, 70%, 60%, 0.1), hsl(${180 + Math.random() * 60}, 70%, 60%, 0.05))`,
                borderRadius: Math.random() > 0.5 ? "50%" : "20%",
                filter: "blur(0.5px)",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Enhanced mouse follower with multiple layers */}
      <div
        className="fixed pointer-events-none z-10 transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: "600px",
          height: "600px",
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)",
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
          }}
        ></div>
        <div
          className="absolute inset-20 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(52, 211, 153, 0.04) 0%, transparent 60%)",
            transform: `scale(${1 + Math.sin(Date.now() * 0.002) * 0.15})`,
          }}
        ></div>
      </div>

      <div className="text-center relative z-20 px-4 max-w-7xl mx-auto">
        {/* Enhanced profile section with glass morphism */}
        <div className="mb-12 relative">
          <div className="w-44 h-44 mx-auto mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 backdrop-blur-2xl bg-slate-800/80 rounded-full flex items-center justify-center border border-white/20">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/* Floating elements around avatar */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-60 animate-ping"
                style={{
                  top: `${20 + Math.sin((i * Math.PI) / 3) * 60}%`,
                  left: `${50 + Math.cos((i * Math.PI) / 3) * 60}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s',
                }}
              ></div>
            ))}
          </div>

          <div className="relative mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent filter drop-shadow-2xl">
                Welcome
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-3xl rounded-2xl"></div>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-slate-200 mb-4">
              I'm{" "}
              <span className="font-bold bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Muralikarthick M
              </span>
            </h2>
            
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-emerald-300 mt-4 font-mono min-h-[2em] flex items-center justify-center">
              <span>{typedText}</span>
              <span className={`ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}>|</span>
            </div>
          </div>
        </div>

        {/* Enhanced description with glass card */}
        <GlassCard className="p-8 mb-12 max-w-5xl mx-auto">
          <div className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            A passionate{" "}
            <span className="text-emerald-300 font-medium relative inline-block">
              B.Tech IT student
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 animate-scale-x"></div>
            </span>{" "}
            at Kongu Engineering College, crafting innovative digital experiences with modern technologies and winning hackathons. 
            Currently maintaining a <span className="text-cyan-300 font-semibold">8.21 CGPA</span> while building the future, one line of code at a time.
          </div>
        </GlassCard>

        {/* Enhanced CTA buttons with better responsiveness */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 rounded-2xl text-white font-medium text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 overflow-hidden backdrop-blur-xl border border-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center">
              <span className="mr-3 text-xl">🚀</span>
              <span className="hidden sm:inline">View My Work</span>
              <span className="sm:hidden">Projects</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 border-2 border-emerald-300/60 rounded-2xl text-emerald-300 font-medium text-lg transition-all duration-500 transform hover:scale-105 hover:bg-emerald-300/10 hover:border-emerald-300 backdrop-blur-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center">
              <span className="mr-3 text-xl">💬</span>
              <span className="hidden sm:inline">Get In Touch</span>
              <span className="sm:hidden">Contact</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        {/* Enhanced quick stats with glass morphism */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mb-16">
          {[
            { number: "2+", label: "Projects", icon: "🚀" },
            { number: "8.21", label: "CGPA", icon: "🎓" },
            { number: "2x", label: "Winner", icon: "🏆" },
          ].map((stat, index) => (
            <GlassCard key={index} className="text-center group p-4 sm:p-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <GlassCard className="w-8 h-12 flex justify-center relative overflow-hidden p-0 border-2">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full mt-2 animate-scroll-dot"></div>
            </GlassCard>
            <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  const [ref, isVisible] = useRevealOnScroll()

  const skills = [
    {
      name: "Frontend",
      icon: "⚛️",
      techs: ["HTML", "CSS", "JavaScript", "ReactJS"],
      color: "from-emerald-400 to-cyan-400",
      description: "Creating beautiful, responsive user interfaces",
      level: 85,
    },
    {
      name: "Backend",
      icon: "🔧",
      techs: ["NodeJS", "ExpressJS", "Java", "C++"],
      color: "from-cyan-400 to-blue-400",
      description: "Building robust server-side applications",
      level: 80,
    },
    {
      name: "Database",
      icon: "🗄️",
      techs: ["MongoDB", "MySQL", "Database Design"],
      color: "from-blue-400 to-indigo-400",
      description: "Designing efficient data storage solutions",
      level: 75,
    },
    {
      name: "Mobile",
      icon: "📱",
      techs: ["Flutter", "Cross-platform", "UI/UX"],
      color: "from-indigo-400 to-purple-400",
      description: "Developing cross-platform mobile applications",
      level: 70,
    },
  ]

  return (
    <section ref={ref} id="about" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Enhanced floating elements with glass effect */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
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
              className="opacity-20 rounded-full backdrop-blur-sm border border-white/5"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                background: `linear-gradient(45deg, hsl(${160 + Math.random() * 60}, 60%, 50%, 0.1), transparent)`,
                filter: "blur(1px)",
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Enhanced bio section with better glass morphism */}
          <GlassCard
            className={`p-6 sm:p-8 md:p-12 mb-12 relative group transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="absolute top-4 right-4 text-4xl sm:text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              🎯
            </div>

            <div className="relative">
              <div className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed text-center font-light mb-8">
                I'm a passionate{" "}
                <span className="font-medium text-emerald-300 relative">
                  B.Tech Information Technology student
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                </span>{" "}
                at Kongu Engineering College with a CGPA of 8.21. My journey in tech spans across full-stack
                development, mobile app development, and competitive programming. I believe in crafting experiences that
                not only look beautiful but also solve real-world problems.
              </div>

              {/* Enhanced sections with responsive grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Career Objective */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-3 flex items-center">
                    <span className="mr-2 text-xl">🎯</span>
                    Career Objective
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    To launch my career in a progressive organization where I can leverage my skills, experience, and
                    creativity for mutual growth and success.
                  </p>
                </GlassCard>

                {/* Hobbies */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                    <span className="mr-2 text-xl">🎮</span>
                    Hobbies & Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Playing Cricket", "Listening Music", "Coding", "Problem Solving"].map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs sm:text-sm border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>

          {/* Enhanced skills grid with better responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <GlassCard
                key={skill.name}
                className={`p-4 sm:p-6 relative group transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color.replace(
                    "400",
                    "500/10"
                  )} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
                ></div>

                {/* Skill percentage indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-300 backdrop-blur-xl border border-white/20">
                    {skill.level}%
                  </div>
                </div>

                <div className="relative text-center">
                  <div className="text-4xl sm:text-5xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {skill.icon}
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  >
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.description}
                  </p>

                  <div className="space-y-2">
                    {skill.techs.map((tech, techIndex) => (
                      <div
                        key={tech}
                        className="backdrop-blur-xl bg-white/5 rounded-full px-3 py-1 text-xs sm:text-sm text-slate-300 border border-white/10 transform transition-all duration-300 hover:scale-110 hover:bg-white/10 relative overflow-hidden group/tech"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/tech:translate-x-[100%] transition-transform duration-500"></div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced skill level indicator */}
                <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-xl">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 delay-300 relative overflow-hidden`}
                    style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Education = () => {
  const [ref, isVisible] = useRevealOnScroll()

  const education = [
    {
      degree: "B.Tech Information Technology",
      institution: "Kongu Engineering College",
      period: "2022 - 2026",
      grade: "CGPA: 8.21",
      icon: "🎓",
      color: "from-emerald-400 to-cyan-400",
      description: "Specializing in Full-stack Development, Database Management, and Software Engineering",
      achievements: ["1st Prize in CSD Hackathon 2024", "1st Prize in IT Hackathon 2024", "Active in technical clubs"],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Kongu Matriculation Higher Secondary School",
      period: "2020 - 2022",
      grade: "Percentage: 92.7%",
      icon: "📚",
      color: "from-cyan-400 to-blue-400",
      description: "Focused on Mathematics, Physics, and Computer Science",
      achievements: ["Top performer in Computer Science", "Active in school tech events"],
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Kongu Matriculation Higher Secondary School",
      period: "2019 - 2020",
      grade: "Percentage: 99.4%",
      icon: "🏆",
      color: "from-blue-400 to-indigo-400",
      description: "Excellent academic performance across all subjects",
      achievements: ["School topper", "Outstanding academic achievement award"],
    },
  ]

  return (
    <section ref={ref} id="education" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/50 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg sm:text-xl text-slate-300 mt-6">My academic journey and achievements</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Enhanced Timeline */}
          <div className="relative">
            {/* Enhanced timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 rounded-full backdrop-blur-xl"></div>

            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {/* Enhanced timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-4 border-slate-900 z-10 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-1 bg-white/20 rounded-full animate-pulse"></div>
                </div>

                {/* Enhanced content card */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <GlassCard className="p-6 sm:p-8 group transform hover:scale-105 transition-all duration-500">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${edu.color.replace(
                        "400",
                        "500/10"
                      )} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
                    ></div>

                    <div className="relative">
                      {/* Icon and period */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl sm:text-4xl">{edu.icon}</div>
                        <span className="text-xs sm:text-sm text-slate-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xl border border-white/20">
                          {edu.period}
                        </span>
                      </div>

                      {/* Degree and institution */}
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}
                      >
                        {edu.degree}
                      </h3>
                      <h4 className="text-base sm:text-lg text-slate-300 mb-3">{edu.institution}</h4>

                      {/* Grade */}
                      <div className="mb-4">
                        <span className="inline-block bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30 backdrop-blur-xl">
                          {edu.grade}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 mb-4 leading-relaxed text-sm sm:text-base">{edu.description}</p>

                      {/* Achievements */}
                      <div>
                        <h5 className="text-sm font-semibold text-slate-300 mb-2">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-xs sm:text-sm text-slate-400 flex items-center">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Projects = () => {
  const [ref, isVisible] = useRevealOnScroll()
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      name: "Kec-Study-Hub",
      desc: "A comprehensive platform for sharing study materials and academic discussion among students. Features include real-time collaboration, query resolution system, and organized resource sharing with user authentication and role-based access.",
      link: "#",
      github: "https://github.com/murali55525",
      tags: ["Flutter", "JavaScript", "NodeJS", "MongoDB"],
      emoji: "📚",
      gradient: "from-emerald-500/70 via-cyan-500/70 to-blue-500/70",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
      status: "Completed",
      features: ["Real-time collaboration", "Query resolution", "Resource sharing", "User authentication"],
    },
    {
      name: "IT-VR Department Tour",
      desc: "Immersive virtual reality department tour with 360° navigation, interactive hotspots, and detailed information panels. Built using 3DVista VR technology to provide an engaging virtual experience of the IT department.",
      link: "https://kongu.edu/itpark360/",
      github: "https://github.com/murali55525",
      tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "3DVista VR"],
      emoji: "🥽",
      gradient: "from-purple-500/70 via-pink-500/70 to-red-500/70",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=300&fit=crop",
      status: "Live",
      features: ["360° navigation", "Interactive hotspots", "Virtual tour", "Responsive design"],
    },
  ]

  return (
    <section ref={ref} id="projects" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg sm:text-xl text-slate-300 mt-6 max-w-2xl mx-auto">
            Showcasing my journey through innovative solutions and technical excellence
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {projects.map((project, index) => (
            <GlassCard
              key={index}
              className={`overflow-hidden group transform hover:scale-105 hover:-translate-y-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 200}ms`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Enhanced gradient overlay */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition duration-700`}
              ></div>

              {/* Project image with enhanced parallax effect */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40`}></div>

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xl border ${
                      project.status === "Live"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 text-3xl sm:text-4xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {project.emoji}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-xl text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors duration-300 flex items-center border border-white/20"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Demo</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-xl text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors duration-300 flex items-center border border-white/20"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                        />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-emerald-300 group-hover:bg-clip-text transition-all duration-500">
                  {project.name}
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300">
                  {project.desc}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="backdrop-blur-xl bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Enhanced Internship Section */}
        <div
          className={`mt-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Professional Experience
          </h3>

          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-6 sm:p-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="text-3xl sm:text-4xl mr-4">💼</div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-emerald-300">Web Development Intern</h4>
                      <p className="text-base sm:text-lg text-slate-300">Codsoft (Remote)</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xl border border-white/20">
                    Aug 1-31, 2024
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-lg font-semibold text-slate-300 mb-3">Responsibilities:</h5>
                    <ul className="space-y-2">
                      {[
                        "Learnt and developed websites from front-end to back-end",
                        "Built and optimized interactive UI components",
                        "Enhanced user experience through modern design",
                        "Collaborated with team on various projects",
                      ].map((item, index) => (
                        <li key={index} className="text-slate-400 flex items-start text-sm sm:text-base">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-slate-300 mb-3">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "Full-stack Development"].map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-sm border border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const Stats = () => {
  const [ref, isVisible] = useRevealOnScroll()
  const [animatedStats, setAnimatedStats] = useState({})

  useEffect(() => {
    if (isVisible) {
      const stats = {
        projects: 2,
        cgpa: 8.21,
        hackathons: 2,
        technologies: 10,
      }

      Object.keys(stats).forEach((key) => {
        let current = 0
        const target = stats[key]
        const increment = target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setAnimatedStats((prev) => ({ ...prev, [key]: key === "cgpa" ? current.toFixed(2) : Math.floor(current) }))
        }, 30)
      })
    }
  }, [isVisible])

  const achievements = [
    {
      title: "Hackathon Champion",
      desc: "1st Prize in CSD & IT Hackathons 2024",
      icon: "🏆",
      color: "from-yellow-400 to-amber-400",
      count: "2x Winner",
    },
    {
      title: "Academic Excellence",
      desc: "Maintaining 8.21 CGPA in B.Tech IT",
      icon: "🎓",
      color: "from-emerald-400 to-cyan-400",
      count: "8.21 CGPA",
    },
    {
      title: "Full Stack Developer",
      desc: "Proficient in modern web technologies",
      icon: "💻",
      color: "from-blue-400 to-indigo-400",
      count: "10+ Tech",
    },
    {
      title: "Project Builder",
      desc: "Built innovative solutions",
      icon: "🚀",
      color: "from-purple-400 to-pink-400",
      count: "2+ Projects",
    },
  ]

  return (
    <section ref={ref} id="stats" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/50 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg sm:text-xl text-slate-300 mt-6">Numbers that define my academic and technical journey</p>
        </div>

        {/* Enhanced Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {[
            {
              label: "Projects Completed",
              value: animatedStats.projects || 0,
              icon: "🚀",
              color: "from-emerald-400 to-cyan-400",
            },
            { label: "Current CGPA", value: animatedStats.cgpa || 0, icon: "🎓", color: "from-cyan-400 to-blue-400" },
            {
              label: "Hackathons Won",
              value: animatedStats.hackathons || 0,
              icon: "🏆",
              color: "from-yellow-400 to-amber-400",
            },
            {
              label: "Technologies",
              value: animatedStats.technologies || 0,
              icon: "💻",
              color: "from-purple-400 to-pink-400",
            },
          ].map((stat, index) => (
            <GlassCard
              key={index}
              className={`p-4 sm:p-6 text-center group transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color.replace(
                  "400",
                  "500/10"
                )} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
              ></div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {stat.icon}
                </div>

                <div
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Enhanced achievements section */}
        <div className="max-w-7xl mx-auto">
          <h3
            className={`text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Achievements & Milestones
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard
                key={index}
                className={`p-4 sm:p-6 text-center group transform hover:scale-110 hover:-translate-y-4 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition duration-500`}
                ></div>

                {/* Achievement count */}
                <div className="absolute top-3 right-3 bg-white/10 rounded-full px-2 py-1 text-xs font-bold text-white backdrop-blur-xl border border-white/20">
                  {achievement.count}
                </div>

                <div className="relative">
                  <div className="text-4xl sm:text-5xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {achievement.icon}
                  </div>

                  <h4
                    className={`text-base sm:text-lg font-bold mb-2 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}
                  >
                    {achievement.title}
                  </h4>

                  <p className="text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors duration-300">
                    {achievement.desc}
                  </p>

                  {/* Progress indicator */}
                  <div className="mt-4 w-full bg-white/10 rounded-full h-1 backdrop-blur-xl">
                    <div
                      className={`h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                      style={{ width: isVisible ? "100%" : "0%", transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-cyan-900 to-blue-900"></div>

      {/* Enhanced floating contact icons */}
      <div className="absolute inset-0">
        {["📧", "📱", "💬", "🌐", "💼", "🎯"].map((emoji, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            <div className="text-4xl sm:text-6xl">{emoji}</div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full"></div>
          <p className="text-lg sm:text-xl text-white/70 mt-6 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects? Let's create something amazing together!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Enhanced Contact Form */}
          <div className="relative">
            <GlassCard className="p-6 sm:p-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Send Me a Message</h3>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎉</div>
                    <h4 className="text-lg sm:text-xl font-bold text-green-400 mb-2">Message Sent!</h4>
                    <p className="text-white/70 text-sm sm:text-base">Thanks for reaching out. I'll get back to you soon!</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm sm:text-base"
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
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/10 transition-all duration-300 focus:outline-none backdrop-blur-xl text-sm sm:text-base"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/10 transition-all duration-300 focus:outline-none backdrop-blur-xl text-sm sm:text-base"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="6"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-emerald-400 focus:bg-white/10 transition-all duration-300 focus:outline-none resize-none backdrop-blur-xl text-sm sm:text-base"
                      ></textarea>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border border-emerald-500/20 text-sm sm:text-base"
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
                            <svg
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              ></path>
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </form>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <GlassCard className="p-6 sm:p-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Get In Touch
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "m.muralikarthick123@gmail.com",
                      href: "mailto:m.muralikarthick123@gmail.com",
                    },
                    { icon: "📱", label: "Phone", value: "+91-7339044489", href: "tel:+917339044489" },
                    { icon: "📍", label: "Location", value: "Tamil Nadu, India", href: "#" },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group/item backdrop-blur-xl border border-white/10"
                    >
                      <div className="text-xl sm:text-2xl">{item.icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white/70 text-xs sm:text-sm">{item.label}</p>
                        <p className="text-white font-medium group-hover/item:text-cyan-400 transition-colors duration-300 text-sm sm:text-base truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Enhanced Social Links */}
            <GlassCard className="p-6 sm:p-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Follow Me
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      name: "GitHub",
                      icon: "🐙",
                      href: "https://github.com/murali55525",
                      color: "hover:text-purple-400",
                    },
                    {
                      name: "LinkedIn",
                      icon: "💼",
                      href: "https://linkedin.com/in/murali-karthick-8ab38a259/",
                      color: "hover:text-blue-400",
                    },
                    {
                      name: "Email",
                      icon: "📧",
                      href: "mailto:m.muralikarthick123@gmail.com",
                      color: "hover:text-emerald-400",
                    },
                    { name: "Phone", icon: "📱", href: "tel:+917339044489", color: "hover:text-cyan-400" },
                  ].map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${social.color} group/social backdrop-blur-xl border border-white/10`}
                    >
                      <div className="text-xl sm:text-2xl">{social.icon}</div>
                      <span className="font-medium text-sm sm:text-base">{social.name}</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-auto transition-transform duration-300 group-hover/social:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black/30 backdrop-blur-2xl border-t border-white/10 py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Muralikarthick's Portfolio
            </h3>
            <p className="text-white/60 text-sm sm:text-base">Building the future, one line of code at a time</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {["Home", "About", "Education", "Projects", "Stats", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8">
            {[
              {
                name: "GitHub",
                href: "https://github.com/murali55525",
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                ),
                color: "hover:text-purple-400",
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/murali-karthick-8ab38a259/",
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-0.966 0-1.75-0.79-1.75-1.764s0.784-1.764 1.75-1.764 1.75 0.79 1.75 1.764-0.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                  </svg>
                ),
                color: "hover:text-blue-400",
              },
              {
                name: "Email",
                href: "mailto:m.muralikarthick123@gmail.com",
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                color: "hover:text-emerald-400",
              },
            ].map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/60 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 relative group p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10`}
                aria-label={social.name}
              >
                {social.icon}
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-xl border border-white/20">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm">© {currentYear} Muralikarthick M. All rights reserved.</p>
            <p className="text-white/40 text-xs mt-2">Made with ❤️ using React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

const App = () => {
  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      <Navbar />
      <Home />
      <About />
      <Education />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
