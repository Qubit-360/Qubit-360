'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    ease: number;
    friction: number;
    dx: number;
    dy: number;
    distance: number;
    force: number;
    angle: number;
}

export default function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;
        let isMouseActive = false;

        // Brand Colors: Orange, Deep Blue, Light Blue, Slate
        const colors = ['#f97316', '#ea580c', '#1e3a8a', '#3b82f6', '#94a3b8'];

        // Config for "Antigravity" feel
        const particleCount = 400; // Much denser
        const mouseRadius = 200; // Larger interaction zone

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            particles = [];

            for (let i = 0; i < particleCount; i++) {
                // Random distribution but biased towards center for "swarm" feel?
                // Let's keep it uniform but denser
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 2.5 + 0.5, // Varied sizes (0.5px - 3px)
                    vx: 0,
                    vy: 0,
                    ease: Math.random() * 0.02 + 0.01, // Very slow return = floaty
                    friction: Math.random() * 0.05 + 0.90, // Varied friction
                    dx: 0,
                    dy: 0,
                    distance: 0,
                    force: 0,
                    angle: 0
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

            // Optional: Add trail effect by using fillRect with low opacity instead of clearRect
            // ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Calculate distance to mouse
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (isMouseActive) {
                    if (distance < mouseRadius) {
                        const force = (mouseRadius - distance) / mouseRadius;
                        const angle = Math.atan2(dy, dx);

                        // "Blast" effect
                        const blastForce = 4;
                        p.vx -= Math.cos(angle) * force * blastForce;
                        p.vy -= Math.sin(angle) * force * blastForce;
                    }
                }

                // Return to origin (Home force)
                // Gentler spring for that "anti-gravity" float
                const homeDx = p.originX - p.x;
                const homeDy = p.originY - p.y;

                p.vx += homeDx * p.ease;
                p.vy += homeDy * p.ease;

                // Apply friction
                p.vx *= p.friction;
                p.vy *= p.friction;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseActive = true;
        };

        const handleResize = () => {
            init();
        };

        const handleMouseLeave = () => {
            isMouseActive = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        init();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none fade-in duration-1000"
            style={{ opacity: 0.8 }} // Slight transparency for subtlety
        />
    );
}
