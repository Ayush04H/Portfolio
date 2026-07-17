import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Users, Code, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
    const sectionRef = useRef(null);

    const achievements = [
        {
            icon: <Users size={26} />,
            title: 'ITSA Leadership',
            description: 'EPST Head & Active Member of Information Technology Students\' Association',
            color: 'var(--color-amber)'
        },
        {
            icon: <Code size={26} />,
            title: 'Coding Competitions',
            description: 'Finalist in ACES Coding Challenge, ranking among top competitors from 250+ students',
            color: 'var(--color-indigo)'
        },
        {
            icon: <Trophy size={26} />,
            title: 'Sports Excellence',
            description: 'Won 3 gold medals, 1 silver, and 2 personal awards in 10+ volleyball tournaments',
            color: 'var(--color-violet)'
        },
        {
            icon: <Award size={26} />,
            title: 'Hackathon Success',
            description: 'Cleared Group Stages of AICTE Computer Science Hackathon',
            color: 'var(--color-emerald)'
        }
    ];

    const certifications = [
        {
            name: 'Database Structures and Management with MySQL',
            issuer: 'Coursera · Professional Certification',
            link: 'https://coursera.org/share/982cbbdd0a3455f86ccc34eb4f06559b',
            color: 'var(--color-amber)'
        },
        {
            name: 'MLOps Bootcamp - Mastering AI Operations',
            issuer: 'Udemy · AI & Systems Certification',
            link: 'https://www.udemy.com/course/mlops-bootcamp-mastering-ai-operations-for-success-aiops/',
            color: 'var(--color-indigo)'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.ach-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.ach-grid', start: 'top 85%' }
                }
            );
            gsap.fromTo('.cert-card',
                { opacity: 0, x: -35 },
                {
                    opacity: 1, x: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.cert-list', start: 'top 88%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="achievements" className="section achievements" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Achievements & Certifications</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Recognition for leadership, competitive programming, and technical certifications
                    </p>
                </div>

                <div className="ach-grid">
                    {achievements.map((item, i) => (
                        <Card3D
                            key={i}
                            className="ach-card"
                            style={{ '--ach-color': item.color }}
                            maxTilt={10}
                        >
                            <div className="ach-top-bar" />
                            <div className="ach-icon-wrap" style={{ color: item.color }}>
                                {item.icon}
                            </div>
                            <h3 className="ach-title">{item.title}</h3>
                            <p className="ach-desc">{item.description}</p>
                        </Card3D>
                    ))}
                </div>

                <div className="cert-section">
                    <div className="cert-header">
                        <h3 className="cert-title">Professional Certifications</h3>
                        <p className="cert-sub">Verified credentials across Data Systems & AI Engineering</p>
                    </div>

                    <div className="cert-list">
                        {certifications.map((cert, i) => (
                            <a
                                key={i}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-link-wrapper"
                            >
                                <Card3D
                                    className="cert-card"
                                    style={{ '--cert-color': cert.color }}
                                    maxTilt={6}
                                >
                                    <div className="cert-left">
                                        <div className="cert-icon-box" style={{ color: cert.color }}>
                                            <Award size={22} />
                                        </div>
                                        <div>
                                            <h4 className="cert-name">{cert.name}</h4>
                                            <p className="cert-issuer">{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <div className="cert-right">
                                        <span className="verify-lbl">Verify</span>
                                        <ExternalLink size={16} className="ext-icon" />
                                    </div>
                                </Card3D>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
