import Link from 'next/link';
import { ArrowRight, Bot, Code, Cpu, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Accepting New Clients for Q1 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-900">Intelligent Systems</span>
            <br /> That Run Your Business.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Qubit 360 is a premium AI Automation & Software Engineering Agency.
            We merge cutting-edge AI with robust engineering to scale your operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

      {/* Tech Stack Strip */}
      <section className="py-10 border-y border-slate-100 bg-slate-50 overflow-hidden">
        <div className="flex items-center gap-12 animate-infinite-scroll whitespace-nowrap min-w-full">
          {/* Duplicated list for seamless scrolling effect (simple implementation) */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-4">
              <span className="text-xl font-bold text-slate-400 flex items-center gap-2"><Code size={24} /> Next.js 14</span>
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

      {/* Value Prop (Grid) */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Qubit 360?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We bridge the gap between modern AI capabilities and traditional software scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Value Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-orange-500/50 shadow-sm hover:shadow-lg transition-all group">
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
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-900/50 shadow-sm hover:shadow-lg transition-all group">
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
    </div>
  );
}
