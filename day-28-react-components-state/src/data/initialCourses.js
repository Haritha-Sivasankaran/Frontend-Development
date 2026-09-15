/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * File: src/data/initialCourses.js
 * ==========================================================================
 * Initial course dataset for the React Course Dashboard mini-project.
 */

export const initialCourses = [
    {
        id: "course-101",
        title: "React 18 Architecture & Custom Hooks",
        instructor: "Elena Vance",
        category: "Frontend",
        level: "Intermediate",
        price: 349,
        duration: "8 Weeks",
        description: "Master component composition, lifting state up, controlled forms, custom hooks, and reconciliation performance.",
        isFavorite: true,
        icon: "⚛️"
    },
    {
        id: "course-102",
        title: "Node.js Microservices & Event Loops",
        instructor: "Marcus Sterling",
        category: "Backend",
        level: "Advanced",
        price: 399,
        duration: "10 Weeks",
        description: "Build high-throughput REST and GraphQL APIs, handle async pipelines, and orchestrate Docker containers.",
        isFavorite: false,
        icon: "🟢"
    },
    {
        id: "course-103",
        title: "Cloud-Native Kubernetes & Docker DevOps",
        instructor: "Kavita Rao",
        category: "Cloud",
        level: "Intermediate",
        price: 449,
        duration: "8 Weeks",
        description: "Containerize multi-tier architectures, configure CI/CD deployment pipelines, and scale Kubernetes clusters.",
        isFavorite: false,
        icon: "☁️"
    },
    {
        id: "course-104",
        title: "Python & Pandas for Data Science",
        instructor: "Dr. Arvind Patel",
        category: "Data",
        level: "Beginner to Pro",
        price: 329,
        duration: "6 Weeks",
        description: "Analyze datasets, build vectorized numerical transforms, and generate interactive data visualizations with Python.",
        isFavorite: true,
        icon: "🐍"
    },
    {
        id: "course-105",
        title: "Full-Stack Next.js 14 App Router",
        instructor: "Elena Vance",
        category: "Frontend",
        level: "Advanced",
        price: 479,
        duration: "10 Weeks",
        description: "Harness React Server Components (RSC), server actions, streaming SSR, and SEO-optimized caching.",
        isFavorite: false,
        icon: "🚀"
    },
    {
        id: "course-106",
        title: "UI/UX Component Design Systems in Figma",
        instructor: "Sophia Laurent",
        category: "Design",
        level: "All Levels",
        price: 279,
        duration: "5 Weeks",
        description: "Translate design tokens, scalable typography ladders, and responsive Figma components into production CSS.",
        isFavorite: false,
        icon: "🎨"
    }
];

export const courseCategories = ["All", "Frontend", "Backend", "Cloud", "Data", "Design"];
