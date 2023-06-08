/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ['Satoshi', 'sans-serif'],
				barlow: ['Barlow', 'sans-serif'],
			},
			colors: {
				'primary-orange': '#FF5924',
			},
		},
	},
	plugins: [],
};
