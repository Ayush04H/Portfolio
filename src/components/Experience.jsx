import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);

    const experiences = [
        {
            company: 'Street Surge',
            role: 'Software Development Engineer',
            period: 'Feb 2025 – Present',
            location: 'Gurgaon, India',
            color: 'var(--color-amber)',
            achievements: [
                'Engineered 3 full-stack platforms (Spring Boot, React, Python) serving 500+ daily active users.',
                'Collaborated across 4 cross-functional teams shipping 12+ software releases on schedule.',
                'Optimized routing algorithms processing 2M+ nodes, reducing fleet fuel costs by ~$15K.',
                'Managed AWS infrastructure (EC2, RDS, Secrets Manager, Cognito) with 99.5% uptime.',
                'Reduced P95 API latency by refactoring PostgreSQL query plans.',
                'Built Django REST APIs automating 8 manual verification steps.',
                'Established CI/CD with 90%+ unit test coverage.'
            ]
        },
        {
            company: 'CereLabs',
            role: 'Software Engineer Intern',
            period: 'Jun 2024 – Aug 2024',
            location: 'Mumbai, India',
            color: 'var(--color-indigo)',
            achievements: [
                'Built GenAI testing framework (Python + GPT-4 + OLLAMA) across 1,000+ complex prompt cases.',
                'Co-developed vector similarity search cutting embedding latency across 50K+ documents.',
                'Authored design docs and ran 200+ test cases to meet strict production SLAs.',
                'Refined data ingestion pipelines handling 10GB+ unstructured data.'
            ]
        },
        {
            company: 'OziBook',
            role: 'Data Analyst Intern',
            period: 'Jan 2024 – Mar 2024',
            location: 'Bengaluru, India',
            color: 'var(--color-violet)',
            achievements: [
                'Automated web scraping with Python & BeautifulSoup, saving 15 hours/week.',
                'Built 5 ETL pipelines cleaning 100K+ records for strategic analytics.',
                'Implemented monitoring scripts across 3 database sources.'
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Laser beam draws downward as user scrolls
            gsap.fromTo('.timeline-beam',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    transformOrigin: 'top center',
                    scrollTrigger: {
                        trigger: '.exp-timeline',
                        start: 'top 72%',
                        end:   'bottom 58%',
                        scrub: 1.8,
                    }
                }
            );

            // Cards stagger in
            gsap.fromTo('.exp-item',
                { opacity: 0, x: -45 },
                {
                    opacity: 1, x: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.exp-timeline', start: 'top 78%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="section experience" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Work Experience</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Building scalable systems, AI validation engines, and high-volume data pipelines
                    </p>
                </div>

                <div className="exp-timeline">
                    {/* Vertical track */}
                    <div className="timeline-track">
                        <div className="timeline-beam" />
                    </div>

                    {experiences.map((exp, i) => (
                        <div key={i} className="exp-item" style={{ '--exp-color': exp.color }}>
                            {/* Node */}
                            <div className="exp-node">
                                <div className="node-core" />
                                <div className="node-ring" />
                            </div>

                            {/* Card */}
                            <Card3D className="exp-card" maxTilt={6}>
                                <div className="exp-top-bar" />
                                <div className="exp-header">
                                    <div>
                                        <h3 className="exp-company">{exp.company}</h3>
                                        <p className="exp-role">{exp.role}</p>
                                    </div>
                                    <div className="exp-meta">
                                        <div className="meta-row">
                                            <Calendar size={12} style={{ color: exp.color }} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="meta-row">
                                            <MapPin size={12} style={{ color: exp.color }} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="exp-achievements">
                                    {exp.achievements.map((a, ai) => (
                                        <li key={ai} className="exp-ach">
                                            <CheckCircle2 size={13} style={{ color: exp.color }} className="ach-icon" />
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card3D>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
