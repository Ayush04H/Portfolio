import React from 'react';
import { Trophy, Award, Users, Code } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    const achievements = [
        {
            icon: <Users size={28} />,
            title: 'ITSA Leadership',
            description: 'EPST Head & Active Member of Information Technology Students\' Association'
        },
        {
            icon: <Code size={28} />,
            title: 'Coding Competitions',
            description: 'Finalist in ACES Coding Challenge, ranking among top competitors from 250+ students'
        },
        {
            icon: <Trophy size={28} />,
            title: 'Sports Excellence',
            description: 'Won 3 gold medals, 1 silver, and 2 personal awards in 10+ volleyball tournaments'
        },
        {
            icon: <Award size={28} />,
            title: 'Hackathon Success',
            description: 'Cleared Group Stages of AICTE Computer Science Hackathon'
        }
    ];

    const certifications = [
        {
            name: 'Database Structures and Management with MySQL',
            issuer: 'Coursera',
            link: 'https://coursera.org/share/982cbbdd0a3455f86ccc34eb4f06559b'
        },
        {
            name: 'MLOps Bootcamp - Mastering AI Operations',
            issuer: 'Udemy',
            link: 'https://www.udemy.com/course/mlops-bootcamp-mastering-ai-operations-for-success-aiops/'
        }
    ];

    return (
        <section id="achievements" className="section achievements">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Achievements & Certifications</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        Recognition for technical excellence and leadership
                    </p>
                </div>

                <div className="achievements-content">
                    <div className="achievements-grid">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="achievement-card">
                                <div className="achievement-icon">{achievement.icon}</div>
                                <h3 className="achievement-title">{achievement.title}</h3>
                                <p className="achievement-description">{achievement.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="certifications-section">
                        <h3 className="certifications-title">Professional Certifications</h3>
                        <div className="certifications-list">
                            {certifications.map((cert, index) => (
                                <a
                                    key={index}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="certification-card"
                                >
                                    <div className="cert-content">
                                        <Award size={24} className="cert-icon" />
                                        <div>
                                            <h4 className="cert-name">{cert.name}</h4>
                                            <p className="cert-issuer">{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <ExternalLink size={18} className="cert-link-icon" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Import ExternalLink icon
import { ExternalLink } from 'lucide-react';

export default Achievements;
