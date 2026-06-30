import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    const stats = [
        { icon: <Calendar size={28} />, value: '1+', label: 'Years Experience', color: '#ff5e6c', bgImage: '/stats-coding-bg.png' },
        { icon: <Sparkles size={28} />, value: '12+', label: 'Production Releases', color: '#feb300', bgImage: '/stats-projects-bg.png' },
        { icon: <Award size={28} />, value: '8.90', label: 'B.Tech CGPA', color: '#ffaaab', bgImage: '/stats-cgpa-bg.png' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-image-container',
                { opacity: 0, x: -70 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo(
                '.about-text',
                { opacity: 0, x: 70 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo(
                '.stat-card',
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 85%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="section about" ref={sectionRef}>
            <div className="about-decorative-bg"></div>

            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        Designing, developing, and running highly available distributed systems and microservices
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-main-wrapper">
                        <div className="about-image-container">
                            <img src="/about-illustration.png" alt="Developer setup" className="about-image-main" />
                        </div>
                        <div className="about-text">
                            <p className="about-paragraph">
                                I'm a customer-focused <strong className="text-gradient">Software Development Engineer</strong> with over <strong className="highlight-text">1+ years</strong> of professional experience designing, developing, and running highly available distributed systems and backend microservices.
                            </p>
                            <p className="about-paragraph">
                                Currently at <strong className="highlight-text">Street Surge</strong>, I architect full-stack platforms using <strong>Spring Boot</strong>, <strong>React</strong>, and <strong>Python</strong>, serving 500+ daily active users and optimizing routing algorithms that process 2M+ nodes to deliver substantial enterprise cost savings.
                            </p>
                            <p className="about-paragraph">
                                Holding a Bachelor of Technology in IT from Bharati Vidyapeeth's College of Engineering with a cumulative GPA of <strong className="text-gradient">8.90 / 10</strong>, I possess profound command over <strong>Java</strong>, <strong>AWS Cloud Infrastructure</strong>, and modern CI/CD best practices.
                            </p>
                        </div>
                    </div>

                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card"
                                style={{ '--stat-color': stat.color }}
                            >
                                <div className="stat-card-bg" style={{ backgroundImage: `url(${stat.bgImage})` }}></div>
                                <div className="stat-icon">
                                    {stat.icon}
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-glow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
