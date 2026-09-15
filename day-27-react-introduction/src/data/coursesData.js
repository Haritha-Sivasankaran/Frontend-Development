/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * File: src/data/coursesData.js
 * ==========================================================================
 * Course and Instructor mock dataset passed as props through React components.
 */

export const instructorData = {
    name: "Elena Vance",
    role: "Senior Staff Frontend Architect",
    organization: "EduSphere Engineering Academy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80",
    bio: "Over 12 years of production experience architecting mission-critical React applications. Active contributor to modern component design systems and author of 'Modern React Architecture'.",
    totalStudents: "42,000+",
    coursesCount: 6,
    averageRating: 4.9,
    badges: ["Verified Instructor", "Top Rated", "Staff Engineer"]
};

export const coursesData = [
    {
        id: "course-101",
        title: "React 18 Foundations: Components & JSX",
        category: "Frontend",
        level: "Beginner",
        duration: "6 Weeks",
        price: 349,
        rating: 4.9,
        reviews: 1420,
        description: "Understand the Virtual DOM, master JSX expressions, component trees, props contract passing, and event handling mechanics.",
        tags: ["React", "JSX", "Functional Components", "Props"],
        featured: true,
        icon: "⚛️"
    },
    {
        id: "course-102",
        title: "Production TypeScript for React Developers",
        category: "Frontend",
        level: "Intermediate",
        duration: "8 Weeks",
        price: 429,
        rating: 4.8,
        reviews: 980,
        description: "Type your props, generic hooks, synthetic events, and component interfaces with compile-time safety.",
        tags: ["TypeScript", "Generics", "Type Safety", "Interfaces"],
        featured: false,
        icon: "📘"
    },
    {
        id: "course-103",
        title: "Modern UI Design Systems with React & CSS",
        category: "Design",
        level: "All Levels",
        duration: "5 Weeks",
        price: 299,
        rating: 4.9,
        reviews: 750,
        description: "Construct scalable, accessible component libraries from Figma design tokens using modern Flexbox, CSS Grid, and custom properties.",
        tags: ["UI/UX", "CSS Grid", "Design Tokens", "Accessibility"],
        featured: false,
        icon: "🎨"
    },
    {
        id: "course-104",
        title: "Full-Stack Next.js 14 & Server Components",
        category: "Full-Stack",
        level: "Advanced",
        duration: "10 Weeks",
        price: 499,
        rating: 4.9,
        reviews: 1650,
        description: "Harness React Server Components (RSC), App Router, streaming SSR, and server actions for lightning-fast performance.",
        tags: ["Next.js", "Server Components", "SSR", "App Router"],
        featured: true,
        icon: "🚀"
    },
    {
        id: "course-105",
        title: "Asynchronous React: Data Fetching & APIs",
        category: "Architecture",
        level: "Intermediate",
        duration: "6 Weeks",
        price: 379,
        rating: 4.7,
        reviews: 620,
        description: "Orchestrate HTTP requests, handle loading and error states, cache responses, and build resilient network pipelines.",
        tags: ["Fetch API", "Promises", "Async", "REST APIs"],
        featured: false,
        icon: "🌐"
    },
    {
        id: "course-106",
        title: "React Testing Library & Jest Masterclass",
        category: "Testing",
        level: "Intermediate to Pro",
        duration: "4 Weeks",
        price: 289,
        rating: 4.8,
        reviews: 510,
        description: "Write robust unit and integration tests for functional components focusing on user behaviors rather than implementation details.",
        tags: ["Testing", "Jest", "RTL", "Code Quality"],
        featured: false,
        icon: "🧪"
    }
];
