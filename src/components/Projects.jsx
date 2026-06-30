import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);

    const projects = [
        {
            title: 'Fleet-Optimization',
            badge: 'Featured Enterprise Platform',
            description: 'An enterprise fleet telematics application engineered with Java, Spring Boot 3, React, and PostgreSQL to track real-time vehicle locations and automate dispatch operations seamlessly.',
            features: [
                'Launched enterprise telematics application automating dispatch operations',
                'Enforced scheduling validation logic to uphold driver work-hour regulations and cargo capacity limits, eliminating scheduling conflicts completely',
                'Integrated live location broadcasting via WebSockets for low-latency monitoring',
                'Scheduled background CRON jobs for automated severe weather tracking',
                'Robust RESTful API architecture connecting microservices and analytics'
            ],
            tech: ['Java', 'Spring Boot 3', 'React', 'PostgreSQL', 'WebSockets', 'REST API'],
            link: 'https://fleet-optimization.ayushpersonal.space/',
            github: 'https://github.com/Ayush04H/Fleet-Optimization',
            bgImage: '/projects-illustration.png'
        },
        {
            title: 'Loan Prediction App',
            badge: 'Machine Learning Inference',
            description: 'A high-concurrency machine learning inference service that predicts loan approval outcomes across 10K+ historical records with sub-20ms response times.',
            features: [
                'Developed ML inference service evaluating 10K+ historical loan records',
                'Accelerated prediction response times down to under 20 ms per request',
                'Built high-concurrency asynchronous REST APIs using FastAPI',
                'Containerized backend workloads with Docker for reliable deployments',
                'Produced interactive web dashboards using Streamlit supporting sub-100 ms UI SLAs'
            ],
            tech: ['Python', 'Machine Learning', 'FastAPI', 'Streamlit', 'Docker'],
            link: 'https://loan-predication-ayush04h.streamlit.app/',
            github: null,
            bgImage: '/loan-prediction-bg.png'
        },
        {
            title: 'LLM-Doc-Summarizer',
            badge: 'Generative AI & NLP',
            description: 'An asynchronous document processing application using Python and open-source NLP models (BART) for dynamic text summarization across complex document structures.',
            features: [
                'Programmed asynchronous document processing application using BART models',
                'Designed modular backend architecture using FastAPI microservices',
                'Accelerated unstructured document upload and ingestion turnaround times',
                'Configured automated CI/CD pipelines via GitHub Actions',
                'Containerized backend workloads in Docker to ensure high service availability'
            ],
            tech: ['Python', 'React', 'GenAI / BART', 'FastAPI', 'Docker', 'GitHub Actions'],
            link: null,
            github: 'https://github.com/Ayush04H/LLM-Doc-Summarizer',
            bgImage: '/llm-doc-bg.png'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.project-card',
                { opacity: 0, y: 80, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        Architecting full-stack distributed platforms, real-time telematics, and AI/ML services
                    </p>
                </div>

                <div className="projects-banner animate-fadeInUp">
                    <img
                        src="/projects-illustration.png"
                        alt="Projects Overview"
                        className="projects-banner-img"
                    />
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-card-bg" style={{ backgroundImage: `url(${project.bgImage})` }}></div>
                            <div className="project-content">
                                {project.badge && (
                                    <div className="project-badge">
                                        <Sparkles size={14} />
                                        <span>{project.badge}</span>
                                    </div>
                                )}
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-features">
                                    <h4 className="features-title">Key Highlights:</h4>
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
        </section>
    );
};

export default Projects;
