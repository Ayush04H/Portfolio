import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);

    const experiences = [
        {
            company: 'Street Surge',
            role: 'Software Development Engineer',
            period: 'Feb 2025 - Present',
            location: 'Gurgaon, India',
            color: '#00f2fe',
            achievements: [
                'Engineered 3 full-stack web platforms using Spring Boot, React, and Python, connecting 6+ backend microservices through an API gateway to serve 500+ daily active users with high reliability.',
                'Collaborated with product managers and engineers across 4 cross-functional teams to define technical roadmaps, prioritize feature backlogs, and successfully launch 12+ client-facing software releases on schedule.',
                'Optimized custom routing algorithms processing 2M+ traffic nodes, reducing transit distances and lowering enterprise fleet fuel consumption by an estimated $15K overall.',
                'Managed secure multi-tenant cloud infrastructure on AWS (EC2, RDS, Secrets Manager, Cognito) with Role-Based Access Control (RBAC) and Nginx reverse proxies, maintaining 99.5% system availability across 3 production environments.',
                'Enhanced backend system performance by automating health monitoring pipelines and refactoring PostgreSQL query execution plans, significantly reducing P95 API response latency and lowering on-call support incidents.',
                'Constructed backend REST APIs using Django to automate 8 manual verification steps, accelerating data processing turnaround times for business operations.',
                'Introduced engineering best practices including peer code reviews, automated CI/CD pipelines with 90%+ unit test coverage, and comprehensive internal API documentation.'
            ]
        },
        {
            company: 'CereLabs',
            role: 'Software Engineer Intern',
            period: 'Jun 2024 - Aug 2024',
            location: 'Mumbai, India',
            color: '#a855f7',
            achievements: [
                'Established an automated testing framework using Python, GPT-4, and OLLAMA to evaluate generative AI models across 1,000+ complex prompt validation cases.',
                'Co-developed scalable vector similarity search modules with senior engineers, implementing algorithm optimizations to reduce embedding inference latency across 50K+ document samples.',
                'Authored comprehensive technical design documentation and executed 200+ validation test cases to ensure reliable software deployments met strict production SLAs.',
                'Refined backend data ingestion pipelines handling 10GB+ of unstructured data, improving downstream LLM response accuracy and eliminating recurrent pre-processing failures.'
            ]
        },
        {
            company: 'OziBook',
            role: 'Data Analyst Intern',
            period: 'Jan 2024 - Mar 2024',
            location: 'Bengaluru, India',
            color: '#4facfe',
            achievements: [
                'Automated web scraping and data ingestion workflows using Python and BeautifulSoup, saving 15 hours of manual data collection weekly.',
                'Created 5 ETL data transformation pipelines to clean and structure 100K+ records into relational databases, enabling faster and more accurate strategic business analytics.',
                'Implemented monitoring and data validation scripts across 3 database sources, ensuring robust pipeline reliability and accelerating strategic reporting cycles.'
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate laser beam drawing down the vertical spine
            gsap.fromTo(
                '.timeline-laser-beam',
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.timeline',
                        start: 'top 75%',
                        end: 'bottom 60%',
                        scrub: 1,
                    }
                }
            );

            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -80, scale: 0.92, rotateY: -10 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            end: 'top 60%',
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
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

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
        <section id="experience" className="section experience" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Production Experience Timeline</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        My professional engineering track record building scalable microservices, AI validation engines, and high-volume ETL pipelines
                    </p>
                </div>

                <div className="timeline">
                    {/* Laser beam track line */}
                    <div className="timeline-laser-beam"></div>

                    {experiences.map((exp, index) => (
                        <div key={index} className="timeline-item" style={{ '--exp-color': exp.color }}>
                            <div className="timeline-marker">
                                <div className="marker-inner-dot"></div>
                                <div className="marker-pulse"></div>
                            </div>
                            <div 
                                className="timeline-content holographic-card"
                                onMouseMove={handleCardTilt}
                                onMouseLeave={handleCardReset}
                            >
                                <div className="experience-card-bg" style={{ backgroundImage: "url('/education-bg.png')" }}></div>
                                <div className="experience-header">
                                    <div className="experience-title-group">
                                        <h3 className="company-name">{exp.company}</h3>
                                        <p className="role-title">{exp.role}</p>
                                    </div>
                                    <div className="experience-meta">
                                        <div className="meta-item">
                                            <Calendar size={16} color={exp.color} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="meta-item">
                                            <MapPin size={16} color={exp.color} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {exp.achievements && (
                                    <ul className="achievements-list">
                                        {exp.achievements.map((item, idx) => (
                                            <li key={idx} className="achievement-item">
                                                <CheckCircle2 size={16} className="achievement-bullet" color={exp.color} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
