import React from 'react';
import { Heart, Github, Linkedin, Mail, Code2 } from 'lucide-react';
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
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        {
            icon: <Github size={20} />,
            href: 'https://github.com/Ayush04H',
            label: 'GitHub'
        },
        {
            icon: <Linkedin size={20} />,
            href: 'http://www.linkedin.com/in/ayush-srivastava-aks04102002',
            label: 'LinkedIn'
        },
        {
            icon: <Mail size={20} />,
            href: 'mailto:ayush050419@gmail.com',
            label: 'Email'
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-decorative-top">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0 C300,80 600,40 900,60 C1050,70 1150,100 1200,120 L1200,0 L0,0 Z" fill="url(#footerGradient)"></path>
                    <defs>
                        <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.1 }} />
                            <stop offset="50%" style={{ stopColor: '#764ba2', stopOpacity: 0.1 }} />
                            <stop offset="100%" style={{ stopColor: '#f093fb', stopOpacity: 0.1 }} />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container">
                <div className="footer-content">
                    <div className="footer-section footer-about">
                        <div className="footer-logo-container">
                            <div className="footer-logo-icon">
                                <Code2 size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="footer-logo">AKS</h3>
                        </div>
                        <p className="footer-description">
                            Software Development Engineer passionate about creating innovative
                            solutions with AI/ML and modern web technologies.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="footer-link">
                                        <span className="link-arrow">→</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Get In Touch</h4>
                        <ul className="footer-contact">
                            <li>
                                <a href="mailto:ayush050419@gmail.com" className="footer-link">
                                    <Mail size={16} />
                                    ayush050419@gmail.com
                                </a>
                            </li>
                            <li className="footer-location">
                                <span className="location-icon">📍</span>
                                Gurgaon, India
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Ayush Kumar Srivastava. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
