import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const roles = [
        'Software Development Engineer',
        'Full-Stack Developer',
        'AI/ML Engineer',
        'DevOps Enthusiast'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="decorative-blob blob-purple orb-1" style={{ width: '500px', height: '500px', top: '-200px', right: '-200px' }}></div>
                <div className="decorative-blob blob-blue orb-2" style={{ width: '400px', height: '400px', bottom: '-150px', left: '-150px' }}></div>
                <div className="decorative-blob blob-pink orb-3" style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting animate-fadeInUp stagger-1">👋 Hi, I'm</p>
                        <h1 className="hero-title animate-fadeInUp stagger-2">
                            Ayush Kumar Srivastava
                        </h1>
                        <div className="hero-role-container animate-fadeInUp stagger-3">
                            <p className="hero-role">
                                <span className="role-text">{roles[currentRole]}</span>
                                <span className="cursor-blink">|</span>
                            </p>
                        </div>
                        <p className="hero-description animate-fadeInUp stagger-4">
                            Passionate about building innovative solutions with AI/ML, Full-Stack Development,
                            and DevOps. Currently crafting cutting-edge software at Street Surge.
                        </p>

                        <div className="hero-cta animate-fadeInUp stagger-5">
                            <a href="#contact" className="btn btn-primary">
                                Get In Touch
                            </a>
                            <a href="#projects" className="btn btn-secondary">
                                View My Work
                            </a>
                        </div>

                        <div className="hero-social animate-scaleIn stagger-5">
                            <a
                                href="https://github.com/Ayush04H"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link hover-lift"
                                aria-label="GitHub"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href="http://www.linkedin.com/in/ayush-srivastava-aks04102002"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link hover-lift"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href="mailto:ayush050419@gmail.com"
                                className="social-link hover-lift"
                                aria-label="Email"
                            >
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <button
                    onClick={scrollToAbout}
                    className="scroll-indicator animate-float"
                    aria-label="Scroll to About section"
                >
                    <ChevronDown size={32} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
