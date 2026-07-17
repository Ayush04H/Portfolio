import React from 'react';
import { Github, Linkedin, Mail, Code2, ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        { icon: <Github size={18} />, href: 'https://github.com/Ayush04H', label: 'GitHub' },
        { icon: <Linkedin size={18} />, href: 'http://www.linkedin.com/in/ayush-srivastava-aks04102002', label: 'LinkedIn' },
        { icon: <Mail size={18} />, href: 'mailto:ayush050419@gmail.com', label: 'Email' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-glow" aria-hidden="true" />
            <div className="footer-top-divider" />

            <div className="container">
                <div className="footer-content">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <div className="footer-logo-row">
                            <div className="footer-logo-box">
                                <Code2 size={24} color="var(--color-amber)" />
                            </div>
                            <span className="footer-logo-text">AKS</span>
                        </div>
                        <p className="footer-tagline">
                            Architecting scalable distributed backend systems, high-concurrency microservices, and AI inference engines.
                        </p>
                        <div className="footer-social-row">
                            {socialLinks.map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Navigation</h4>
                        <div className="footer-links-grid">
                            {quickLinks.map((link, i) => (
                                <a key={i} href={link.href} className="footer-link">
                                    <span className="footer-link-dot" />
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Status & Location */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Engineering Status</h4>
                        <div className="footer-status-box">
                            <div className="status-indicator">
                                <span className="status-dot-pulse" />
                                <span>Systems Operational (99.5% Uptime)</span>
                            </div>
                            <p className="footer-loc">📍 Gurgaon, India · Open to Opportunities</p>
                            <button onClick={scrollToTop} className="btn-scroll-top">
                                <span>Back to top</span>
                                <ArrowUp size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {currentYear} Ayush Kumar Srivastava. Built with React, Three.js & GSAP.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
