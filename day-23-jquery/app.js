/* ==========================================================================
   DAY 23: JQUERY
   Project: jQuery Admin Dashboard (NexusAdmin)
   ========================================================================== */

/**
 * Concept 1: $(document).ready()
 * Ensures DOM is completely constructed before executing scripts.
 */
$(document).ready(function () {
    console.log("NexusAdmin initialized via jQuery v" + $.fn.jquery);

    // Track active row being edited
    let $editingRow = null;

    // Toast Notification Helper using jQuery fadeIn / fadeOut
    function showToast(message) {
        $("#toast-notice")
            .text(message)
            .stop(true, true)
            .fadeIn(300)
            .delay(2500)
            .fadeOut(400);
    }

    // Update Live User Counter Badge
    function updateUserCount() {
        // Concept 2 & 3: Selectors & Filters (:visible)
        const totalUsers = $("#user-tbody tr:not(.ajax-loading-row)").length;
        $("#user-count-badge").text(totalUsers + " Registered Users");
    }

    // ======================================================================
    // 1. SHOW / HIDE SIDEBAR (CSS & Class Updates)
    // ======================================================================

    /**
     * Concept 6: CSS Updates & classList (.toggleClass)
     * Concept 7: Button Events (.on('click'))
     */
    $("#btn-toggle-sidebar").on("click", function () {
        const $sidebar = $("#sidebar");

        // Concept: .toggleClass()
        $sidebar.toggleClass("collapsed");

        // Concept: .text() and condition check
        if ($sidebar.hasClass("collapsed")) {
            $("#sidebar-toggle-text").text("Expand");
            showToast("Sidebar minimized.");
        } else {
            $("#sidebar-toggle-text").text("Collapse");
            showToast("Sidebar expanded.");
        }
    });

    // Mobile sidebar toggle
    $(".brand-logo").on("click", function () {
        if ($(window).width() <= 768) {
            $("#sidebar").toggleClass("mobile-open");
        }
    });

    // ======================================================================
    // 2. FILTER USERS (Live Search Filter)
    // ======================================================================

    /**
     * Concept 3: Filters (.filter() & :contains)
     * Concept 7: Input Events (.on('input'))
     */
    $("#search-users").on("input", function () {
        // Concept: .val() to read input value
        const query = $(this).val().toLowerCase().trim();

        // Concept: Selectors and .filter()
        $("#user-tbody tr:not(.ajax-loading-row)").filter(function () {
            // Concept: .text() to read combined text inside all <td> cells
            const rowText = $(this).text().toLowerCase();
            const isMatch = rowText.indexOf(query) > -1;

            // Concept: .toggle(boolean) to show/hide element
            $(this).toggle(isMatch);
        });
    });

    // ======================================================================
    // 3. AJAX DATA LOADING ($.ajax())
    // ======================================================================

    /**
     * Concept 8: AJAX with $.ajax()
     * Fetches real REST API data without page reload.
     */
    function loadUsersAjax() {
        const $tbody = $("#user-tbody");

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            dataType: "json",
            beforeSend: function () {
                // Concept: .html() to inject loading spinner row
                $tbody.html(`
                    <tr class="ajax-loading-row">
                        <td colspan="5">
                            <span class="spinner-sm"></span> Loading remote user accounts via $.ajax()...
                        </td>
                    </tr>
                `);
                $("#btn-ajax-load").prop("disabled", true).text("Loading...");
            },
            success: function (users) {
                // Concept: .empty() to wipe loading spinner
                $tbody.empty();

                // Roles array to simulate roles for JSONPlaceholder data
                const simulatedRoles = ["Admin", "Editor", "Viewer"];

                // Iterate using $.each()
                $.each(users, function (index, user) {
                    const role = simulatedRoles[index % 3];
                    const roleClass = "role-" + role.toLowerCase();

                    // Concept: .append() to dynamically mount new <tr> elements
                    const rowHtml = `
                        <tr data-id="${user.id}">
                            <td>#${user.id}</td>
                            <td class="user-cell-name">${user.name}</td>
                            <td class="user-cell-email">${user.email.toLowerCase()}</td>
                            <td class="user-cell-role">
                                <span class="role-badge ${roleClass}">${role}</span>
                            </td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn-table-action btn-edit-row">Edit</button>
                                    <button class="btn-table-action btn-delete-row">Delete</button>
                                </div>
                            </td>
                        </tr>
                    `;
                    $tbody.append(rowHtml);
                });

                showToast(`Loaded ${users.length} users successfully via $.ajax()!`);
                updateUserCount();
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);

                // Fallback offline mock data
                $tbody.empty();
                appendDefaultMockRows();
                showToast("Network request failed. Loaded offline sample rows.");
                updateUserCount();
            },
            complete: function () {
                $("#btn-ajax-load").prop("disabled", false).html(`
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 4v6h-6M1 20v-6h6"/>
                        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                    </svg>
                    Reload via $.ajax
                `);
            }
        });
    }

    function appendDefaultMockRows() {
        const mockUsers = [
            { id: 1, name: "Leanne Graham", email: "sincere@april.biz", role: "Admin" },
            { id: 2, name: "Ervin Howell", email: "shanna@melissa.tv", role: "Editor" },
            { id: 3, name: "Clementine Bauch", email: "nathan@yesenia.net", role: "Viewer" }
        ];

        const $tbody = $("#user-tbody");
        $.each(mockUsers, function (i, u) {
            $tbody.append(`
                <tr data-id="${u.id}">
                    <td>#${u.id}</td>
                    <td class="user-cell-name">${u.name}</td>
                    <td class="user-cell-email">${u.email}</td>
                    <td class="user-cell-role"><span class="role-badge role-${u.role.toLowerCase()}">${u.role}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-table-action btn-edit-row">Edit</button>
                            <button class="btn-table-action btn-delete-row">Delete</button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    $("#btn-ajax-load").on("click", loadUsersAjax);

    // ======================================================================
    // 4. DYNAMICALLY ADD USER ROW (.prepend() with animation)
    // ======================================================================

    $("#btn-open-add-modal").on("click", function () {
        $("#modal-add-user").fadeIn(200);
        $("#add-user-name").focus();
    });

    $(".btn-close-modal").on("click", function () {
        $(".modal-overlay").fadeOut(200);
    });

    // Close on backdrop click
    $(".modal-overlay").on("click", function (e) {
        if ($(e.target).hasClass("modal-overlay")) {
            $(this).fadeOut(200);
        }
    });

    $("#form-add-user").on("submit", function (e) {
        e.preventDefault();

        // Concept: .val() to extract form fields
        const name = $("#add-user-name").val().trim();
        const email = $("#add-user-email").val().trim();
        const role = $("#add-user-role").val();
        const newId = Math.floor(100 + Math.random() * 900);

        // Concept: Creating element and .hide() -> .prepend() -> .fadeIn()
        const $newRow = $(`
            <tr data-id="${newId}">
                <td>#${newId}</td>
                <td class="user-cell-name">${name}</td>
                <td class="user-cell-email">${email.toLowerCase()}</td>
                <td class="user-cell-role">
                    <span class="role-badge role-${role.toLowerCase()}">${role}</span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-table-action btn-edit-row">Edit</button>
                        <button class="btn-table-action btn-delete-row">Delete</button>
                    </div>
                </td>
            </tr>
        `).hide();

        // Concept: .prepend()
        $("#user-tbody").prepend($newRow);
        $newRow.fadeIn(400);

        // Reset & Close
        this.reset();
        $("#modal-add-user").fadeOut(200);
        showToast(`Added new user: "${name}"!`);
        updateUserCount();
    });

    // ======================================================================
    // 5. DYNAMICALLY REMOVE ROW (.remove() via Event Delegation)
    // ======================================================================

    /**
     * Concept: Event Delegation with .on('click', '.child-selector', ...)
     * Handles dynamically added rows cleanly!
     */
    $("#user-tbody").on("click", ".btn-delete-row", function () {
        // Concept: .closest() to find parent <tr>
        const $row = $(this).closest("tr");
        const userName = $row.find(".user-cell-name").text();

        // Concept: .fadeOut() followed by .remove()
        $row.fadeOut(300, function () {
            $(this).remove();
            showToast(`Deleted user: "${userName}".`);
            updateUserCount();
        });
    });

    // ======================================================================
    // 6. UPDATE USER DETAILS (Edit Modal & .text()/.html())
    // ======================================================================

    $("#user-tbody").on("click", ".btn-edit-row", function () {
        $editingRow = $(this).closest("tr");

        // Concept: Reading current row values with .text()
        const currentName = $editingRow.find(".user-cell-name").text();
        const currentEmail = $editingRow.find(".user-cell-email").text();
        const currentRole = $editingRow.find(".role-badge").text().trim();

        // Populate edit modal fields with .val()
        $("#edit-user-name").val(currentName);
        $("#edit-user-email").val(currentEmail);
        $("#edit-user-role").val(currentRole);

        $("#modal-edit-user").fadeIn(200);
        $("#edit-user-name").focus();
    });

    $("#form-edit-user").on("submit", function (e) {
        e.preventDefault();

        if (!$editingRow) return;

        const updatedName = $("#edit-user-name").val().trim();
        const updatedEmail = $("#edit-user-email").val().trim();
        const updatedRole = $("#edit-user-role").val();

        // Concept: Updating row DOM nodes with .text() and .html()
        $editingRow.find(".user-cell-name").text(updatedName);
        $editingRow.find(".user-cell-email").text(updatedEmail.toLowerCase());
        $editingRow.find(".user-cell-role").html(
            `<span class="role-badge role-${updatedRole.toLowerCase()}">${updatedRole}</span>`
        );

        // Highlight updated row briefly with .css()
        $editingRow
            .css("background-color", "#ecfdf5")
            .delay(500)
            .queue(function (next) {
                $(this).css("background-color", "");
                next();
            });

        $("#modal-edit-user").fadeOut(200);
        showToast(`Updated user: "${updatedName}"!`);
        $editingRow = null;
    });

    // Initial AJAX Load
    loadUsersAjax();
});
