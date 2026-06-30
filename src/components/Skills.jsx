import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            category: 'Languages & Fundamentals',
            skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'Bash', 'Data Structures & Algorithms', 'Object-Oriented Design (OOD)']
        },
        {
            category: 'Backend & Web Frameworks',
            skills: ['Spring Boot 3', 'React', 'Django', 'FastAPI', 'RESTful APIs', 'Microservices Architecture', 'WebSockets', 'Nginx']
        },
        {
            category: 'Cloud, DevOps & Systems',
            skills: ['AWS (EC2, RDS, Cognito, S3, IAM)', 'Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'CI/CD Pipelines', 'Distributed Systems']
        },
        {
            category: 'Data, AI & Best Practices',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Machine Learning', 'PyTorch', 'LLMs & GenAI', 'ETL Pipelines', 'Unit Testing / TDD', 'Agile / Scrum', 'Git']
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.skill-category');
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100, scale: 0.88, rotateX: 12 },
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

    return (
        <section id="skills" className="section skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Skills</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        My complete engineering arsenal optimized for scalable microservices, cloud infrastructure, and AI systems
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
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
