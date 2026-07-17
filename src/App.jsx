import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeMotionBackground from './components/canvas/ThreeMotionBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        // Initialize Lenis smooth scrolling — tuned for performance
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothTouch: false,
            touchMultiplier: 1.5,
        });

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const rafCb = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(rafCb);
        gsap.ticker.lagSmoothing(0);

        // Smooth scroll anchor navigation using Lenis
        const handleAnchorClick = function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    lenis.scrollTo(target, { offset: -70 });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

        return () => {
            gsap.ticker.remove(rafCb);
            lenis.destroy();
            anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
        };
    }, []);

    return (
        <div className="App">
            <ThreeMotionBackground />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Education />
                <Experience />
                <Projects />
                <Achievements />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
