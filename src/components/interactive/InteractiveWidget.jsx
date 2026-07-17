import React, { useState, useEffect, useRef } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { Sparkles, Zap, ShieldCheck, Cpu } from 'lucide-react';
import gsap from 'gsap';
import './InteractiveWidget.css';

const InteractiveWidget = () => {
    const [activeState, setActiveState] = useState('AI_CORE');
    const [powerLevel, setPowerLevel] = useState(98);
    const canvasRef = useRef(null);

    // Optional Rive hook setup (ready to bind to external .riv asset if desired)
    const { RiveComponent, rive } = useRive({
        src: 'https://cdn.rive.app/animations/vehicles.riv', // fallback public demo if online
        stateMachines: 'Motion',
        autoplay: true,
    });

    const isRiveLoaded = Boolean(rive);

    // Interactive custom HTML5 Canvas HUD fallback/enhancement
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let angle = 0;

        const render = () => {
            angle += 0.03;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) - 15;

            // Outer radar ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Rotating scanner arc
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, angle, angle + Math.PI / 3);
            ctx.strokeStyle = '#00f2fe';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Inner pulsing ring
            const pulseRadius = radius * 0.6 + Math.sin(angle * 2) * 5;
            ctx.beginPath();
            ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Center glowing node
            ctx.beginPath();
            ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#00f2fe';
            ctx.shadowColor = '#00f2fe';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const triggerStatePulse = (stateName) => {
        setActiveState(stateName);
        setPowerLevel((prev) => Math.min(100, prev + Math.floor(Math.random() * 3 + 1)));

        gsap.fromTo(
            '.widget-hud-display',
            { scale: 0.95, borderColor: '#00f2fe' },
            { scale: 1, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.4, ease: 'back.out(2)' }
        );
    };

    return (
        <div className="interactive-widget-wrapper">
            <div className="widget-header">
                <div className="widget-status-badge">
                    <span className="status-dot-pulse"></span>
                    <span>SYSTEM STATE: {activeState}</span>
                </div>
                <div className="widget-power-level">
                    <Cpu size={16} />
                    <span>CAPACITY {powerLevel}%</span>
                </div>
            </div>

            <div className="widget-main-grid">
                <div className="widget-hud-display">
                    <canvas ref={canvasRef} width={200} height={200} className="hud-canvas" />
                    <div className="hud-overlay-info">
                        <h4>AYUSH.CORE v2.5</h4>
                        <p>MICROSERVICES / DISTRIBUTED ARCHITECTURE</p>
                    </div>
                </div>

                <div className="widget-controls">
                    <button
                        className={`widget-control-btn ${activeState === 'AI_CORE' ? 'active' : ''}`}
                        onClick={() => triggerStatePulse('AI_CORE')}
                    >
                        <Zap size={18} />
                        <div>
                            <h5>AI / ML Engine</h5>
                            <span>PyTorch & GenAI Pipelines</span>
                        </div>
                    </button>

                    <button
                        className={`widget-control-btn ${activeState === 'DISTRIBUTED_CLOUD' ? 'active' : ''}`}
                        onClick={() => triggerStatePulse('DISTRIBUTED_CLOUD')}
                    >
                        <ShieldCheck size={18} />
                        <div>
                            <h5>AWS Cloud & Security</h5>
                            <span>EC2, RDS, Cognito, IAM</span>
                        </div>
                    </button>

                    <button
                        className={`widget-control-btn ${activeState === 'HIGH_THROUGHPUT' ? 'active' : ''}`}
                        onClick={() => triggerStatePulse('HIGH_THROUGHPUT')}
                    >
                        <Sparkles size={18} />
                        <div>
                            <h5>High Throughput</h5>
                            <span>2M+ Traffic Node Processing</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteractiveWidget;
