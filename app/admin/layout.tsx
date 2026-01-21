import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900">Qubit Admin</h2>
                </div>
                <nav className="px-4 space-y-2">
                    <Link href="/admin/services" className="block px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                        Services
                    </Link>
                    <Link href="/admin/work" className="block px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                        Work
                    </Link>
                    <Link href="/admin/blog" className="block px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                        Blog
                    </Link>
                    <div className="pt-8 mt-8 border-t border-slate-200">
                        <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-500 font-medium text-sm">
                            Back to Site
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
