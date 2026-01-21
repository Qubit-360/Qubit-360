import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-1">
                            <img src="/logo.png" alt="Qubit 360 Logo" className="w-24 h-24 object-contain" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-orange-500 leading-none pb-1">
                                Qubit 360
                            </span>
                        </Link>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                            We build intelligent systems that run your business. From AI automation to custom software engineering, we engineer scalability.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 rounded-full bg-slate-200 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-slate-200 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors">
                                <Github size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-slate-200 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="mailto:contact@qubit360.online" className="p-2 rounded-full bg-slate-200 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors">
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-orange-600 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Newsletter */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-6">Get in Touch</h3>
                        <div className="space-y-4">
                            <p className="text-slate-600 text-sm">
                                Ready to transform your business with AI? Let's talk.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                            >
                                Schedule a Consultation
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Qubit 360 Agency. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-slate-500 hover:text-slate-700 text-xs text-xs">Privacy Policy</Link>
                        <Link href="#" className="text-slate-500 hover:text-slate-700 text-xs text-xs">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
