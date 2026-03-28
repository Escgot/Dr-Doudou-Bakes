/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#834731",
          dark: "#6D3B29",
          light: "#9A5A43",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E9B47B",
          light: "#DB9E9F",
          foreground: "#834731",
        },
        cream: {
          DEFAULT: "#FEF6ED",
          dark: "#F3CAC5",
        },
        accent: {
          DEFAULT: "#BA7B63",
          light: "#F3CAC5",
          foreground: "#FFFFFF",
          green: "#BA7B63",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#6B5B5B",
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
        inputBg: "#FEF6ED",
        borderColor: "#F3CAC5",
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        brand: ['"Libre Baskerville"', 'serif'],
        arabicMain: ['"Aref Ruqaa"', 'serif'],
        arabicSecondary: ['"Cairo"', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2' }],
        'section': ['42px', { lineHeight: '1.3' }],
        'subsection': ['32px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "steam": {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "0.6" },
          "50%": { transform: "translateY(-50px) scaleX(1.2)", opacity: "0.2" },
          "100%": { transform: "translateY(-100px) scaleX(1.5)", opacity: "0" },
        },
        "dust": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-100px) translateX(20px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "steam": "steam 6s linear infinite",
        "dust": "dust 8s linear infinite",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
