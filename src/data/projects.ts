// /data/projects.ts

export interface IProjects {
  slug: string;
  title: string;
  type: string;
  dates: string;
  status: string;
  description: string;
  techStack: string[];
  image: string;
  overview: string;
  motivation: string;
  process: { step: string; evidence: string; image: string[] }[];
  showcase: { image: string; link: string }[];
  features: string[];
  future: string[];
}

export const projects = [
  {
    slug: 'skillup',
    title: 'SkillUp',
    type: 'Web Development',
    dates: 'Jan 2024 - Present',
    status: 'In Development',
    description: 'A platform for shifting to a meritocratic workforce',
    techStack: ['TypeScript', 'FreshJS', 'Deno', 'PostgreSQL', 'Supabase', 'Figma'],
    image:
      'https://images.unsplash.com/photo-1750101272034-7becde7454dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    overview:
      '<b>Final Year University Project</b><br/><br/>A merit-based collaboration platform designed for students, freelancers, and early-career professionals to build public portfolios through real-world projects. Users contribute to tasks without needing to apply, get reviewed by peers or clients, and are ranked transparently on a live leaderboard.',

    motivation:
      'Breaking into competitive industries without experience is brutal. Traditional hiring filters people by CVs and networks, not skills. This project flips that: giving newcomers a way to prove themselves through actual work, and giving startups access to talent without hiring overheads.',

    process: [
      {
        step: 'System Design',
        evidence: 'Planned data models, user roles, and flows using ERDs and use case tables.',
        image: [''],
      },
      {
        step: 'Prototyping',
        evidence: 'Created UI mockups in Figma with mobile-first accessibility in mind.',
        image: [''],
      },
      {
        step: 'Frontend Development',
        evidence: 'Built with FreshJS and TypeScript for fast, server-rendered interactions.',
        image: [''],
      },
      {
        step: 'Backend Integration',
        evidence: 'Used Supabase for authentication, real-time messaging, and PostgreSQL database.',
        image: [''],
      },
      {
        step: 'Session & Role Management',
        evidence:
          'Implemented secure session handling and role-based access with Deno KV and Supabase RLS.',
        image: [''],
      },
      {
        step: 'Deployment',
        evidence: 'Deployed globally via Deno Deploy with automated GitHub CI/CD.',
        image: [''],
      },
    ],

    showcase: [
      { image: '/env/nx.png', link: 'https://your-live-demo.com' },
      {
        image: '/env/nx.png',
        link: 'https://www.figma.com/file/yourFileLink',
      },
      {
        image: '/env/nx.png',
        link: '/documents/skillup-final-report.pdf',
      },
      {
        image: '/env/nx.png',
        link: 'https://github.com/yourusername/skillup',
      },
    ],

    features: [
      'Merit-based leaderboard with peer and client reviews',
      'Real-time chat, file submissions, and task-specific contributions',
      'Role-based access for users, managers, and project owners',
      'Pre-submission file preview editing',
      'Chat specific file explorer',
    ],

    future: [
      'AI-assisted review moderation to ensure fairness and consistency',
      'Mobile app with offline sync and push notifications',
      'Expanded internationalisation and accessibility coverage',
      'Integrated payment gateway for direct project compensation',
      'Exploration feed powered by vector matching and engagement data',
    ],
  },
  // {
  //   slug: 'just-for-kicks',
  //   title: 'Just For Kicks',
  //   type: 'Mobile Game',
  //   dates: 'Jun 2023 - Jan 2024',
  //   status: 'Completed',
  //   description: 'A mobile game featuring "popular" sneakers and a ball to kick around',
  //   techStack: ['C#', 'GLSL', 'Unity', 'Firebase', 'Blender', 'Adobe Illustrator'],
  //   image:
  //     'https://images.unsplash.com/photo-1745233775044-40e16ba3d9e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
  // {
  //   slug: 'downfall',
  //   title: 'Downfall',
  //   type: 'Mobile Game',
  //   dates: 'Jun 2020 - Jan 2021',
  //   status: 'Completed',
  //   description: 'A simple mobile game platformer',
  //   techStack: ['C#', 'Unity', 'Adobe Illustrator'],
  //   image:
  //     'https://images.unsplash.com/photo-1744123101974-b43c01979548?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
  // {
  //   slug: 'website-designer',
  //   title: 'Website Designer',
  //   type: 'Web Development',
  //   dates: 'Present',
  //   status: 'Future Project',
  //   description: 'Lift my skills as a creative genius and become the ultimate UI / UX Designer',
  //   techStack: ['TypeScript', 'NextJS', 'NodeJS', 'Vercel', 'Figma'],
  //   image:
  //     'https://images.unsplash.com/photo-1750101272034-7becde7454dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   overview:
  //     'A merit-based collaboration platform designed for students, freelancers, and early-career professionals to build public portfolios through real-world projects. Users contribute to tasks without needing to apply, get reviewed by peers and clients, and are ranked transparently on a live leaderboard.',
  //   motivation:
  //     'Breaking into competitive industries without experience is brutal. Traditional hiring filters people by CVs and networks, not skills. This project flips that: giving newcomers a way to prove themselves through actual work, and giving startups access to talent without hiring overheads.',
  // },
  // {
  //   slug: 'second-scent',
  //   title: 'Second Scent',
  //   type: 'Business',
  //   dates: 'Jan 2026',
  //   status: 'Future Project',
  //   description: 'Scent Discovery Re-imagined',
  //   techStack: ['C#', 'ASP.NET', 'AWS', 'Figma', 'Adobe Illustrator'],
  //   image:
  //     'https://images.unsplash.com/photo-1745233775044-40e16ba3d9e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
  // {
  //   slug: 'minecraft-rust',
  //   title: 'Minecraft Rust',
  //   type: 'Video Game',
  //   dates: 'Nov 2025',
  //   status: 'Future Project',
  //   description: 'A full remake of Minecraft made with rust to optimise performance',
  //   techStack: ['Rust'],
  //   image:
  //     'https://images.unsplash.com/photo-1744123101974-b43c01979548?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
];
