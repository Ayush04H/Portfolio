import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
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
            location: 'Pune, India',
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
            achievements: [
                'Automated web scraping and data ingestion workflows using Python and BeautifulSoup, saving 15 hours of manual data collection weekly.',
                'Created 5 ETL data transformation pipelines to clean and structure 100K+ records into relational databases, enabling faster and more accurate strategic business analytics.',
                'Implemented monitoring and data validation scripts across 3 database sources, ensuring robust pipeline reliability and accelerating strategic reporting cycles.'
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline vertical line drawing down with scroll
            gsap.fromTo(
                '.timeline',
                { '--progress': 0 },
                {}
            );

            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -80, scale: 0.92 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
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

    return (
        <section id="experience" className="section experience" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Work Experience</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        My professional engineering track record delivering scalable systems and measurable business impact
                    </p>
                </div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <div className="experience-card-bg" style={{ backgroundImage: "url('/education-bg.png')" }}></div>
                                <div className="experience-header">
                                    <div className="experience-title-group">
                                        <h3 className="company-name">{exp.company}</h3>
                                        <p className="role-title">{exp.role}</p>
                                    </div>
                                    <div className="experience-meta">
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="meta-item">
                                            <MapPin size={16} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {exp.achievements && (
                                    <ul className="achievements-list">
                                        {exp.achievements.map((item, idx) => (
                                            <li key={idx} className="achievement-item">
                                                {item}
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
