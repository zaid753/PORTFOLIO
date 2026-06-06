import React, { useEffect, useRef } from 'react';

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseX: number;
      baseY: number;
    }> = [];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      const particleCount = Math.min((canvas.width * canvas.height) / 8000, 150); // limit max particles
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const themeColor = document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.4)';
      const lineColor = document.documentElement.classList.contains('dark') ? '150, 150, 150' : '59, 130, 246';
      
      ctx.fillStyle = themeColor;

      particles.forEach((p) => {
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX > canvas.width) p.baseX = 0;
        if (p.baseX < 0) p.baseX = canvas.width;
        if (p.baseY > canvas.height) p.baseY = 0;
        if (p.baseY < 0) p.baseY = canvas.height;

        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = p.baseX;
        let targetY = p.baseY;

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const push = force * 20; // adjust interaction strength
          
          targetX = p.baseX - forceDirectionX * push;
          targetY = p.baseY - forceDirectionY * push;
        }

        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      const rect = canvas.getBoundingClientRect();
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1] bg-transparent transition-opacity duration-1000" 
    />
  );
};
