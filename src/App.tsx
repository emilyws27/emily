import { useEffect, useRef, useState } from 'react'
import './App.css'

// ─── Data ──────────────────────────────────────────────────────────────────

const TYPEWRITER_PHRASES = [
  'Data Engineer',
  'Pipeline Architect',
  'ML Practitioner',
  'Big Data Enthusiast',
  'SQL Wizard',
  'Python Developer',
]

const SKILLS = [
  {
    icon: '⚡',
    name: 'Data Engineering',
    items: [
      { name: 'Apache Spark / PySpark', level: 95 },
      { name: 'Apache Kafka', level: 88 },
      { name: 'Apache Airflow', level: 90 },
      { name: 'dbt (Data Build Tool)', level: 85 },
      { name: 'ETL / ELT Pipelines', level: 95 },
    ],
  },
  {
    icon: '🗄️',
    name: 'Databases & Storage',
    items: [
      { name: 'PostgreSQL / SQL', level: 95 },
      { name: 'Snowflake', level: 92 },
      { name: 'BigQuery', level: 88 },
      { name: 'Redis', level: 78 },
      { name: 'Delta Lake / Iceberg', level: 82 },
    ],
  },
  {
    icon: '☁️',
    name: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS (S3, Glue, Redshift)', level: 90 },
      { name: 'Google Cloud Platform', level: 82 },
      { name: 'Terraform', level: 75 },
      { name: 'Docker / Kubernetes', level: 80 },
      { name: 'CI/CD Pipelines', level: 85 },
    ],
  },
  {
    icon: '🐍',
    name: 'Programming & ML',
    items: [
      { name: 'Python', level: 97 },
      { name: 'SQL', level: 95 },
      { name: 'Pandas / NumPy', level: 93 },
      { name: 'scikit-learn / XGBoost', level: 82 },
      { name: 'Spark MLlib', level: 78 },
    ],
  },
]

const PROJECTS = [
  {
    icon: '🌊',
    title: 'Real-Time Analytics Platform',
    description:
      'Built an end-to-end streaming data platform processing 10M+ events/day using Kafka, Spark Structured Streaming, and Delta Lake. Reduced analytics latency from hours to seconds.',
    tech: ['Apache Kafka', 'PySpark', 'Delta Lake', 'Grafana', 'AWS'],
    featured: true,
    github: '#',
    demo: '#',
  },
  {
    icon: '🧠',
    title: 'ML Feature Store',
    description:
      'Designed and implemented a centralized feature store serving 50+ ML models in production. Includes automated feature validation, versioning, and low-latency serving layer.',
    tech: ['Python', 'Redis', 'Feast', 'PostgreSQL', 'FastAPI'],
    featured: true,
    github: '#',
    demo: '#',
  },
  {
    icon: '📊',
    title: 'Data Quality Monitor',
    description:
      'Open-source data quality framework that runs 200+ automated checks across data pipelines. Integrated with dbt, Airflow, and Slack for real-time alerting.',
    tech: ['dbt', 'Great Expectations', 'Airflow', 'Python', 'Slack API'],
    featured: false,
    github: '#',
    demo: null,
  },
  {
    icon: '🔍',
    title: 'Intelligent Data Catalog',
    description:
      'NLP-powered data catalog that auto-tags, classifies, and surfaces relevant datasets. Reduced time-to-insight by 60% for data consumers across the organization.',
    tech: ['Python', 'spaCy', 'Elasticsearch', 'React', 'FastAPI'],
    featured: false,
    github: '#',
    demo: '#',
  },
  {
    icon: '⚙️',
    title: 'Pipeline Orchestration Framework',
    description:
      'Built a custom Airflow plugin ecosystem enabling teams to define complex data pipelines as code. Manages 1000+ DAGs across 5 data teams.',
    tech: ['Apache Airflow', 'Python', 'Docker', 'PostgreSQL', 'Kubernetes'],
    featured: false,
    github: '#',
    demo: null,
  },
  {
    icon: '📈',
    title: 'Executive BI Dashboard',
    description:
      'Designed the data models and transformation layer powering a real-time executive dashboard tracking 150+ KPIs across 10 business units.',
    tech: ['dbt', 'Snowflake', 'Looker', 'Python', 'Airflow'],
    featured: false,
    github: null,
    demo: '#',
  },
]

const EXPERIENCE = [
  {
    date: '2022 – Present',
    title: 'Senior Data Engineer',
    company: 'DataFlow Inc.',
    bullets: [
      'Architected a lakehouse platform on AWS handling 50TB+ daily data ingestion',
      'Led a team of 4 engineers to migrate legacy ETL to a modern dbt + Airflow stack',
      'Reduced pipeline failures by 80% through automated data quality enforcement',
      'Mentored junior engineers and drove data engineering best practices',
    ],
  },
  {
    date: '2020 – 2022',
    title: 'Data Engineer',
    company: 'Analytics Co.',
    bullets: [
      'Built real-time streaming pipelines using Kafka and Spark Structured Streaming',
      'Designed dimensional data models for a 200TB+ Snowflake warehouse',
      'Developed self-serve analytics tooling used by 50+ data consumers',
    ],
  },
  {
    date: '2018 – 2020',
    title: 'Data Analyst → Junior Data Engineer',
    company: 'StartupXYZ',
    bullets: [
      'Transitioned from analytics to engineering, building first Python ETL pipelines',
      'Implemented automated reporting saving 20+ hours of manual work per week',
      'Introduced data testing culture across the analytics team',
    ],
  },
]

// ─── Canvas Particle Animation ────────────────────────────────────────────

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} />
}

// ─── Typewriter ───────────────────────────────────────────────────────────

function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (text.length < phrase.length) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 45)
      } else {
        setPhraseIdx((i) => (i + 1) % phrases.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [text, typing, phraseIdx, phrases])

  return (
    <span className="hero-subtitle">
      {text}
      <span className="cursor" />
    </span>
  )
}

// ─── Skill Bar (animated on mount) ────────────────────────────────────────

function SkillBar({ level }: { level: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar-fill" style={{ width: `${width}%` }} />
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="hero">
      <HeroCanvas />
      <div className="hero-content">
        <p className="hero-eyebrow">
          <span />
          Hello, world!
          <span />
        </p>
        <h1 className="hero-title">
          I'm <span className="highlight">Emily</span>
        </h1>
        <Typewriter phrases={TYPEWRITER_PHRASES} />
        <p className="hero-description">
          I build the systems that turn raw data into real insight — crafting scalable pipelines,
          robust data models, and the infrastructure that keeps it all running at scale.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>scroll</span>
        <span className="arrow">↓</span>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <p className="section-label">// about me</p>
        <h2 className="section-title">Who I Am</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a software engineer specializing in <strong>data infrastructure and engineering</strong>.
            With a passion for building reliable, scalable systems, I've spent my career designing
            pipelines that move, transform, and surface data for some of the most data-hungry teams
            in the industry.
          </p>
          <p>
            My work spans the full data stack — from <strong>streaming ingestion</strong> with Kafka
            and Spark to <strong>analytical modeling</strong> in Snowflake and BigQuery, all the way
            to the <strong>ML feature pipelines</strong> that power production models.
          </p>
          <p>
            Outside of work, I contribute to open-source data tools, write about data engineering
            best practices, and mentor aspiring data professionals. I believe clean, well-tested
            data is the foundation of every good data product.
          </p>
          <div className="tech-pills" style={{ marginTop: '1.5rem' }}>
            {['Python', 'SQL', 'Spark', 'Kafka', 'dbt', 'Airflow', 'Snowflake', 'AWS'].map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>
        <div className="about-stats">
          {[
            { num: '6+', label: 'Years of Experience' },
            { num: '50+', label: 'TB Data Processed' },
            { num: '20+', label: 'Projects Shipped' },
            { num: '1B+', label: 'Records/Day' },
          ].map(({ num, label }) => (
            <div key={label} className="stat-card">
              <div className="stat-number">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'rgba(17,24,39,0.4)' }}>
      <div className="section-header">
        <p className="section-label">// technical skills</p>
        <h2 className="section-title">What I Work With</h2>
      </div>
      <div className="skills-container">
        {SKILLS.map((cat) => (
          <div key={cat.name} className="skill-category">
            <div className="skill-category-header">
              <span className="skill-category-icon">{cat.icon}</span>
              <span className="skill-category-name">{cat.name}</span>
            </div>
            {cat.items.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <SkillBar level={skill.level} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <p className="section-label">// projects</p>
        <h2 className="section-title">Things I've Built</h2>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.title} className="project-card">
            <div className="project-header">
              <span className="project-icon">{p.icon}</span>
              <div className="project-links">
                {p.github && (
                  <a href={p.github} className="project-link" title="GitHub" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} className="project-link" title="Live Demo" aria-label="Live Demo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <div className="project-body">
              {p.featured && <span className="project-tag-featured">★ Featured</span>}
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.description}</p>
              <div className="tech-pills">
                {p.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'rgba(17,24,39,0.4)' }}>
      <div className="section-header">
        <p className="section-label">// experience</p>
        <h2 className="section-title">Where I've Worked</h2>
      </div>
      <div className="timeline">
        {EXPERIENCE.map((exp) => (
          <div key={exp.title} className="timeline-item">
            <div className="timeline-dot" />
            <p className="timeline-date">{exp.date}</p>
            <h3 className="timeline-title">{exp.title}</h3>
            <p className="timeline-company">{exp.company}</p>
            <ul className="timeline-description">
              {exp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thanks for reaching out! I\'ll get back to you soon.')
  }

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <p className="section-label">// contact</p>
        <h2 className="section-title">Let's Connect</h2>
      </div>
      <div className="contact-wrapper">
        <div className="contact-info">
          <p>
            Whether you have a data challenge to solve, want to collaborate on an open-source
            project, or just want to talk shop about data engineering — my inbox is always open.
          </p>
          <div className="contact-links">
            <a href="mailto:emily@example.com" className="contact-link-item">
              <span className="link-icon">✉️</span>
              emily@example.com
            </a>
            <a href="https://github.com" className="contact-link-item" target="_blank" rel="noreferrer">
              <span className="link-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
              github.com/emily
            </a>
            <a href="https://linkedin.com" className="contact-link-item" target="_blank" rel="noreferrer">
              <span className="link-icon">💼</span>
              linkedin.com/in/emily
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input id="name" type="text" className="form-input" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" type="email" className="form-input" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea id="message" className="form-textarea" placeholder="Tell me about your data challenge..." required />
          </div>
          <button type="submit" className="form-submit">Send Message →</button>
        </form>
      </div>
    </section>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}>
      <span className="navbar-logo">{'<emily />'}</span>
      <ul className="navbar-links">
        {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((s) => (
          <li key={s}>
            <a href={`#${s}`}>{s}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="footer">
        <p>
          Designed & built by{' '}
          <a href="#home">Emily</a>
          {' '}· Data Engineer · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
