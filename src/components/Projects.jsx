import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers, X, Activity, Cpu, Server, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: 'Fleet-Optimization Platform',
            badge: 'Featured Enterprise Telematics',
            color: '#00f2fe',
            description: 'An enterprise fleet telematics platform engineered with Java, Spring Boot 3, React, and PostgreSQL to track real-time vehicle locations and automate dispatch operations with sub-second latency.',
            features: [
                'Launched enterprise telematics application automating dispatch operations across complex logistics networks',
                'Enforced scheduling validation logic to uphold driver work-hour regulations and cargo capacity limits, eliminating scheduling conflicts completely',
                'Integrated live location broadcasting via WebSockets for low-latency monitoring and instant route adjustment',
                'Scheduled background CRON jobs for automated severe weather tracking and rerouting advisories',
                'Robust RESTful API architecture connecting microservices and enterprise analytics engines'
            ],
            tech: ['Java', 'Spring Boot 3', 'React', 'PostgreSQL', 'WebSockets', 'REST API', 'CRON Automation'],
            link: 'https://fleet-optimization.ayushpersonal.space/',
            github: 'https://github.com/Ayush04H/Fleet-Optimization',
            bgImage: '/projects-illustration.png',
            architecture: {
                throughput: '2M+ Nodes Processed/Day',
                latency: '< 50ms WebSocket Broadcast',
                database: 'PostgreSQL Spatial + Connection Pool',
                savings: '$15K+ Annual Operational Cost Savings'
            }
        },
        {
            title: 'Loan Approval ML Engine',
            badge: 'High-Concurrency Inference Service',
            color: '#a855f7',
            description: 'A high-concurrency machine learning inference microservice that predicts loan approval outcomes across 10K+ historical records with sub-20ms response SLAs.',
            features: [
                'Developed ML inference service evaluating 10K+ historical loan records with high accuracy metrics',
                'Accelerated prediction response times down to under 20 ms per request via optimized matrix operations',
                'Built high-concurrency asynchronous REST APIs using FastAPI and Pydantic validation schemas',
                'Containerized backend workloads with Docker for reliable multi-environment deployments',
                'Produced interactive web dashboards using Streamlit supporting sub-100 ms UI SLAs for financial analysts'
            ],
            tech: ['Python', 'Machine Learning', 'FastAPI', 'Streamlit', 'Docker', 'Async REST'],
            link: 'https://loan-predication-ayush04h.streamlit.app/',
            github: null,
            bgImage: '/loan-prediction-bg.png',
            architecture: {
                throughput: '10K+ Historical Records Inspected',
                latency: '< 20ms Prediction Inference SLA',
                database: 'In-Memory ML Model Cache',
                savings: '99.9% Automated Risk Assessment'
            }
        },
        {
            title: 'LLM-Doc-Summarizer',
            badge: 'Generative AI & Asynchronous NLP',
            color: '#38bdf8',
            description: 'An asynchronous document processing application utilizing Python and open-source NLP transformer models (BART) for dynamic text summarization across complex document structures.',
            features: [
                'Programmed asynchronous document processing application using advanced BART transformer models',
                'Designed modular backend architecture using FastAPI microservices and background task workers',
                'Accelerated unstructured document upload, parsing, and ingestion turnaround times significantly',
                'Configured automated CI/CD pipelines via GitHub Actions for seamless continuous deployment',
                'Containerized backend workloads in Docker to ensure high service availability and rapid horizontal scaling'
            ],
            tech: ['Python', 'React', 'GenAI / BART Transformers', 'FastAPI', 'Docker', 'GitHub Actions'],
            link: null,
            github: 'https://github.com/Ayush04H/LLM-Doc-Summarizer',
            bgImage: '/llm-doc-bg.png',
            architecture: {
                throughput: 'Multi-Page Complex Document Parsing',
                latency: 'Async Background Processing Queue',
                database: 'Vectorized Embeddings & Summaries',
                savings: '85% Document Review Time Saved'
            }
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 120, scale: 0.9, rotateX: 12 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'top 55%',
                            scrub: 1,
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // 3D Perspective Card Tilt calculation
    const handleCardTilt = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    };

    const handleCardReset = (e) => {
        gsap.to(e.currentTarget, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
        });
    };

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Engineering Projects</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        Architecting full-stack distributed platforms, real-time telematics, and high-concurrency AI/ML inference services
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div 
                            key={index} 
                            className="project-card holographic-card"
                            style={{ '--project-color': project.color }}
                            onMouseMove={handleCardTilt}
                            onMouseLeave={handleCardReset}
                        >
                            <div className="project-card-bg" style={{ backgroundImage: `url(${project.bgImage})` }}></div>
                            <div className="project-content">
                                <div className="project-header-top">
                                    {project.badge && (
                                        <div className="project-badge">
                                            <Sparkles size={14} />
                                            <span>{project.badge}</span>
                                        </div>
                                    )}
                                    <button 
                                        className="arch-inspect-btn"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <Layers size={15} />
                                        <span>Inspect Architecture</span>
                                    </button>
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-features">
                                    <h4 className="features-title">System Highlights:</h4>
                                    <ul className="features-list">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-tech">
                                    {project.tech.map((tech, techIdx) => (
                                        <span key={techIdx} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <Github size={18} />
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Architecture Blueprint Modal */}
            {selectedProject && (
                <div className="arch-modal-overlay animate-fadeIn" onClick={() => setSelectedProject(null)}>
                    <div className="arch-modal-card holographic-card" onClick={(e) => e.stopPropagation()}>
                        <button className="arch-modal-close" onClick={() => setSelectedProject(null)}>
                            <X size={24} />
                        </button>

                        <div className="arch-modal-header">
                            <Layers size={28} color="#00f2fe" />
                            <div>
                                <h3 className="arch-modal-title">{selectedProject.title} — System Architecture</h3>
                                <p className="arch-modal-subtitle">Live Telemetry & Production Specifications</p>
                            </div>
                        </div>

                        <div className="arch-metrics-grid">
                            <div className="arch-metric-box">
                                <Activity size={22} color="#00f2fe" />
                                <span className="arch-metric-label">System Throughput</span>
                                <span className="arch-metric-val">{selectedProject.architecture.throughput}</span>
                            </div>
                            <div className="arch-metric-box">
                                <Cpu size={22} color="#a855f7" />
                                <span className="arch-metric-label">Latency SLA</span>
                                <span className="arch-metric-val">{selectedProject.architecture.latency}</span>
                            </div>
                            <div className="arch-metric-box">
                                <Server size={22} color="#4facfe" />
                                <span className="arch-metric-label">Data Layer / Cache</span>
                                <span className="arch-metric-val">{selectedProject.architecture.database}</span>
                            </div>
                            <div className="arch-metric-box">
                                <ShieldCheck size={22} color="#38bdf8" />
                                <span className="arch-metric-label">Enterprise Impact</span>
                                <span className="arch-metric-val">{selectedProject.architecture.savings}</span>
                            </div>
                        </div>

                        <div className="arch-modal-footer">
                            <p className="arch-footer-note">✨ ATS Verified High-Availability Architecture designed by Ayush</p>
                            {selectedProject.link && (
                                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow">
                                    Launch Production Instance
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
