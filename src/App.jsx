"use client"

import { useState, useEffect, useRef } from "react"

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
      {/* Modern Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200/20 to-slate-300/20 z-50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      <nav
        className={`fixed top-0 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 text-slate-800 dark:text-white p-4 z-40 transition-all duration-700 ${
          scrolled ? "shadow-xl shadow-slate-900/10 bg-white/90 dark:bg-slate-900/90" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative group">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Muralikarthick
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
          </div>

          <button
            className="md:hidden focus:outline-none relative z-10 group p-2 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-200/50 hover:from-violet-500/20 hover:to-pink-500/20 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative">
              <div
                className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 mb-1.5 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 mb-1.5 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </div>
          </button>

          <ul
            className={`fixed md:relative top-[73px] md:top-auto left-0 right-0 md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 p-6 md:p-0 ${
              isMenuOpen ? "flex animate-slideDown" : "hidden md:flex"
            } transition-all duration-500 border-b border-slate-200/50 dark:border-slate-700/50 md:border-none rounded-b-2xl md:rounded-none bg-white/95 dark:bg-slate-900/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none z-30`}
          >
            {["Home", "About", "Education", "Projects", "Stats", "Contact"].map((item) => (
              <li key={item} className="relative group">
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`block py-3 md:py-2 px-4 md:px-0 relative rounded-xl md:rounded-none transition-all duration-500 ${
                    activeSection === item.toLowerCase()
                      ? "text-transparent bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-pink-600 hover:bg-clip-text"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500 ${
                      activeSection === item.toLowerCase() ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></div>
                </a>
              </li>
            ))}

            <li className="relative group">
              <a
                href="https://drive.google.com/uc?export=download&id=1kDxWWWKYg-EZKJsyMjV5fWqS1YA9hiWP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center relative overflow-hidden px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-violet-500/25"
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
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

// Optimized Modern Particles
const ModernParticles = () => {
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
    // Optimized particle count
    const particleCount = window.innerWidth < 768 ? 12 : 20

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        hue: Math.random() * 60 + 260, // Purple to pink range
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

        particle.hue += 0.2
        particle.alpha = 0.4 + Math.sin(particle.pulse) * 0.2

        ctx.save()
        ctx.globalAlpha = particle.alpha

        // Modern gradient particles
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3,
        )
        gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
        gradient.addColorStop(0.5, `hsl(${particle.hue}, 60%, 50%)`)
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()

        // Subtle connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = ((150 - distance) / 150) * 0.15
            ctx.strokeStyle = `hsl(${(particle.hue + otherParticle.hue) / 2}, 60%, 50%)`
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />
}

// Modern Loading Component
const ModernLoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-6">
    <div className="relative">
      <div className="w-24 h-24 border-4 border-slate-200/30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
      <div
        className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      ></div>
      <div className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
        Loading Portfolio
      </h3>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  </div>
)

// Enhanced Reveal Animation Hook
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
      { threshold, rootMargin: "50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

// Modern Glass Card Component
const ModernCard = ({ children, className = "", hover = true, gradient = false, ...props }) => (
  <div
    className={`backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/50 rounded-2xl transition-all duration-500 relative overflow-hidden ${
      hover
        ? "hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-white/30 dark:hover:border-slate-700/70 hover:shadow-2xl hover:shadow-slate-900/10 hover:scale-[1.02] hover:-translate-y-1"
        : ""
    } ${gradient ? "bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80" : ""} ${className}`}
    {...props}
  >
    {/* Shimmer effect */}
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-1000"></div>
    </div>

    <div className="relative z-10">{children}</div>
  </div>
)

// Floating Action Button
const FloatingActionButton = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-110 z-40 group"
    aria-label={label}
  >
    <div className="flex items-center justify-center text-white text-xl">{icon}</div>
    <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {label}
    </span>
  </button>
)

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentRole, setCurrentRole] = useState(0)

  const roles = [
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Enthusiast",
    "Innovation Creator",
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced typewriter effect with role cycling
  useEffect(() => {
    let i = 0
    const currentText = roles[currentRole]
    
    const timer = setInterval(() => {
      if (i < currentText.length) {
        setTypedText(currentText.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          setCurrentRole((prev) => (prev + 1) % roles.length)
          setTypedText("")
          i = 0
        }, 2000)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [currentRole])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-200/40 via-transparent to-transparent dark:from-violet-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-200/40 via-transparent to-transparent dark:from-pink-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent dark:from-purple-900/20"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20 dark:opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div
              className="rounded-full bg-gradient-to-br from-violet-400/30 to-pink-400/30 backdrop-blur-sm"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Mouse follower effect - desktop only */}
      {window.innerWidth >= 768 && (
        <div
          className="fixed pointer-events-none z-10 transition-all duration-300 ease-out hidden md:block"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            width: "600px",
            height: "600px",
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(219, 39, 119, 0.05) 50%, transparent 70%)",
              transform: `scale(${1 + Math.sin(Date.now() * 0.002) * 0.1})`,
            }}
          ></div>
        </div>
      )}

      <div className="text-center relative z-20 px-4 max-w-6xl mx-auto w-full">
        {/* Profile section */}
        <div className="mb-12">
          <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 relative group">
            {/* Modern profile ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow p-1">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                <div className="text-6xl sm:text-7xl">👨‍💻</div>
              </div>
            </div>

            {/* Floating indicators */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full opacity-70 animate-ping"
                style={{
                  top: `${50 + Math.sin((i * Math.PI) / 4) * 45}%`,
                  left: `${50 + Math.cos((i * Math.PI) / 4) * 45}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "2s",
                }}
              ></div>
            ))}
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hello, I'm
              </span>
              <br />
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Muralikarthick
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl text-slate-600 dark:text-slate-400 font-light min-h-[3rem] flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                {typedText}
              </span>
              <span className={`ml-1 ${isTyping ? "animate-pulse" : "animate-ping"} text-violet-500`}>|</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <ModernCard className="p-8 mb-12 max-w-4xl mx-auto" gradient={true}>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            A passionate{" "}
            <span className="font-semibold text-violet-600 dark:text-violet-400">B.Tech IT student</span> at Kongu
            Engineering College, crafting innovative digital experiences with modern technologies. Currently maintaining
            a <span className="font-semibold text-pink-600 dark:text-pink-400">8.21 CGPA</span> while building the
            future, one line of code at a time.
          </p>
        </ModernCard>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl text-white font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-3">🚀</span>
              View My Work
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative px-8 py-4 border-2 border-violet-300 dark:border-violet-600 rounded-2xl text-violet-600 dark:text-violet-400 font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:shadow-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-3">💬</span>
              Get In Touch
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {[
            { number: "2+", label: "Projects", icon: "🚀", color: "from-violet-500 to-purple-500" },
            { number: "8.21", label: "CGPA", icon: "🎓", color: "from-purple-500 to-pink-500" },
            { number: "2x", label: "Winner", icon: "🏆", color: "from-pink-500 to-rose-500" },
          ].map((stat, index) => (
            <ModernCard key={index} className="text-center p-6 group hover:scale-105 transition-transform duration-500">
              <div className="text-3xl mb-3 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </ModernCard>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <div className="w-8 h-12 border-2 border-violet-300 dark:border-violet-600 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-4 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full mt-2 animate-scroll-dot"></div>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Scroll Down</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        icon="↑"
        label="Back to Top"
      />
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
      color: "from-violet-500 to-purple-500",
      description: "Creating beautiful, responsive user interfaces",
      level: 85,
    },
    {
      name: "Backend",
      icon: "🔧",
      techs: ["NodeJS", "ExpressJS", "Java", "C++"],
      color: "from-purple-500 to-pink-500",
      description: "Building robust server-side applications",
      level: 80,
    },
    {
      name: "Database",
      icon: "🗄️",
      techs: ["MongoDB", "MySQL", "Database Design"],
      color: "from-pink-500 to-rose-500",
      description: "Designing efficient data storage solutions",
      level: 75,
    },
    {
      name: "Mobile",
      icon: "📱",
      techs: ["Flutter", "Cross-platform", "UI/UX"],
      color: "from-rose-500 to-orange-500",
      description: "Developing cross-platform mobile applications",
      level: 70,
    },
  ]

  return (
    <section ref={ref} id="about" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-pink-50 dark:from-violet-900/20 dark:via-slate-900 dark:to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200/30 via-transparent to-transparent dark:from-violet-800/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Bio section */}
          <ModernCard
            className={`p-8 mb-12 relative group transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            gradient={true}
          >
            <div className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center mb-8">
              I'm a passionate{" "}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                B.Tech Information Technology student
              </span>{" "}
              at Kongu Engineering College with a CGPA of{" "}
              <span className="font-semibold text-pink-600 dark:text-pink-400">8.21</span>. My journey in tech spans
              across full-stack development, mobile app development, and competitive programming. I believe in crafting
              experiences that not only look beautiful but also solve real-world problems.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ModernCard className="p-6">
                <h3 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3 flex items-center">
                  <span className="mr-3 text-2xl">🎯</span>
                  Career Objective
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To launch my career in a progressive organization where I can leverage my skills, experience, and
                  creativity for mutual growth and success.
                </p>
              </ModernCard>

              <ModernCard className="p-6">
                <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-3 flex items-center">
                  <span className="mr-3 text-2xl">🎨</span>
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Playing Cricket", "Listening Music", "Coding", "Problem Solving"].map((hobby, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-violet-200 dark:border-violet-700 hover:scale-110 transition-all duration-300"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </ModernCard>
            </div>
          </ModernCard>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <ModernCard
                key={skill.name}
                className={`p-6 relative group transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {skill.icon}
                  </div>

                  <h3
                    className={`text-xl font-bold mb-2 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  >
                    {skill.name}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {skill.techs.map((tech, techIndex) => (
                      <div
                        key={tech}
                        className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-full px-3 py-1 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 transform transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 delay-300 relative overflow-hidden`}
                      style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{skill.level}%</div>
                </div>
              </ModernCard>
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
      color: "from-violet-500 to-purple-500",
      description: "Specializing in Full-stack Development, Database Management, and Software Engineering",
      achievements: ["1st Prize in CSD Hackathon 2024", "1st Prize in IT Hackathon 2024", "Active in technical clubs"],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Kongu Matriculation Higher Secondary School",
      period: "2020 - 2022",
      grade: "Percentage: 92.7%",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
      description: "Focused on Mathematics, Physics, and Computer Science",
      achievements: ["Top performer in Computer Science", "Active in school tech events"],
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Kongu Matriculation Higher Secondary School",
      period: "2019 - 2020",
      grade: "Percentage: 99.4%",
      icon: "🏆",
      color: "from-pink-500 to-rose-500",
      description: "Excellent academic performance across all subjects",
      achievements: ["School topper", "Outstanding academic achievement award"],
    },
  ]

  return (
    <section ref={ref} id="education" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-violet-50 dark:from-pink-900/20 dark:via-slate-900 dark:to-violet-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent dark:from-purple-800/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-6">My academic journey and achievements</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-400 via-purple-400 to-pink-400 rounded-full hidden sm:block"></div>

            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start md:items-center mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full border-4 border-white dark:border-slate-900 z-10 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full animate-ping opacity-75"></div>
                </div>

                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <ModernCard className="p-8 group transform hover:scale-[1.02] transition-all duration-500" gradient={true}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-4xl">{edu.icon}</div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-2 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}
                    >
                      {edu.degree}
                    </h3>
                    <h4 className="text-lg text-slate-600 dark:text-slate-400 mb-4">{edu.institution}</h4>

                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-semibold border border-violet-200 dark:border-violet-700">
                        {edu.grade}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{edu.description}</p>

                    <div>
                      <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        🏆 Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                            <span className="w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ModernCard>
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
      gradient: "from-violet-500/80 via-purple-500/80 to-pink-500/80",
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
      gradient: "from-pink-500/80 via-rose-500/80 to-orange-500/80",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=300&fit=crop",
      status: "Live",
      features: ["360° navigation", "Interactive hotspots", "Virtual tour", "Responsive design"],
    },
  ]

  return (
    <section ref={ref} id="projects" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-orange-50 dark:from-rose-900/20 dark:via-slate-900 dark:to-orange-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent dark:from-pink-800/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            Showcasing my journey through innovative solutions and technical excellence
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {projects.map((project, index) => (
            <ModernCard
              key={index}
              className={`overflow-hidden group transform hover:scale-105 hover:-translate-y-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60`}></div>

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xl border ${
                      project.status === "Live"
                        ? "bg-green-100/80 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                        : "bg-blue-100/80 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 text-4xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {project.emoji}
                </div>

                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-3">
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center border border-white/30"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center border border-white/30"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
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

              <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500">
                  {project.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                  {project.desc}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">✨ Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mr-2 flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-violet-200 dark:border-violet-700 transform transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Internship Section */}
        <div
          className={`mt-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Professional Experience
          </h3>

          <div className="max-w-5xl mx-auto">
            <ModernCard className="p-8 group" gradient={true}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="text-4xl mr-4">💼</div>
                  <div>
                    <h4 className="text-2xl font-bold text-violet-600 dark:text-violet-400">Web Development Intern</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Codsoft (Remote)</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  Aug 1-31, 2024
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">📋 Responsibilities:</h5>
                  <ul className="space-y-3">
                    {[
                      "Learnt and developed websites from front-end to back-end",
                      "Built and optimized interactive UI components",
                      "Enhanced user experience through modern design",
                      "Collaborated with team on various projects",
                    ].map((item, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-400 flex items-start">
                        <span className="w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">🛠️ Technologies Used:</h5>
                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "Full-stack Development"].map(
                      (tech, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-violet-200 dark:border-violet-700 hover:scale-105 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </ModernCard>
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
      color: "from-violet-400 to-purple-400",
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
      color: "from-pink-400 to-rose-400",
      count: "2+ Projects",
    },
  ]

  return (
    <section ref={ref} id="stats" className="min-h-screen py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-orange-900/20 dark:via-slate-900 dark:to-yellow-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-200/30 via-transparent to-transparent dark:from-orange-800/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-6">Numbers that define my academic and technical journey</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            {
              label: "Projects Completed",
              value: animatedStats.projects || 0,
              icon: "🚀",
              color: "from-violet-500 to-purple-500",
              maxValue: 10,
            },
            {
              label: "Current CGPA",
              value: animatedStats.cgpa || 0,
              icon: "🎯",
              color: "from-purple-500 to-pink-500",
              maxValue: 10,
            },
            {
              label: "Hackathons Won",
              value: animatedStats.hackathons || 0,
              icon: "🏆",
              color: "from-pink-500 to-rose-500",
              maxValue: 5,
            },
            {
              label: "Technologies",
              value: animatedStats.technologies || 0,
              icon: "⚡",
              color: "from-rose-500 to-orange-500",
              maxValue: 20,
            },
          ].map((stat, index) => (
            <ModernCard
              key={index}
              className={`p-6 text-center group transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <div className="text-4xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {stat.icon}
                </div>

                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 mb-4">
                  {stat.label}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                    style={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Achievements section */}
        <div className="max-w-7xl mx-auto">
          <h3
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Achievements & Milestones
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <ModernCard
                key={index}
                className={`p-6 text-center group transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Achievement count */}
                <div className="absolute top-3 right-3 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {achievement.count}
                </div>

                <div className="relative">
                  <div className="text-5xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {achievement.icon}
                  </div>

                  <h4
                    className={`text-lg font-bold mb-2 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}
                  >
                    {achievement.title}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 mb-4">
                    {achievement.desc}
                  </p>

                  {/* Progress indicator */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div
                      className={`h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                      style={{ width: isVisible ? "100%" : "0%", transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </ModernCard>
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
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-pink-100 dark:from-violet-900/30 dark:via-slate-900 dark:to-pink-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent dark:from-purple-800/40"></div>
      </div>

      {/* Floating contact icons */}
      <div className="absolute inset-0">
        {["📧", "📱", "💬", "🌐", "💼", "🎯", "✨", "🚀"].map((emoji, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 11}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + i}s`,
            }}
          >
            <div className="text-4xl">{emoji}</div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects? Let's create something amazing together!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <ModernCard className="p-8 group" gradient={true}>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 flex items-center">
                  <span className="mr-3 text-2xl">💬</span>
                  Send Me a Message
                </h3>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Message Sent!</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Thanks for reaching out. I'll get back to you soon!</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
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
                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:border-violet-400 focus:bg-white/70 dark:focus:bg-slate-800/70 transition-all duration-300 focus:outline-none backdrop-blur-xl"
                      />
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:border-violet-400 focus:bg-white/70 dark:focus:bg-slate-800/70 transition-all duration-300 focus:outline-none backdrop-blur-xl"
                      />
                    </div>

                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        required
                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:border-violet-400 focus:bg-white/70 dark:focus:bg-slate-800/70 transition-all duration-300 focus:outline-none resize-none backdrop-blur-xl"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </form>
                )}
              </div>
            </ModernCard>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <ModernCard className="p-8 group" gradient={true}>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3 text-2xl">📡</span>
                  Get In Touch
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "m.muralikarthick123@gmail.com",
                      href: "mailto:m.muralikarthick123@gmail.com",
                    },
                    {
                      icon: "📱",
                      label: "Phone",
                      value: "+91-7339044489",
                      href: "tel:+917339044489",
                    },
                    {
                      icon: "📍",
                      label: "Location",
                      value: "Tamil Nadu, India",
                      href: "#",
                    },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105 group/item backdrop-blur-xl border border-white/20 dark:border-slate-700/50"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.label}</p>
                        <p className="text-slate-800 dark:text-slate-200 font-medium group-hover/item:text-violet-600 dark:group-hover/item:text-violet-400 transition-colors duration-300 truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ModernCard>

            {/* Social Links */}
            <ModernCard className="p-8 group" gradient={true}>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3 text-2xl">🌐</span>
                  Follow Me
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "GitHub",
                      icon: "🐙",
                      href: "https://github.com/murali55525",
                      color: "hover:text-purple-600 dark:hover:text-purple-400",
                    },
                    {
                      name: "LinkedIn",
                      icon: "💼",
                      href: "https://linkedin.com/in/murali-karthick-8ab38a259/",
                      color: "hover:text-blue-600 dark:hover:text-blue-400",
                    },
                    {
                      name: "Email",
                      icon: "📧",
                      href: "mailto:m.muralikarthick123@gmail.com",
                      color: "hover:text-green-600 dark:hover:text-green-400",
                    },
                    {
                      name: "Phone",
                      icon: "📱",
                      href: "tel:+917339044489",
                      color: "hover:text-pink-600 dark:hover:text-pink-400",
                    },
                  ].map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105 ${social.color} group/social backdrop-blur-xl border border-white/20 dark:border-slate-700/50`}
                    >
                      <div className="text-2xl">{social.icon}</div>
                      <span className="font-medium text-sm">{social.name}</span>
                      <svg
                        className="w-4 h-4 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
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
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 to-pink-100/30 dark:from-violet-900/30 dark:to-pink-900/30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Muralikarthick's Portfolio
            </h3>
            <p className="text-slate-600 dark:text-slate-400">Building the future, one line of code at a time</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {["Home", "About", "Education", "Projects", "Stats", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:scale-105 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {[
              {
                name: "GitHub",
                href: "https://github.com/murali55525",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                ),
                color: "hover:text-purple-600 dark:hover:text-purple-400",
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/murali-karthick-8ab38a259/",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-0.966 0-1.75-0.79-1.75-1.764s0.784-1.764 1.75-1.764 1.75 0.79 1.75 1.764-0.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                  </svg>
                ),
                color: "hover:text-blue-600 dark:hover:text-blue-400",
              },
              {
                name: "Email",
                href: "mailto:m.muralikarthick123@gmail.com",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                color: "hover:text-green-600 dark:hover:text-green-400",
              },
            ].map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-500 dark:text-slate-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 relative group p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70`}
                aria-label={social.name}
              >
                {social.icon}
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
              © {currentYear} Muralikarthick M. All rights reserved.
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center">
              Made with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.style.cssText = "touch-action: manipulation;"

    const handleOrientationChange = () => {
      document.body.style.display = "none"
      setTimeout(() => (document.body.style.display = ""), 0)
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    return () => window.removeEventListener("orientationchange", handleOrientationChange)
  }, [])

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)
    return () => window.removeEventListener("resize", setVh)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-violet-50 via-white to-pink-50 dark:from-violet-900 dark:via-slate-900 dark:to-pink-900 flex items-center justify-center">
        <ModernLoadingSpinner />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
      <ModernParticles />
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
