import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Create mailto link with form data
            const mailtoLink = `mailto:ayush050419@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            setFormStatus('success');

            // Reset form
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setFormStatus(null);
            }, 3000);
        } else {
            setFormStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            label: 'Email',
            value: 'ayush050419@gmail.com',
            link: 'mailto:ayush050419@gmail.com'
        },
        {
            icon: <MapPin size={24} />,
            label: 'Location',
            value: 'Gurgaon, India',
            link: null
        }
    ];

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        Let's collaborate on your next project or discuss opportunities
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="contact-info-title">Contact Information</h3>
                        <p className="contact-info-text">
                            Feel free to reach out through any of these channels. I'm always excited
                            to discuss new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        <div className="contact-details">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-detail-item">
                                    <div className="contact-icon">{info.icon}</div>
                                    <div className="contact-detail-content">
                                        <p className="contact-label">{info.label}</p>
                                        {info.link ? (
                                            <a href={info.link} className="contact-value">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="contact-value">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder=""
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Your Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder=""
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`form-input ${errors.subject ? 'error' : ''}`}
                                placeholder=""
                            />
                            {errors.subject && <span className="error-message">{errors.subject}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                                rows="5"
                                placeholder=""
                            ></textarea>
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        {formStatus === 'success' && (
                            <div className="form-message success">
                                <CheckCircle size={20} />
                                <span>Opening email client...</span>
                            </div>
                        )}

                        {formStatus === 'error' && (
                            <div className="form-message error">
                                <AlertCircle size={20} />
                                <span>Please fix the errors above</span>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary submit-btn">
                            <Send size={20} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
