# Authentication and RBAC Milestones (Front-end)

## 1. Verify/adjust client.ts to use .env variables
- Ensure that the Supabase client is properly initialized with the project's environment variables.
- Check if the `.env` file contains the SUPABASE_URL and SUPABASE_ANON_KEY keys.

## 2. Create AuthContext for login/logout, profile and roles
- Implement a React context to manage user authentication, profile, and roles.
- Provide methods for login, logout, and access to profile/roles.

## 3. Implement login/logout with Google
- Add login/logout methods using Supabase's Google provider.
- Ensure redirect and session persistence.

## 4. Fetch user profile and roles after login
- After authentication, fetch profile data (from `profiles` table) and roles (from `user_roles` table).
- Store this information in the context for global use.

## 5. Create RBAC helpers/hooks for use in components
- Implement hooks/utilities to check user permissions (e.g., canEditLoan, canCreateLoan, etc.).
- Use loaded roles to condition actions and component display.

## 6. Adapt UI for RBAC (menus, buttons, routes)
- Hide/show menus, buttons, and routes according to user permissions.
- Ensure that only authorized users can access/edit sensitive resources.

---

**Note:**
More complex permission details (e.g., loan editing only if creator and status allows) will be analyzed and implemented case by case during integration. 