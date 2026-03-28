import { Component, ElementRef, viewChild, afterNextRender, DestroyRef, inject } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-particles-bg',
  standalone: true,
  template: `<canvas #canvas class="particles-canvas"></canvas>`,
  styles: `
    .particles-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  `,
})
export class ParticlesBgComponent {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private destroyRef = inject(DestroyRef);
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 };
  private animId = 0;

  constructor() {
    afterNextRender(() => {
      const canvas = this.canvasRef().nativeElement;
      const ctx = canvas.getContext('2d')!;
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 40 : 80;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resize();

      this.particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(108, 99, 255, 0.6)';
          ctx.fill();
        }

        const maxDist = isMobile ? 100 : 150;
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(this.particles[i].x, this.particles[i].y);
              ctx.lineTo(this.particles[j].x, this.particles[j].y);
              ctx.strokeStyle = `rgba(108, 99, 255, ${0.15 * (1 - dist / maxDist)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }

          const mdx = this.particles[i].x - this.mouse.x;
          const mdy = this.particles[i].y - this.mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 200) {
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.mouse.x, this.mouse.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - mDist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        this.animId = requestAnimationFrame(draw);
      };

      draw();

      const onMouse = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      };

      window.addEventListener('resize', resize);
      canvas.addEventListener('mousemove', onMouse);

      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.animId);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', onMouse);
      });
    });
  }
}
