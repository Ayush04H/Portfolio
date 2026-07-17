import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import Contact3DCanvas from './canvas/Contact3DCanvas';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-info-panel',
                { opacity: 0, x: -60, rotationY: -25, transformPerspective: 1000 },
                {
                    opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo('.contact-form-panel',
                { opacity: 0, x: 60, rotationY: 25, transformPerspective: 1000 },
                {
                    opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setFormStatus(null);
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: "c79ce55b-f833-4a1b-b242-408b1ba9178f",
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                    }),
                });
                const result = await response.json();
                if (result.success) {
                    setFormStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                } else {
                    setFormStatus('error');
                    setErrors({ submit: result.message || 'Something went wrong. Please try again later.' });
                }
            } catch (error) {
                setFormStatus('error');
                setErrors({ submit: 'Network error. Please try again later.' });
            } finally {
                setIsSubmitting(false);
                setTimeout(() => {
                    setFormStatus(null);
                    setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.submit;
                        return newErrors;
                    });
                }, 5000);
            }
        } else {
            setFormStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: <Mail size={22} />,
            label: 'Direct Email',
            value: 'ayush050419@gmail.com',
            link: 'mailto:ayush050419@gmail.com',
            color: 'var(--color-amber)'
        },
        {
            icon: <MapPin size={22} />,
            label: 'Location',
            value: 'Gurgaon, India',
            link: null,
            color: 'var(--color-indigo)'
        }
    ];

    return (
        <section id="contact" className="section contact" ref={sectionRef}>
            {/* Dedicated 3D Cyber Globe & Communication Sphere */}
            <Contact3DCanvas />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="title-underline"><span className="underline-dot" /></div>
                    <p className="section-description">
                        Have an architecture question, opportunity, or idea? Let's build something extraordinary together.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Left Info Panel */}
                    <div className="contact-info-panel">
                        <Card3D className="contact-info-box" style={{ '--info-color': 'var(--color-amber)' }} maxTilt={6}>
                            <h3 className="contact-subheading">Let's Connect</h3>
                            <p className="contact-intro">
                                Whether you're looking to scale a distributed backend, optimize high-concurrency microservices, or build an intelligent AI platform — my inbox is always open.
                            </p>

                            <div className="contact-cards-stack">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="contact-detail-row">
                                        <div className="contact-icon-circle" style={{ color: info.color }}>
                                            {info.icon}
                                        </div>
                                        <div className="contact-detail-text">
                                            <span className="contact-label">{info.label}</span>
                                            {info.link ? (
                                                <a href={info.link} className="contact-value">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="contact-value">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card3D>
                    </div>

                    {/* Right Form Panel */}
                    <div className="contact-form-panel">
                        <Card3D className="contact-form-card" style={{ '--form-color': 'var(--color-indigo)' }} maxTilt={5}>
                            <div className="form-top-bar" />
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.name ? 'error' : ''}`}
                                        placeholder="Ayush Srivastava"
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Your Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`form-input ${errors.subject ? 'error' : ''}`}
                                        placeholder="System Architecture / Job Opportunity"
                                    />
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                                        rows="4"
                                        placeholder="Let's discuss how we can build high-performance platforms..."
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>

                                {formStatus === 'success' && (
                                    <div className="form-message success">
                                        <CheckCircle size={18} />
                                        <span>Message sent successfully! I will get back to you shortly.</span>
                                    </div>
                                )}

                                {formStatus === 'error' && (
                                    <div className="form-message error">
                                        <AlertCircle size={18} />
                                        <span>{errors.submit ? errors.submit : 'Please check the required fields above'}</span>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-glow submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} style={{ animation: "rotate 2s linear infinite" }} />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </Card3D>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
