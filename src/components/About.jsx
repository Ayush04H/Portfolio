import React from 'react';
import { GraduationCap, Calendar, Award, Sparkles } from 'lucide-react';
import './About.css';

const About = () => {
    const stats = [
        { icon: <GraduationCap size={28} />, value: '3+', label: 'Years Coding', color: '#6366f1' },
        { icon: <Sparkles size={28} />, value: '10+', label: 'Projects', color: '#8b5cf6' },
        { icon: <Award size={28} />, value: '8.90', label: 'CGPA', color: '#ec4899' }
    ];

    return (
        <section id="about" className="section about">
            <div className="about-decorative-bg"></div>

            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="title-underline">
                        <span className="underline-dot"></span>
                    </div>
                    <p className="section-description">
                        Passionate software engineer with expertise in full-stack development
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-text animate-fadeInUp">
                        <p className="about-paragraph">
                            I'm a <strong className="text-gradient">Software Development Engineer</strong> with a passion for
                            transforming ideas into elegant, efficient solutions. My journey in tech has been driven by
                            an insatiable curiosity for <strong>AI/ML</strong>, <strong>Full-Stack Development</strong>,
                            and <strong>DevOps</strong>.
                        </p>
                        <p className="about-paragraph">
                            Currently at <strong className="highlight-text">Street Surge</strong>, I build cutting-edge
                            solutions that optimize fleet logistics and streamline business operations. I thrive on
                            challenges that push the boundaries of what's possible with technology.
                        </p>
                        <p className="about-paragraph">
                            With a strong foundation in <strong>Python</strong>, <strong>JavaScript</strong>,
                            <strong>React</strong>, and <strong>Machine Learning</strong>, I'm committed to continuous
                            learning and creating impactful software that makes a difference.
                        </p>
                    </div>

                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`stat-card animate-scaleIn stagger-${index + 1}`}
                                style={{ '--stat-color': stat.color }}
                            >
                                <div className="stat-icon">
                                    {stat.icon}
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-glow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
