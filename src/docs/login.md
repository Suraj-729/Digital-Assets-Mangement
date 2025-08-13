# 🔐 Login Page (Frontend)

---

## 📂 Component
**File:** `LoginPage.jsx`

---

## 📜 Overview
The **Login Page** is the entry point for users to access the system.  
It allows users to:
- Enter their **Employee ID** and **Password**
- Authenticate via the backend API
- Save session data locally
- Navigate to the **Dashboard** after successful login
- Access the **Change Password** page

---

## 📥 Inputs

This component accepts **one optional prop**:

| Prop Name | Type     | Description |
|-----------|----------|-------------|
| `onLogin` | Function | Callback triggered after successful login, passing the logged-in user object. |

---

## 📤 Data Sources & Storage

**Data comes from:**
1. **User Input** – Employee ID & Password
2. **React Router Location State** – May contain `employeeId` and `employeeType`
3. **Backend API** – `POST /users/login`
4. **Local Storage** – Used to store:
   - `isAuthenticated`
   - `userId`
   - `employeeId`
   - `employeeType`
   - `HOD`

---

## 🖥️ What It Displays

### 1️⃣ Branding
- **AssetsIQ logo** at the top

### 2️⃣ Login Form
- **Employee ID** input
- **Password** input
- **Change Password?** link button
- **Login** button

### 3️⃣ Footer
- **NIC Logo**
- Copyright

---

## ✅ Success Flow

1. User fills **Employee ID** & **Password** → clicks **Login**.
2. Frontend validates:
   - Both fields must be filled (toast error if empty).
3. Sends `POST /users/login` with:
   ```json
   { "loginId": "<employeeId>", "password": "<password>" }
