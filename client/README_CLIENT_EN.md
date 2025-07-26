# 🖥️ `client/` Module — React Interface + Supabase

This module is the main user interface for the ZKFinance platform. It allows entrepreneurs to request financing through bids, investors to view opportunities, and everyone to interact with the system integrated with Supabase and RBAC.

---

## ⚙️ Technologies Used

- [React 18](https://reactjs.org/) with TypeScript
- [Vite](https://vitejs.dev/) for build and development
- [React Router DOM](https://reactrouter.com/) for navigation
- [React Query](https://tanstack.com/query/latest) for state management
- [ShadCN/UI](https://ui.shadcn.dev/) for design system
- [Supabase JS SDK](https://supabase.com/docs/guides/api) for authentication and database
- [TailwindCSS](https://tailwindcss.com/) for styling
- **Future**: Integration with Viem for Web3 and ZKVerify for proofs

---

## 📁 Structure

```
client/
├── components/          # UI Components (shadcn/ui)
│   └── ui/             # Base components (Button, Input, etc)
├── pages/              # Application pages
│   ├── Login.tsx       # Authentication
│   ├── Register.tsx    # Registration
│   ├── UserSelection.tsx # Role selection
│   ├── BorrowerDashboard.tsx # Entrepreneur dashboard
│   ├── InvestorDashboard.tsx # Investor dashboard
│   ├── AdminDashboard.tsx # Administrative dashboard
│   ├── BorrowerLances.tsx # Entrepreneur's bid list
│   ├── CreateLance.tsx # New bid creation
│   └── ...             # Other pages
├── hooks/              # Custom hooks
│   ├── useAuth.tsx     # Authentication hook
│   ├── useRBAC.tsx     # Access control hook
│   ├── useMyLoans.ts   # Hook to fetch loans
│   └── useCreateLoan.ts # Hook to create loans
├── contexts/           # Context providers
│   └── AuthContext.tsx # Authentication context
├── lib/                # Utilities
│   ├── utils.ts        # Helper functions
│   └── supabase/       # Supabase client
└── global.css          # Global styles
```

---

## 🧠 Main Flows

### Registration and Authentication
- User registers via email/password or Google OAuth
- Authentication is managed by Supabase Auth
- Profile is saved in the `profiles` table with default role
- Redirect to `/user-selection` after login

### Role Selection
- User chooses between Entrepreneur, Investor, or Admin
- Role is saved in the `user_roles` table
- Interface adapts to the selected role
- Navigation to specific dashboard

### Bid Creation (Entrepreneur)
- Multi-step form for loan request creation
- Data is saved in the `loans` table
- Client-side and server-side validation
- React Query integration for caching

### Opportunity Visualization (Investor)
- List of available bids
- Filters and search
- Details of each bid
- Prepared for future investment integration

---

## 🔗 Current Integrations

| Service         | Status | Description |
|----------------|--------|-------------|
| Supabase Auth   | ✅ **Active** | Authentication with email/password and Google |
| Supabase DB     | ✅ **Active** | PostgreSQL with RLS and migrations |
| React Query     | ✅ **Active** | Cache and state management |
| shadcn/ui       | ✅ **Active** | Modern UI components |
| MetaMask        | 🔄 **Prepared** | Wallet connection (UI ready) |

---

## 🔄 Future Integrations

| Service         | Status | Description |
|----------------|--------|-------------|
| Viem            | 🔄 **Planned** | Web3 interactions |
| zk-credit       | 🔄 **Planned** | ZK proof generation |
| ZKVerify        | 🔄 **Planned** | Verification via API |
| N8N             | 🔄 **Planned** | Credit analysis |

---

## 📦 Available Scripts

```bash
npm run dev         # Starts app locally (http://localhost:8080)
npm run build       # Production build
npm run preview     # Build preview
```

---

## 🔧 Configuration

### Environment Variables
The project expects a `.env` file in the root with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anonymous_key
```

### Database
Supabase migrations must be applied:
```bash
supabase db push
```

---

## 🎨 Design System

### Themes
- **Dark/Light Mode** with automatic toggle
- **Consistent colors** using CSS variables
- **Optimized contrasts** for accessibility

### Components
- **shadcn/ui** for base components
- **Tailwind CSS** for customization
- **Complete responsiveness**

---

## 🔐 Authentication and RBAC

### Available Roles
- `admin` - Complete system access
- `lender` - Investor/Financier
- `borrower` - Entrepreneur/Applicant
- `moderator` - Content moderator
- `user` - Basic user
- `visitor` - Limited access

### Access Control
- **useRBAC** hook for permission verification
- **RLS** in Supabase for server-side security
- **Automatic redirection** based on role

---

## 📱 Main Pages

### Authentication
- `/login` - Login with email/password and Google
- `/register` - New user registration
- `/user-selection` - Role selection after login

### Dashboards
- `/borrower/dashboard` - Entrepreneur dashboard
- `/investor/dashboard` - Investor dashboard
- `/admin` - Administrative dashboard

### Features
- `/borrower/lances` - User's bid list
- `/borrower/create-lance` - New bid creation
- `/investor/ranking` - Investor ranking
- `/investor/contributions` - Investor contributions

### Utilities
- `/settings` - User settings
- `/wallet` - Wallet management
- `/support` - User support

---

## 🧪 Development

### Hot Module Replacement (HMR)
The project uses Vite with active HMR for fast development.

### TypeScript
Complete types for Supabase and UI components.

### Linting
ESLint configured for React and TypeScript.

---

## 📌 Notes

- The system is prepared for future Web3 integration
- Example data (mock) is used for demonstration
- MetaMask authentication is prepared but not implemented
- The ZK proof system will be integrated in future modules

---

## 🔒 Privacy

- Sensitive data is protected by RLS
- Secure authentication via Supabase
- Prepared for ZK proofs for privacy preservation

---

> Developed as part of ZKFinance by Felipe Segall 