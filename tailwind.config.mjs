/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'clan': ['"FF Clan Pro"', 'sans-serif'],
			},
			colors: {
				base: {
					DEFAULT: '#1B252F',
					lighter: '#242F3B', // Blog post backgrounds
					darker: '#151D25',  // Navbar
					darkest: '#0F1519'  // Footer
				},
				primary: {
					DEFAULT: '#E91E63',
					dark: '#D81B60'
				},
				accent: '#1C7CFF',
				content: {
					DEFAULT: '#1C7CFF',
					light: '#ffffff'
				}
			},
			fontSize: {
				'hero': ['clamp(4rem, 6vw, 7rem)', {
					lineHeight: '1.05',
					letterSpacing: '-0.02em',
				}],
				'hero-sub': ['clamp(2.5rem, 4vw, 5rem)', {
					lineHeight: '1.2',
					letterSpacing: '0.05em',
				}],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
