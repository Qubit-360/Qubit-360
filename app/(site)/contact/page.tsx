"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header
        tl.fromTo('.contact-header',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo('.contact-item',
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
                '-=0.4'
            )
            .fromTo('.contact-form-card',
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8 },
                '-=0.8'
            );

    }, { scope: containerRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully!", {
            description: "We'll get back to you shortly."
        });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 relative bg-white" ref={containerRef}>
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <div>
                        <div className="contact-header">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                Let's Build Something <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-900">Intelligent.</span>
                            </h1>
                            <p className="text-slate-600 text-lg mb-12 max-w-md leading-relaxed">
                                Ready to scale your business with AI Automation or Custom Engineering?
                                Fill out the form or reach out directly.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="contact-item flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                                    <Mail className="text-orange-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold mb-1">Email Us</h3>
                                    <Link href="mailto:contact@qubit360.online" className="text-slate-600 hover:text-orange-500 transition-colors">
                                        contact@qubit360.online
                                    </Link>
                                </div>
                            </div>

                            <div className="contact-item flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                                    <Phone className="text-blue-900" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold mb-1">Call Us</h3>
                                    <p className="text-slate-600">
                                        +94 754685604
                                    </p>
                                </div>
                            </div>

                            <div className="contact-item flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                                    <MapPin className="text-orange-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold mb-1">HQ</h3>
                                    <p className="text-slate-600">
                                        Malabe, Sri Lanka<br />
                                        (Available Globally)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div>
                        <Card className="contact-form-card bg-white border-slate-200 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-slate-900">Send a Message</CardTitle>
                                <CardDescription className="text-slate-500">
                                    We usually respond within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name" className="text-slate-700">First name</Label>
                                            <Input id="first-name" placeholder="John" className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name" className="text-slate-700">Last name</Label>
                                            <Input id="last-name" placeholder="Doe" className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-700">Email</Label>
                                        <Input id="email" type="email" placeholder="john@company.com" className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-slate-700">Project Details</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us about your project..."
                                            className="min-h-[150px] bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500"
                                        />
                                    </div>

                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
