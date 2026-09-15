/**
 * ==========================================================================
 * DAY 24: HTML + CSS + JAVASCRIPT INTEGRATION
 * Project: Online Training Institute Website (EduSphere Institute)
 * File: app.js
 * ==========================================================================
 */

// Global state
let coursesData = [];
let activeCategory = 'all';
let currentSearchTerm = '';

// Offline fallback dataset if fetch('./courses.json') fails in raw file:// protocol
const fallbackCourses = [
    {
        id: "course-101",
        title: "Modern Frontend Engineering with React & Next.js",
        category: "frontend",
        level: "Intermediate",
        duration: "10 Weeks",
        price: 499,
        rating: 4.9,
        reviewsCount: 240,
        instructor: "Elena Vance (Senior Staff Engineer)",
        description: "Master component architectures, custom hooks, SSR with Next.js, TypeScript, and state management.",
        curriculum: [
            "HTML5 & Modern Responsive CSS Grid / Flexbox",
            "JavaScript ES6+, Asynchronous Pipelines & Promises",
            "React Foundations, Hooks, and Component Trees",
            "Full-stack Next.js App Router & API Integrations"
        ],
        icon: "⚛️"
    },
    {
        id: "course-102",
        title: "Full-Stack Node.js & Microservices Architecture",
        category: "backend",
        level: "Advanced",
        duration: "12 Weeks",
        price: 549,
        rating: 4.8,
        reviewsCount: 185,
        instructor: "Marcus Sterling (Principal Architect)",
        description: "Build high-throughput REST & GraphQL APIs, distributed messaging with Kafka, and PostgreSQL data modeling.",
        curriculum: [
            "Node.js Runtime Internals & Event Loop",
            "Express.js & NestJS Production Architecture",
            "Database Schema Design & Query Optimization",
            "Microservices, Docker Containers & Redis Caching"
        ],
        icon: "🟢"
    },
    {
        id: "course-103",
        title: "Cloud Native DevOps & Kubernetes Mastery",
        category: "cloud",
        level: "Intermediate",
        duration: "8 Weeks",
        price: 479,
        rating: 4.9,
        reviewsCount: 310,
        instructor: "Kavita Rao (Cloud Solutions Lead)",
        description: "Automate CI/CD pipelines, containerize architectures with Docker, and orchestrate clusters on AWS & Kubernetes.",
        curriculum: [
            "Linux Server Administration & Shell Scripting",
            "Docker Containerization & Image Security",
            "Kubernetes Cluster Setup, Pods, Services & Ingress",
            "Terraform Infrastructure as Code & AWS Deployments"
        ],
        icon: "☁️"
    },
    {
        id: "course-104",
        title: "Modern UI/UX Design System with Figma & CSS",
        category: "frontend",
        level: "Beginner to Pro",
        duration: "6 Weeks",
        price: 389,
        rating: 4.7,
        reviewsCount: 142,
        instructor: "Sophia Laurent (Lead Product Designer)",
        description: "Create design tokens, scalable typography ladders, reusable Figma components, and handoff to CSS.",
        curriculum: [
            "Design Fundamentals, Typography, & Color Harmonies",
            "Component Tokens, Auto-Layout & Variants in Figma",
            "Translating Figma Specs into Semantic CSS Grid",
            "Accessible Design Patterns (WCAG 2.2 Compliance)"
        ],
        icon: "🎨"
    },
    {
        id: "course-105",
        title: "Python for Data Science & Machine Learning",
        category: "data",
        level: "Intermediate",
        duration: "10 Weeks",
        price: 529,
        rating: 4.9,
        reviewsCount: 275,
        instructor: "Dr. Arvind Patel (Data Science Director)",
        description: "Analyze datasets with Pandas & NumPy, create interactive visualizations, and train predictive models with Scikit-Learn.",
        curriculum: [
            "Python Core, NumPy Arrays, & Vectorized Math",
            "Exploratory Data Analysis with Pandas & Seaborn",
            "Supervised & Unsupervised Machine Learning Algorithms",
            "Deploying ML Models as REST APIs with FastAPI"
        ],
        icon: "🐍"
    },
    {
        id: "course-106",
        title: "Production Cybersecurity & Penetration Testing",
        category: "cloud",
        level: "Advanced",
        duration: "8 Weeks",
        price: 599,
        rating: 4.8,
        reviewsCount: 160,
        instructor: "David Miller (Offensive Security Lead)",
        description: "Understand OWASP Top 10 vulnerabilities, conduct network reconnaissance, ethical exploits, and defense.",
        curriculum: [
            "Network Protocols, Wireshark, & Packet Analysis",
            "OWASP Top 10 Web Vulnerabilities & Exploits",
            "Privilege Escalation & Linux/Windows Post-Exploitation",
            "Secure Coding Standards & Hardening Cloud Environments"
        ],
        icon: "🛡️"
    }
];

// DOM Elements
const coursesGrid = document.getElementById('courses-grid');
const searchInput = document.getElementById('search-input');
const categoryChips = document.querySelectorAll('.chip-btn');
const courseSelect = document.getElementById('course-select');
const registrationForm = document.getElementById('registration-form');
const testimonialsContainer = document.getElementById('testimonials-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const courseModal = document.getElementById('course-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

/**
 * 1. Initialize Application
 */
document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    await loadCourses();
    initFiltersAndSearch();
    initRegistrationValidation();
    loadRemoteTestimonials();
});

/**
 * 2. Navigation & Mobile Drawer
 */
function initNavigation() {
    // Hamburger toggle
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const isOpen = navLinks.classList.contains('mobile-open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile drawer on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Modal close listeners
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (courseModal) {
        courseModal.addEventListener('click', (e) => {
            if (e.target === courseModal) closeModal();
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && courseModal && courseModal.classList.contains('open')) {
            closeModal();
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    });
}

/**
 * 3. Load Courses Data (Fetch API with local fallback)
 */
async function loadCourses() {
    try {
        const response = await fetch('./courses.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        coursesData = await response.json();
    } catch (err) {
        console.warn('Local fetch of courses.json failed (likely direct file:// protocol). Using fallback data.', err);
        coursesData = fallbackCourses;
    }

    // Populate course select dropdown in registration form
    populateCourseSelect(coursesData);
    // Render initial catalog
    renderCourses(coursesData);
}

/**
 * 4. Populate Course Options in Form
 */
function populateCourseSelect(courses) {
    if (!courseSelect) return;
    courseSelect.innerHTML = '<option value="">-- Choose a Certification Course --</option>';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.icon} ${course.title} ($${course.price})`;
        courseSelect.appendChild(option);
    });
}

/**
 * 5. Render Courses Catalog
 */
function renderCourses(courses) {
    if (!coursesGrid) return;
    coursesGrid.innerHTML = '';

    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <span style="font-size: 3rem; display: block; margin-bottom: 0.75rem;">🔍</span>
                <h3 style="color: var(--dark); margin-bottom: 0.5rem;">No Courses Found</h3>
                <p>We couldn't find any courses matching "${currentSearchTerm}". Try another search term or filter.</p>
            </div>
        `;
        return;
    }

    courses.forEach(course => {
        const { id, title, level, duration, price, rating, reviewsCount, instructor, description, icon } = course;
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-card-body">
                <div class="card-badge-row">
                    <span class="card-icon">${icon}</span>
                    <span class="level-tag">${level}</span>
                </div>
                <h3>${title}</h3>
                <p class="course-instructor">By ${instructor}</p>
                <p class="course-desc">${description}</p>
                <div class="course-meta-row">
                    <span>⏱️ ${duration}</span>
                    <span class="rating-badge">★ ${rating.toFixed(1)} <small style="color:var(--text-muted); font-weight:normal;">(${reviewsCount})</small></span>
                </div>
            </div>
            <div class="course-card-footer">
                <div class="course-price">$${price}</div>
                <div class="card-actions">
                    <button class="btn-details" data-course-id="${id}" type="button">Details</button>
                    <button class="btn-enroll-card" data-course-id="${id}" type="button">Enroll</button>
                </div>
            </div>
        `;
        coursesGrid.appendChild(card);
    });

    // Attach event listeners to Details and Enroll buttons
    attachCardActionListeners();
}

/**
 * 6. Attach Card Action Listeners
 */
function attachCardActionListeners() {
    // Details Buttons
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = e.currentTarget.getAttribute('data-course-id');
            showCourseModal(courseId);
        });
    });

    // Enroll Buttons
    document.querySelectorAll('.btn-enroll-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = e.currentTarget.getAttribute('data-course-id');
            selectCourseAndScroll(courseId);
        });
    });
}

/**
 * 7. Category Filtering & Real-time Search
 */
function initFiltersAndSearch() {
    // Category chips
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-category');
            filterCourses();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            filterCourses();
        });
    }
}

function filterCourses() {
    const filtered = coursesData.filter(course => {
        const matchesCategory = (activeCategory === 'all') || (course.category.toLowerCase() === activeCategory.toLowerCase());
        const matchesSearch = currentSearchTerm === '' ||
            course.title.toLowerCase().includes(currentSearchTerm) ||
            course.description.toLowerCase().includes(currentSearchTerm) ||
            course.instructor.toLowerCase().includes(currentSearchTerm);
        return matchesCategory && matchesSearch;
    });
    renderCourses(filtered);
}

/**
 * 8. Course Details Modal
 */
function showCourseModal(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course || !courseModal || !modalContent) return;

    const { title, category, level, duration, price, rating, reviewsCount, instructor, description, curriculum, icon } = course;

    modalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="font-size: 2.5rem;">${icon}</span>
            <div>
                <span class="section-badge">${category.toUpperCase()} • ${level}</span>
                <h2 style="font-size: 1.5rem; color: var(--dark); margin-top: 0.25rem;">${title}</h2>
            </div>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
            <strong>Instructor:</strong> ${instructor}
        </p>
        <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
            ${description}
        </p>

        <h4 style="font-size: 1.05rem; color: var(--dark); margin-bottom: 0.75rem;">Curriculum Modules</h4>
        <ul class="curriculum-list">
            ${curriculum.map((item, idx) => `
                <li class="curriculum-item">
                    <span style="color: var(--primary); font-weight: bold;">Module ${idx + 1}:</span>
                    <span>${item}</span>
                </li>
            `).join('')}
        </ul>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--gray-border);">
            <div>
                <span style="display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Tuition Fee</span>
                <span style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">$${price}</span>
            </div>
            <button class="btn-primary" id="modal-enroll-btn" type="button" style="padding: 0.75rem 1.5rem;">
                Enroll Now in this Course →
            </button>
        </div>
    `;

    // Modal enroll CTA click
    const modalEnrollBtn = document.getElementById('modal-enroll-btn');
    if (modalEnrollBtn) {
        modalEnrollBtn.addEventListener('click', () => {
            closeModal();
            selectCourseAndScroll(courseId);
        });
    }

    courseModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    if (!courseModal) return;
    courseModal.classList.remove('open');
    document.body.style.overflow = '';
}

function selectCourseAndScroll(courseId) {
    if (courseSelect) {
        courseSelect.value = courseId;
        validateField(courseSelect);
    }
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * 9. Form Validation System
 */
function initRegistrationValidation() {
    if (!registrationForm) return;

    const fields = [
        document.getElementById('full-name'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('course-select'),
        document.getElementById('experience-level'),
        document.getElementById('terms-check')
    ];

    // Real-time validation on input / change / blur
    fields.forEach(field => {
        if (!field) return;
        ['input', 'change', 'blur'].forEach(eventType => {
            field.addEventListener(eventType, () => validateField(field));
        });
    });

    // Form submission
    registrationForm.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    if (!field) return true;

    const fieldId = field.id;
    const errorElem = document.getElementById(`${fieldId}-error`);
    let isValid = true;
    let errorMsg = '';

    const value = field.value ? field.value.trim() : '';

    switch (fieldId) {
        case 'full-name': {
            const nameRegex = /^[a-zA-Z\s]{3,40}$/;
            if (!value) {
                isValid = false;
                errorMsg = 'Full name is required.';
            } else if (value.length < 3) {
                isValid = false;
                errorMsg = 'Full name must be at least 3 characters.';
            } else if (!nameRegex.test(value)) {
                isValid = false;
                errorMsg = 'Name can only contain alphabetic characters and spaces.';
            }
            break;
        }

        case 'email': {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMsg = 'Email address is required.';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMsg = 'Please enter a valid email address (e.g. user@domain.com).';
            }
            break;
        }

        case 'phone': {
            const phoneRegex = /^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
            if (!value) {
                isValid = false;
                errorMsg = 'Phone number is required.';
            } else if (!phoneRegex.test(value)) {
                isValid = false;
                errorMsg = 'Enter a valid 10-digit phone number (e.g. 555-123-4567).';
            }
            break;
        }

        case 'course-select': {
            if (!value) {
                isValid = false;
                errorMsg = 'Please select a course to enroll.';
            }
            break;
        }

        case 'experience-level': {
            if (!value) {
                isValid = false;
                errorMsg = 'Please select your current experience level.';
            }
            break;
        }

        case 'terms-check': {
            if (!field.checked) {
                isValid = false;
                errorMsg = 'You must agree to the enrollment terms and conditions.';
            }
            break;
        }

        default:
            break;
    }

    // Apply UI state
    if (fieldId !== 'terms-check') {
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    if (errorElem) {
        errorElem.textContent = errorMsg;
    }

    return isValid;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const fields = [
        document.getElementById('full-name'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('course-select'),
        document.getElementById('experience-level'),
        document.getElementById('terms-check')
    ];

    let formValid = true;
    let firstInvalidField = null;

    fields.forEach(field => {
        if (!field) return;
        const valid = validateField(field);
        if (!valid) {
            formValid = false;
            if (!firstInvalidField) firstInvalidField = field;
        }
    });

    if (!formValid) {
        if (firstInvalidField) firstInvalidField.focus();
        return;
    }

    // Process valid submission
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Submitting Enrollment...';

    const enrolledCourse = coursesData.find(c => c.id === document.getElementById('course-select').value);
    const applicantName = document.getElementById('full-name').value.trim();
    const applicantEmail = document.getElementById('email').value.trim();

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Show confirmation modal
        showSuccessModal(applicantName, applicantEmail, enrolledCourse ? enrolledCourse.title : 'Selected Program');

        // Reset form
        registrationForm.reset();
        fields.forEach(field => {
            if (field) {
                field.classList.remove('is-valid', 'is-invalid');
            }
        });
    }, 1000);
}

function showSuccessModal(name, email, courseTitle) {
    if (!courseModal || !modalContent) return;

    modalContent.innerHTML = `
        <div style="text-align: center; padding: 1rem 0;">
            <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🎉</span>
            <span class="section-badge" style="background-color: #d1fae5; color: #065f46;">Enrollment Confirmed</span>
            <h2 style="font-size: 1.8rem; color: var(--dark); margin: 0.75rem 0;">Welcome Aboard, ${name}!</h2>
            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; max-width: 480px; margin: 0 auto 1.5rem;">
                Your enrollment application for <strong>${courseTitle}</strong> has been registered. An onboarding invitation and syllabus pack have been dispatched to <strong>${email}</strong>.
            </p>
            <div style="background-color: var(--gray-bg); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 2rem; border: 1px solid var(--gray-border); text-align: left;">
                <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.4rem;"><strong>Student:</strong> ${name}</p>
                <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.4rem;"><strong>Course:</strong> ${courseTitle}</p>
                <p style="font-size: 0.9rem; color: var(--text-main);"><strong>Status:</strong> Provisionally Enrolled • Cohort Starting Next Monday</p>
            </div>
            <button class="btn-primary" id="btn-success-close" type="button" style="width: 100%; justify-content: center;">
                Close & Return to Home
            </button>
        </div>
    `;

    document.getElementById('btn-success-close').addEventListener('click', closeModal);
    courseModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * 10. Remote API Ingestion for Testimonials
 */
async function loadRemoteTestimonials() {
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
            <p>Loading real-time reviews from alumni network...</p>
        </div>
    `;

    const sampleRoles = [
        "Software Engineer at Stripe",
        "Frontend Developer at Shopify",
        "DevOps Engineer at Datadog"
    ];

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        if (!res.ok) throw new Error('Failed to fetch remote reviews');
        const comments = await res.json();

        testimonialsContainer.innerHTML = '';
        comments.forEach((comment, idx) => {
            const initial = comment.name.charAt(0).toUpperCase();
            const role = sampleRoles[idx] || "Full-Stack Engineer";

            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <p class="testimonial-quote">“${comment.body.replace(/\n/g, ' ').substring(0, 160)}...”</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${initial}</div>
                    <div class="author-meta">
                        <h4>${comment.name.substring(0, 22)}</h4>
                        <p>${role}</p>
                    </div>
                </div>
            `;
            testimonialsContainer.appendChild(card);
        });
    } catch (err) {
        console.warn('Unable to load remote comments, rendering curated testimonials.', err);
        testimonialsContainer.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-quote">“The Frontend Engineering curriculum gave me the confidence to ace technical interviews at major tech firms. Hands down the best investment in my career!”</p>
                <div class="testimonial-author">
                    <div class="author-avatar">A</div>
                    <div class="author-meta">
                        <h4>Alex Chen</h4>
                        <p>Frontend Engineer at Spotify</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-quote">“The hands-on cloud labs and microservices architectures mirrored production environments accurately. I went from junior to mid-level in 6 months.”</p>
                <div class="testimonial-author">
                    <div class="author-avatar">M</div>
                    <div class="author-meta">
                        <h4>Maya Lin</h4>
                        <p>Cloud Architect at AWS</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-quote">“Outstanding instructors with deep industry experience. The project feedback loops and code reviews were thorough and immensely practical.”</p>
                <div class="testimonial-author">
                    <div class="author-avatar">D</div>
                    <div class="author-meta">
                        <h4>David Kalu</h4>
                        <p>Full-Stack Lead at Fintech Labs</p>
                    </div>
                </div>
            </div>
        `;
    }
}
