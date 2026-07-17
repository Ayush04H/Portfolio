import React, { useEffect, useRef } from 'react';
import { Calendar, Award, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    const stats = [
        { icon: <Calendar size={24} />, value: '1+', label: 'Years Experience', color: 'var(--color-amber)' },
        { icon: <Code2 size={24} />,    value: '12+', label: 'Prod Releases',   color: 'var(--color-indigo)' },
        { icon: <Award size={24} />,    value: '8.90', label: 'B.Tech CGPA',    color: 'var(--color-violet)' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-image-side',
                { opacity: 0, x: -60, rotationY: -25, transformPerspective: 1000 },
                {
                    opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
                }
            );
            gsap.fromTo('.about-text-side',
                { opacity: 0, x: 60, rotationY: 25, transformPerspective: 1000 },
                {
                    opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
                }
            );
            gsap.fromTo('.about-stat',
                { opacity: 0, y: 40, rotationX: 25, transformPerspective: 800 },
                {
                    opacity: 1, y: 0, rotationX: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-stats-row', start: 'top 88%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="section about" ref={sectionRef}>
            <div className="about-glow" aria-hidden="true" />
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Architecting and scaling distributed backend systems and full-stack platforms
                    </p>
                </div>

                <div className="about-wrapper">
                    {/* Image */}
                    <div className="about-image-side">
                        <Card3D className="about-image-card" maxTilt={10}>
                            <img src="/about-illustration.png" alt="Developer" className="about-img" />
                            <div className="about-img-badge">
                                <Code2 size={13} color="var(--color-amber)" />
                                <span>Systems Architect</span>
                            </div>
                        </Card3D>
                    </div>

                    {/* Text */}
                    <div className="about-text-side">
                        <p className="about-para">
                            I'm a <strong className="text-gradient">Software Development Engineer</strong> with
                            over <strong className="highlight-text">1+ years</strong> of professional experience
                            designing and running highly available distributed systems and microservices.
                        </p>
                        <p className="about-para">
                            Currently at <strong className="highlight-text">Street Surge</strong> (Gurgaon), I architect
                            full-stack platforms using <strong>Spring Boot</strong>, <strong>React</strong>, and{' '}
                            <strong>Python</strong>, serving 500+ daily users and optimizing routing over 2M+ nodes.
                        </p>
                        <p className="about-para">
                            B.Tech in IT from Bharati Vidyapeeth's College of Engineering with a cumulative GPA of{' '}
                            <strong className="text-gradient">8.90 / 10</strong>. Deep expertise in{' '}
                            <strong>Java</strong>, <strong>AWS Cloud</strong>, and CI/CD automation.
                        </p>

                        <div className="about-stats-row">
                            {stats.map((s, i) => (
                                <Card3D key={i} className="about-stat" style={{ '--stat-color': s.color }} maxTilt={14}>
                                    <div className="stat-icon-wrap">{s.icon}</div>
                                    <div className="stat-val">{s.value}</div>
                                    <div className="stat-lbl">{s.label}</div>
                                </Card3D>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
