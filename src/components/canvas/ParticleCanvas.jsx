import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas — pure Canvas2D floating particle field
 * Zero dependencies. Uses requestAnimationFrame.
 * Amber + Indigo palette, mouse parallax, GPU-composited.
 */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: 0, y: 0 };
        let particles = [];

        const COLORS = [
            'rgba(245, 158, 11, ',   // amber
            'rgba(99,  102, 241, ',  // indigo
            'rgba(139, 92,  246, ',  // violet
            'rgba(217, 119, 6,   ',  // amber dim
        ];

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const spawnParticle = (w, h) => ({
            x:     Math.random() * w,
            y:     Math.random() * h,
            vx:    (Math.random() - 0.5) * 0.35,
            vy:    (Math.random() - 0.5) * 0.35,
            size:  Math.random() * 2.2 + 0.6,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.55 + 0.15,
            pulse: Math.random() * Math.PI * 2,   // phase offset
        });

        const init = () => {
            resize();
            const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
            particles = Array.from({ length: count }, () =>
                spawnParticle(canvas.width, canvas.height)
            );
        };

        const onMouseMove = (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        };

        const draw = (t) => {
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                // Gentle pulse in size
                p.pulse += 0.015;
                const sz = p.size + Math.sin(p.pulse) * 0.4;

                // Very subtle mouse repel
                const dx  = mouse.x - p.x;
                const dy  = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    const force = (80 - dist) / 80 * 0.008;
                    p.vx -= dx * force;
                    p.vy -= dy * force;
                }

                // Dampen velocity
                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < -4) p.x = w + 4;
                if (p.x > w + 4) p.x = -4;
                if (p.y < -4) p.y = h + 4;
                if (p.y > h + 4) p.y = -4;

                // Draw glow dot
                ctx.beginPath();
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 3);
                grd.addColorStop(0, p.color + p.alpha + ')');
                grd.addColorStop(1, p.color + '0)');
                ctx.fillStyle = grd;
                ctx.arc(p.x, p.y, sz * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        const ro = new ResizeObserver(() => {
            resize();
        });

        canvas.parentElement && ro.observe(canvas.parentElement);
        canvas.addEventListener('mousemove', onMouseMove);

        init();
        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            canvas.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ParticleCanvas;
