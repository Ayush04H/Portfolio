import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Users, Code, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import Achievements3DCanvas from './canvas/Achievements3DCanvas';
import Certifications3DCanvas from './canvas/Certifications3DCanvas';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
    const sectionRef = useRef(null);

    const achievements = [
        {
            icon: <Code size={26} />,
            title: 'ACES Coding Challenge Finalist',
            description: 'Finalist in the ACES Coding Challenge, ranking among the top competitors out of over 250 students.',
            color: 'var(--color-amber)'
        },
        {
            icon: <Code size={26} />,
            title: 'AICTE Hackathon',
            description: 'Cleared Group Stages of the AICTE Computer Science Hackathon.',
            color: 'var(--color-indigo)'
        },
        {
            icon: <Users size={26} />,
            title: 'EPST Head & Active Member',
            description: 'EPST Head and Active Member at ITSA (Information Technology Students\' Association).',
            color: 'var(--color-violet)'
        },
        {
            icon: <Trophy size={26} />,
            title: 'Volleyball Tournaments',
            description: 'Competed in over 10 volleyball tournaments, winning 3 gold medals, 1 silver, and 2 personal awards.',
            color: 'var(--color-emerald)'
        }
    ];

    const certifications = [
        {
            name: 'Database Structures and Management with MySQL',
            issuer: 'Coursera',
            link: 'https://coursera.org/share/982cbbdd0a3455f86ccc34eb4f06559b',
            color: 'var(--color-amber)'
        },
        {
            name: 'MLOps Bootcamp: Mastering AI Operations',
            issuer: 'Udemy',
            link: 'https://www.udemy.com/course/mlops-bootcamp-mastering-ai-operations-for-success-aiops/',
            color: 'var(--color-emerald)'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.ach-card',
                { opacity: 0, y: 50, rotationX: 25, rotationY: -10, transformPerspective: 1000 },
                {
                    opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo('.cert-card',
                { opacity: 0, x: -50, rotationY: -20, transformPerspective: 1000 },
                {
                    opacity: 1, x: 0, rotationY: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.cert-list', start: 'top 88%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="achievements" className="section achievements" ref={sectionRef}>
            <Achievements3DCanvas />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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

                <div className="cert-section" style={{ position: 'relative' }}>
                    <Certifications3DCanvas />
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
