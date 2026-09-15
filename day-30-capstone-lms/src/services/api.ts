import {
  Course,
  Student,
  ApiResponse,
  StudentRegistrationInput,
  CourseCategory
} from '../types';

/**
 * Initial Catalog of Professional Courses
 */
export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-101',
    title: 'Full-Stack Web Engineering: React 18, Node & PostgreSQL',
    slug: 'fullstack-web-react-node',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '10 Weeks',
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviewCount: 1420,
    description:
      'Master end-to-end full-stack development. Build production-grade single-page applications with React 18, TypeScript, RESTful Node.js Express APIs, and PostgreSQL databases.',
    learningOutcomes: [
      'Architect robust React SPAs with TypeScript and modern hooks',
      'Design relational database schemas and write optimized SQL queries',
      'Build scalable REST and GraphQL APIs with Node.js and Express',
      'Implement JWT token authentication and role-based access control',
      'Deploy full-stack applications with Docker and CI/CD pipelines'
    ],
    instructor: {
      id: 'inst-01',
      name: 'Elena Rostova',
      role: 'Principal Frontend Architect',
      bio: 'Ex-Senior Engineer at Spotify with 12+ years of full-stack web application engineering experience.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      rating: 4.95,
      studentsCount: 38400,
      coursesCount: 6
    },
    syllabus: [
      { id: 'les-101-1', title: 'Modern React 18 & Component Mental Models', duration: '45 mins', description: 'Reconciliation, functional purity, and custom hooks architecture.', order: 1 },
      { id: 'les-101-2', title: 'TypeScript Fundamentals in React Projects', duration: '60 mins', description: 'Strong typing for props, states, events, and API payloads.', order: 2 },
      { id: 'les-101-3', title: 'Node.js & Express RESTful API Engineering', duration: '55 mins', description: 'Routing, middleware chains, error boundaries, and input validation.', order: 3 },
      { id: 'les-101-4', title: 'PostgreSQL Database Integration & ORM', duration: '50 mins', description: 'Schema migrations, indexing, joins, and transaction management.', order: 4 },
      { id: 'les-101-5', title: 'Production Security & CI/CD Cloud Deployment', duration: '65 mins', description: 'CORS, helmet, environment encryption, and automated testing.', order: 5 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Full Stack'],
    totalHours: 42
  },
  {
    id: 'course-102',
    title: 'Cloud Architecture & DevOps with AWS & Kubernetes',
    slug: 'cloud-devops-aws-kubernetes',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    duration: '8 Weeks',
    price: 399,
    originalPrice: 549,
    rating: 4.85,
    reviewCount: 980,
    description:
      'Learn cloud infrastructure design, containerization, and orchestration. Build resilient cloud-native architectures on AWS with Terraform, Docker, and Kubernetes.',
    learningOutcomes: [
      'Provision AWS VPC, EC2, ECS, and S3 using Terraform Infrastructure as Code',
      'Containerize microservices and optimize multi-stage Docker builds',
      'Deploy and orchestrate high-availability Kubernetes clusters',
      'Build automated continuous integration and continuous deployment (CI/CD) pipelines',
      'Implement Prometheus and Grafana cluster monitoring and alerting'
    ],
    instructor: {
      id: 'inst-02',
      name: 'Marcus Vance',
      role: 'Staff DevOps Consultant',
      bio: 'AWS Certified Solutions Architect with over a decade of enterprise cloud transformation experience.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 4.88,
      studentsCount: 22100,
      coursesCount: 4
    },
    syllabus: [
      { id: 'les-102-1', title: 'AWS Core Networking & Virtual Private Clouds', duration: '50 mins', description: 'Subnets, route tables, internet gateways, and security groups.', order: 1 },
      { id: 'les-102-2', title: 'Docker Containerization Best Practices', duration: '45 mins', description: 'Multi-stage builds, alpine images, and layer caching.', order: 2 },
      { id: 'les-102-3', title: 'Kubernetes Pods, Deployments & Services', duration: '70 mins', description: 'Declarative YAML manifests and rolling zero-downtime updates.', order: 3 },
      { id: 'les-102-4', title: 'Terraform Infrastructure as Code (IaC)', duration: '60 mins', description: 'State management, modules, and multi-environment orchestration.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'DevOps'],
    totalHours: 36
  },
  {
    id: 'course-103',
    title: 'Data Science & Machine Learning with Python & PyTorch',
    slug: 'data-science-machine-learning-python',
    category: 'Data Science & AI',
    level: 'Intermediate',
    duration: '12 Weeks',
    price: 369,
    originalPrice: 489,
    rating: 4.92,
    reviewCount: 1650,
    description:
      'From statistical exploration to neural networks. Clean data with Pandas, build interactive predictive models, and train deep learning vision and NLP networks.',
    learningOutcomes: [
      'Manipulate and analyze messy tabular datasets using NumPy and Pandas',
      'Create high-impact statistical data visualizations with Seaborn and Plotly',
      'Train supervised and unsupervised regression and classification models',
      'Build convolutional neural networks (CNNs) in PyTorch for computer vision',
      'Deploy machine learning models as production REST endpoints with FastAPI'
    ],
    instructor: {
      id: 'inst-03',
      name: 'Dr. Arvind Patel',
      role: 'Head of AI Research',
      bio: 'PhD in Computer Science from Stanford; published author in deep learning and NLP architectures.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 4.96,
      studentsCount: 41200,
      coursesCount: 5
    },
    syllabus: [
      { id: 'les-103-1', title: 'Python for Data Analysis: NumPy & Pandas Vectorization', duration: '55 mins', description: 'Data structures, vectorized transforms, and missing data imputation.', order: 1 },
      { id: 'les-103-2', title: 'Exploratory Data Analysis & Statistical Inference', duration: '50 mins', description: 'Distributions, hypothesis testing, and correlation discovery.', order: 2 },
      { id: 'les-103-3', title: 'Scikit-Learn Machine Learning Pipelines', duration: '65 mins', description: 'Feature scaling, cross-validation, and hyperparameter tuning.', order: 3 },
      { id: 'les-103-4', title: 'Deep Learning with PyTorch & Tensors', duration: '80 mins', description: 'Backpropagation, loss optimizers, and neural layers.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Python', 'Machine Learning', 'PyTorch', 'Data Science', 'Pandas'],
    totalHours: 48
  },
  {
    id: 'course-104',
    title: 'Design Systems & Enterprise UI/UX with Figma',
    slug: 'ui-ux-design-systems-figma',
    category: 'UI/UX Design',
    level: 'Beginner',
    duration: '6 Weeks',
    price: 279,
    originalPrice: 389,
    rating: 4.79,
    reviewCount: 780,
    description:
      'Learn how top product companies create cohesive design systems. Master Figma variables, auto-layout 5.0, responsive components, accessibility (WCAG), and developer handoff.',
    learningOutcomes: [
      'Construct scalable Figma component libraries using design tokens and variables',
      'Apply user research heuristics and design thinking frameworks',
      'Design WCAG AAA compliant interfaces with accessible contrast ratios',
      'Produce interactive micro-interaction prototypes for user testing',
      'Bridge designer-to-developer handoff with zero ambiguity'
    ],
    instructor: {
      id: 'inst-04',
      name: 'Zara Al-Mansoor',
      role: 'Staff Product Designer',
      bio: 'Design Systems Lead with former experience leading design infrastructure at fintech scale-ups.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      rating: 4.82,
      studentsCount: 18900,
      coursesCount: 3
    },
    syllabus: [
      { id: 'les-104-1', title: 'Design Thinking & UX Architecture Fundamentals', duration: '40 mins', description: 'User journeys, wireframing, and information hierarchies.', order: 1 },
      { id: 'les-104-2', title: 'Figma Auto-Layout & Adaptive Components', duration: '55 mins', description: 'Slots, nested layouts, min/max constraints, and variant properties.', order: 2 },
      { id: 'les-104-3', title: 'Design Tokens & Multi-Brand Variables', duration: '60 mins', description: 'Semantic colors, dark mode tokens, and spacing scales.', order: 3 },
      { id: 'les-104-4', title: 'Prototyping & Developer Handoff Documentation', duration: '45 mins', description: 'Smart animate transitions, inspect mode, and component specs.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping', 'Accessibility'],
    totalHours: 26
  },
  {
    id: 'course-105',
    title: 'Modern TypeScript & Scalable Frontend Architecture',
    slug: 'typescript-scalable-frontend-architecture',
    category: 'Web Development',
    level: 'Advanced',
    duration: '8 Weeks',
    price: 329,
    originalPrice: 449,
    rating: 4.94,
    reviewCount: 1120,
    description:
      'Go beyond the basics of TypeScript. Master conditional types, template literal types, generic constraints, AST transformations, and clean architectural design patterns.',
    learningOutcomes: [
      'Master advanced TypeScript type-level programming and generics',
      'Implement Hexagonal / Clean Architecture in frontend applications',
      'Structure enterprise monorepos using Turborepo and npm workspaces',
      'Write rock-solid unit and integration tests with Vitest and Testing Library',
      'Optimize bundle performance with code splitting and tree-shaking'
    ],
    instructor: {
      id: 'inst-01',
      name: 'Elena Rostova',
      role: 'Principal Frontend Architect',
      bio: 'Ex-Senior Engineer at Spotify with 12+ years of full-stack web application engineering experience.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      rating: 4.95,
      studentsCount: 38400,
      coursesCount: 6
    },
    syllabus: [
      { id: 'les-105-1', title: 'Advanced Generics & Type-Level Programming', duration: '60 mins', description: 'Infer keyword, keyof lookups, and conditional narrowing.', order: 1 },
      { id: 'les-105-2', title: 'Clean Architecture & Domain-Driven Design in React', duration: '65 mins', description: 'Decoupling business rules from UI presentation and framework adapters.', order: 2 },
      { id: 'les-105-3', title: 'Enterprise State Management & Context Optimization', duration: '50 mins', description: 'Preventing re-render cascades and memoization strategies.', order: 3 },
      { id: 'les-105-4', title: 'Monorepos, Bundlers & Micro-Frontends', duration: '75 mins', description: 'Module Federation, shared packages, and build caching.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['TypeScript', 'Architecture', 'Clean Code', 'Generics', 'React'],
    totalHours: 34
  },
  {
    id: 'course-106',
    title: 'Cyber Security Operations & Penetration Testing',
    slug: 'cyber-security-penetration-testing',
    category: 'Cyber Security',
    level: 'Intermediate',
    duration: '10 Weeks',
    price: 379,
    originalPrice: 519,
    rating: 4.88,
    reviewCount: 890,
    description:
      'Learn how to think like both an attacker and a defender. Master network reconnaissance, vulnerability assessment, OWASP Top 10 web exploits, and cryptography.',
    learningOutcomes: [
      'Perform network reconnaissance and port scanning using Nmap and Wireshark',
      'Audit web application vulnerabilities against the OWASP Top 10 standards',
      'Exploit and remediate SQL Injection, XSS, CSRF, and SSRF vulnerabilities',
      'Implement public key infrastructure (PKI) and cryptographic safeguards',
      'Write clear security audit findings and executive mitigation reports'
    ],
    instructor: {
      id: 'inst-05',
      name: 'David Chen',
      role: 'Lead Information Security Officer',
      bio: 'CISSP & CEH certified penetration tester with 14 years advising Fortune 500 security teams.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      studentsCount: 26500,
      coursesCount: 3
    },
    syllabus: [
      { id: 'les-106-1', title: 'Networking Fundamentals & Traffic Analysis', duration: '50 mins', description: 'TCP/IP, DNS spoofing detection, and packet inspection.', order: 1 },
      { id: 'les-106-2', title: 'Web Application Hacking: OWASP Top 10', duration: '70 mins', description: 'Hands-on exploitation of SQLi, Broken Auth, and XSS.', order: 2 },
      { id: 'les-106-3', title: 'Applied Cryptography & Secure Storage', duration: '55 mins', description: 'AES, RSA, hashing salts, and secrets vaults.', order: 3 },
      { id: 'les-106-4', title: 'Defensive Hardening & Incident Response', duration: '60 mins', description: 'SIEM logging, firewall rules, and zero-trust policy.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Security', 'OWASP', 'Penetration Testing', 'Cryptography', 'Linux'],
    totalHours: 40
  },
  {
    id: 'course-107',
    title: 'Cross-Platform Mobile Apps with React Native & Expo',
    slug: 'react-native-expo-mobile-development',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '8 Weeks',
    price: 339,
    originalPrice: 469,
    rating: 4.86,
    reviewCount: 920,
    description:
      'Build truly native iOS and Android apps with a single React codebase. Master Expo Router, native gestures, offline SQLite caching, and push notifications.',
    learningOutcomes: [
      'Build fluid cross-platform UI with React Native core components',
      'Implement file-based mobile navigation with Expo Router',
      'Interact with device sensors, cameras, location, and biometric auth',
      'Store local persistent data using SQLite and AsyncStorage',
      'Publish apps to Apple App Store and Google Play Store via EAS Build'
    ],
    instructor: {
      id: 'inst-06',
      name: 'Kavita Rao',
      role: 'Principal Mobile Engineer',
      bio: 'Mobile engineering veteran with 8 published consumer apps and 2.5M+ downloads across iOS & Android.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 4.89,
      studentsCount: 21300,
      coursesCount: 4
    },
    syllabus: [
      { id: 'les-107-1', title: 'React Native Core Architecture & Flexbox Layout', duration: '45 mins', description: 'Views, texts, flex direction, and responsive dimensions.', order: 1 },
      { id: 'les-107-2', title: 'File-Based Navigation with Expo Router', duration: '50 mins', description: 'Stack navigators, tabs, modals, and deep-link routing.', order: 2 },
      { id: 'les-107-3', title: 'Gestures, Animations & Reanimated 3', duration: '60 mins', description: 'Pan gestures, spring physics, and shared element transitions.', order: 3 },
      { id: 'les-107-4', title: 'Device APIs, Push Notifications & App Store Release', duration: '65 mins', description: 'Push notification payloads, camera permissions, and EAS deployments.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['React Native', 'Expo', 'Mobile', 'iOS', 'Android'],
    totalHours: 32
  },
  {
    id: 'course-108',
    title: 'Distributed Systems & Microservices in Go & gRPC',
    slug: 'distributed-systems-go-grpc',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    duration: '10 Weeks',
    price: 389,
    originalPrice: 529,
    rating: 4.93,
    reviewCount: 640,
    description:
      'Learn how high-traffic internet systems handle millions of queries per second. Design microservices in Golang, gRPC protobufs, Apache Kafka message buses, and distributed caching.',
    learningOutcomes: [
      'Write concurrent, high-throughput backend services in Golang with goroutines and channels',
      'Design binary protocol contracts using Protocol Buffers and gRPC',
      'Implement event-driven asynchronous messaging patterns with Apache Kafka',
      'Solve distributed consistency challenges with Sagas and two-phase commit concepts',
      'Deploy distributed tracing with OpenTelemetry and Jaeger'
    ],
    instructor: {
      id: 'inst-02',
      name: 'Marcus Vance',
      role: 'Staff DevOps Consultant',
      bio: 'AWS Certified Solutions Architect with over a decade of enterprise cloud transformation experience.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 4.88,
      studentsCount: 22100,
      coursesCount: 4
    },
    syllabus: [
      { id: 'les-108-1', title: 'Golang Concurrency Patterns: Channels & Mutexes', duration: '60 mins', description: 'Goroutine lifecycles, race condition prevention, and context propagation.', order: 1 },
      { id: 'les-108-2', title: 'gRPC & Protocol Buffers Binary Contracts', duration: '55 mins', description: 'Streaming RPCs, protobuf compilation, and client interceptors.', order: 2 },
      { id: 'les-108-3', title: 'Event-Driven Architectures with Apache Kafka', duration: '70 mins', description: 'Partitioning, consumer groups, offsets, and idempotency.', order: 3 },
      { id: 'les-108-4', title: 'Distributed Tracing & Resilience Patterns', duration: '60 mins', description: 'Circuit breakers, exponential backoff, and distributed tracing spans.', order: 4 }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Go', 'gRPC', 'Microservices', 'Kafka', 'Distributed Systems'],
    totalHours: 38
  }
];

export const CATEGORIES: CourseCategory[] = [
  'Web Development',
  'Cloud & DevOps',
  'Data Science & AI',
  'UI/UX Design',
  'Mobile Development',
  'Cyber Security'
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock REST API Client with full typing
 */
export const api = {
  /**
   * Fetch all courses from the simulated API
   */
  async fetchCourses(forceError = false): Promise<ApiResponse<Course[]>> {
    await delay(450); // Simulated network latency

    if (forceError) {
      throw new Error('HTTP 503 Service Unavailable: Catalog service is temporarily unreachable.');
    }

    return {
      success: true,
      data: [...INITIAL_COURSES],
      message: 'Courses fetched successfully.',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Fetch a single course by its ID
   */
  async fetchCourseById(id: string): Promise<ApiResponse<Course>> {
    await delay(250);
    const course = INITIAL_COURSES.find((c) => c.id === id);
    if (!course) {
      throw new Error(`HTTP 404: Course with ID "${id}" was not found.`);
    }

    return {
      success: true,
      data: course,
      message: 'Course details retrieved.',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Register a new student profile
   */
  async registerStudent(input: StudentRegistrationInput): Promise<ApiResponse<Student>> {
    await delay(350);

    const newStudent: Student = {
      id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      bio: input.bio || 'Eager learner expanding technology skills.',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(input.name)}`,
      registeredDate: new Date().toISOString().split('T')[0],
      interests: [input.interest],
      skills: ['HTML5', 'CSS3', 'JavaScript'],
      githubUsername: input.githubUsername
    };

    return {
      success: true,
      data: newStudent,
      message: 'Student account created successfully.',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Update student profile
   */
  async updateStudent(student: Student): Promise<ApiResponse<Student>> {
    await delay(300);
    return {
      success: true,
      data: student,
      message: 'Profile updated successfully.',
      timestamp: new Date().toISOString()
    };
  }
};
