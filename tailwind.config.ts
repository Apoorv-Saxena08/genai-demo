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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
        // Custom modern colors for Artisan Muse - New Color Palette
        palette: {
          yellow: "#E9D758",
          teal: "#297373", 
          coral: "#FC9265",
          peach: "#F4AA8A",
          lightGray: "#E6E6E6",
          darkGray: "#39393A",
        },
        // Legacy earthy colors for Artisan Muse - Light theme optimized
        earth: {
          50: "hsl(35 50% 98%)",
          100: "hsl(35 40% 95%)",
          200: "hsl(30 35% 85%)",
          300: "hsl(25 30% 75%)",
          400: "hsl(20 25% 65%)",
          500: "hsl(18 85% 55%)", // Primary terra cotta
          600: "hsl(15 80% 48%)",
          700: "hsl(12 75% 40%)",
          800: "hsl(10 70% 30%)",
          900: "hsl(8 65% 20%)",
        },
        clay: {
          50: "hsl(25 30% 98%)",
          100: "hsl(25 25% 92%)",
          200: "hsl(25 20% 82%)",
          300: "hsl(25 15% 72%)",
          400: "hsl(25 15% 62%)",
          500: "hsl(25 35% 35%)", // Secondary brown
          600: "hsl(25 40% 28%)",
          700: "hsl(25 45% 22%)",
          800: "hsl(25 50% 16%)",
          900: "hsl(25 55% 10%)",
        },
        gold: {
          50: "hsl(42 95% 98%)",
          100: "hsl(42 90% 92%)",
          200: "hsl(42 85% 82%)",
          300: "hsl(42 88% 68%)", // Accent gold
          400: "hsl(42 80% 60%)",
          500: "hsl(42 75% 50%)",
          600: "hsl(42 70% 42%)",
          700: "hsl(42 65% 35%)",
          800: "hsl(42 60% 25%)",
          900: "hsl(42 55% 15%)",
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
