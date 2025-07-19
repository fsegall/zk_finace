# Paleta de Cores - ZK Finance

## Cores Principais

### Primary
- **Primary**: `#2974FF` - Azul principal para ações e elementos de destaque
- **Primary Foreground**: `#FFFFFF` - Texto sobre fundo primary

### Secondary
- **Secondary**: `#3DFFEC` - Ciano para elementos secundários
- **Secondary Foreground**: `#0C0C21` - Texto sobre fundo secondary

## Cores Secundárias
- **Secondary1**: `#3DFFEC` - Ciano
- **Secondary2**: `#0C0C21` - Azul escuro
- **Secondary3**: `#000229` - Azul muito escuro
- **Secondary4**: `#002068` - Azul médio

## Cores de Status
- **Success**: `#3CFFB1` - Verde para sucesso
- **Warning**: `#FFCD29` - Amarelo para avisos
- **Destructive**: `#EF4870` - Vermelho para erros

## Cores Neutras
- **Neutral-50**: `#F2F2F2` - Branco
- **Neutral-100**: `#F2F2F2CC` - Branco com 80% opacidade
- **Neutral-200**: `#F2F2F2B3` - Branco com 70% opacidade
- **Neutral-300**: `#F2F2F21F` - Branco com 12% opacidade
- **Neutral-400**: `#F2F2F20D` - Branco com 5% opacidade
- **Neutral-500**: `#040406` - Preto muito escuro
- **Neutral-600**: `#0F0F10` - Preto escuro
- **Neutral-700**: `#17171C` - Cinza muito escuro

## Cores de Interface

### Background
- **Background**: `#0C0C21` - Fundo principal
- **Card**: `#17171C` - Fundo de cards
- **Popover**: `#17171C` - Fundo de popovers

### Texto
- **Foreground**: `#F2F2F2` - Texto principal
- **Card Foreground**: `#F2F2F2` - Texto em cards
- **Muted Foreground**: `#0F0F10` - Texto secundário

### Bordas e Inputs
- **Border**: `#F2F2F21F` - Bordas
- **Input**: `#F2F2F21F` - Campos de input
- **Ring**: `#2974FF` - Foco de elementos

### Sidebar
- **Sidebar Background**: `#000229` - Fundo da sidebar
- **Sidebar Foreground**: `#F2F2F2` - Texto da sidebar
- **Sidebar Primary**: `#2974FF` - Elementos primários da sidebar
- **Sidebar Accent**: `#002068` - Elementos de destaque da sidebar

## Como Usar

### Classes Tailwind
```tsx
// Cores principais
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>

// Cores de status
<div className="bg-success text-success-foreground">Success</div>
<div className="bg-warning text-warning-foreground">Warning</div>
<div className="bg-destructive text-destructive-foreground">Error</div>

// Cores neutras
<div className="bg-neutral-50">Branco</div>
<div className="bg-neutral-700">Cinza escuro</div>

// Cores secundárias
<div className="bg-secondary1">Ciano</div>
<div className="bg-secondary2">Azul escuro</div>
<div className="bg-secondary3">Azul muito escuro</div>
<div className="bg-secondary4">Azul médio</div>
```

### Variáveis CSS
```css
/* Usando variáveis CSS diretamente */
.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

## Aplicação

Esta paleta foi projetada para criar uma interface moderna e profissional, com:
- Alto contraste para acessibilidade
- Cores consistentes em toda a aplicação
- Hierarquia visual clara
- Suporte para temas escuros 