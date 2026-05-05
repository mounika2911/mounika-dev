// ============================================================
// SITE DATA — edit everything here, UI updates automatically
// ============================================================

export const ME = {
  name: "Mounika",
  title: "Senior Software Engineer ",
  subtitle: "| Front-End & AI Specialist",
  tagline: "I build scalable, accessible web applications and integrate LLM-powered solutions to solve complex user problems.",
  location: "Aubrey, Texas",
  email: "mounikagy2911@gmail.com",
  phone: "+1 6099330719",
  resumeUrl: "/resume.pdf",
  bio: `I'm a passionate Software developer who loves turning complex
problems into clean, elegant solutions. With a keen eye for design
and a love for well-crafted code, I build web apps that are fast,
accessible, and genuinely enjoyable to use.`,
};

export const EMPLOYER = {
  current: "Aroha Technologies",
  role: "Software Developer",
  since: "2022",
};

export const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/mounika2911",             icon: "github"   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mounika-yennam-8738079a/",        icon: "linkedin" },
  { label: "Twitter",  href: "https://twitter.com/mounikagy",            icon: "twitter"  },
  { label: "Website",  href: "https://mounikagy.netlify.app",            icon: "web"      },
];

export const EXPERIENCE = [
  {
    role:    "Software Developer",
    company: "Aroha Technologies",
    period:  "2024 – Present",
    desc:    "Architecting high-performance patient and provider portals for Healthcare. Focused on building a modular React library of 30+ reusable components and optimizing application state using TanStack Query and Context API to handle complex healthcare data workflows",
  },
  {
    role:    "Software Developer",
    company: "Unikwan Innovations",
    period:  "2019 – 2021",
    desc:    "Engineered responsive UI components and reduced page load times by 30% through strategic modularization. I also developed and integrated a React-based chatbot that automated customer support tasks, reducing manual workload by 40%",
  },
  {
    role:    "Junior Developer",
    company: "Stripe Digital",
    period:  "2017 – 2018",
    desc:    "Developed mobile-first, responsive websites using Bootstrap and JavaScript. Streamlined the development lifecycle by creating reusable PHP components and maintaining strict version control standards using Git",
  },
  {
    role:    "Tech Mahindra",
    company: "Digital Agency",
    period:  "2015 – 2016",
    desc:    "Optimized procurement data systems for Chevron using SAP Ariba. Focused on resolving critical data inconsistencies and collaborating with global stakeholders to ensure technical issues didn't impact major business decisions.",
  },
];

export const PROJECTS = [
  {
    name:        "VSK",
    year:        "2019",
    emoji:       "◈",
    description: "A responsive enterprise website built using HTML5, CSS3, and JavaScript. Integrated with Node.js to showcase complex chemical research services for the global biotech industry.",
    tags:        ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link:        "https://www.vsklifesciences.com/",
  },
  {
    name:        "Care Form",
    year:        "2023",
    emoji:       "◉",
    description: "A healthcare portal built with HTML5, CSS3, and JavaScript. Leverages Bootstrap for a mobile-first UI and Node.js for secure application logic, deployed via a CI/CD pipeline on Netlify.",
    tags:        ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js"],
    link:        "https://form2911.netlify.app/",
  },
  {
    name:        "Movie Review",
    year:        "2025",
    emoji:       "◎",
    description: "A dynamic media discovery platform powered by React and the TMDB API. Implements asynchronous data fetching and real-time search functionality with a mobile-first, responsive design.",
    tags:        ["React", "TMDB API", "JavaScript", "Tailwind CSS", "Netlify"],
    link:        "https://reviewsformovie.netlify.app/",
  },
  {
    name:        "Personal Portfolio",
    year:        "2016",
    emoji:       "✨",
    description: "My first professional web project, built at age 21. A responsive personal site using HTML5, CSS3, and jQuery to showcase early web development fundamentals and design concepts.",
    tags:        ["HTML", "CSS", "JavaScript", "jQuery"],
    link:        "https://mouni.netlify.app/",
  },
];

export const STACK = [
  "React", "TypeScript", "Node.js", "JavaScript",
  "HTML", "CSS", "PostgreSQL", "MongoDB", "AWS",
  "Tailwind CSS", "Git",
];

// AI chat system prompt — auto-built from data above
export const AI_SYSTEM_PROMPT = `
You are a concise, friendly assistant on ${ME.name}'s developer portfolio.
Answer questions about ${ME.name} using ONLY the details below. Be warm and brief.

Name: ${ME.name} | Title: ${ME.title} | Location: ${ME.location}
Email: ${ME.email} | Phone: ${ME.phone}
Bio: ${ME.bio}

Current Role: ${EMPLOYER.role} at ${EMPLOYER.current} (since ${EMPLOYER.since})

Experience:
${EXPERIENCE.map(e => `- ${e.role} @ ${e.company} (${e.period}): ${e.desc}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.name} (${p.year}): ${p.description} [${p.tags.join(', ')}]`).join('\n')}

Tech Stack: ${STACK.join(', ')}

Socials: GitHub ${SOCIALS[0].href} | LinkedIn ${SOCIALS[1].href} | Twitter ${SOCIALS[2].href}

If something isn't here, suggest they email ${ME.email}. Keep replies under 4 sentences.
`.trim();
