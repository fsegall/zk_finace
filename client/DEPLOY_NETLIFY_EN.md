# 🚀 Deploy ZKFinance to Netlify

## 📋 **Environment Variables Configuration**

### 🔐 **Required Variables:**

In Netlify, go to **Site Settings** → **Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://tzpfzthlkuzeapftowxq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cGZ6dGhsa3V6ZWFwZnRvd3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDYyMTAsImV4cCI6MjA2MzAyMjIxMH0.k8EtG-y1jNG5y-CpCiQ3x8LdKNjQoFqUUH0rg_l-Sng` |

### ⚙️ **Build Settings:**

- **Base directory**: `client` (frontend folder only)
- **Build command**: `npm run build`
- **Publish directory**: `dist/spa`

### 🔗 **Optional Variables:**

| Variable | Description |
|----------|-------------|
| `VITE_AUTH_REDIRECT_URL` | OAuth authentication callback URL |

---

## 📁 **Configuration Files:**

- **`netlify.toml`** - Automatic Netlify configuration
- **`netlify.env`** - Variables template
- **`.env`** - Local variables (not committed)

---

## 🎯 **After Deploy:**

1. **Frontend**: Available at `https://your-site.netlify.app`
2. **Backend**: Continues running locally (port 3001)
3. **API**: Connects to local server

---

## 🔧 **Troubleshooting:**

### Error: "Command failed with exit code 127"
- ✅ **RESOLVED**: Configuration fixed in `netlify.toml`
- Base directory is now `client` (frontend only) to avoid timeout

### Error: "Missing Supabase environment variables"
- Check if variables are configured in Netlify
- Confirm if names start with `VITE_`

### Error: "Build failed"
- Check if **Base directory** is set to `.`
- Confirm if **Publish directory** is set to `client/dist/spa`

---

## 🚀 **Automatic Deploy:**

With the `netlify.toml` file in the root, Netlify should automatically detect:
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist/spa`

---

*Updated documentation - Configuration fixed* 