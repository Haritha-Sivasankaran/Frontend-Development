/**
 * Student API Service
 * Handles data fetching, mapping, and simulated REST CRUD endpoints.
 * Interacts with jsonplaceholder.typicode.com/users with reliable fallback and error simulation.
 */

const COURSES = [
    'Full Stack Web',
    'Cloud & DevOps',
    'Data Science & AI',
    'Cyber Security',
    'UI/UX Design'
];

const STATUSES = ['Active', 'Enrolled', 'On Leave', 'Graduated'];

// Realistic fallback dataset for offline or failed requests
const FALLBACK_STUDENTS = [
    {
        id: 'STU-1001',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@edusphere.edu',
        phone: '+91 98765 43210',
        course: 'Full Stack Web',
        gpa: 3.85,
        status: 'Active',
        enrollmentDate: '2025-08-15'
    },
    {
        id: 'STU-1002',
        name: 'Priya Sundaram',
        email: 'priya.s@edusphere.edu',
        phone: '+91 98451 23456',
        course: 'Data Science & AI',
        gpa: 3.92,
        status: 'Active',
        enrollmentDate: '2025-09-01'
    },
    {
        id: 'STU-1003',
        name: 'David Chen',
        email: 'david.chen@edusphere.edu',
        phone: '+1 415-555-0182',
        course: 'Cloud & DevOps',
        gpa: 3.45,
        status: 'Enrolled',
        enrollmentDate: '2026-01-10'
    },
    {
        id: 'STU-1004',
        name: 'Zara Al-Mansoor',
        email: 'zara.m@edusphere.edu',
        phone: '+971 50 123 4567',
        course: 'Cyber Security',
        gpa: 3.78,
        status: 'Active',
        enrollmentDate: '2025-07-20'
    },
    {
        id: 'STU-1005',
        name: 'Elena Rostova',
        email: 'elena.r@edusphere.edu',
        phone: '+44 20 7946 0912',
        course: 'UI/UX Design',
        gpa: 3.65,
        status: 'On Leave',
        enrollmentDate: '2025-03-12'
    },
    {
        id: 'STU-1006',
        name: 'Marcus Vance',
        email: 'marcus.v@edusphere.edu',
        phone: '+1 617-555-0143',
        course: 'Full Stack Web',
        gpa: 3.95,
        status: 'Graduated',
        enrollmentDate: '2024-06-01'
    },
    {
        id: 'STU-1007',
        name: 'Ananya Deshmukh',
        email: 'ananya.d@edusphere.edu',
        phone: '+91 97654 32109',
        course: 'Data Science & AI',
        gpa: 3.72,
        status: 'Active',
        enrollmentDate: '2025-10-15'
    },
    {
        id: 'STU-1008',
        name: 'Liam O’Connor',
        email: 'liam.oc@edusphere.edu',
        phone: '+353 1 496 0123',
        course: 'Cloud & DevOps',
        gpa: 3.55,
        status: 'Enrolled',
        enrollmentDate: '2026-02-01'
    }
];

// Helper delay to demonstrate async loading spinner states
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const studentApi = {
    /**
     * Fetch initial students from remote API with fallback and latency simulation
     * @param {boolean} forceError - Flag to simulate API failure for educational testing
     * @returns {Promise<Array>} Array of student objects
     */
    async fetchStudents(forceError = false) {
        // Artificial network latency so students clearly see the loading spinner
        await delay(500);

        if (forceError) {
            throw new Error('HTTP 503: Service Unavailable. The academic record server failed to respond.');
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=8', {
                signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
            });

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: Failed to retrieve student records.`);
            }

            const rawUsers = await response.json();

            // Transform raw placeholder users into rich Student entities
            return rawUsers.map((user, index) => ({
                id: `STU-100${user.id}`,
                name: user.name,
                email: user.email.toLowerCase(),
                phone: user.phone.split(' ')[0],
                course: COURSES[index % COURSES.length],
                gpa: Number((3.2 + (index * 0.11) % 0.8).toFixed(2)),
                status: STATUSES[index % STATUSES.length],
                enrollmentDate: `2025-0${(index % 9) + 1}-15`
            }));
        } catch (err) {
            console.warn('[studentApi] Remote fetch failed or offline; using local fallback dataset.', err.message);
            // Return copy of fallback data if fetch fails (e.g. offline or CORS restricted environment)
            return [...FALLBACK_STUDENTS];
        }
    },

    /**
     * Simulated asynchronous POST student endpoint
     */
    async createStudent(studentData) {
        await delay(300);
        const newStudent = {
            ...studentData,
            id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
            enrollmentDate: new Date().toISOString().split('T')[0]
        };
        return newStudent;
    },

    /**
     * Simulated asynchronous PUT student endpoint
     */
    async updateStudent(id, updatedFields) {
        await delay(300);
        return {
            ...updatedFields,
            id
        };
    },

    /**
     * Simulated asynchronous DELETE student endpoint
     */
    async deleteStudent(id) {
        await delay(300);
        return { success: true, id };
    },

    COURSES,
    STATUSES
};
