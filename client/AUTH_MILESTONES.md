# Milestones de Autenticação e RBAC (Front-end)

## 1. Verificar/ajustar o client.ts para usar as variáveis do .env
- Garantir que o Supabase client está inicializado corretamente com as variáveis de ambiente do projeto.
- Conferir se o arquivo `.env` contém as chaves SUPABASE_URL e SUPABASE_ANON_KEY.

## 2. Criar o AuthContext para login/logout, perfil e roles
- Implementar um contexto React para gerenciar autenticação, perfil e roles do usuário.
- Fornecer métodos para login, logout e acesso ao perfil/roles.

## 3. Implementar login/logout com Google
- Adicionar métodos de login/logout usando o provider Google do Supabase.
- Garantir redirecionamento e persistência de sessão.

## 4. Buscar perfil e roles do usuário após login
- Após autenticação, buscar os dados do perfil (tabela `profiles`) e roles (tabela `user_roles`).
- Armazenar essas informações no contexto para uso global.

## 5. Criar helpers/hooks de RBAC para uso nos componentes
- Implementar hooks/utilitários para verificar permissões do usuário (ex: podeEditarLoan, podeCriarLoan, etc).
- Usar os roles carregados para condicionar ações e exibição de componentes.

## 6. Adaptar UI para RBAC (menus, botões, rotas)
- Esconder/exibir menus, botões e rotas conforme as permissões do usuário.
- Garantir que apenas usuários autorizados possam acessar/editar recursos sensíveis.

---

**Observação:**
Detalhes mais complexos de permissão (ex: edição de loan só se for o criador e status permitir) serão analisados e implementados caso a caso durante a integração. 