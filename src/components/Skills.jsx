import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveWidget from './interactive/InteractiveWidget';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            category: 'Languages & Fundamentals',
            skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'Bash', 'Data Structures & Algorithms', 'Object-Oriented Design (OOD)'],
            color: '#00f2fe'
        },
        {
            category: 'Backend & Web Frameworks',
            skills: ['Spring Boot 3', 'React', 'Django', 'FastAPI', 'RESTful APIs', 'Microservices Architecture', 'WebSockets', 'Nginx'],
            color: '#a855f7'
        },
        {
            category: 'Cloud, DevOps & Systems',
            skills: ['AWS (EC2, RDS, Cognito, S3, IAM)', 'Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'CI/CD Pipelines', 'Distributed Systems'],
            color: '#4facfe'
        },
        {
            category: 'Data, AI & Best Practices',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Machine Learning', 'PyTorch', 'LLMs & GenAI', 'ETL Pipelines', 'Unit Testing / TDD', 'Agile / Scrum', 'Git'],
            color: '#38bdf8'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.skill-category');
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100, scale: 0.88, rotateX: 14 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'top 65%',
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
        <section id="skills" className="section skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Skills & System Hub</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        Explore interactive microservices state simulations and my complete ATS engineering stack
                    </p>
                </div>

                {/* Interactive Rive / Canvas State Machine Widget */}
                <InteractiveWidget />

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div 
                            key={index} 
                            className="skill-category holographic-card"
                            style={{ '--category-color': category.color }}
                            onMouseMove={handleCardTilt}
                            onMouseLeave={handleCardReset}
                        >
                            <div className="skill-category-bg" style={{ backgroundImage: "url('/skills-bg.png')" }}></div>
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-tag">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
