import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import './Education.css';

const Education = () => {
    return (
        <section id="education" className="section education">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Education</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="education-content">
                    <div className="education-card">
                        <div className="education-icon">
                            <GraduationCap size={40} />
                        </div>
                        <div className="education-details">
                            <h3 className="degree">Bachelor of Technology in Information Technology</h3>
                            <p className="institution">Bharati Vidyapeeth's College of Engineering, Pune</p>
                            <div className="education-meta">
                                <div className="meta-item">
                                    <Calendar size={16} />
                                    <span>September 2021 - June 2025</span>
                                </div>
                                <div className="meta-item">
                                    <Award size={16} />
                                    <span className="cgpa">CGPA: 8.90</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
