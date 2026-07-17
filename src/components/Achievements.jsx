import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Users, Code, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import Achievements3DCanvas from './canvas/Achievements3DCanvas';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
    const sectionRef = useRef(null);

    const achievements = [
        {
            icon: <Trophy size={28} />,
            title: '1st Runner-Up (AAROHAN)',
            description: 'Inter-College Web Design Competition among 50+ competing tech teams across Northern India.',
            color: 'var(--color-amber)'
        },
        {
            icon: <Award size={28} />,
            title: 'Top 1.1% Global Rank',
            description: 'LeetCode competitive programming — solved 700+ complex algorithmic & data structure challenges.',
            color: 'var(--color-indigo)'
        },
        {
            icon: <Users size={28} />,
            title: 'E-Cell Tech Head',
            description: 'Led a 20+ member technical team building dynamic portals that boosted event participation by 45%.',
            color: 'var(--color-violet)'
        },
        {
            icon: <Code size={28} />,
            title: 'Open Source Contributor',
            description: 'Contributed performance fixes and documentation enhancements to popular Python & JavaScript libraries.',
            color: 'var(--color-amber)'
        }
    ];

    const certifications = [
        {
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services (AWS) · May 2024',
            link: 'https://www.credly.com/org/amazon-web-services/',
            color: 'var(--color-amber)'
        },
        {
            name: 'Deep Learning & Neural Networks Specialization',
            issuer: 'DeepLearning.AI / Coursera · Nov 2024',
            link: 'https://www.coursera.org/specializations/deep-learning',
            color: 'var(--color-violet)'
        },
        {
            name: 'MLOps Bootcamp: Mastering AI Operations',
            issuer: 'Udemy · Dec 2024',
            link: 'https://www.udemy.com/course/mlops-bootcamp-mastering-ai-operations-for-success-aiops/',
            color: 'var(--color-indigo)'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.ach-card',
                { opacity: 0, y: 50, rotationX: 25, rotationY: -10, transformPerspective: 1000 },
                {
                    opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.ach-grid', start: 'top 85%' }
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
