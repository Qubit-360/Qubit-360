import ProjectCard from '@/components/shared/ProjectCard';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Ensure fresh data on every request

export default async function WorkPage() {
    const { data: works } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500">Work</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Selected case studies demonstrating our capabilities in AI, Engineering, and R&D.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {works?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            tag={project.tag}
                            image={project.image_url || '/placeholder.jpg'}
                            link={`/work/${project.slug}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
