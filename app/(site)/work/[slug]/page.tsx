import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProjectDetailsView from '@/components/work/ProjectDetailsView';

export const revalidate = 0;

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch current project
    const { data: project } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!project) {
        notFound();
    }

    // Fetch next project
    const { data: nextProject } = await supabase
        .from('works')
        .select('title, slug, image_url')
        .neq('id', project.id)
        .limit(1)
        .single();

    return <ProjectDetailsView project={project} nextProject={nextProject} />;
}
