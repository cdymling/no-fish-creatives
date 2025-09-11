import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				clash: ['Clash Grotesk', 'sans-serif'],
				space: ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'underwater-float': {
					'0%': { 
						transform: 'translateY(0px) translateZ(0px) rotateY(0deg) scale(1)',
					},
					'25%': { 
						transform: 'translateY(-3px) translateZ(15px) rotateY(1deg) scale(1.01)',
					},
					'50%': { 
						transform: 'translateY(-4px) translateZ(-8px) rotateY(-0.5deg) scale(0.99)',
					},
					'75%': { 
						transform: 'translateY(-2px) translateZ(12px) rotateY(0.8deg) scale(1.005)',
					},
					'100%': { 
						transform: 'translateY(0px) translateZ(0px) rotateY(0deg) scale(1)',
					}
				},
				'float-depth': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'25%': { transform: 'translateY(-4px) scale(1.02)' },
					'75%': { transform: 'translateY(-8px) scale(0.98)' }
				}
			},
				animation: {
					'accordion-down': 'accordion-down 0.2s ease-out',
					'accordion-up': 'accordion-up 0.2s ease-out',
					'float-gentle': 'float-gentle 4s ease-in-out infinite',
					'underwater-float': 'underwater-float 40s ease-in-out infinite',
					'float-1': 'float-gentle 4s ease-in-out infinite',
					'float-2': 'float-gentle 4s ease-in-out infinite 0.5s',
					'float-3': 'float-gentle 4s ease-in-out infinite 1s',
					'float-4': 'float-gentle 4s ease-in-out infinite 1.5s',
					'float-depth-1': 'float-depth 5s ease-in-out infinite',
					'float-depth-2': 'float-depth 5s ease-in-out infinite 0.8s',
					'float-depth-3': 'float-depth 5s ease-in-out infinite 1.6s',
					'float-depth-4': 'float-depth 5s ease-in-out infinite 2.4s'
				}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;