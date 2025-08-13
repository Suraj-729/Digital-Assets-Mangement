# 📊 Dashboard (Frontend – SIO)

---

## Component
`Dashboard.jsx`

---

## Description
The **Dashboard** component serves as the primary interface for the Security and Information Officer (SIO) to view and manage projects and their security audit details.  
It retrieves data from the backend API, displays project statistics, and provides features like filtering, navigation to project details, and editing.  
It also includes session checks, empty-state UI for new users, and interactive navigation.

---

## 📥 Data Input

This component **does not receive props** for data by default.  
It fetches projects from the backend or uses pre-fetched projects passed through React Router's `location.state`.

### Sources of Data:
- **Backend API** – `/dashboard/by-type/:employeeId?employeeType=:employeeType`
- **React Router Location State** – `location.state.fetchedProjects`
- **Local Storage** – For `HOD`, `employeeId`, and `employeeType`

---

## 📤 Output (UI)

The component renders:

1. **Statistics Cards**
   - Total Projects
   - Active Projects
   - Inactive Projects

2. **Filters**
   - Filter by Department
   - Filter by Prism ID
   - Filter by Data Center
   - Reset filter option

3. **Projects Table**
   - Assets ID  
   - Prism ID  
   - Project Name (clickable link to details)  
   - HOD Name  
   - Department  
   - Status (Active / Expired / N/A)  
   - Audit Status  
   - Audit Expiry Date  
   - SSL/TLS Status  
   - SSL/TLS Expiry Date  
   - Edit button for each project

4. **Empty State**
   - Message when no projects exist
   - “Add Your First Project” button
   - Profile info (HOD, Employee ID)

5. **Conditional Views**
   - Add Project form (`MultiStepForm`)
   - Project Details view (`ProjectTabs`)

---

## ✅ Success Flow

1. On mount:
   - Check session validity via `/session-check`.
   - Fetch project data if not provided via `location.state`.
   - Populate statistics and table.

2. User can:
   - Apply filters → triggers API calls to `/dashboard/filter/...`.
   - Click project name → navigates to `/dashboard/viewProject/:projectName`.
   - Edit project → navigates to `/dashboard/EDITProject/:projectName`.
   - Add project → loads `MultiStepForm`.

---

## ❌ Error Handling

| Case | UI Behavior |
| :--- | :--- |
| **Session expired** | Show toast “Session expired. Please log in again.” and redirect to login page. |
| **Failed API request** | Show alert/toast with error message. |
| **No projects found** | Show empty-state card with “No Projects Yet” message and “Add Your First Project” button. |

---

## ⚙️ Internal Logic (for developers)

- **State Variables**
  - `projects` → all fetched projects
  - `filteredProjects` → filtered subset for table
  - `loading`, `error` → status tracking
  - `formToShow` → controls main content view
  - `selectedProject`, `editProjectData` → project detail/edit state
  - `filterType`, `filterValue` → filter selection and input

- **Hooks**
  - `useEffect` → 
    - Session check (interval every 30 minutes)
    - Fetch projects from API
    - Sync location state with `projects`
    - Reset `filteredProjects` when `projects` changes
  - `useNavigate`, `useLocation` for routing

- **Helper Functions**
  - `getFilterOptions(type)` → returns unique filter values
  - `formatDate(dateString)` → returns formatted date or `N/A`
  - `statusBadge(status)`, `auditBadge(auditStatus)`, `sslBadge(sslStatus)` → return CSS classes for badges
  - `handleProjectNameClick(projectName)` → navigate to project details
  - `handleEditProject(projectName)` → navigate to edit form
  - `handleAddProject()` → open add form

- **Filtering**
  - Filters trigger API calls with the pattern:
    ```
    /dashboard/filter/{filterType}/{filterValue}/employee/{employeeId}/employeeType/{employeeType}
    ```
  - For Prism ID search, uses direct input instead of select.

---

## Example User Flow

**Scenario: View and Edit Projects**
1. User logs in → Dashboard loads.
2. Dashboard shows statistics and full table.
3. User selects “Department” filter and chooses a department → Table updates via API.
4. User clicks a project name → Navigates to project details page.
5. User clicks “Edit” → Navigates to edit form with pre-filled data.
6. User saves changes → Redirects back to updated Dashboard.

---

## 🔗 Related Components
- `HeaderDashboard` → Top navigation bar  
- `SidebarDashboard` → Sidebar menu & navigation  
- `FooterDashboard` → Footer section  
- `MultiStepForm` → Add/Edit project form  
- `ProjectTabs` → Detailed project view with tabs  

---
