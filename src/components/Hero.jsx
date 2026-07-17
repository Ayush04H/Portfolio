import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from './canvas/ParticleCanvas';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const heroRef = useRef(null);

    const roles = [
        'Software Development Engineer',
        'Full-Stack Java & Python Engineer',
        'Distributed Systems & AWS Architect',
        'AI/ML & Microservices Developer'
    ];

    useEffect(() => {
        const iv = setInterval(() => setCurrentRole(p => (p + 1) % roles.length), 3200);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });
            tl.fromTo('.hero-badge',
                { y: -16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
            )
            .fromTo('.hero-title',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
                '-=0.25'
            )
            .fromTo('.hero-role-container',
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo('.hero-description',
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
                '-=0.3'
            )
            .fromTo(['.hero-cta', '.hero-social'],
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: 'power2.out' },
                '-=0.3'
            );

            // Very gentle video parallax
            gsap.to('.hero-video-wrapper', {
                y: 70,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Subtle magnetic buttons
    const onMagMove = (e) => {
        const btn = e.currentTarget;
        const r   = btn.getBoundingClientRect();
        const x   = (e.clientX - r.left - r.width  / 2) * 0.22;
        const y   = (e.clientY - r.top  - r.height / 2) * 0.22;
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    };

    const onMagLeave = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Canvas2D particles — zero deps, zero version conflicts */}
            <ParticleCanvas />

            {/* Ambient glows */}
            <div className="hero-glow hero-glow-amber" aria-hidden="true" />
            <div className="hero-glow hero-glow-indigo"  aria-hidden="true" />

            <div className="hero-split container">
                {/* ── Left: Text content ── */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        <span>Open to new opportunities</span>
                    </div>

                    <h1 className="hero-title">
                        Ayush Kumar<br />
                        <span className="text-gradient">Srivastava</span>
                    </h1>

                    <div className="hero-role-container">
                        <p className="hero-role">
                            <span className="role-prefix">&#47;&#47;</span>
                            <span className="role-text" key={currentRole}>{roles[currentRole]}</span>
                            <span className="cursor-blink">_</span>
                        </p>
                    </div>

                    <p className="hero-description">
                        Software Development Engineer with <strong>1+ years</strong> building highly
                        available distributed systems at{' '}
                        <strong className="highlight-text">Street Surge</strong> and{' '}
                        <strong className="highlight-text">CereLabs</strong>.
                    </p>

                    <div className="hero-cta">
                        <a href="#contact" className="btn btn-primary magnetic-btn"
                           onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
                            Get In Touch
                        </a>
                        <a href="#projects" className="btn btn-secondary magnetic-btn"
                           onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
                            View Projects
                        </a>
                    </div>

                    <div className="hero-social">
                        {[
                            { href: 'https://github.com/Ayush04H',    Icon: Github,   label: 'GitHub'   },
                            { href: 'http://www.linkedin.com/in/ayush-srivastava-aks04102002', Icon: Linkedin, label: 'LinkedIn' },
                            { href: 'mailto:ayush050419@gmail.com',   Icon: Mail,     label: 'Email'    },
                        ].map(({ href, Icon, label }) => (
                            <a key={label} href={href}
                               target={href.startsWith('http') ? '_blank' : undefined}
                               rel="noopener noreferrer"
                               className="social-link magnetic-btn"
                               onMouseMove={onMagMove} onMouseLeave={onMagLeave}
                               aria-label={label}>
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Right: Video ── */}
                <div className="hero-visual">
                    <div className="hero-video-wrapper">
                        <video className="hero-video" autoPlay loop muted playsInline>
                            <source src="/Video Project 1.mp4" type="video/mp4" />
                        </video>
                        <div className="hero-video-overlay" />

                        <div className="hero-stat hero-stat-tl">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Daily Users</span>
                        </div>
                        <div className="hero-stat hero-stat-br">
                            <span className="stat-number">2M+</span>
                            <span className="stat-label">Nodes / Day</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-cue">
                <ChevronDown size={20} />
            </div>
        </section>
    );
};

export default Hero;
