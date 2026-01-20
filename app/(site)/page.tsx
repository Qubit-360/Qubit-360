'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Bot, Code, Cpu, LineChart } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ServicesSection from '@/components/home/ServicesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import HeroParticles from '@/components/home/HeroParticles';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Hero Animations ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-badge',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
    )
      .fromTo('.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.hero-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('.hero-btns',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.6'
      );

    // --- Tech Stack Ticker (Left to Right) ---
    // We target the inner container. 
    // Usually tickers go Right-to-Left (x: 0 -> -50%). 
    // For Left-to-Right, we go x: -50% -> 0.

    const tickerContent = tickerRef.current?.querySelector('.ticker-content');
    if (tickerContent) {
      gsap.fromTo(tickerContent,
        { xPercent: -50 }, // Start halfway (showing duplicate set)
        {
          xPercent: 0, // Move right to 0
          duration: 30, // Very slow
          ease: 'none',
          repeat: -1,
        }
      );
    }

    // --- Value Prop Animations ---
    gsap.fromTo('.value-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valueRef.current,
          start: 'top 80%',
        }
      }
    );

  }, { scope: heroRef }); // Note: We reference refs outside heroRef scope, but React refs are stable.

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[90vh] pt-20 overflow-hidden bg-white" ref={heroRef}>
        {/* Particle Background */}
        <HeroParticles />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Accepting New Clients for Q1 2026
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-900">Intelligent Systems</span>
            <br /> That Run Your Business.
          </h1>

          <p className="hero-desc text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Qubit 360 is a premium AI Automation & Software Engineering Agency.
            We merge cutting-edge AI with robust engineering to scale your operations.
          </p>

          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/work"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2"
            >
              See Our Work <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold transition-all"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip (Animated Loop) */}
      <section className="py-10 border-y border-slate-100 bg-slate-50 overflow-hidden" ref={tickerRef}>
        {/* L->R Animation Container. We need enough width to start at -50% and move to 0 without gaps. */}
        {/* using flex w-max to hold everything in one long line */}
        <div className="ticker-content flex items-center w-max">
          {/* Duplicate list 4 times to ensure it covers screens and allows smooth looping */}
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-16 px-8">
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Code size={24} /> Next.js</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Bot size={24} /> n8n</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Cpu size={24} /> OpenAI</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><LineChart size={24} /> Python</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Code size={24} /> TypeScript</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Bot size={24} /> LangChain</span>
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Cpu size={24} /> Supabase</span>
            </div>
          ))}
        </div>
      </section>

      {/* Value Prop (Why Qubit 360?) */}
      <section className="py-24 relative bg-white" ref={valueRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Qubit 360?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We bridge the gap between modern AI capabilities and traditional software scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Value Card 1 */}
            <div className="value-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-orange-500/50 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="text-orange-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Cost Reduction (AI)</h3>
              <p className="text-slate-600 leading-relaxed">
                We implement intelligent autonomous agents that handle repetitive tasks, customer support, and data entry,
                drastically reducing operational overhead and letting your team focus on high-value strategy.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="value-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-900/50 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-blue-900" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Scalability (Engineering)</h3>
              <p className="text-slate-600 leading-relaxed">
                Beyond scripts, we build robust, enterprise-grade software architectures.
                From microservices to serverless solutions, our systems are designed to handle growth without breaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
