import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);

    const highlights = [
        'Major in Information Technology with strong foundation in DSA, DBMS, OS & Networks.',
        'Finalist in ACES Coding Challenge (top performers across 250+ participants).',
        'Head & Active Member of Information Technology Students\' Association (ITSA).',
        'Maintained top academic standing with 8.90 / 10.0 cumulative GPA.'
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.edu-card-wrap',
                { opacity: 0, y: 50, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="education" className="section education" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Education</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Academic background in Information Technology & computer science fundamentals
                    </p>
                </div>

                <div className="edu-content">
                    <Card3D className="edu-card-wrap" style={{ '--edu-color': 'var(--color-amber)' }} maxTilt={8}>
                        <div className="edu-accent-bar" />
                        <div className="edu-card card-3d-inner">
                            <div className="edu-icon-wrap">
                                <GraduationCap size={36} color="var(--color-amber)" />
                            </div>

                            <div className="edu-details">
                                <span className="edu-badge">B.Tech · IT</span>
                                <h3 className="degree">Bachelor of Technology in Information Technology</h3>
                                <p className="institution">Bharati Vidyapeeth's College of Engineering, Pune</p>

                                <div className="edu-meta-row">
                                    <div className="meta-pill">
                                        <Calendar size={14} color="var(--color-amber)" />
                                        <span>September 2021 – June 2025</span>
                                    </div>
                                    <div className="meta-pill cgpa-pill">
                                        <Award size={14} color="var(--color-indigo)" />
                                        <span>CGPA: <strong className="cgpa-val">8.90 / 10</strong></span>
                                    </div>
                                </div>

                                <ul className="edu-highlights">
                                    {highlights.map((h, i) => (
                                        <li key={i} className="edu-highlight-item">
                                            <CheckCircle2 size={15} color="var(--color-amber)" className="check-icon" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card3D>
                </div>
            </div>
        </section>
    );
};

export default Education;
