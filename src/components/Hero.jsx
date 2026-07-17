import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    const roles = [
        'Software Development Engineer',
        'Full-Stack Java & Python Engineer',
        'Distributed Systems & AWS Architect',
        'AI/ML & Microservices Developer'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    // GSAP character reveal & scrollytelling scrub
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance stagger timeline
            const tl = gsap.timeline();
            tl.fromTo('.hero-greeting', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
            .fromTo('.hero-title-char', 
                { y: 80, opacity: 0, rotateZ: 5 }, 
                { y: 0, opacity: 1, rotateZ: 0, stagger: 0.03, duration: 0.9, ease: 'back.out(1.7)' }, 
                '-=0.4'
            )
            .fromTo(['.hero-role-container', '.hero-description', '.hero-cta', '.hero-social'], 
                { y: 40, opacity: 0 }, 
                { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, 
                '-=0.5'
            );

            // Scrollytelling parallax scrub effect when scrolling down past hero
            gsap.to('.hero-video-wrapper', {
                y: 150,
                scale: 0.82,
                rotateX: 14,
                rotateY: -5,
                opacity: 0.2,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8,
                }
            });

            gsap.to('.hero-content', {
                y: -110,
                opacity: 0,
                scale: 0.95,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: '15% top',
                    end: '75% top',
                    scrub: 0.8,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Magnetic Button Effect helper
    const handleMagneticMove = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    };

    const handleMagneticLeave = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    const nameText = "Ayush Kumar Srivastava";

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-split-container">
                {/* Left Side: Video Container with 3D Parallax */}
                <div className="hero-left">
                    <div className="hero-video-wrapper holographic-card">
                        <video
                            className="hero-video-split"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/Video Project 1.mp4" type="video/mp4" />
                        </video>
                        <div className="hero-overlay-split"></div>
                        <div className="hero-badge-float">
                            <Sparkles size={16} color="#00f2fe" />
                            <span>ATS VERIFIED ENGINEER</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content with Character Split Reveal */}
                <div className="hero-right">
                    <div className="hero-content">
                        <div className="hero-text">
                            <p className="hero-greeting">👋 Welcome to my interactive space</p>
                            
                            <h1 className="hero-title" ref={titleRef}>
                                {nameText.split(" ").map((word, wordIndex) => (
                                    <span key={wordIndex} className="hero-word" style={{ display: 'inline-block', marginRight: '0.28em' }}>
                                        {word.split("").map((char, charIndex) => (
                                            <span key={charIndex} className="hero-title-char" style={{ display: 'inline-block' }}>
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </h1>

                            <div className="hero-role-container">
                                <p className="hero-role">
                                    <span className="role-text">{roles[currentRole]}</span>
                                    <span className="cursor-blink">|</span>
                                </p>
                            </div>

                            <p className="hero-description">
                                Customer-focused Software Development Engineer with 1+ years of experience designing, developing, and deploying highly available distributed systems and microservices at <strong>Street Surge</strong> and <strong>CereLabs</strong>.
                            </p>

                            <div className="hero-cta">
                                <a 
                                    href="#contact" 
                                    className="btn btn-primary magnetic-btn"
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticLeave}
                                >
                                    Get In Touch
                                </a>
                                <a 
                                    href="#projects" 
                                    className="btn btn-secondary magnetic-btn"
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticLeave}
                                >
                                    Explore Projects
                                </a>
                            </div>

                            <div className="hero-social">
                                <a
                                    href="https://github.com/Ayush04H"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link magnetic-btn"
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticLeave}
                                    aria-label="GitHub"
                                >
                                    <Github size={22} />
                                </a>
                                <a
                                    href="http://www.linkedin.com/in/ayush-srivastava-aks04102002"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link magnetic-btn"
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticLeave}
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={22} />
                                </a>
                                <a
                                    href="mailto:ayush050419@gmail.com"
                                    className="social-link magnetic-btn"
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticLeave}
                                    aria-label="Email"
                                >
                                    <Mail size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
