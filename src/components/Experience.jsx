import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            company: 'Street Surge',
            role: 'Software Development Engineer',
            period: 'Feb 2025 - Present',
            location: 'Gurgaon, India'
        },
        {
            company: 'CereLabs',
            role: 'Software Engineer Intern',
            period: 'Jun 2024 - Aug 2024',
            location: 'Mumbai, India'
        },
        {
            company: 'OziBook',
            role: 'Data Analyst Intern',
            period: 'Jan 2024 - Mar 2024',
            location: 'Bengaluru, India'
        }
    ];

    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Work Experience</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        My professional journey in software development and engineering
                    </p>
                </div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <div className="experience-header">
                                    <div className="experience-title-group">
                                        <h3 className="company-name">{exp.company}</h3>
                                        <p className="role-title">{exp.role}</p>
                                    </div>
                                    <div className="experience-meta">
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="meta-item">
                                            <MapPin size={16} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
