import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            category: 'Languages & Fundamentals',
            skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'Bash', 'DSA', 'OOD'],
            color: 'var(--color-amber)',
            icon: '{ }'
        },
        {
            category: 'Backend & Web Frameworks',
            skills: ['Spring Boot 3', 'React', 'Django', 'FastAPI', 'REST APIs', 'Microservices', 'WebSockets', 'Nginx'],
            color: 'var(--color-indigo)',
            icon: '⚙'
        },
        {
            category: 'Cloud, DevOps & Systems',
            skills: ['AWS (EC2, RDS, Cognito, S3)', 'Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'CI/CD'],
            color: 'var(--color-violet)',
            icon: '☁'
        },
        {
            category: 'Data, AI & Best Practices',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'ML / PyTorch', 'LLMs & GenAI', 'ETL Pipelines', 'TDD', 'Agile'],
            color: 'var(--color-emerald)',
            icon: '◈'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.skill-card',
                { opacity: 0, y: 55, rotationX: 25, rotationY: 10, scale: 0.9, transformPerspective: 1000 },
                {
                    opacity: 1, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="section skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Skills</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        My engineering stack — scalable microservices, cloud infrastructure, and AI systems
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((cat, i) => (
                        <Card3D
                            key={i}
                            className="skill-card"
                            style={{ '--cat-color': cat.color }}
                            maxTilt={10}
                        >
                            <div className="cat-accent-top"></div>
                            <div className="cat-icon">{cat.icon}</div>
                            <h3 className="cat-title">{cat.category}</h3>
                            <div className="skills-pills">
                                {cat.skills.map((s, si) => (
                                    <span key={si} className="skill-pill">{s}</span>
                                ))}
                            </div>
                        </Card3D>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
