import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, Sparkles, Code2, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    const stats = [
        { icon: <Calendar size={28} />, value: '1+', label: 'Years Experience', color: '#00f2fe', bgImage: '/stats-coding-bg.png' },
        { icon: <Sparkles size={28} />, value: '12+', label: 'Production Releases', color: '#a855f7', bgImage: '/stats-projects-bg.png' },
        { icon: <Award size={28} />, value: '8.90', label: 'B.Tech CGPA', color: '#4facfe', bgImage: '/stats-cgpa-bg.png' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-image-container',
                { opacity: 0, x: -100, rotateY: -15, scale: 0.9 },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        end: 'top 45%',
                        scrub: 1,
                    }
                }
            );

            gsap.fromTo(
                '.about-text',
                { opacity: 0, x: 100 },
                {
                    opacity: 1,
                    x: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        end: 'top 45%',
                        scrub: 1,
                    }
                }
            );

            const statsCards = gsap.utils.toArray('.stat-card');
            statsCards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, scale: 0.85, rotateX: 12 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
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
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.03,
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
        <section id="about" className="section about" ref={sectionRef}>
            <div className="about-decorative-bg"></div>

            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        Architecting, building, and scaling distributed backend systems and full-stack web platforms
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-main-wrapper">
                        <div 
                            className="about-image-container holographic-card"
                            onMouseMove={handleCardTilt}
                            onMouseLeave={handleCardReset}
                            style={{ padding: '1rem', cursor: 'pointer' }}
                        >
                            <img src="/about-illustration.png" alt="Developer setup" className="about-image-main" />
                            <div className="about-image-overlay-badge">
                                <Code2 size={16} color="#00f2fe" />
                                <span>SYSTEMS ARCHITECT & DEV</span>
                            </div>
                        </div>

                        <div className="about-text">
                            <p className="about-paragraph">
                                I'm a customer-focused <strong className="text-gradient">Software Development Engineer</strong> with over <strong className="highlight-text">1+ years</strong> of professional experience designing, developing, and running highly available distributed systems and backend microservices.
                            </p>
                            <p className="about-paragraph">
                                Currently at <strong className="highlight-text">Street Surge</strong> (Gurgaon), I architect full-stack platforms using <strong>Spring Boot</strong>, <strong>React</strong>, and <strong>Python</strong>, serving 500+ daily active users and optimizing routing algorithms that process 2M+ nodes to deliver substantial enterprise cost savings ($15K+).
                            </p>
                            <p className="about-paragraph">
                                Holding a Bachelor of Technology in IT from Bharati Vidyapeeth's College of Engineering with a cumulative GPA of <strong className="text-gradient">8.90 / 10</strong>, I possess profound command over <strong>Java</strong>, <strong>AWS Cloud Infrastructure</strong> (EC2, RDS, Cognito, Secrets Manager), and modern CI/CD automation pipelines.
                            </p>
                        </div>
                    </div>

                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card holographic-card"
                                style={{ '--stat-color': stat.color }}
                                onMouseMove={handleCardTilt}
                                onMouseLeave={handleCardReset}
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
