import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'Loan Prediction App',
            description: 'A comprehensive machine learning application that predicts loan approval status using advanced ML algorithms. Built with a complete pipeline from data preprocessing to model deployment, featuring real-time predictions through an intuitive Streamlit interface.',
            features: [
                'Implemented ensemble ML model achieving 85% prediction accuracy',
                'Optimized prediction pipeline processing 0.02 seconds per record',
                'Built scalable FastAPI backend supporting 20+ concurrent users',
                'Dockerized deployment for consistent environment across platforms',
                'Real-time form validation and instant prediction results',
                'Sub-100ms API response times with efficient data handling'
            ],
            tech: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Docker', 'Pandas'],
            link: 'https://loan-predication-ayush04h.streamlit.app/',
            github: null
        },
        {
            title: 'LLM-Doc-Summarizer',
            description: 'An intelligent document summarization tool powered by facebook/bart-large-cnn transformer model. Enables users to upload .docx files and receive customizable AI-generated summaries with adjustable length and detail levels.',
            features: [
                'Integrated BART transformer model for high-quality summarization',
                'Support for various document formats (.docx, .pdf)',
                'Customizable summary lengths (short, medium, detailed)',
                'Modern React frontend with drag-and-drop file upload',
                'FastAPI backend with 50% faster processing through optimization',
                'CI/CD pipeline with GitHub Actions for automated deployment',
                '99.9% uptime with comprehensive error handling and logging'
            ],
            tech: ['React', 'Python', 'Transformers', 'FastAPI', 'Docker', 'GitHub Actions'],
            link: null,
            github: 'https://github.com/Ayush04H/LLM-Doc-Summarizer'
        }
    ];

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        Building innovative solutions with AI/ML and modern web technologies
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-features">
                                    <h4 className="features-title">Key Features:</h4>
                                    <ul className="features-list">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-tech">
                                    {project.tech.map((tech, techIdx) => (
                                        <span key={techIdx} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <Github size={18} />
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
