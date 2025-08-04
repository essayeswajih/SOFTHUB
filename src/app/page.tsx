"use client"

import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes, type HTMLAttributes } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import {
  Shield,
  Globe,
  Smartphone,
  Code,
  Server,
  Database,
  Zap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
} from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "outline"
  size?: "default" | "lg" | "icon"
  className?: string
}

const CustomButton = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: CustomButtonProps) => {
  let buttonClass =
    "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"

  if (size === "lg") {
    buttonClass += " px-4 py-2.5 text-base"
  } else if (size === "icon") {
    buttonClass += " h-9 w-9"
  } else {
    buttonClass += " px-3 py-2 text-sm"
  }

  if (variant === "outline") {
    buttonClass += " border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700"
  } else {
    buttonClass += " bg-blue-600 text-white shadow hover:bg-blue-700"
  }

  buttonClass += ` ${className}`

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}

interface CustomCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const CustomCard = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardHeader = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardContent = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardTitle = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CustomCardDescription = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  )
}

interface CustomBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: "default" | "secondary"
  className?: string
}

const CustomBadge = ({ children, variant = "default", className = "", ...props }: CustomBadgeProps) => {
  let badgeClass =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"

  if (variant === "secondary") {
    badgeClass += " border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
  } else {
    badgeClass += " border-gray-300 bg-gray-50 text-gray-700"
  }

  badgeClass += ` ${className}`

  return (
    <div className={badgeClass} {...props}>
      {children}
    </div>
  )
}

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline()

      // Animate hero title with split text effect
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 })
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
        )
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
      }

      // Animate buttons
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
      }

      // Services section scroll animations
      if (servicesRef.current) {
        const serviceCards = servicesRef.current.querySelectorAll(".service-card")

        gsap.fromTo(
          serviceCards,
          {
            opacity: 0,
            y: 80,
            rotationX: 45,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Projects section animations
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll(".project-card")

        projectCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotation: index % 2 === 0 ? -5 : 5,
            },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )
        })
      }

      // Technologies Section - Professional UX Animation
      if (techRef.current) {
        const techBadges = techRef.current.querySelectorAll(".tech-badge")

        // Professional staggered entrance
        gsap.fromTo(
          techBadges,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              amount: 1.2,
              from: "random",
              ease: "power2.out",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: techRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Professional hover effects
        techBadges.forEach((badge, index) => {
          // Add subtle breathing animation
          gsap.to(badge, {
            scale: 1.02,
            duration: 2 + Math.random() * 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1,
          })

          badge.addEventListener("mouseenter", () => {
            gsap.to(badge, {
              scale: 1.1,
              y: -8,
              boxShadow: "0 10px 25px rgba(0, 255, 255, 0.3)",
              duration: 0.3,
              ease: "power2.out",
            })
          })

          badge.addEventListener("mouseleave", () => {
            gsap.to(badge, {
              scale: 1,
              y: 0,
              boxShadow: "0 0 0 rgba(0, 255, 255, 0)",
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })

        // Add wave effect on scroll
        ScrollTrigger.create({
          trigger: techRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.to(techBadges, {
              y: -5,
              duration: 0.4,
              stagger: {
                amount: 0.8,
                from: "start",
              },
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            })
          },
        })

        // Animate tech stats
        const techStats = techRef.current.querySelectorAll(".tech-stat")
        techStats.forEach((stat, index) => {
          const number = stat.querySelector("div:first-child")

          gsap.fromTo(
            stat,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.2 + 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Number counting animation
          if (number) {
            const finalValue = number.textContent
            gsap.fromTo(
              number,
              { textContent: "0" },
              {
                textContent: finalValue,
                duration: 1.5,
                delay: index * 0.2 + 0.8,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: stat,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          }
        })
      }

      // About Section - 3D Icon Grid Animation
      if (aboutRef.current) {
        const iconGrid = aboutRef.current.querySelector(".icon-grid")
        const icons = aboutRef.current.querySelectorAll(".tech-icon")
        const stats = aboutRef.current.querySelectorAll(".stat-item")

        // Simplified Icons entrance - just fade and scale
        gsap.fromTo(
          icons,
          {
            opacity: 0,
            scale: 0.5,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: {
              amount: 1,
              grid: [3, 2],
              from: "center",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Remove the continuous rotation for icon grid
        // Simple hover effects only
        icons.forEach((icon, index) => {
          icon.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              scale: 1.1,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          icon.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })

        // Keep the stats animation as it's user-friendly
        stats.forEach((stat, index) => {
          const number = stat.querySelector(".stat-number")
          const label = stat.querySelector(".stat-label")

          gsap.fromTo(
            stat,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Number counting animation
          if (number) {
            const finalValue = number.textContent
            gsap.fromTo(
              number,
              { textContent: "0" },
              {
                textContent: finalValue,
                duration: 2,
                delay: index * 0.2 + 0.5,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: stat,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          }
        })
      }

      // Contact Section - 3D Card Flip and Form Animation
      if (contactRef.current) {
        const contactInfo = contactRef.current.querySelector(".contact-info")
        const contactForm = contactRef.current.querySelector(".contact-form")
        const contactItems = contactRef.current.querySelectorAll(".contact-item")
        const formInputs = contactRef.current.querySelectorAll(".form-input")
        const socialButtons = contactRef.current.querySelectorAll(".social-btn")

        // Contact info 3D entrance
        gsap.fromTo(
          contactInfo,
          {
            opacity: 0,
            rotationY: -90,
            x: -100,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Contact form 3D entrance
        gsap.fromTo(
          contactForm,
          {
            opacity: 0,
            rotationY: 90,
            x: 100,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Contact items staggered animation
        gsap.fromTo(
          contactItems,
          {
            opacity: 0,
            rotationX: 45,
            y: 30,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactInfo,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Form inputs 3D animation
        gsap.fromTo(
          formInputs,
          {
            opacity: 0,
            rotationX: 90,
            y: 20,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactForm,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Social buttons 3D hover effects
        socialButtons.forEach((btn, index) => {
          gsap.set(btn, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          })

          // Continuous subtle rotation
          gsap.to(btn, {
            rotationY: Math.sin(index) * 5,
            rotationX: Math.cos(index) * 3,
            duration: 3 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          })

          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
              scale: 1.2,
              rotationY: 180,
              rotationX: 10,
              z: 20,
              duration: 0.6,
              ease: "back.out(1.7)",
            })
          })

          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        })

        // Form input focus effects
        formInputs.forEach((input) => {
          input.addEventListener("focus", () => {
            gsap.to(input, {
              scale: 1.02,
              rotationX: -2,
              z: 5,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          input.addEventListener("blur", () => {
            gsap.to(input, {
              scale: 1,
              rotationX: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }

      // Add hover animations for service cards
      const serviceCards = document.querySelectorAll(".service-card")
      serviceCards.forEach((card) => {
        const icon = card.querySelector(".service-icon")

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(icon, {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets",
      features: ["Penetration Testing", "Security Audits", "Threat Assessment", "Incident Response"],
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites and web applications",
      features: ["Angular/Next.js", "Full-Stack Development", "E-commerce", "API Integration"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android", "Flutter", "Kotlin", "Play Store Deployment"],
    },
  ]

  const projects = [
    {
      title: "Log Analysis System",
      category: "Cybersecurity",
      description: "Advanced institutions detection system for OSs and Servers",
      tech: ["Python", "FastApi", "Angular", "PostgreSQL","Stripe","SQLAlchemy", "ng2-charts"],
      image: "/placeholder.svg?height=200&width=300&text=SecureBank+Dashboard",
    },
    {
      title: "EcoCommerce Platform",
      category: "Web Development",
      description: "Sustainable e-commerce platform with carbon tracking",
      tech: ["Python", "FastApi", "Angular", "PostgreSQL", "Bootstrap", "Gsap", "Github Actions","Docker"],
      image: "/placeholder.svg?height=200&width=300&text=EcoCommerce+Platform",
    },
    {
      title: "PFE PFA Book",
      category: "Mobile Development",
      description: "Cross-platform health monitoring application",
      tech: ["Dart","Flutter", "Firebase","Github", "PlayStore Deployment", "Google Analytics"],
      image: "/placeholder.svg?height=200&width=300&text=HealthTracker+Mobile",
    },
  ]

  const technologies = [
    "Angular",
    "Next.js",
    "FastAPI",
    "Spring Boot",
    "Node.js",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Kotlin",
    "Flutter",
    "Docker",
    "CI/CD",
  ]

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SoftHub</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div>
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6 opacity-0">
              Secure. Build.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Innovate.
              </span>
            </h1>
            <p ref={subtitleRef} className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              SoftHub delivers cutting-edge cybersecurity solutions, modern web applications, and innovative mobile
              experiences that drive your business forward.
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </CustomButton>
              <CustomButton
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                View Portfolio
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We specialize in three core areas that form the foundation of modern digital solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <CustomCard
                key={index}
                className="service-card bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <CustomCardHeader>
                  <div className="service-icon w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CustomCardTitle className="text-white text-xl">{service.title}</CustomCardTitle>
                  <CustomCardDescription className="text-white/70">{service.description}</CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-black/20" ref={projectsRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Showcasing our latest work across cybersecurity, web, and mobile development
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <CustomCard
                key={index}
                className="project-card bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <CustomBadge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0">
                      {project.category}
                    </CustomBadge>
                  </div>
                </div>
                <CustomCardHeader>
                  <CustomCardTitle className="text-white">{project.title}</CustomCardTitle>
                  <CustomCardDescription className="text-white/70">{project.description}</CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <CustomBadge key={idx} variant="secondary" className="bg-white/10 text-white/80 border-white/20">
                        {tech}
                      </CustomBadge>
                    ))}
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section - Enhanced Professional Design */}
      <section className="py-20 px-6" ref={techRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technologies We Master</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cutting-edge tools and frameworks that power our solutions
            </p>
          </div>

          {/* Professional Grid Layout */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="tech-badge group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  {/* Tech icon placeholder */}
                  <div className="relative z-10 mb-2">
                    <div className="w-8 h-8 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Tech name */}
                  <div className="relative z-10 text-white font-medium text-sm group-hover:text-cyan-300 transition-colors duration-300">
                    {tech}
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* Professional stats below */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="tech-stat">
                <div className="text-3xl font-bold text-cyan-400 mb-2">12+</div>
                <div className="text-white/70">Technologies</div>
              </div>
              <div className="tech-stat">
                <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-white/70">Years Experience</div>
              </div>
              <div className="tech-stat">
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-white/70">Up to Date</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced with 3D */}
      <section id="about" className="py-20 px-6 bg-black/20" ref={aboutRef}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About SoftHub</h2>
              <p className="text-white/80 text-lg mb-6">
                We are a team of passionate developers and cybersecurity experts dedicated to creating secure,
                innovative digital solutions. With years of experience in the industry, we understand the critical
                importance of both functionality and security in today's digital landscape.
              </p>
              <p className="text-white/80 text-lg mb-8">
                Our mission is to help businesses thrive in the digital age by providing robust, scalable, and secure
                technology solutions that drive growth and protect valuable assets.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="stat-label text-white/70">Projects Completed</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-purple-400 mb-2">5+</div>
                  <div className="stat-label text-white/70">Years Experience</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="stat-label text-white/70">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="icon-grid w-full h-96 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with 3D */}
      <section id="contact" className="py-20 px-6" ref={contactRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ready to secure and scale your digital presence? Get in touch with us today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="contact-info">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-white/70">hello@softhub.com</div>
                  </div>
                </div>
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-white/70">+216 27 553 981</div>
                  </div>
                </div>
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Location</div>
                    <div className="text-white/70">Monastir, Tunisia</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <CustomButton
                  size="icon"
                  variant="outline"
                  className="social-btn border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Github className="w-5 h-5" />
                </CustomButton>
                <CustomButton
                  size="icon"
                  variant="outline"
                  className="social-btn border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Linkedin className="w-5 h-5" />
                </CustomButton>
                <CustomButton
                  size="icon"
                  variant="outline"
                  className="social-btn border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Twitter className="w-5 h-5" />
                </CustomButton>
              </div>
            </div>
            <CustomCard className="contact-form bg-white/5 border-white/10 backdrop-blur-sm">
              <CustomCardHeader>
                <CustomCardTitle className="text-white">Send us a message</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm">First Name</label>
                    <input
                      className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm">Last Name</label>
                    <input
                      className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-sm">Email</label>
                  <input
                    type="email"
                    className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm">Message</label>
                  <textarea
                    rows={4}
                    className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <CustomButton className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                  Send Message
                </CustomButton>
              </CustomCardContent>
            </CustomCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SoftHub</span>
            </div>
            <div className="text-white/60 text-sm">© 2025 SoftHub. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
