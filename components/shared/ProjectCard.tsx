import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    title: string;
    description: string;
    tag: string;
    image: string; // Keeping image prop for future use, using div placeholder for now
    link: string;
    className?: string;
}

export default function ProjectCard({
    title,
    description,
    tag,
    image,
    link,
    className
}: ProjectCardProps) {
    return (
        <div className={cn(
            "group relative overflow-hidden rounded-2xl bg-white border border-slate-200 transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl",
            className
        )}>
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10 opacity-60" />
                {/* Placeholder image logic since user might not have actual images yet */}
                <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600 backdrop-blur-md transition-colors hover:bg-orange-100">
                        {tag}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                    {description}
                </p>

                <Link
                    href={link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:gap-3 transition-all"
                >
                    View Case Study <ArrowUpRight size={16} className="text-orange-500" />
                </Link>
            </div>
        </div>
    );
}
