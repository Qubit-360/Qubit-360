import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { PROJECTS, EXPERIMENTS, SERVICES } from '@/constants';

export async function GET() {
    try {
        // Seed Services
        const servicesData = SERVICES.map(s => ({
            title: s.title,
            description: s.description,
            icon: s.icon,
        }));

        const { error: servicesError } = await supabase.from('services').upsert(servicesData, { onConflict: 'title' });
        if (servicesError) throw servicesError;

        // Seed Works
        const worksData = PROJECTS.map(p => ({
            title: p.title,
            slug: p.slug,
            description: p.description,
            full_description: p.fullDescription,
            challenge: p.challenge,
            solution: p.solution,
            tech_stack: p.techStack,
            tag: p.tag,
            image_url: p.image,
            link: p.link,
        }));

        const { error: worksError } = await supabase.from('works').upsert(worksData, { onConflict: 'slug' });
        if (worksError) throw worksError;

        // Seed Experiments
        const experimentsData = EXPERIMENTS.map(e => ({
            title: e.title,
            slug: e.slug,
            description: e.description,
            full_description: e.fullDescription,
            status: e.status,
            progress: e.progress,
            tag: e.tag,
            tech_stack: e.techStack,
            link: e.link,
        }));

        const { error: experimentsError } = await supabase.from('experiments').upsert(experimentsData, { onConflict: 'slug' });
        if (experimentsError) throw experimentsError;

        return NextResponse.json({ message: 'Database seeded successfully!' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
