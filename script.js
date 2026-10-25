/**
 * Student Feedback System - Full Client-Side Application
 * Pure HTML5, CSS3, and Vanilla JavaScript (No React, No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. DATA STATE & STORAGE ARCHITECTURE (PER-ACCOUNT SCOPED PROGRESS)
    // =========================================================================

    const STORAGE_KEYS = {
        CURRENT_USER: 'sfs_active_user',
        REGISTERED_USERS: 'sfs_registered_users',
        THEME: 'theme',
        IS_LOGGED_IN: 'sfs_is_logged_in',
        IS_GUEST: 'sfs_is_guest',
        CURRENT_ROLE: 'sfs_current_role'
    };

    // Base Subject Catalog (6 courses for Semester 5)
    const BASE_SUBJECTS = [
        {
            id: "sub-1",
            code: "CS501",
            name: "Database Management Systems",
            faculty: "Dr. Sharma",
            facultyRole: "Professor & Course Coordinator",
            department: "Dept. of Computer Science & Engineering",
            room: "Room 302, Academic Block",
            credits: 4,
            icon: "fa-database",
            iconColor: "primary",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "Relational Database Architecture & Relational Algebra",
                "Advanced SQL, Constraints, Views & Triggers",
                "Normalization Theory: 1NF, 2NF, 3NF & BCNF Decomposition",
                "Transaction Processing, ACID Properties & Concurrency Control",
                "B+ Trees, Hashing, Query Optimization & NoSQL Intro"
            ]
        },
        {
            id: "sub-2",
            code: "CS502",
            name: "Java Programming",
            faculty: "Prof. Verma",
            facultyRole: "Associate Professor",
            department: "Dept. of Computer Science & Engineering",
            room: "Lab 4, Software Center",
            credits: 4,
            icon: "fa-java",
            iconColor: "success",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "Object Oriented Design Principles & Inheritance Hierarchies",
                "Exception Handling & Java Collections Framework",
                "Multithreading, Concurrency Utilities & Synchronization",
                "Java Streams, Lambdas & Modern Functional Features",
                "Database Connectivity via JDBC & Event-Driven GUI"
            ]
        },
        {
            id: "sub-3",
            code: "CS503",
            name: "Artificial Intelligence",
            faculty: "Dr. Singh",
            facultyRole: "Associate Professor",
            department: "Dept. of Computer Science & Engineering",
            room: "Seminar Hall 2, Innovation Wing",
            credits: 3,
            icon: "fa-brain",
            iconColor: "secondary",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "Intelligent Agents & Problem Formulation",
                "Heuristic Search: A*, Greedy Best-First & Minimax with Alpha-Beta",
                "Knowledge Representation, Propositional & First-Order Logic",
                "Probabilistic Reasoning & Bayesian Belief Networks",
                "Machine Learning Fundamentals & Introduction to Deep Learning"
            ]
        },
        {
            id: "sub-4",
            code: "CS504",
            name: "Operating Systems",
            faculty: "Prof. Gupta",
            facultyRole: "Assistant Professor",
            department: "Dept. of Computer Science & Engineering",
            room: "Room 205, Main Block",
            credits: 4,
            icon: "fa-microchip",
            iconColor: "warning",
            avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "Operating System Structures & Kernel Architecture",
                "Process Scheduling, Inter-Process Communication & Threads",
                "Process Synchronization, Mutexes, Semaphores & Deadlocks",
                "Main Memory Management, Paging, Segmentation & Virtual Memory",
                "Mass-Storage Structure, File Systems & Security"
            ]
        },
        {
            id: "sub-5",
            code: "CS505",
            name: "Computer Networks",
            faculty: "Dr. Ananya Roy",
            facultyRole: "Professor & Head of Lab",
            department: "Dept. of Computer Science & Engineering",
            room: "Lab 2, Networks Wing",
            credits: 4,
            icon: "fa-network-wired",
            iconColor: "primary",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "OSI and TCP/IP Reference Models & Physical Media",
                "Data Link Layer Protocols, Framing, Error Control & CSMA/CD",
                "Network Layer: IPv4/IPv6 Addressing, Subnetting & Routing (OSPF, BGP)",
                "Transport Layer: TCP Flow/Congestion Control & UDP Protocols",
                "Application Layer: DNS, HTTP/HTTPS, TLS Encryption & Sockets"
            ]
        },
        {
            id: "sub-6",
            code: "CS506",
            name: "Software Engineering",
            faculty: "Prof. Rajesh Kumar",
            facultyRole: "Assistant Professor",
            department: "Dept. of Computer Science & Engineering",
            room: "Room 108, Tech Block",
            credits: 3,
            icon: "fa-cubes",
            iconColor: "success",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
            syllabus: [
                "Software Lifecycle Models: Agile, Scrum, Kanban & Waterfall",
                "Software Requirements Engineering & UML Modeling",
                "Design Patterns (Creational, Structural, Behavioral)",
                "Software Testing Methodologies: Unit, Integration & CI/CD",
                "DevOps Culture, Maintenance & Project Cost Estimation"
            ]
        }
    ];

    // Seed submissions for initial demo student (Naman Sardana - 22CSE1042)
    const SEED_SUBMISSIONS_22CSE1042 = [
        {
            id: "subm-cs502",
            subjectId: "sub-2",
            subjectCode: "CS502",
            subjectName: "Java Programming",
            faculty: "Prof. Verma",
            ratings: { teaching: 5, coverage: 4, lab: 5, doubts: 5, fairness: 5 },
            overallRating: 4.8,
            tags: ["Clear Explanations", "Engaging Lectures", "Great Lab Mentorship"],
            comment: "Prof. Verma explains core OOP and multithreading with great clarity. Lab assignments are challenging and practical.",
            isAnonymous: true,
            date: "2026-10-18T14:30:00"
        },
        {
            id: "subm-cs505",
            subjectId: "sub-5",
            subjectCode: "CS505",
            subjectName: "Computer Networks",
            faculty: "Dr. Ananya Roy",
            ratings: { teaching: 5, coverage: 5, lab: 4, doubts: 5, fairness: 4 },
            overallRating: 4.6,
            tags: ["Clear Explanations", "Helpful Notes & Slides", "Punctual & Disciplined"],
            comment: "Dr. Ananya Roy is deeply knowledgeable in packet protocols and Wireshark capture analysis. Lectures are always punctual.",
            isAnonymous: true,
            date: "2026-10-19T11:15:00"
        },
        {
            id: "subm-cs506",
            subjectId: "sub-6",
            subjectCode: "CS506",
            subjectName: "Software Engineering",
            faculty: "Prof. Rajesh Kumar",
            ratings: { teaching: 4, coverage: 5, lab: 5, doubts: 4, fairness: 5 },
            overallRating: 4.6,
            tags: ["Helpful Notes & Slides", "Fair Grading", "Encouraging & Patient"],
            comment: "Great exposure to real industry Agile sprint workflows and design patterns. Assignments helped understand team software development.",
            isAnonymous: true,
            date: "2026-10-21T16:00:00"
        }
    ];

    // Default Seed Profiles
    const DEFAULT_STUDENT = {
        name: "Naman Sardana",
        rollNo: "22CSE1042",
        email: "naman.sardana@college.edu",
        branch: "Computer Science Engineering",
        semester: "Semester 5",
        avatar: "https://ui-avatars.com/api/?name=Naman+Sardana&background=F97316&color=fff&rounded=true",
        role: "student",
        isGuest: false
    };

    const DEFAULT_ADMIN = {
        name: "Dr. Arvind Mehta",
        rollNo: "ADMIN-01",
        email: "dean.academics@college.edu",
        branch: "Dean of Academics",
        semester: "All Semesters",
        avatar: "https://ui-avatars.com/api/?name=Dean+Academics&background=EF4444&color=fff&rounded=true",
        role: "admin",
        isGuest: false
    };

    const GUEST_STUDENT = {
        name: "Guest Explorer",
        rollNo: "GUEST-2026",
        email: "guest@portal.edu",
        branch: "Computer Science Engineering",
        semester: "Semester 5",
        avatar: "https://ui-avatars.com/api/?name=Guest+User&background=64748B&color=fff&rounded=true",
        role: "student",
        isGuest: true
    };

    // Ensure initial seed for 22CSE1042 exists in storage
    const seedKey22 = 'sfs_subms_22cse1042';
    if (localStorage.getItem(seedKey22) === null) {
        localStorage.setItem(seedKey22, JSON.stringify(SEED_SUBMISSIONS_22CSE1042));
    }

    // Load active user or default
    let currentUser = null;
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (stored) currentUser = JSON.parse(stored);
    } catch (e) {
        currentUser = null;
    }
    if (!currentUser) {
        currentUser = { ...DEFAULT_STUDENT };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    }

    let isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) !== 'false';
    let isGuestMode = localStorage.getItem(STORAGE_KEYS.IS_GUEST) === 'true';
    let currentRole = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || (currentUser.role || "student");

    // =========================================================================
    // 2. PER-ACCOUNT SUBMISSIONS & DYNAMIC PROGRESS SYSTEM
    // =========================================================================

    function getStorageKeyForUser(user) {
        const id = (user && user.rollNo) ? user.rollNo.toString().trim().toLowerCase() : 'guest';
        return `sfs_subms_${id}`;
    }

    // Get submissions for current logged in user
    function getCurrentUserSubmissions() {
        if (!currentUser) return [];
        const key = getStorageKeyForUser(currentUser);
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error("Error reading submissions for user", e);
        }
        // If it's a completely new account or different account without saved data: starts from ZERO!
        return [];
    }

    function saveCurrentUserSubmissions(submissions) {
        if (!currentUser) return;
        const key = getStorageKeyForUser(currentUser);
        localStorage.setItem(key, JSON.stringify(submissions));
    }

    // Generate active subject list with statuses computed directly from current user's submissions
    function getActiveSubjects() {
        const userSubmissions = getCurrentUserSubmissions();
        const submMap = new Map();
        userSubmissions.forEach(s => submMap.set(s.subjectId, s.id));

        return BASE_SUBJECTS.map(sub => {
            const isCompleted = submMap.has(sub.id);
            return {
                ...sub,
                status: isCompleted ? 'completed' : 'pending',
                submissionId: isCompleted ? submMap.get(sub.id) : null
            };
        });
    }

    // Per-account activity log
    function getCurrentUserActivities() {
        const id = (currentUser && currentUser.rollNo) ? currentUser.rollNo.toString().trim().toLowerCase() : 'guest';
        const key = `sfs_act_${id}`;
        try {
            const raw = localStorage.getItem(key);
            if (raw) return JSON.parse(raw);
        } catch (e) {}

        // Default initial activity for fresh accounts
        const userSubms = getCurrentUserSubmissions();
        if (userSubms.length === 0) {
            return [
                {
                    id: 1,
                    title: "Account Logged In",
                    desc: "Starting fresh with all 6 semester courses pending evaluation.",
                    time: "Just now",
                    icon: "fa-right-to-bracket",
                    type: "primary"
                }
            ];
        } else {
            return userSubms.map((s, idx) => ({
                id: idx + 1,
                title: `${s.subjectCode} Feedback Submitted`,
                desc: `Evaluation completed with score ★ ${s.overallRating}`,
                time: new Date(s.date).toLocaleDateString(),
                icon: "fa-check",
                type: "success"
            }));
        }
    }

    function saveCurrentUserActivities(activities) {
        const id = (currentUser && currentUser.rollNo) ? currentUser.rollNo.toString().trim().toLowerCase() : 'guest';
        localStorage.setItem(`sfs_act_${id}`, JSON.stringify(activities));
    }

    // Form evaluation metrics state
    let currentRatings = { teaching: 0, coverage: 0, lab: 0, doubts: 0, fairness: 0 };
    let currentSelectedTags = new Set();

    // =========================================================================
    // 3. THEME TOGGLE (ON SIGN IN / SIGN OUT PAGE & MAIN PORTAL)
    // =========================================================================

    const themeToggle = document.getElementById('themeToggle');
    const authThemeToggle = document.getElementById('authThemeToggle');
    const body = document.body;

    function applyTheme(themeName) {
        if (themeName === 'dark') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            if (authThemeToggle) {
                authThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="authThemeText">Light Mode</span>';
            }
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem(STORAGE_KEYS.THEME, 'light');
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            if (authThemeToggle) {
                authThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span id="authThemeText">Dark Mode</span>';
            }
        }
    }

    function toggleTheme() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
        showToast(`Switched to ${isDark ? 'Light' : 'Dark'} Theme`, "info");
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (authThemeToggle) authThemeToggle.addEventListener('click', toggleTheme);

    // =========================================================================
    // 4. SIGN IN / SIGN OUT WITH STUDENT VS ADMIN ROLE SELECTION
    // =========================================================================

    const authPage = document.getElementById('authPage');
    const appWrapper = document.getElementById('appWrapper');
    const authSignOutAlert = document.getElementById('authSignOutAlert');
    const guestModeBanner = document.getElementById('guestModeBanner');
    const guestNavBadge = document.getElementById('guestNavBadge');

    // Role selector buttons on Sign In page
    const authRoleStudentBtn = document.getElementById('authRoleStudentBtn');
    const authRoleAdminBtn = document.getElementById('authRoleAdminBtn');
    const authHeaderIcon = document.getElementById('authHeaderIcon');
    const authCardTitle = document.getElementById('authCardTitle');
    const authCardSubtitle = document.getElementById('authCardSubtitle');
    const authIdLabelText = document.getElementById('authIdLabelText');
    const authPasswordLabelText = document.getElementById('authPasswordLabelText');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const authCredentialHint = document.getElementById('authCredentialHint');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const continueGuestBtn = document.getElementById('continueGuestBtn');

    let selectedAuthRole = 'student'; // 'student' or 'admin'

    function setAuthRole(role) {
        selectedAuthRole = role;

        if (role === 'admin') {
            if (authRoleAdminBtn) authRoleAdminBtn.classList.add('active');
            if (authRoleStudentBtn) authRoleStudentBtn.classList.remove('active');
            if (authHeaderIcon) authHeaderIcon.className = 'fa-solid fa-shield-halved';
            if (authCardTitle) authCardTitle.innerText = "Administrator Portal Login";
            if (authCardSubtitle) authCardSubtitle.innerText = "Institutional Oversight & Academic Dean Access";
            if (authIdLabelText) authIdLabelText.innerText = "Admin Username or Institutional Email";
            if (loginEmail) {
                loginEmail.placeholder = "e.g. admin or dean@college.edu";
                loginEmail.value = "admin";
            }
            if (authPasswordLabelText) authPasswordLabelText.innerText = "Fixed Admin Security Key";
            if (loginPassword) {
                loginPassword.placeholder = "Enter Security Key (ADMIN@2026)";
                loginPassword.value = "ADMIN@2026";
            }
            if (authCredentialHint) {
                authCredentialHint.innerHTML = '<i class="fa-solid fa-key primary-text"></i> <span>Fixed Admin Security Key: <strong>ADMIN@2026</strong> (ID: <code>admin</code>)</span>';
            }
            if (submitLoginBtn) {
                submitLoginBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Sign In as Administrator';
            }
        } else {
            if (authRoleStudentBtn) authRoleStudentBtn.classList.add('active');
            if (authRoleAdminBtn) authRoleAdminBtn.classList.remove('active');
            if (authHeaderIcon) authHeaderIcon.className = 'fa-solid fa-graduation-cap';
            if (authCardTitle) authCardTitle.innerText = "Student Portal Login";
            if (authCardSubtitle) authCardSubtitle.innerText = "Course Feedback & Faculty Evaluation System";
            if (authIdLabelText) authIdLabelText.innerText = "Student Roll Number / College ID";
            if (loginEmail) {
                loginEmail.placeholder = "e.g. 22CSE1042 or 23CSE2001";
                loginEmail.value = "22CSE1042";
            }
            if (authPasswordLabelText) authPasswordLabelText.innerText = "Password";
            if (loginPassword) {
                loginPassword.placeholder = "Enter student password";
                loginPassword.value = "student123";
            }
            if (authCredentialHint) {
                authCredentialHint.innerHTML = '<i class="fa-solid fa-circle-info"></i> <span>Demo Student ID: <strong>22CSE1042</strong> | Pass: <code>student123</code>. (Sign in with any different ID to start fresh at 0% progress!)</span>';
            }
            if (submitLoginBtn) {
                submitLoginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In as Student';
            }
        }
    }

    if (authRoleStudentBtn) {
        authRoleStudentBtn.addEventListener('click', () => setAuthRole('student'));
    }
    if (authRoleAdminBtn) {
        authRoleAdminBtn.addEventListener('click', () => setAuthRole('admin'));
    }

    function updateAuthView() {
        if (!isLoggedIn) {
            authPage.style.display = 'flex';
            appWrapper.style.display = 'none';
        } else {
            authPage.style.display = 'none';
            appWrapper.style.display = 'block';

            if (isGuestMode) {
                if (guestModeBanner) guestModeBanner.style.display = 'flex';
                if (guestNavBadge) guestNavBadge.style.display = 'inline-flex';
            } else {
                if (guestModeBanner) guestModeBanner.style.display = 'none';
                if (guestNavBadge) guestNavBadge.style.display = 'none';
            }
        }
    }

    function performSignOut() {
        isLoggedIn = false;
        isGuestMode = false;
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false');
        localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'false');

        if (authSignOutAlert) authSignOutAlert.style.display = 'flex';

        updateAuthView();
        showToast("You have been signed out successfully.", "info");
    }

    // Sign Out Buttons
    const sidebarSignOutBtn = document.getElementById('sidebarSignOutBtn');
    const dropdownSignOutBtn = document.getElementById('dropdownSignOutBtn');
    const footerSignOutBtn = document.getElementById('footerSignOutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    [sidebarSignOutBtn, dropdownSignOutBtn, footerSignOutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                closeDropdowns();
                openModal('logoutModal');
            });
        }
    });

    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', () => {
            closeModal('logoutModal');
            performSignOut();
        });
    }

    // Tabs: Sign In vs Create Account
    const tabSignInBtn = document.getElementById('tabSignInBtn');
    const tabSignUpBtn = document.getElementById('tabSignUpBtn');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    if (tabSignInBtn && tabSignUpBtn) {
        tabSignInBtn.addEventListener('click', () => {
            tabSignInBtn.classList.add('active');
            tabSignUpBtn.classList.remove('active');
            signInForm.style.display = 'block';
            signUpForm.style.display = 'none';
        });

        tabSignUpBtn.addEventListener('click', () => {
            tabSignUpBtn.classList.add('active');
            tabSignInBtn.classList.remove('active');
            signUpForm.style.display = 'block';
            signInForm.style.display = 'none';
        });
    }

    // Password Toggle
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    if (toggleLoginPassword && loginPassword) {
        toggleLoginPassword.addEventListener('click', () => {
            const isPass = loginPassword.type === 'password';
            loginPassword.type = isPass ? 'text' : 'password';
            toggleLoginPassword.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
        });
    }

    // Submit Sign In (Handles Student vs Admin & Starts fresh at 0% for different accounts)
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const idVal = loginEmail.value.trim();

            if (selectedAuthRole === 'admin') {
                const enteredKey = loginPassword ? loginPassword.value.trim() : '';
                const FIXED_ADMIN_SECURITY_KEY = "ADMIN@2026";

                // Strict validation: must match fixed admin security key
                if (enteredKey.toUpperCase() !== FIXED_ADMIN_SECURITY_KEY) {
                    showToast("Access Denied: Invalid Security Key! Authorized Key: ADMIN@2026", "danger", 4500);
                    if (loginPassword) {
                        loginPassword.focus();
                        loginPassword.style.borderColor = "var(--danger)";
                        loginPassword.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.25)";
                        setTimeout(() => {
                            loginPassword.style.borderColor = "";
                            loginPassword.style.boxShadow = "";
                        }, 2500);
                    }
                    return;
                }

                // Log in as Administrator
                currentUser = { ...DEFAULT_ADMIN };
                if (idVal && idVal !== 'admin') currentUser.email = idVal;
                currentRole = 'admin';
                isLoggedIn = true;
                isGuestMode = false;

                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
                localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
                localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'false');
                localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'admin');

                if (authSignOutAlert) authSignOutAlert.style.display = 'none';
                updateAuthView();
                updateRoleUI();
                switchView('admin');
                showToast("Access Granted! Signed in as Administrator: Dean of Academics", "success");
            } else {
                // Log in as Student
                isLoggedIn = true;
                isGuestMode = false;
                currentRole = 'student';

                const normalizedId = idVal.toLowerCase();

                // If demo student (22CSE1042), load Naman
                if (normalizedId === '22cse1042') {
                    currentUser = { ...DEFAULT_STUDENT };
                } else {
                    // DIFFERENT ACCOUNT: Progress starts from ZERO!
                    // Check registered user registry if previously created
                    let regUsers = [];
                    try {
                        regUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
                    } catch (err) {}

                    const existing = regUsers.find(u => u.rollNo.toLowerCase() === normalizedId);
                    if (existing) {
                        currentUser = { ...existing };
                    } else {
                        // Brand new student profile
                        const cleanRoll = idVal.toUpperCase();
                        currentUser = {
                            name: `Student (${cleanRoll})`,
                            rollNo: cleanRoll,
                            email: `${normalizedId}@college.edu`,
                            branch: "Computer Science Engineering",
                            semester: "Semester 5",
                            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanRoll)}&background=F97316&color=fff&rounded=true`,
                            role: "student",
                            isGuest: false
                        };
                    }
                }

                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
                localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
                localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'false');
                localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');

                if (authSignOutAlert) authSignOutAlert.style.display = 'none';
                updateAuthView();
                updateRoleUI();
                renderDashboard();
                switchView('dashboard');

                const subms = getCurrentUserSubmissions();
                if (subms.length === 0) {
                    showToast(`Signed into ${currentUser.name}! Progress starts at 0% (all courses pending).`, "success", 4000);
                } else {
                    showToast(`Welcome back, ${currentUser.name}! (${subms.length} of 6 courses completed)`, "success");
                }
            }
        });
    }

    // Submit Sign Up (New account starts fresh from 0% progress)
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('regFullName').value.trim();
            const rollNo = document.getElementById('regRollNo').value.trim().toUpperCase();
            const email = document.getElementById('regEmail').value.trim();
            const branch = document.getElementById('regBranch').value.trim();

            currentUser = {
                name: fullName || `Student ${rollNo}`,
                rollNo: rollNo,
                email: email || `${rollNo.toLowerCase()}@college.edu`,
                branch: branch || "Computer Science Engineering",
                semester: "Semester 5",
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || rollNo)}&background=F97316&color=fff&rounded=true`,
                role: "student",
                isGuest: false
            };

            // Register account
            try {
                let regUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS) || '[]');
                regUsers = regUsers.filter(u => u.rollNo.toLowerCase() !== rollNo.toLowerCase());
                regUsers.push(currentUser);
                localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(regUsers));
            } catch (err) {}

            // Ensure new account starts with ZERO submissions!
            localStorage.setItem(getStorageKeyForUser(currentUser), JSON.stringify([]));

            isLoggedIn = true;
            isGuestMode = false;
            currentRole = 'student';

            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
            localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
            localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'false');
            localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');

            if (authSignOutAlert) authSignOutAlert.style.display = 'none';
            updateAuthView();
            updateRoleUI();
            renderDashboard();
            switchView('dashboard');
            showToast(`Account created for ${currentUser.name}! Your evaluation progress starts at 0%.`, "success", 4000);
        });
    }

    // GUEST MODE (Starts fresh from 0% progress)
    function enterGuestMode() {
        isLoggedIn = true;
        isGuestMode = true;
        currentRole = 'student';
        currentUser = { ...GUEST_STUDENT };

        // Ensure guest starts at zero unless previously submitted in this session
        const guestKey = getStorageKeyForUser(currentUser);
        if (localStorage.getItem(guestKey) === null) {
            localStorage.setItem(guestKey, JSON.stringify([]));
        }

        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
        localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'true');
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');

        if (authSignOutAlert) authSignOutAlert.style.display = 'none';
        updateAuthView();
        updateRoleUI();
        renderDashboard();
        switchView('dashboard');
        showToast("Guest Mode Active! Progress is at 0%. Feel free to evaluate subjects.", "info", 4000);
    }

    if (continueGuestBtn) {
        continueGuestBtn.addEventListener('click', enterGuestMode);
    }

    const guestSignInPromptBtn = document.getElementById('guestSignInPromptBtn');
    if (guestSignInPromptBtn) {
        guestSignInPromptBtn.addEventListener('click', () => {
            performSignOut();
        });
    }

    // Forgot Password
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (selectedAuthRole === 'admin') {
                showToast("Fixed Admin Security Key is: ADMIN@2026", "info", 5000);
            } else {
                showToast("Demo Student password is: student123", "info", 4000);
            }
        });
    }

    // =========================================================================
    // 5. TOAST NOTIFICATION SYSTEM
    // =========================================================================

    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'info', duration = 3500) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconMap = {
            success: 'fa-circle-check',
            warning: 'fa-triangle-exclamation',
            danger: 'fa-circle-xmark',
            info: 'fa-circle-info'
        };

        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i></div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close notification"><i class="fa-solid fa-xmark"></i></button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => removeToast(toast));

        toastContainer.appendChild(toast);

        const timer = setTimeout(() => {
            removeToast(toast);
        }, duration);

        function removeToast(el) {
            clearTimeout(timer);
            el.classList.add('toast-hiding');
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 300);
        }
    }

    // =========================================================================
    // 6. MODALS & DROPDOWNS CONTROLLER
    // =========================================================================

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close-modal');
            closeModal(modalId);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
            document.body.style.overflow = '';
            closeDropdowns();
        }
    });

    // Dropdowns
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    function closeDropdowns() {
        if (notificationDropdown) notificationDropdown.classList.remove('show');
        if (profileDropdown) profileDropdown.classList.remove('show');
    }

    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.remove('show');
            notificationDropdown.classList.toggle('show');
        });
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationDropdown) notificationDropdown.classList.remove('show');
            profileDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
        if (profileDropdown && !profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // Mobile Sidebar
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => sidebar.classList.add('show'));
    }
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => sidebar.classList.remove('show'));
    }

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar && sidebar.classList.contains('show') &&
            !sidebar.contains(e.target) &&
            menuToggle && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });

    // =========================================================================
    // 7. ROUTING & VIEW CONTROLLER (SPA)
    // =========================================================================

    const views = document.querySelectorAll('.app-view');
    const navMenuItems = document.querySelectorAll('.sidebar-menu .menu-item[data-view]');

    function switchView(viewName) {
        if (!isLoggedIn) {
            updateAuthView();
            return;
        }

        const targetViewId = `view-${viewName}`;
        const targetView = document.getElementById(targetViewId);

        if (!targetView) {
            return switchView('dashboard');
        }

        views.forEach(v => v.classList.remove('active'));
        targetView.classList.add('active');

        navMenuItems.forEach(item => {
            if (item.getAttribute('data-view') === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        if (sidebar) sidebar.classList.remove('show');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (viewName === 'dashboard') {
            renderDashboard();
        } else if (viewName === 'give-feedback') {
            populateFeedbackSubjects();
        } else if (viewName === 'subjects') {
            renderSubjects();
        } else if (viewName === 'feedback-history') {
            renderHistory();
        } else if (viewName === 'analytics') {
            renderAnalytics();
        } else if (viewName === 'settings') {
            renderSettings();
        }

        setTimeout(triggerFadeUp, 50);
    }

    function handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        if (hash === 'signin' || hash === 'login' || hash === 'signout') {
            performSignOut();
            return;
        }
        switchView(hash);
    }

    window.addEventListener('hashchange', handleHashChange);

    navMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.getAttribute('data-view');
            window.location.hash = viewName;
        });
    });

    // Role Persona Switcher Modal
    const activeRoleBadge = document.getElementById('activeRoleBadge');
    const quickRoleSwitchBtn = document.getElementById('quickRoleSwitchBtn');
    const openRoleSwitchBtn = document.getElementById('openRoleSwitchBtn');
    const footerRoleSwitch = document.getElementById('footerRoleSwitch');

    [activeRoleBadge, quickRoleSwitchBtn, openRoleSwitchBtn, footerRoleSwitch].forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeDropdowns();
            openModal('roleModal');
        });
    });

    document.getElementById('switchRoleStudent').addEventListener('click', () => {
        currentRole = 'student';
        isGuestMode = false;
        currentUser = { ...DEFAULT_STUDENT };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');
        localStorage.setItem(STORAGE_KEYS.IS_GUEST, 'false');
        updateRoleUI();
        updateAuthView();
        closeModal('roleModal');
        switchView('dashboard');
        showToast("Switched to Student Mode: Naman Sardana", "success");
    });

    document.getElementById('switchRoleGuest').addEventListener('click', () => {
        enterGuestMode();
        closeModal('roleModal');
    });

    document.getElementById('switchRoleFaculty').addEventListener('click', () => {
        currentRole = 'faculty';
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'faculty');
        updateRoleUI();
        closeModal('roleModal');
        switchView('faculty');
        showToast("Switched to Faculty Mode: Dr. Sharma (DBMS)", "info");
    });

    document.getElementById('switchRoleAdmin').addEventListener('click', () => {
        const inputKey = window.prompt("Institutional Security: Enter Fixed Admin Security Key (ADMIN@2026):");
        if (inputKey === null) return; // User cancelled
        if (inputKey.trim().toUpperCase() !== 'ADMIN@2026') {
            showToast("Access Denied: Invalid Security Key! Authorized Key: ADMIN@2026", "danger", 4500);
            return;
        }
        currentRole = 'admin';
        currentUser = { ...DEFAULT_ADMIN };
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'admin');
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
        updateRoleUI();
        closeModal('roleModal');
        switchView('admin');
        showToast("Access Granted: Switched to Admin Portal (Dean of Academics)", "success");
    });

    document.getElementById('returnToStudentFromFaculty').addEventListener('click', () => {
        currentRole = 'student';
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');
        updateRoleUI();
        switchView('dashboard');
    });

    document.getElementById('returnToStudentFromAdmin').addEventListener('click', () => {
        currentRole = 'student';
        localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'student');
        updateRoleUI();
        switchView('dashboard');
    });

    function updateRoleUI() {
        const roleTextDisplay = document.getElementById('roleTextDisplay');
        if (roleTextDisplay) {
            if (currentRole === 'faculty') roleTextDisplay.innerText = "Faculty View";
            else if (currentRole === 'admin') roleTextDisplay.innerText = "Admin View";
            else roleTextDisplay.innerText = isGuestMode ? "Guest View" : "Student View";
        }
    }

    // =========================================================================
    // 8. DASHBOARD RENDERING & DYNAMIC PROGRESS COUNTERS
    // =========================================================================

    function animateCounter(el, target, suffix = '') {
        const speed = 40;
        const inc = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                el.innerText = target + suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current) + suffix;
            }
        }, 15);
    }

    function renderDashboard() {
        const activeSubjects = getActiveSubjects();
        const userSubmissions = getCurrentUserSubmissions();

        // Update header user info
        document.getElementById('heroUserName').innerText = (currentUser.name || 'Student').split(' ')[0];
        document.getElementById('heroSemesterBadge').innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${currentUser.semester || 'Semester 5'}`;
        document.getElementById('heroBranchBadge').innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${currentUser.branch || 'CSE'}`;
        document.getElementById('navSemesterBadge').innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${currentUser.semester || 'Semester 5'}`;

        const navAvatar = document.getElementById('navUserAvatar');
        const dropAvatar = document.getElementById('dropdownAvatar');
        if (navAvatar) navAvatar.src = currentUser.avatar;
        if (dropAvatar) dropAvatar.src = currentUser.avatar;
        document.getElementById('dropdownUserName').innerText = currentUser.name;
        document.getElementById('dropdownUserRole').innerText = `${currentUser.rollNo} • ${currentUser.semester || 'Semester 5'}`;

        // Compute metrics from current user's actual submissions
        const totalSubjects = activeSubjects.length;
        const completedSubjects = userSubmissions.length;
        const pendingSubjects = Math.max(0, totalSubjects - completedSubjects);
        const completionPct = totalSubjects > 0 ? Math.round((completedSubjects / totalSubjects) * 100) : 0;

        // Counters
        const statPending = document.getElementById('statPendingCount');
        const statCompleted = document.getElementById('statCompletedCount');
        const statFaculty = document.getElementById('statFacultyCount');
        const statDays = document.getElementById('statDaysRemaining');

        if (statPending) animateCounter(statPending, pendingSubjects);
        if (statCompleted) animateCounter(statCompleted, completedSubjects);
        if (statFaculty) animateCounter(statFaculty, totalSubjects);
        if (statDays) animateCounter(statDays, 4);

        // Circular Progress
        const circleProgressVal = document.getElementById('circleProgressValue');
        const circleProgressText = document.getElementById('circleProgressText');
        if (circleProgressVal) circleProgressVal.style.setProperty('--percent', completionPct);
        if (circleProgressText) animateCounter(circleProgressText, completionPct, '%');

        // Linear Progress
        const linearProgressBar = document.getElementById('linearProgressBar');
        const linearProgressText = document.getElementById('linearProgressText');
        if (linearProgressBar) linearProgressBar.style.width = `${completionPct}%`;
        if (linearProgressText) linearProgressText.innerText = `${completionPct}% (${completedSubjects} of ${totalSubjects} Courses Completed)`;

        // Motivational Quote
        const motivationalEl = document.getElementById('motivationalMessage');
        if (motivationalEl) {
            if (completionPct === 100) {
                motivationalEl.innerText = "🎉 Outstanding! You have completed feedback for all Semester 5 courses.";
            } else if (completionPct === 0) {
                motivationalEl.innerText = `"Ready to begin? Start evaluating your registered courses below."`;
            } else if (completionPct >= 50) {
                motivationalEl.innerText = `"Almost there! Complete your remaining ${pendingSubjects} feedback before the deadline."`;
            } else {
                motivationalEl.innerText = `"Great start! You've evaluated ${completedSubjects} course. Continue your remaining reviews."`;
            }
        }

        // Dashboard Subjects Grid Preview (up to 4)
        const dashboardGrid = document.getElementById('dashboardSubjectsGrid');
        if (dashboardGrid) {
            dashboardGrid.innerHTML = '';
            activeSubjects.slice(0, 4).forEach(sub => {
                const isCompleted = sub.status === 'completed';
                const card = document.createElement('div');
                card.className = 'subject-card glass-card';
                card.innerHTML = `
                    <div class="subject-header">
                        <div class="subject-icon ${sub.iconColor}"><i class="fa-solid ${sub.icon}"></i></div>
                        <span class="status-badge ${sub.status}">${isCompleted ? 'Completed' : 'Pending'}</span>
                    </div>
                    <h3>${sub.name}</h3>
                    <p class="faculty-name"><i class="fa-solid fa-user-tie"></i> ${sub.faculty}</p>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">
                        <span><i class="fa-solid fa-code"></i> ${sub.code}</span> • <span><i class="fa-solid fa-award"></i> ${sub.credits} Credits</span>
                    </div>
                    ${isCompleted ? 
                        `<button class="btn btn-success ripple view-subm-btn" data-subm-id="${sub.submissionId}"><i class="fa-solid fa-eye"></i> View Submission</button>` :
                        `<button class="btn btn-outline ripple give-feedback-btn" data-subject-id="${sub.id}"><i class="fa-solid fa-pen-to-square"></i> Give Feedback</button>`
                    }
                `;
                dashboardGrid.appendChild(card);
            });

            dashboardGrid.querySelectorAll('.give-feedback-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    prepareFeedbackForSubject(btn.getAttribute('data-subject-id'));
                });
            });

            dashboardGrid.querySelectorAll('.view-subm-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    showSubmissionModal(btn.getAttribute('data-subm-id'));
                });
            });
        }

        renderActivities();
    }

    const heroStartFeedbackBtn = document.getElementById('heroStartFeedbackBtn');
    if (heroStartFeedbackBtn) {
        heroStartFeedbackBtn.addEventListener('click', () => {
            const activeSubjects = getActiveSubjects();
            const firstPending = activeSubjects.find(s => s.status === 'pending');
            if (firstPending) {
                prepareFeedbackForSubject(firstPending.id);
            } else {
                window.location.hash = 'give-feedback';
            }
        });
    }

    function renderActivities() {
        const activityContainer = document.getElementById('recentActivityList');
        if (!activityContainer) return;
        activityContainer.innerHTML = '';

        const activities = getCurrentUserActivities();
        activities.slice(0, 5).forEach(act => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-icon ${act.type || 'success'}"><i class="fa-solid ${act.icon || 'fa-check'}"></i></div>
                <div class="timeline-content">
                    <h4>${act.title}</h4>
                    <span class="timeline-date">${act.time}</span>
                </div>
            `;
            activityContainer.appendChild(item);
        });
    }

    const refreshActivityBtn = document.getElementById('refreshActivityBtn');
    if (refreshActivityBtn) {
        refreshActivityBtn.addEventListener('click', () => {
            renderActivities();
            showToast("Recent activity refreshed", "info", 1500);
        });
    }

    // =========================================================================
    // 9. NOTIFICATIONS DROPDOWN
    // =========================================================================

    function renderNotifications() {
        const notifBadge = document.getElementById('notificationBadge');
        const notifList = document.getElementById('notificationList');
        if (!notifList) return;

        const notifications = [
            { id: 1, title: "Feedback Deadline Notice", message: "Semester 5 feedback submission closes on 5 August.", time: "2 hours ago", read: false, icon: "fa-bullhorn" },
            { id: 2, title: "Digital Receipt Service", message: "Official verification slips are automatically saved to your profile.", time: "Yesterday", read: false, icon: "fa-certificate" },
            { id: 3, title: "Anonymity Policy Active", message: "Student roll number is masked from faculty by default.", time: "3 days ago", read: true, icon: "fa-shield-halved" }
        ];

        if (notifBadge) {
            notifBadge.innerText = 2;
            notifBadge.style.display = 'flex';
        }

        notifList.innerHTML = '';
        notifications.forEach(n => {
            const item = document.createElement('div');
            item.className = `dropdown-item ${n.read ? '' : 'unread'}`;
            item.innerHTML = `
                <div class="dropdown-item-icon" style="background:rgba(249,115,22,0.15); color:var(--primary);">
                    <i class="fa-solid ${n.icon}"></i>
                </div>
                <div class="dropdown-item-content">
                    <h5>${n.title}</h5>
                    <p>${n.message}</p>
                    <span>${n.time}</span>
                </div>
            `;
            notifList.appendChild(item);
        });
    }

    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            const notifBadge = document.getElementById('notificationBadge');
            if (notifBadge) notifBadge.style.display = 'none';
            document.querySelectorAll('#notificationList .dropdown-item').forEach(i => i.classList.remove('unread'));
            showToast("All notifications marked as read", "success");
        });
    }

    const clearNotificationsBtn = document.getElementById('clearNotificationsBtn');
    if (clearNotificationsBtn) {
        clearNotificationsBtn.addEventListener('click', () => {
            const notifList = document.getElementById('notificationList');
            if (notifList) notifList.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:0.85rem;">No notifications</div>`;
            const notifBadge = document.getElementById('notificationBadge');
            if (notifBadge) notifBadge.style.display = 'none';
            showToast("Notifications cleared", "info");
        });
    }

    // =========================================================================
    // 10. FEEDBACK FORM (WITH PER-ACCOUNT SUBMISSION RECORDING)
    // =========================================================================

    const feedbackSubjectSelect = document.getElementById('feedbackSubjectSelect');
    const feedbackFacultyCard = document.getElementById('feedbackFacultyCard');
    const feedbackComment = document.getElementById('feedbackComment');
    const commentCharCount = document.getElementById('commentCharCount');
    const formOverallScoreBadge = document.getElementById('formOverallScoreBadge');
    const formOverallScoreLabel = document.getElementById('formOverallScoreLabel');
    const mainFeedbackForm = document.getElementById('mainFeedbackForm');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const loadDraftBtn = document.getElementById('loadDraftBtn');
    const resetFormBtn = document.getElementById('resetFormBtn');

    function populateFeedbackSubjects(selectedSubjectId = null) {
        if (!feedbackSubjectSelect) return;
        feedbackSubjectSelect.innerHTML = '<option value="" disabled selected>-- Choose a Subject / Faculty --</option>';

        const activeSubjects = getActiveSubjects();
        activeSubjects.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.id;
            const statusLabel = sub.status === 'completed' ? ' [Completed - Edit]' : ' [Pending]';
            option.innerText = `${sub.code} - ${sub.name} (${sub.faculty})${statusLabel}`;
            feedbackSubjectSelect.appendChild(option);
        });

        if (selectedSubjectId) {
            feedbackSubjectSelect.value = selectedSubjectId;
            handleSubjectSelection(selectedSubjectId);
        }
    }

    function handleSubjectSelection(subId) {
        const activeSubjects = getActiveSubjects();
        const sub = activeSubjects.find(s => s.id === subId);
        if (!sub) return;

        feedbackFacultyCard.style.display = 'flex';
        document.getElementById('ffCardName').innerText = sub.faculty;
        document.getElementById('ffCardRole').innerText = `${sub.facultyRole} • ${sub.department}`;
        document.getElementById('ffCardSubject').innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${sub.name} (${sub.code})`;
        document.getElementById('ffCardRoom').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${sub.room}`;
        document.getElementById('ffCardCredits').innerHTML = `<i class="fa-solid fa-award"></i> ${sub.credits} Credits`;
        document.getElementById('ffCardAvatar').src = sub.avatar;

        if (sub.status === 'completed' && sub.submissionId) {
            const userSubms = getCurrentUserSubmissions();
            const subm = userSubms.find(s => s.id === sub.submissionId);
            if (subm) {
                loadSubmissionIntoForm(subm);
                showToast(`Loaded your feedback for ${sub.name} for editing`, "info");
                return;
            }
        }

        resetRatingScores();
    }

    if (feedbackSubjectSelect) {
        feedbackSubjectSelect.addEventListener('change', (e) => {
            handleSubjectSelection(e.target.value);
        });
    }

    function prepareFeedbackForSubject(subjectId) {
        window.location.hash = 'give-feedback';
        setTimeout(() => {
            populateFeedbackSubjects(subjectId);
        }, 100);
    }

    const ratingLabels = {
        0: "Not Rated",
        1: "1 - Poor",
        2: "2 - Fair",
        3: "3 - Good",
        4: "4 - Very Good",
        5: "5 - Excellent"
    };

    document.querySelectorAll('.star-group').forEach(group => {
        const metric = group.getAttribute('data-metric');
        const stars = group.querySelectorAll('.star-btn');
        const scoreTextEl = document.getElementById(`score-text-${metric}`);

        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'), 10);

            star.addEventListener('mouseenter', () => {
                highlightStars(stars, val);
                if (scoreTextEl) scoreTextEl.innerText = ratingLabels[val];
            });

            star.addEventListener('mouseleave', () => {
                const currentVal = currentRatings[metric];
                highlightStars(stars, currentVal);
                if (scoreTextEl) scoreTextEl.innerText = ratingLabels[currentVal];
            });

            star.addEventListener('click', () => {
                currentRatings[metric] = val;
                highlightStars(stars, val);
                if (scoreTextEl) scoreTextEl.innerText = ratingLabels[val];
                calculateOverallScore();
            });
        });
    });

    function highlightStars(stars, value) {
        stars.forEach(s => {
            const starVal = parseInt(s.getAttribute('data-value'), 10);
            if (starVal <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    function calculateOverallScore() {
        const values = Object.values(currentRatings);
        const ratedValues = values.filter(v => v > 0);

        if (ratedValues.length === 0) {
            formOverallScoreBadge.innerText = "0.0";
            formOverallScoreLabel.innerText = "Unrated";
            return;
        }

        const avg = (values.reduce((a, b) => a + b, 0) / 5).toFixed(1);
        formOverallScoreBadge.innerText = avg;

        if (avg >= 4.5) formOverallScoreLabel.innerText = "★ Excellent Performance";
        else if (avg >= 3.5) formOverallScoreLabel.innerText = "★ Very Good Standard";
        else if (avg >= 2.5) formOverallScoreLabel.innerText = "★ Satisfactory / Good";
        else formOverallScoreLabel.innerText = "★ Needs Constructive Action";
    }

    function resetRatingScores() {
        currentRatings = { teaching: 0, coverage: 0, lab: 0, doubts: 0, fairness: 0 };
        document.querySelectorAll('.star-group').forEach(group => {
            const metric = group.getAttribute('data-metric');
            const stars = group.querySelectorAll('.star-btn');
            const scoreTextEl = document.getElementById(`score-text-${metric}`);
            highlightStars(stars, 0);
            if (scoreTextEl) scoreTextEl.innerText = "Not Rated";
        });
        calculateOverallScore();

        currentSelectedTags.clear();
        document.querySelectorAll('#feedbackTagsContainer .tag-chip').forEach(chip => {
            chip.classList.remove('active');
        });

        if (feedbackComment) {
            feedbackComment.value = '';
            if (commentCharCount) commentCharCount.innerText = '0';
        }
    }

    const tagChips = document.querySelectorAll('#feedbackTagsContainer .tag-chip');
    tagChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const tag = chip.getAttribute('data-tag');
            if (currentSelectedTags.has(tag)) {
                currentSelectedTags.delete(tag);
                chip.classList.remove('active');
            } else {
                currentSelectedTags.add(tag);
                chip.classList.add('active');
            }
        });
    });

    if (feedbackComment) {
        feedbackComment.addEventListener('input', () => {
            if (commentCharCount) commentCharCount.innerText = feedbackComment.value.length;
        });
    }

    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            const subId = feedbackSubjectSelect.value;
            if (!subId) {
                showToast("Please select a subject to save draft", "warning");
                return;
            }
            const draft = {
                subjectId: subId,
                ratings: { ...currentRatings },
                tags: Array.from(currentSelectedTags),
                comment: feedbackComment.value,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(`sfs_draft_${currentUser.rollNo}`, JSON.stringify(draft));
            showToast("Feedback draft saved successfully!", "success");
        });
    }

    if (loadDraftBtn) {
        loadDraftBtn.addEventListener('click', () => {
            const draftStr = localStorage.getItem(`sfs_draft_${currentUser.rollNo}`);
            if (!draftStr) {
                showToast("No saved draft found for this account", "info");
                return;
            }
            try {
                const draft = JSON.parse(draftStr);
                populateFeedbackSubjects(draft.subjectId);
                currentRatings = { ...draft.ratings };

                Object.keys(currentRatings).forEach(metric => {
                    const group = document.querySelector(`.star-group[data-metric="${metric}"]`);
                    if (group) {
                        const stars = group.querySelectorAll('.star-btn');
                        highlightStars(stars, currentRatings[metric]);
                        const scoreTextEl = document.getElementById(`score-text-${metric}`);
                        if (scoreTextEl) scoreTextEl.innerText = ratingLabels[currentRatings[metric]];
                    }
                });
                calculateOverallScore();

                currentSelectedTags = new Set(draft.tags || []);
                tagChips.forEach(chip => {
                    const tag = chip.getAttribute('data-tag');
                    if (currentSelectedTags.has(tag)) chip.classList.add('active');
                    else chip.classList.remove('active');
                });

                feedbackComment.value = draft.comment || '';
                if (commentCharCount) commentCharCount.innerText = feedbackComment.value.length;

                showToast("Draft restored successfully!", "success");
            } catch (e) {
                showToast("Error loading draft", "danger");
            }
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            resetRatingScores();
            if (feedbackSubjectSelect) feedbackSubjectSelect.value = '';
            if (feedbackFacultyCard) feedbackFacultyCard.style.display = 'none';
            showToast("Feedback form reset", "info");
        });
    }

    function loadSubmissionIntoForm(subm) {
        currentRatings = { ...subm.ratings };
        Object.keys(currentRatings).forEach(metric => {
            const group = document.querySelector(`.star-group[data-metric="${metric}"]`);
            if (group) {
                const stars = group.querySelectorAll('.star-btn');
                highlightStars(stars, currentRatings[metric]);
                const scoreTextEl = document.getElementById(`score-text-${metric}`);
                if (scoreTextEl) scoreTextEl.innerText = ratingLabels[currentRatings[metric]];
            }
        });
        calculateOverallScore();

        currentSelectedTags = new Set(subm.tags || []);
        tagChips.forEach(chip => {
            const tag = chip.getAttribute('data-tag');
            if (currentSelectedTags.has(tag)) chip.classList.add('active');
            else chip.classList.remove('active');
        });

        feedbackComment.value = subm.comment || '';
        if (commentCharCount) commentCharCount.innerText = feedbackComment.value.length;
    }

    // Submit Feedback (Saves specifically for current user, updates progress dynamically)
    if (mainFeedbackForm) {
        mainFeedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const subjectId = feedbackSubjectSelect.value;
            if (!subjectId) {
                showToast("Please choose a subject to evaluate.", "warning");
                return;
            }

            const unratedMetrics = Object.keys(currentRatings).filter(k => currentRatings[k] === 0);
            if (unratedMetrics.length > 0) {
                showToast("Please rate all 5 evaluation metrics before submitting.", "warning");
                return;
            }

            const activeSubjects = getActiveSubjects();
            const subject = activeSubjects.find(s => s.id === subjectId);
            const overallScore = parseFloat((Object.values(currentRatings).reduce((a, b) => a + b, 0) / 5).toFixed(1));
            const isAnonymous = document.getElementById('anonymousCheckbox').checked;

            const userSubms = getCurrentUserSubmissions();
            let submId = subject.submissionId || `subm-${Date.now()}`;
            const existingIdx = userSubms.findIndex(s => s.id === submId || s.subjectId === subject.id);

            const newSubmission = {
                id: submId,
                subjectId: subject.id,
                subjectCode: subject.code,
                subjectName: subject.name,
                faculty: subject.faculty,
                ratings: { ...currentRatings },
                overallRating: overallScore,
                tags: Array.from(currentSelectedTags),
                comment: feedbackComment.value.trim() || "No additional comments provided.",
                isAnonymous: isAnonymous,
                studentRollNo: currentUser.rollNo,
                date: new Date().toISOString()
            };

            if (existingIdx >= 0) {
                userSubms[existingIdx] = newSubmission;
                showToast(`Feedback for ${subject.name} updated!`, "success");
            } else {
                userSubms.unshift(newSubmission);
                showToast(`Feedback for ${subject.name} recorded! Digital receipt generated.`, "success");
            }

            // Save user submissions
            saveCurrentUserSubmissions(userSubms);

            // Log activity for this user
            const activities = getCurrentUserActivities();
            activities.unshift({
                id: Date.now(),
                title: `${subject.code} Feedback Submitted`,
                desc: `Evaluation completed with score ★ ${overallScore}`,
                time: "Just now",
                icon: "fa-check",
                type: "success"
            });
            saveCurrentUserActivities(activities);

            localStorage.removeItem(`sfs_draft_${currentUser.rollNo}`);

            // Refresh UI with new progress
            renderDashboard();

            // Display Digital Verification Receipt
            displayReceiptModal(newSubmission);
        });
    }

    function displayReceiptModal(subm) {
        document.getElementById('receiptIdText').innerText = `#REC-${Math.floor(1000 + Math.random() * 9000)}-2026`;
        document.getElementById('receiptRollNo').innerText = subm.isAnonymous ? `${currentUser.rollNo} (Masked for Faculty)` : currentUser.rollNo;
        document.getElementById('receiptSubjectName').innerText = `${subm.subjectName} (${subm.subjectCode})`;
        document.getElementById('receiptFacultyName').innerText = subm.faculty;
        document.getElementById('receiptRating').innerText = `★ ${subm.overallRating} / 5.0`;
        document.getElementById('receiptMode').innerText = subm.isAnonymous ? "Anonymous Confidential Review" : "Standard Student Review";
        document.getElementById('receiptTimestamp').innerText = new Date(subm.date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });

        openModal('receiptModal');
    }

    // =========================================================================
    // 11. ENROLLED SUBJECTS DIRECTORY & SEARCH
    // =========================================================================

    const fullSubjectsGrid = document.getElementById('fullSubjectsGrid');
    const subjectSearchInput = document.getElementById('subjectSearchInput');
    const subjectFilterTabs = document.getElementById('subjectFilterTabs');
    let currentSubjectFilter = 'all';

    function renderSubjects() {
        if (!fullSubjectsGrid) return;
        const query = (subjectSearchInput ? subjectSearchInput.value : '').toLowerCase().trim();
        const activeSubjects = getActiveSubjects();
        const userSubmissions = getCurrentUserSubmissions();

        const allCount = activeSubjects.length;
        const completedCount = userSubmissions.length;
        const pendingCount = Math.max(0, allCount - completedCount);

        document.getElementById('countAllSubjects').innerText = allCount;
        document.getElementById('countPendingSubjects').innerText = pendingCount;
        document.getElementById('countCompletedSubjects').innerText = completedCount;

        let filtered = activeSubjects.filter(sub => {
            if (currentSubjectFilter === 'pending' && sub.status !== 'pending') return false;
            if (currentSubjectFilter === 'completed' && sub.status !== 'completed') return false;
            if (query) {
                const matchName = sub.name.toLowerCase().includes(query);
                const matchCode = sub.code.toLowerCase().includes(query);
                const matchFaculty = sub.faculty.toLowerCase().includes(query);
                return matchName || matchCode || matchFaculty;
            }
            return true;
        });

        fullSubjectsGrid.innerHTML = '';
        if (filtered.length === 0) {
            fullSubjectsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fa-solid fa-folder-open"></i>
                    <h3>No subjects match your search</h3>
                    <p>Try searching with another keyword or adjust the filter tab.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(sub => {
            const isCompleted = sub.status === 'completed';
            const card = document.createElement('div');
            card.className = 'subject-card glass-card';
            card.innerHTML = `
                <div class="subject-header">
                    <div class="subject-icon ${sub.iconColor}"><i class="fa-solid ${sub.icon}"></i></div>
                    <span class="status-badge ${sub.status}">${isCompleted ? 'Completed' : 'Pending'}</span>
                </div>
                <h3>${sub.name}</h3>
                <p class="faculty-name"><i class="fa-solid fa-user-tie"></i> ${sub.faculty}</p>
                <div class="subject-meta-list">
                    <div class="subject-meta-item"><i class="fa-solid fa-hashtag primary-text"></i> Code: ${sub.code} • ${sub.credits} Credits</div>
                    <div class="subject-meta-item"><i class="fa-solid fa-location-dot primary-text"></i> ${sub.room}</div>
                    <div class="subject-meta-item"><i class="fa-solid fa-building-columns primary-text"></i> ${sub.department}</div>
                </div>
                <div class="subject-card-actions">
                    ${isCompleted ?
                        `<button class="btn btn-success ripple view-subm-btn" data-subm-id="${sub.submissionId}"><i class="fa-solid fa-eye"></i> View</button>
                         <button class="btn btn-secondary ripple edit-subm-btn" data-subject-id="${sub.id}"><i class="fa-solid fa-pen"></i> Edit</button>` :
                        `<button class="btn btn-primary ripple give-feedback-btn" data-subject-id="${sub.id}"><i class="fa-solid fa-pen-to-square"></i> Give Feedback</button>`
                    }
                    <button class="btn btn-secondary ripple syllabus-btn" data-subject-id="${sub.id}" title="Course Syllabus"><i class="fa-solid fa-book-open"></i></button>
                </div>
            `;
            fullSubjectsGrid.appendChild(card);
        });

        fullSubjectsGrid.querySelectorAll('.give-feedback-btn').forEach(btn => {
            btn.addEventListener('click', () => prepareFeedbackForSubject(btn.getAttribute('data-subject-id')));
        });

        fullSubjectsGrid.querySelectorAll('.edit-subm-btn').forEach(btn => {
            btn.addEventListener('click', () => prepareFeedbackForSubject(btn.getAttribute('data-subject-id')));
        });

        fullSubjectsGrid.querySelectorAll('.view-subm-btn').forEach(btn => {
            btn.addEventListener('click', () => showSubmissionModal(btn.getAttribute('data-subm-id')));
        });

        fullSubjectsGrid.querySelectorAll('.syllabus-btn').forEach(btn => {
            btn.addEventListener('click', () => showSyllabusModal(btn.getAttribute('data-subject-id')));
        });
    }

    if (subjectSearchInput) {
        subjectSearchInput.addEventListener('input', renderSubjects);
    }

    if (subjectFilterTabs) {
        subjectFilterTabs.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                subjectFilterTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSubjectFilter = btn.getAttribute('data-filter');
                renderSubjects();
            });
        });
    }

    function showSyllabusModal(subjectId) {
        const sub = BASE_SUBJECTS.find(s => s.id === subjectId);
        if (!sub) return;

        document.getElementById('syllabusModalTitle').innerHTML = `<i class="fa-solid fa-book-open primary-text"></i> ${sub.name} (${sub.code}) Syllabus`;
        const content = document.getElementById('syllabusModalContent');
        content.innerHTML = `
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px; padding:16px; border-radius:14px; background:rgba(249,115,22,0.06); border:1px solid var(--glass-border);">
                <img src="${sub.avatar}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;" alt="Faculty">
                <div>
                    <h4 style="color:var(--text-main); font-size:1.05rem;">Faculty: ${sub.faculty}</h4>
                    <p style="font-size:0.85rem; color:var(--text-muted);">${sub.facultyRole} • ${sub.credits} Academic Credits</p>
                </div>
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:12px; color:var(--text-main);"><i class="fa-solid fa-list-ol primary-text"></i> Core Syllabus Modules:</h4>
            <ol style="padding-left:20px; display:flex; flex-direction:column; gap:8px; font-size:0.9rem; color:var(--text-main);">
                ${sub.syllabus.map(topic => `<li>${topic}</li>`).join('')}
            </ol>
            <div style="margin-top:20px; font-size:0.85rem; color:var(--text-muted);">
                <p><i class="fa-solid fa-door-open"></i> Location: ${sub.room}</p>
            </div>
        `;
        openModal('syllabusModal');
    }

    // =========================================================================
    // 12. SUBMISSION DETAILS MODAL
    // =========================================================================

    function showSubmissionModal(submId) {
        const userSubms = getCurrentUserSubmissions();
        const subm = userSubms.find(s => s.id === submId);
        if (!subm) {
            showToast("Submission record not found for this account", "warning");
            return;
        }

        const content = document.getElementById('submissionDetailsContent');
        content.innerHTML = `
            <div style="margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <h3 style="font-size:1.25rem; color:var(--text-main);">${subm.subjectName}</h3>
                    <span class="table-rating-badge" style="font-size:1rem; padding:6px 14px;">★ ${subm.overallRating} / 5.0</span>
                </div>
                <p style="font-size:0.9rem; color:var(--text-muted);"><i class="fa-solid fa-user-tie"></i> Faculty: ${subm.faculty} • Code: ${subm.subjectCode}</p>
                <p style="font-size:0.82rem; color:var(--text-muted); margin-top:4px;">
                    <i class="fa-regular fa-clock"></i> Submitted: ${new Date(subm.date).toLocaleString()} • ${subm.isAnonymous ? '<i class="fa-solid fa-user-secret"></i> Anonymous' : 'Identified'}
                </p>
            </div>

            <h4 style="font-size:0.95rem; margin-bottom:12px; color:var(--text-main);"><i class="fa-solid fa-star-half-stroke primary-text"></i> Evaluation Breakdown:</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
                <div style="padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid var(--glass-border);">
                    <div style="font-size:0.8rem; color:var(--text-muted);">1. Teaching Methodology</div>
                    <div style="font-weight:600; color:var(--text-main);">★ ${subm.ratings.teaching} / 5.0</div>
                </div>
                <div style="padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid var(--glass-border);">
                    <div style="font-size:0.8rem; color:var(--text-muted);">2. Course Coverage</div>
                    <div style="font-weight:600; color:var(--text-main);">★ ${subm.ratings.coverage} / 5.0</div>
                </div>
                <div style="padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid var(--glass-border);">
                    <div style="font-size:0.8rem; color:var(--text-muted);">3. Lab & Practical Support</div>
                    <div style="font-weight:600; color:var(--text-main);">★ ${subm.ratings.lab} / 5.0</div>
                </div>
                <div style="padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid var(--glass-border);">
                    <div style="font-size:0.8rem; color:var(--text-muted);">4. Doubt Resolution</div>
                    <div style="font-weight:600; color:var(--text-main);">★ ${subm.ratings.doubts} / 5.0</div>
                </div>
                <div style="padding:10px 14px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid var(--glass-border); grid-column:1 / -1;">
                    <div style="font-size:0.8rem; color:var(--text-muted);">5. Fairness in Internal Grading</div>
                    <div style="font-weight:600; color:var(--text-main);">★ ${subm.ratings.fairness} / 5.0</div>
                </div>
            </div>

            <div style="margin-bottom:16px;">
                <h4 style="font-size:0.95rem; margin-bottom:8px; color:var(--text-main);"><i class="fa-solid fa-tags primary-text"></i> Selected Attributes:</h4>
                <div class="tag-chips">
                    ${subm.tags.map(t => `<span class="tag-chip active" style="font-size:0.8rem; padding:4px 12px;">${t}</span>`).join('')}
                </div>
            </div>

            <div style="padding:14px 18px; border-radius:12px; background:rgba(249,115,22,0.06); border:1px solid var(--glass-border);">
                <h4 style="font-size:0.9rem; margin-bottom:6px; color:var(--text-main);"><i class="fa-solid fa-comment-dots primary-text"></i> Student Review:</h4>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">"${subm.comment}"</p>
            </div>
        `;

        const printBtn = document.getElementById('printSubmissionBtn');
        if (printBtn) {
            printBtn.onclick = () => {
                closeModal('submissionDetailsModal');
                displayReceiptModal(subm);
            };
        }

        openModal('submissionDetailsModal');
    }

    // =========================================================================
    // 13. FEEDBACK HISTORY TABLE & EXPORT
    // =========================================================================

    function renderHistory() {
        const historyTableBody = document.getElementById('historyTableBody');
        if (!historyTableBody) return;

        const userSubmissions = getCurrentUserSubmissions();
        const totalSubmitted = userSubmissions.length;
        const totalPending = Math.max(0, BASE_SUBJECTS.length - totalSubmitted);
        const avgScore = totalSubmitted > 0 ? (userSubmissions.reduce((a, b) => a + b.overallRating, 0) / totalSubmitted).toFixed(1) : "0.0";
        const anonCount = userSubmissions.filter(s => s.isAnonymous).length;

        document.getElementById('historySubmittedCount').innerText = totalSubmitted;
        document.getElementById('historyAvgRating').innerText = `${avgScore} ★`;
        document.getElementById('historyAnonCount').innerText = anonCount;
        document.getElementById('historyPendingCount').innerText = totalPending;

        historyTableBody.innerHTML = '';
        if (userSubmissions.length === 0) {
            historyTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding:35px 20px; color:var(--text-muted);">
                        <i class="fa-solid fa-clipboard-list" style="font-size:2rem; margin-bottom:10px; display:block; opacity:0.5;"></i>
                        No feedback submissions found for <strong>${currentUser.name}</strong> yet (Progress is 0%).<br>
                        Click <a href="#give-feedback" style="color:var(--primary); font-weight:600;">Give Feedback</a> to evaluate your first course!
                    </td>
                </tr>
            `;
            return;
        }

        userSubmissions.forEach(subm => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${subm.subjectCode}</strong></td>
                <td>${subm.subjectName}</td>
                <td><i class="fa-solid fa-user-tie"></i> ${subm.faculty}</td>
                <td>${new Date(subm.date).toLocaleDateString()}</td>
                <td><span class="table-rating-badge">★ ${subm.overallRating}</span></td>
                <td><span class="status-badge completed">${subm.isAnonymous ? 'Anonymous' : 'Verified'}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="action-icon-btn view-action" data-id="${subm.id}" title="View Review"><i class="fa-solid fa-eye"></i></button>
                        <button class="action-icon-btn print-action" data-id="${subm.id}" title="Print Receipt"><i class="fa-solid fa-receipt"></i></button>
                        <button class="action-icon-btn edit-action" data-subject-id="${subm.subjectId}" title="Edit Feedback"><i class="fa-solid fa-pen"></i></button>
                    </div>
                </td>
            `;

            tr.querySelector('.view-action').addEventListener('click', () => showSubmissionModal(subm.id));
            tr.querySelector('.print-action').addEventListener('click', () => displayReceiptModal(subm));
            tr.querySelector('.edit-action').addEventListener('click', () => prepareFeedbackForSubject(subm.subjectId));

            historyTableBody.appendChild(tr);
        });
    }

    function exportSubmissionsCSV() {
        const userSubmissions = getCurrentUserSubmissions();
        if (userSubmissions.length === 0) {
            showToast("No submissions to export for this account", "warning");
            return;
        }

        let csv = "Receipt ID,Student ID,Course Code,Course Name,Faculty,Overall Rating,Anonymous,Date,Comment\n";
        userSubmissions.forEach(s => {
            const cleanComment = (s.comment || '').replace(/"/g, '""');
            csv += `"${s.id}","${currentUser.rollNo}","${s.subjectCode}","${s.subjectName}","${s.faculty}","${s.overallRating}","${s.isAnonymous ? 'Yes' : 'No'}","${s.date}","${cleanComment}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student_feedback_${currentUser.rollNo}_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Feedback report exported as CSV!", "success");
    }

    function exportSubmissionsJSON() {
        const userSubmissions = getCurrentUserSubmissions();
        const data = {
            student: currentUser,
            submissions: userSubmissions,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student_feedback_${currentUser.rollNo}_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Feedback backup exported as JSON!", "success");
    }

    const exportHistoryCsvBtn = document.getElementById('exportHistoryCsvBtn');
    const exportHistoryJsonBtn = document.getElementById('exportHistoryJsonBtn');
    const settingsExportCsvBtn = document.getElementById('settingsExportCsvBtn');
    const settingsExportJsonBtn = document.getElementById('settingsExportJsonBtn');
    const adminDownloadReportBtn = document.getElementById('adminDownloadReportBtn');

    if (exportHistoryCsvBtn) exportHistoryCsvBtn.addEventListener('click', exportSubmissionsCSV);
    if (exportHistoryJsonBtn) exportHistoryJsonBtn.addEventListener('click', exportSubmissionsJSON);
    if (settingsExportCsvBtn) settingsExportCsvBtn.addEventListener('click', exportSubmissionsCSV);
    if (settingsExportJsonBtn) settingsExportJsonBtn.addEventListener('click', exportSubmissionsJSON);
    if (adminDownloadReportBtn) adminDownloadReportBtn.addEventListener('click', exportSubmissionsCSV);

    // =========================================================================
    // 14. ANALYTICS DASHBOARD
    // =========================================================================

    function renderAnalytics() {
        const userSubmissions = getCurrentUserSubmissions();
        const total = BASE_SUBJECTS.length;
        const completed = userSubmissions.length;
        const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
        const avgScore = userSubmissions.length > 0 ?
            (userSubmissions.reduce((a, b) => a + b.overallRating, 0) / userSubmissions.length).toFixed(1) : "0.0";

        document.getElementById('analyticsCompletionPct').innerText = `${completionPct}%`;
        document.getElementById('analyticsAvgScore').innerText = `${avgScore} / 5.0`;

        const facultyBarsContainer = document.getElementById('analyticsFacultyBars');
        if (facultyBarsContainer) {
            facultyBarsContainer.innerHTML = '';
            BASE_SUBJECTS.forEach(sub => {
                const subm = userSubmissions.find(s => s.subjectId === sub.id);
                const score = subm ? subm.overallRating : (completed === 0 ? 0.0 : 4.4);
                const pct = Math.round((score / 5) * 100);

                const row = document.createElement('div');
                row.className = 'bar-row';
                row.innerHTML = `
                    <div class="bar-row-header">
                        <span><strong>${sub.faculty}</strong> (${sub.name})</span>
                        <span>★ ${score} / 5.0</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill-dynamic" style="width: ${pct}%;"></div>
                    </div>
                `;
                facultyBarsContainer.appendChild(row);
            });
        }
    }

    // =========================================================================
    // 15. SETTINGS & PROFILE CONTROLLER
    // =========================================================================

    function renderSettings() {
        document.getElementById('settingName').value = currentUser.name;
        document.getElementById('settingRollNo').value = currentUser.rollNo;
        document.getElementById('settingEmail').value = currentUser.email;
        document.getElementById('settingBranch').value = currentUser.branch;
        document.getElementById('settingSemester').value = currentUser.semester || "Semester 5";

        document.querySelectorAll('.avatar-option').forEach(img => {
            if (img.getAttribute('data-avatar') === currentUser.avatar) {
                img.classList.add('selected');
            } else {
                img.classList.remove('selected');
            }
        });
    }

    document.querySelectorAll('.avatar-option').forEach(img => {
        img.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            currentUser.avatar = img.getAttribute('data-avatar');
        });
    });

    const profileSettingsForm = document.getElementById('profileSettingsForm');
    if (profileSettingsForm) {
        profileSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            currentUser.name = document.getElementById('settingName').value.trim();
            currentUser.rollNo = document.getElementById('settingRollNo').value.trim();
            currentUser.email = document.getElementById('settingEmail').value.trim();
            currentUser.branch = document.getElementById('settingBranch').value.trim();
            currentUser.semester = document.getElementById('settingSemester').value;

            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
            renderDashboard();
            showToast("Profile details updated successfully!", "success");
        });
    }

    const settingsResetDataBtn = document.getElementById('settingsResetDataBtn');
    if (settingsResetDataBtn) {
        settingsResetDataBtn.addEventListener('click', () => {
            if (confirm("Reset current account submissions to 0% progress?")) {
                saveCurrentUserSubmissions([]);
                saveCurrentUserActivities([]);
                renderDashboard();
                renderHistory();
                showToast(`Progress for ${currentUser.name} reset to 0%!`, "info");
            }
        });
    }

    // =========================================================================
    // 16. HELP & FAQ ACCORDION + SUPPORT TICKET
    // =========================================================================

    const faqAccordion = document.getElementById('faqAccordion');
    if (faqAccordion) {
        faqAccordion.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const wasOpen = item.classList.contains('open');
                faqAccordion.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!wasOpen) {
                    item.classList.add('open');
                }
            });
        });
    }

    const supportTicketForm = document.getElementById('supportTicketForm');
    if (supportTicketForm) {
        supportTicketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ticketId = `#TKT-${Math.floor(1000 + Math.random() * 9000)}`;
            supportTicketForm.reset();
            showToast(`Support ticket ${ticketId} created! Our academic desk will assist you shortly.`, "success", 4000);
        });
    }

    // =========================================================================
    // 17. INITIALIZATION
    // =========================================================================

    function triggerFadeUp() {
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach(element => element.classList.add('visible'));
    }

    // Initialize Auth View and Roles
    setAuthRole('student');
    updateAuthView();
    updateRoleUI();
    renderNotifications();
    renderDashboard();
    handleHashChange();
    setTimeout(triggerFadeUp, 150);

    console.log("FeedbackPortal: Multi-Account Zero-Progress & Student/Admin Auth System Ready.");
});
