import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Encode Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }], // 32px (reduzido de 64px)
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px (reduzido de 48px)
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px (reduzido de 40px)
        'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }], // 18px (reduzido de 36px)
        'h5': ['1rem', { lineHeight: '1.5', fontWeight: '500' }], // 14px (reduzido de 28px)
        'h6': ['0.9rem', { lineHeight: '1.5', fontWeight: '500' }], // 12px (reduzido de 24px)
        'body': ['0.8rem', { lineHeight: '1.6', fontWeight: '400' }], // 14px (reduzido de 16px)
        'small': ['0.7rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px (reduzido de 14px)
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2974FF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#3DFFEC",
          foreground: "#0C0C21",
        },
        destructive: {
          DEFAULT: "#EF4870",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F2F2F2B3",
          foreground: "#0F0F10",
        },
        accent: {
          DEFAULT: "#3DFFEC",
          foreground: "#0C0C21",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: {
          DEFAULT: "#3CFFB1",
          foreground: "#0C0C21",
        },
        warning: {
          DEFAULT: "#FFCD29",
          foreground: "#0C0C21",
        },
        info: {
          DEFAULT: "#2974FF",
          foreground: "#FFFFFF",
        },
        // Cores secundárias
        secondary1: "#3DFFEC",
        secondary2: "#0C0C21",
        secondary3: "#000229",
        secondary4: "#002068",
        // Cores neutras
        neutral: {
          50: "#F2F2F2",
          100: "#F2F2F2CC",
          200: "#F2F2F2B3",
          300: "#F2F2F21F",
          400: "#F2F2F20D",
          500: "#040406",
          600: "#0F0F10",
          700: "#17171C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
