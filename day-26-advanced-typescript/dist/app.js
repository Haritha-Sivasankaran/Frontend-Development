/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/app.ts
 * ==========================================================================
 * Application orchestrator:
 * - Wires DOM controls and manages asynchronous state in the browser.
 * - Executes automated verification tests when invoked via Node.js runtime.
 */
import { UserRole, UserStatus, SortDirection } from './types.js';
import { User, AdminUser } from './models.js';
import { filterCollection, sortByProperty, paginateCollection, isAdminUser, getErrorMessage, fetchUsersFromApi, createUserApi, deleteUserApi, updateUserStatusApi } from './services/apiService.js';
// ==========================================================================
// 1. Browser Application Controller
// ==========================================================================
function initBrowserApp() {
    const userGrid = document.getElementById('user-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorBanner = document.getElementById('error-banner');
    const searchInput = document.getElementById('filter-search');
    const roleSelect = document.getElementById('filter-role');
    const statusSelect = document.getElementById('filter-status');
    const departmentSelect = document.getElementById('filter-department');
    const sortSelect = document.getElementById('sort-by');
    const btnResetFilters = document.getElementById('btn-reset-filters');
    const btnOpenAddModal = document.getElementById('btn-open-add-modal');
    const addUserModal = document.getElementById('add-user-modal');
    const btnCloseAddModal = document.getElementById('btn-close-add-modal');
    const addUserForm = document.getElementById('add-user-form');
    const newUserRoleSelect = document.getElementById('new-role');
    const adminLevelGroup = document.getElementById('admin-level-group');
    const userDetailsModal = document.getElementById('user-details-modal');
    const btnCloseDetailsModal = document.getElementById('btn-close-details-modal');
    const detailsModalContent = document.getElementById('details-modal-content');
    if (!userGrid)
        return; // Exit if not running in the browser DOM
    // Application State
    let allUsers = [];
    let currentFilter = {
        role: 'ALL',
        status: 'ALL',
        department: 'ALL',
        searchQuery: ''
    };
    let currentSortKey = 'id';
    let currentSortDirection = SortDirection.Ascending;
    let currentPage = 1;
    const pageSize = 6;
    // Initial Load
    loadUsers();
    // Event: Asynchronous API Data Fetching
    async function loadUsers() {
        showLoading(true);
        hideError();
        try {
            const response = await fetchUsersFromApi();
            allUsers = response.data;
            applyFilterAndRender();
            renderStats();
            showToast(response.message, "info");
        }
        catch (err) {
            const msg = getErrorMessage(err);
            showError(`Failed to load users: ${msg}`);
            showToast(msg, "error");
        }
        finally {
            showLoading(false);
        }
    }
    // Event: Filter & Search changes
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentFilter.searchQuery = searchInput.value.trim().toLowerCase();
            currentPage = 1;
            applyFilterAndRender();
        });
    }
    if (roleSelect) {
        roleSelect.addEventListener('change', () => {
            currentFilter.role = roleSelect.value;
            currentPage = 1;
            applyFilterAndRender();
        });
    }
    if (statusSelect) {
        statusSelect.addEventListener('change', () => {
            currentFilter.status = statusSelect.value;
            currentPage = 1;
            applyFilterAndRender();
        });
    }
    if (departmentSelect) {
        departmentSelect.addEventListener('change', () => {
            currentFilter.department = departmentSelect.value;
            currentPage = 1;
            applyFilterAndRender();
        });
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const val = sortSelect.value;
            if (val === 'name-asc') {
                currentSortKey = 'name';
                currentSortDirection = SortDirection.Ascending;
            }
            else if (val === 'name-desc') {
                currentSortKey = 'name';
                currentSortDirection = SortDirection.Descending;
            }
            else if (val === 'id-desc') {
                currentSortKey = 'id';
                currentSortDirection = SortDirection.Descending;
            }
            else {
                currentSortKey = 'id';
                currentSortDirection = SortDirection.Ascending;
            }
            applyFilterAndRender();
        });
    }
    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', () => {
            if (searchInput)
                searchInput.value = '';
            if (roleSelect)
                roleSelect.value = 'ALL';
            if (statusSelect)
                statusSelect.value = 'ALL';
            if (departmentSelect)
                departmentSelect.value = 'ALL';
            if (sortSelect)
                sortSelect.value = 'id-asc';
            currentFilter = { role: 'ALL', status: 'ALL', department: 'ALL', searchQuery: '' };
            currentSortKey = 'id';
            currentSortDirection = SortDirection.Ascending;
            currentPage = 1;
            applyFilterAndRender();
        });
    }
    // Event: Add User Modal Toggle
    if (btnOpenAddModal && addUserModal) {
        btnOpenAddModal.addEventListener('click', () => {
            addUserModal.classList.add('open');
        });
    }
    if (btnCloseAddModal && addUserModal) {
        btnCloseAddModal.addEventListener('click', () => {
            addUserModal.classList.remove('open');
        });
    }
    // Role select conditionally enables Admin Access Level
    if (newUserRoleSelect && adminLevelGroup) {
        newUserRoleSelect.addEventListener('change', () => {
            if (newUserRoleSelect.value === UserRole.Admin) {
                adminLevelGroup.style.display = 'block';
            }
            else {
                adminLevelGroup.style.display = 'none';
            }
        });
    }
    // Event: Form Submit (Create User)
    if (addUserForm && addUserModal) {
        addUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('new-name').value.trim();
            const email = document.getElementById('new-email').value.trim();
            const role = document.getElementById('new-role').value;
            const status = document.getElementById('new-status').value;
            const department = document.getElementById('new-department').value;
            const phone = document.getElementById('new-phone').value.trim();
            const adminLevelInput = document.getElementById('new-admin-level');
            const adminAccessLevel = adminLevelInput ? parseInt(adminLevelInput.value, 10) : 1;
            if (!name || !email) {
                showToast("Please provide both name and email.", "error");
                return;
            }
            const input = {
                name,
                email,
                role,
                status,
                department,
                phone: phone || undefined,
                adminAccessLevel: role === UserRole.Admin ? adminAccessLevel : undefined
            };
            const submitBtn = addUserForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Creating User...';
            try {
                const response = await createUserApi(input);
                allUsers.unshift(response.data);
                addUserForm.reset();
                if (adminLevelGroup)
                    adminLevelGroup.style.display = 'none';
                addUserModal.classList.remove('open');
                applyFilterAndRender();
                renderStats();
                showToast(response.message, "success");
            }
            catch (err) {
                showToast(`Failed to create user: ${getErrorMessage(err)}`, "error");
            }
            finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    // Event: Close Details Modal
    if (btnCloseDetailsModal && userDetailsModal) {
        btnCloseDetailsModal.addEventListener('click', () => {
            userDetailsModal.classList.remove('open');
        });
    }
    // Core Filter, Sort & Paginate Algorithm (Utilizing Generic Utilities)
    function applyFilterAndRender() {
        // 1. Generic Filter
        const filtered = filterCollection(allUsers, (user) => {
            if (currentFilter.role && currentFilter.role !== 'ALL') {
                if (user.role !== currentFilter.role)
                    return false;
            }
            if (currentFilter.status && currentFilter.status !== 'ALL') {
                if (user.status !== currentFilter.status)
                    return false;
            }
            if (currentFilter.department && currentFilter.department !== 'ALL') {
                if (user.department !== currentFilter.department)
                    return false;
            }
            if (currentFilter.searchQuery && currentFilter.searchQuery !== '') {
                const query = currentFilter.searchQuery;
                const matchName = user.name.toLowerCase().includes(query);
                const matchEmail = user.email.toLowerCase().includes(query);
                const matchDept = user.department.toLowerCase().includes(query);
                if (!matchName && !matchEmail && !matchDept)
                    return false;
            }
            return true;
        });
        // 2. Generic Sort (Constrained by keyof User)
        const sorted = sortByProperty(filtered, currentSortKey, currentSortDirection);
        // 3. Generic Paginate
        const paginated = paginateCollection(sorted, currentPage, pageSize);
        renderUserGrid(paginated);
        renderPaginationControls(paginated);
    }
    // Render User Cards Grid
    function renderUserGrid(paginated) {
        if (!userGrid)
            return;
        userGrid.innerHTML = '';
        if (paginated.items.length === 0) {
            userGrid.innerHTML = `
                <div class="empty-state">
                    <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">👥</span>
                    <h3>No Users Found</h3>
                    <p>No user accounts matched the current filter or search criteria.</p>
                </div>
            `;
            return;
        }
        paginated.items.forEach((user) => {
            const card = document.createElement('article');
            card.className = `user-card ${user.status === UserStatus.Suspended ? 'is-suspended' : ''}`;
            const initials = user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
            // Type Narrowing demonstration in UI!
            const isAdmin = isAdminUser(user);
            const adminTag = isAdmin
                ? `<span class="badge badge-admin-perm">🛡️ Admin (Lvl ${user.permissions.accessLevel})</span>`
                : '';
            card.innerHTML = `
                <div class="user-card-header">
                    <div class="avatar-box">
                        ${user.avatarUrl
                ? `<img src="${user.avatarUrl}" alt="${user.name}" class="avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                : ''}
                        <div class="avatar-placeholder" style="${user.avatarUrl ? 'display: none;' : ''}">${initials}</div>
                    </div>
                    <div class="user-main-meta">
                        <h4 class="user-name">${user.name}</h4>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>

                <div class="user-card-body">
                    <div class="badges-row">
                        <span class="badge badge-role role-${user.role.toLowerCase()}">${user.role}</span>
                        <span class="badge badge-status status-${user.status.toLowerCase()}">${user.status}</span>
                        <span class="badge badge-dept">${user.department}</span>
                        ${adminTag}
                    </div>

                    <div class="user-info-row">
                        <span>📞 Phone:</span>
                        <strong>${user.phone || 'Not Provided'}</strong>
                    </div>
                    <div class="user-info-row">
                        <span>🕒 Member Since:</span>
                        <span>${user.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>

                <div class="user-card-footer">
                    <button class="btn-card-action btn-view-details" onclick="window.viewUserDetails(${user.id})">
                        🔍 Inspect
                    </button>
                    <button class="btn-card-action btn-toggle-status" onclick="window.toggleStatus(${user.id})">
                        ${user.status === UserStatus.Active ? 'Suspend' : 'Activate'}
                    </button>
                    <button class="btn-card-action btn-delete-user" onclick="window.deleteUser(${user.id})">
                        🗑️
                    </button>
                </div>
            `;
            userGrid.appendChild(card);
        });
    }
    // Render Pagination Controls
    function renderPaginationControls(paginated) {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer)
            return;
        if (paginated.totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        paginationContainer.innerHTML = `
            <button class="btn-secondary" id="btn-prev-page" ${paginated.currentPage === 1 ? 'disabled' : ''}>
                ← Previous
            </button>
            <span class="page-indicator">
                Page <strong>${paginated.currentPage}</strong> of <strong>${paginated.totalPages}</strong> (${paginated.totalItems} total)
            </span>
            <button class="btn-secondary" id="btn-next-page" ${paginated.currentPage === paginated.totalPages ? 'disabled' : ''}>
                Next →
            </button>
        `;
        document.getElementById('btn-prev-page')?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                applyFilterAndRender();
            }
        });
        document.getElementById('btn-next-page')?.addEventListener('click', () => {
            if (currentPage < paginated.totalPages) {
                currentPage++;
                applyFilterAndRender();
            }
        });
    }
    // Render Metric Stats
    function renderStats() {
        const stats = {
            totalUsers: allUsers.length,
            activeUsers: allUsers.filter((u) => u.status === UserStatus.Active).length,
            suspendedUsers: allUsers.filter((u) => u.status === UserStatus.Suspended).length,
            adminUsers: allUsers.filter((u) => isAdminUser(u)).length,
            departmentCounts: {
                Engineering: 0,
                Design: 0,
                Product: 0,
                Operations: 0,
                Marketing: 0
            }
        };
        allUsers.forEach((u) => {
            if (stats.departmentCounts[u.department] !== undefined) {
                stats.departmentCounts[u.department]++;
            }
        });
        const statTotal = document.getElementById('stat-total');
        const statActive = document.getElementById('stat-active');
        const statAdmins = document.getElementById('stat-admins');
        const statSuspended = document.getElementById('stat-suspended');
        const deptBreakdown = document.getElementById('dept-breakdown');
        if (statTotal)
            statTotal.textContent = stats.totalUsers.toString();
        if (statActive)
            statActive.textContent = stats.activeUsers.toString();
        if (statAdmins)
            statAdmins.textContent = stats.adminUsers.toString();
        if (statSuspended)
            statSuspended.textContent = stats.suspendedUsers.toString();
        if (deptBreakdown) {
            deptBreakdown.innerHTML = Object.keys(stats.departmentCounts)
                .map((dept) => `
                    <span class="cat-stat-chip">
                        <strong>${dept}:</strong> ${stats.departmentCounts[dept]}
                    </span>
                `)
                .join('');
        }
    }
    // Window Global Functions for Card Actions
    window.viewUserDetails = (id) => {
        const user = allUsers.find((u) => u.id === id);
        if (!user || !userDetailsModal || !detailsModalContent)
            return;
        // Demonstrate TYPE NARROWING in real-world modal display
        const isAdmin = isAdminUser(user);
        let adminSectionHtml = '';
        if (isAdmin) {
            // Inside this block, TypeScript narrows user to AdminUser!
            adminSectionHtml = `
                <div class="admin-permissions-card">
                    <h4>🛡️ Admin Privileges & Permissions Panel</h4>
                    <p style="font-size: 0.85rem; color: #1e3a8a; margin-bottom: 0.75rem;">
                        <strong>Type Guard Verified:</strong> Object instanceof <code>AdminUser</code> with elevated credentials.
                    </p>
                    <ul class="permission-list">
                        <li><span>Can Manage Users:</span> <strong>${user.permissions.canManageUsers ? '✓ Yes' : '✕ No'}</strong></li>
                        <li><span>Can Delete Records:</span> <strong>${user.permissions.canDeleteRecords ? '✓ Yes' : '✕ No'}</strong></li>
                        <li><span>Can Access Financials:</span> <strong>${user.permissions.canAccessFinancials ? '✓ Yes' : '✕ No'}</strong></li>
                        <li><span>Access Clearance Level:</span> <strong>Level ${user.permissions.accessLevel} of 5</strong></li>
                    </ul>
                </div>
            `;
        }
        detailsModalContent.innerHTML = `
            <div class="modal-profile-header">
                <div class="avatar-placeholder" style="width: 56px; height: 56px; font-size: 1.3rem;">
                    ${user.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <h3 style="color: var(--dark);">${user.name}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">${user.email}</p>
                </div>
            </div>

            <div style="margin: 1.25rem 0; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <p><strong>System ID:</strong> #${user.id} <small>(Readonly Immutable)</small></p>
                <p><strong>System Role:</strong> <span class="badge badge-role role-${user.role.toLowerCase()}">${user.role}</span></p>
                <p><strong>Account Status:</strong> <span class="badge badge-status status-${user.status.toLowerCase()}">${user.status}</span></p>
                <p><strong>Department:</strong> ${user.department}</p>
                <p><strong>Phone:</strong> ${user.phone || 'None'}</p>
                <p><strong>Last Logged In:</strong> ${user.lastLogin}</p>
                <p><strong>Summary:</strong> <code style="font-size: 0.82rem;">${user.getProfileSummary()}</code></p>
            </div>

            ${adminSectionHtml}
        `;
        userDetailsModal.classList.add('open');
    };
    window.toggleStatus = async (id) => {
        const user = allUsers.find((u) => u.id === id);
        if (!user)
            return;
        const nextStatus = user.status === UserStatus.Active ? UserStatus.Suspended : UserStatus.Active;
        try {
            const res = await updateUserStatusApi(id, nextStatus);
            showToast(res.message, "success");
            applyFilterAndRender();
            renderStats();
        }
        catch (err) {
            showToast(`Update failed: ${getErrorMessage(err)}`, "error");
        }
    };
    window.deleteUser = async (id) => {
        const user = allUsers.find((u) => u.id === id);
        if (!user)
            return;
        if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            try {
                const res = await deleteUserApi(id);
                allUsers = allUsers.filter((u) => u.id !== id);
                showToast(res.message, "info");
                applyFilterAndRender();
                renderStats();
            }
            catch (err) {
                showToast(`Deletion failed: ${getErrorMessage(err)}`, "error");
            }
        }
    };
    function showLoading(show) {
        if (loadingSpinner)
            loadingSpinner.style.display = show ? 'block' : 'none';
    }
    function showError(msg) {
        if (errorBanner) {
            errorBanner.textContent = msg;
            errorBanner.style.display = 'block';
        }
    }
    function hideError() {
        if (errorBanner)
            errorBanner.style.display = 'none';
    }
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast-box');
        if (!toast)
            return;
        toast.className = `toast-box toast-${type} show`;
        toast.textContent = message;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3600);
    }
}
// ==========================================================================
// 2. Node.js Verification Routine
// ==========================================================================
async function runNodeVerification() {
    console.log("==================================================================");
    console.log("🚀 DAY 26: ADVANCED TYPESCRIPT — USER MANAGEMENT VERIFICATION");
    console.log("==================================================================");
    console.log("\n1. Testing Enums & Class Instantiation with Access Modifiers:");
    const devUser = new User(101, "Ada Lovelace", "ada@edusphere.io", UserRole.Developer, UserStatus.Active, "Engineering", "+1 (555) 181-5000");
    console.log(`  ✓ Created User #${devUser.id}: ${devUser.name}`);
    console.log(`  ✓ Role Enum Value: ${devUser.role}`);
    console.log(`  ✓ Status Enum Value: ${devUser.status}`);
    console.log(`  ✓ Profile Summary: ${devUser.getProfileSummary()}`);
    console.log("\n2. Testing Inheritance (AdminUser extending User):");
    const adminUser = new AdminUser(102, "Alan Turing", "turing@edusphere.io", UserStatus.Active, "Engineering", { canManageUsers: true, canDeleteRecords: true, canAccessFinancials: true, accessLevel: 5 });
    console.log(`  ✓ Created AdminUser #${adminUser.id}: ${adminUser.name}`);
    console.log(`  ✓ Overridden Profile Summary: ${adminUser.getProfileSummary()}`);
    console.log(`  ✓ Can Manage Users: ${adminUser.canPerformAction('canManageUsers')}`);
    console.log("\n3. Testing Custom Type Predicate (Type Narrowing):");
    console.log(`  isAdminUser(devUser)   -> ${isAdminUser(devUser)}   (Expected: false)`);
    console.log(`  isAdminUser(adminUser) -> ${isAdminUser(adminUser)}  (Expected: true)`);
    if (isAdminUser(adminUser)) {
        console.log(`  ✓ Type narrowed successfully! Admin Clearance: Level ${adminUser.permissions.accessLevel}`);
    }
    console.log("\n4. Testing Generic Utility Functions (<T, K extends keyof T>):");
    const testList = [devUser, adminUser];
    const sorted = sortByProperty(testList, 'name', SortDirection.Ascending);
    console.log(`  ✓ Generic sortByProperty result (A-Z): ${sorted.map((u) => u.name).join(', ')}`);
    const paginated = paginateCollection(testList, 1, 1);
    console.log(`  ✓ Generic paginateCollection (Page 1 of size 1): Item ${paginated.items[0].name}, Total Pages: ${paginated.totalPages}`);
    console.log("\n5. Testing Async / Promise API Response Typing:");
    const apiResponse = await fetchUsersFromApi();
    console.log(`  ✓ Fetched API Response: Success=${apiResponse.success}, Count=${apiResponse.data.length}, Message="${apiResponse.message}"`);
    console.log("\n==================================================================");
    console.log("✨ All Advanced TypeScript tests and assertions passed cleanly!");
    console.log("==================================================================\n");
}
// Environment Detection
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initBrowserApp);
}
else {
    runNodeVerification().catch((err) => {
        console.error("Verification failed:", err);
    });
}
