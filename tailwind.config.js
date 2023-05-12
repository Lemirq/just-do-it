/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'media',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				rubik: ['Rubik', 'sans-serif'],
			},
			screens: {
				standalone: { raw: '(display-mode: standalone)' },
				xs: '480px',
			},
			colors: {
				important: { raw: '!important' },
			},
		},
	},
	plugins: [],
};
