import React from 'react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            category: 'Languages',
            skills: ['Python', 'Java', 'C++', 'JavaScript']
        },
        {
            category: 'Technologies & Frameworks',
            skills: ['React', 'Django', 'FastAPI', 'Flask', 'HTML5', 'CSS3', 'Streamlit']
        },
        {
            category: 'Data Science & AI',
            skills: ['Machine Learning', 'PyTorch', 'TensorFlow', 'LLM', 'Gen AI', 'OpenCV', 'ETL']
        },
        {
            category: 'DevOps',
            skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'MLflow']
        },
        {
            category: 'Cloud Platforms',
            skills: ['AWS', 'GCP (BigQuery, Bucket)']
        },
        {
            category: 'Databases',
            skills: ['MySQL', 'MongoDB', 'Amazon RDS']
        }
    ];

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills & Technologies</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        A comprehensive toolkit for building modern, scalable applications
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-tag">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
