import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, X, Activity, Cpu, Server, ShieldCheck, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const [selected, setSelected] = useState(null);

    const projects = [
        {
            title: 'Fleet-Optimization Platform',
            badge: 'Enterprise Telematics',
            color: 'var(--color-amber)',
            description: 'Enterprise fleet telematics platform with real-time vehicle tracking, automated dispatch, and optimized routing algorithms processing 2M+ nodes.',
            features: [
                'Live location broadcasting via WebSockets < 50ms latency',
                'Scheduling validation for driver work-hour compliance',
                'Automated severe-weather rerouting with CRON jobs',
                'Routing saving $15K+ in fleet fuel costs',
                'Multi-tenant AWS infrastructure — 99.5% availability'
            ],
            tech: ['Java', 'Spring Boot 3', 'React', 'PostgreSQL', 'WebSockets', 'AWS'],
            link: 'https://fleet-optimization.ayushpersonal.space/',
            github: 'https://github.com/Ayush04H/Fleet-Optimization',
            arch: {
                throughput: '2M+ Nodes / Day',
                latency:    '< 50ms WebSocket',
                database:   'PostgreSQL Spatial',
                impact:     '$15K+ Fuel Savings'
            }
        },
        {
            title: 'Loan Approval ML Engine',
            badge: 'ML Inference',
            color: 'var(--color-indigo)',
            description: 'High-concurrency ML inference microservice predicting loan approvals across 10K+ records with sub-20ms response SLAs and async FastAPI endpoints.',
            features: [
                'ML model evaluating 10K+ historical records',
                'Sub-20ms prediction via optimized matrix ops',
                'Async REST APIs with FastAPI & Pydantic validation',
                'Containerized with Docker for multi-env deploys',
                'Interactive Streamlit dashboard — < 100ms SLA'
            ],
            tech: ['Python', 'Machine Learning', 'FastAPI', 'Streamlit', 'Docker'],
            link: 'https://loan-predication-ayush04h.streamlit.app/',
            github: null,
            arch: {
                throughput: '10K+ Records',
                latency:    '< 20ms Inference',
                database:   'In-Memory ML Cache',
                impact:     '99.9% Risk Automation'
            }
        },
        {
            title: 'LLM-Doc-Summarizer',
            badge: 'GenAI & NLP',
            color: 'var(--color-violet)',
            description: 'Async document processing app using BART transformer models for dynamic text summarization with vectorized embedding storage for semantic retrieval.',
            features: [
                'Async processing with BART transformer models',
                'Modular FastAPI microservice + background workers',
                'Automated CI/CD via GitHub Actions',
                'Docker containerization for high availability',
                'Vectorized embeddings for semantic retrieval'
            ],
            tech: ['Python', 'React', 'BART', 'FastAPI', 'Docker', 'GitHub Actions'],
            link: null,
            github: 'https://github.com/Ayush04H/LLM-Doc-Summarizer',
            arch: {
                throughput: 'Multi-Page Parsing',
                latency:    'Async Background Queue',
                database:   'Vector Embeddings',
                impact:     '85% Review Time Saved'
            }
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.project-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' }
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
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Distributed platforms, real-time telematics, and high-concurrency ML inference services
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((p, i) => (
                        <Card3D
                            key={i}
                            className="project-card"
                            style={{ '--proj-color': p.color }}
                            maxTilt={8}
                            inner3D={false}
                        >
                            <div className="proj-top-bar"></div>
                            <div className="proj-body card-3d-inner">
                                <div className="proj-header">
                                    <span className="proj-badge">{p.badge}</span>
                                    <button className="arch-trigger" onClick={() => setSelected(p)}>
                                        <Layers size={13} /> Arch
                                    </button>
                                </div>

                                <h3 className="proj-title">{p.title}</h3>
                                <p className="proj-desc">{p.description}</p>

                                <ul className="proj-features">
                                    {p.features.map((f, fi) => (
                                        <li key={fi} className="proj-feature">
                                            <span className="feat-dot" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="proj-tech">
                                    {p.tech.map((t, ti) => <span key={ti} className="tech-chip">{t}</span>)}
                                </div>

                                <div className="proj-links">
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-primary">
                                            <ExternalLink size={15} /> Live Demo
                                        </a>
                                    )}
                                    {p.github && (
                                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-ghost">
                                            <Github size={15} /> Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Card3D>
                    ))}
                </div>
            </div>

            {/* Architecture Modal */}
            {selected && (
                <div className="modal-overlay animate-fadeIn" onClick={() => setSelected(null)}>
                    <div className="modal-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-accent" style={{ background: selected.color }} />
                        <button className="modal-close" onClick={() => setSelected(null)}>
                            <X size={18} />
                        </button>

                        <div className="modal-head">
                            <Layers size={22} style={{ color: selected.color || 'var(--color-amber)' }} />
                            <div>
                                <h3 className="modal-title">{selected.title}</h3>
                                <p className="modal-sub">System Architecture · Production Specs</p>
                            </div>
                        </div>

                        <div className="modal-metrics">
                            {[
                                { Icon: Activity,    label: 'Throughput',     val: selected.arch.throughput, c: 'var(--color-amber)'   },
                                { Icon: Cpu,         label: 'Latency SLA',    val: selected.arch.latency,    c: 'var(--color-indigo)'  },
                                { Icon: Server,      label: 'Data Layer',     val: selected.arch.database,   c: 'var(--color-violet)'  },
                                { Icon: ShieldCheck, label: 'Business Impact', val: selected.arch.impact,    c: 'var(--color-emerald)' },
                            ].map(({ Icon, label, val, c }) => (
                                <div key={label} className="metric-tile">
                                    <Icon size={17} style={{ color: c }} />
                                    <span className="metric-lbl">{label}</span>
                                    <span className="metric-val">{val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="modal-footer">
                            {selected.link && (
                                <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn btn-glow">
                                    <ExternalLink size={15} /> Live Demo
                                </a>
                            )}
                            {selected.github && (
                                <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    <Github size={15} /> View Code
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
