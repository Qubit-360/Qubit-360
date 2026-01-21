export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const PROJECTS = [
  {
    title: '24/7 Hotel Booking Agent',
    slug: 'hotel-booking-agent',
    description: 'AI-powered video booking agent for hospitality.',
    fullDescription: 'A sophisticated voice-and-video AI agent designed to handle hotel reservations, concierge queries, and room service requests 24/7 without human intervention.',
    challenge: 'Hotels face high operational costs and missed revenue opportunities due to unanswered calls and limited staff availability during peak hours or late nights.',
    solution: 'We engineered a real-time conversational AI Avatar integrated with the property management system (PMS). It processes natural language, checks availability in real-time, and securely processes payments.',
    techStack: ['Python', 'OpenAI GPT-4o', 'ElevenLabs', 'Twilio', 'Node.js'],
    tag: 'Automation',
    image: '/projects/hotel-agent.jpg', // Placeholder
    link: '/work/hotel-booking-agent',
  },
  {
    title: 'Qubit Hotel Manager SaaS',
    slug: 'qubit-hotel-manager',
    description: 'Comprehensive dashboard for hotel management.',
    fullDescription: 'An all-in-one SaaS platform for independent hotels to manage bookings, housekeeping, revenue management, and guest communication from a single interface.',
    challenge: 'Legacy hotel software is clunky, expensive, and often requires on-premise servers. Independent hoteliers needed a cloud-native, modern solution.',
    solution: 'Built a multi-tenant SaaS architecture using Next.js and Supabase. Features include a drag-and-drop calendar, automated email workflows, and real-time revenue analytics.',
    techStack: ['Next.js 14', 'Supabase', 'Tailwind CSS', 'Stripe Connect', 'React Query'],
    tag: 'Full Stack',
    image: '/projects/hotel-manager.jpg', // Placeholder
    link: '/work/qubit-hotel-manager',
  },
  {
    title: 'Story World AR',
    slug: 'story-world-ar',
    description: 'Immersive augmented reality storytelling platform.',
    fullDescription: 'An education-focused AR application that brings storybooks to life, allowing children to interact with 3D characters and environments popping out of physical pages.',
    challenge: 'Reading engagement in children is dropping. We wanted to merge physical books with digital interactivity without replacing the tangible experience.',
    solution: 'Leveraged WebXR for a browser-based experience (no app download needed). Users scan a QR code on the page to trigger high-fidelity 3D animations overlaid on the book.',
    techStack: ['Three.js', 'WebXR', '8th Wall', 'React'],
    tag: 'R&D/Unity',
    image: '/projects/story-world.jpg', // Placeholder
    link: '/work/story-world-ar',
  }
];

export const EXPERIMENTS = [
  {
    title: 'Neural Architecture Search',
    slug: 'neural-architecture-search',
    description: 'Automated design of optimal neural networks for edge constraints.',
    fullDescription: 'Researching methods to automatically discover neural network architectures that offer the best trade-off between accuracy and latency on low-power edge devices.',
    status: 'Active Research',
    progress: 75,
    tag: 'Deep Learning',
    techStack: ['PyTorch', 'Ray Tune', 'Raspberry Pi 5'],
    link: '/innovation-lab/neural-architecture-search'
  },
  {
    title: 'WebXR Spatial Computing',
    slug: 'webxr-spatial-computing',
    description: 'Browser-based AR interfaces for e-commerce.',
    fullDescription: 'Developing a framework for "Instant AR" in e-commerce, allowing users to place virtual furniture or try on accessories directly from the mobile browser with zero friction.',
    status: 'Prototype Phase',
    progress: 50,
    tag: 'Spatial Comp',
    techStack: ['Three.js', 'React Three Fiber', 'WebXR Device API'],
    link: '/innovation-lab/webxr-spatial-computing'
  }
];

export const SERVICES = [
  {
    title: 'AI Automation (AAA)',
    description: 'Streamline operations with n8n workflows, custom Chatbots, and CRM integrations.',
    icon: 'Bot'
  },
  {
    title: 'Custom Engineering',
    description: 'Scalable SaaS platforms, Web Applications, and high-performance E-commerce solutions.',
    icon: 'Code'
  },
  {
    title: 'Blog',
    description: 'Pushing boundaries with Machine Learning models and Augmented Reality experiments.',
    icon: 'FlaskConical'
  }
];
