# 🚀 Deploy ZKFinance no Netlify

## 📋 **Configuração de Variáveis de Ambiente**

### 🔐 **Variáveis Obrigatórias:**

No Netlify, vá em **Site Settings** → **Environment Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://tzpfzthlkuzeapftowxq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cGZ6dGhsa3V6ZWFwZnRvd3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDYyMTAsImV4cCI6MjA2MzAyMjIxMH0.k8EtG-y1jNG5y-CpCiQ3x8LdKNjQoFqUUH0rg_l-Sng` |

### ⚙️ **Configurações de Build:**

- **Base directory**: `client` (pasta do frontend com package.json próprio)
- **Build command**: `npm run build`
- **Publish directory**: `dist/spa`

### 🔗 **Variáveis Opcionais:**

| Variável | Descrição |
|----------|-----------|
| `VITE_AUTH_REDIRECT_URL` | URL de callback para autenticação OAuth |

---

## 📁 **Arquivos de Configuração:**

- **`netlify.toml`** - Configuração automática do Netlify
- **`netlify.env`** - Template com variáveis
- **`.env`** - Variáveis locais (não commitado)

---

## 🎯 **Após o Deploy:**

1. **Frontend**: Disponível em `https://seu-site.netlify.app`
2. **Backend**: Continua rodando localmente (porta 3001)
3. **API**: Conecta com servidor local

---

## 🔧 **Troubleshooting:**

### Erro: "Command failed with exit code 127"
- ✅ **RESOLVIDO**: Configuração corrigida no `netlify.toml`
- Base directory agora é `client` com package.json próprio para evitar timeout

### Erro: "Missing Supabase environment variables"
- Verifique se as variáveis estão configuradas no Netlify
- Confirme se os nomes começam com `VITE_`

### Erro: "Build failed"
- Verifique se o **Base directory** está como `client`
- Confirme se o **Publish directory** está como `dist/spa`

---

## 🚀 **Deploy Automático:**

Com o arquivo `netlify.toml` na raiz, o Netlify deve detectar automaticamente:
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist/spa`

---

*Documentação atualizada - Configuração corrigida* 