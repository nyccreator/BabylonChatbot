/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'babylon-green': '#79ae93',
				'babylon-blue-light': '#5991a1',
				'babylon-blue-dark': '#004258'
			},
			backgroundSize: {
				auto: 'auto',
				cover: 'cover',
				contain: 'contain',
				'50%': '50%',
				'30%': '30%',
				'25%': '25%'
			},
			spacing: {
				'1/50': '0.02%',
				'1/25': '0.04%',
				'1/16': '6.25%',
				'1/6': '17%',
				'1/5': '20%',
				'7/20': '35%',
				'50%': '50%',
				'91%': '91%',
				18: '4.5rem',
				44: '11rem', // 176px
				100: '25rem', // 400px
				120: '30rem', // 480px
				160: '40rem' // 640px
			},
			blur: {
				xs: '2px'
			},
			animation: {
				vote: 'vote 1.5s ease-in-out infinite',
				bounce: 'bounce 1s infinite'
			},
			keyframes: {
				vote: {
					'0%, 100%': {
						transform: 'rotate(-20deg)'
					},
					'50%': {
						transform: 'rotate(20deg)'
					}
				},
				bounce: {
					'0%, 100%': {
						transform: 'translateY(-100%)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
						opacity: '1'
					},
					'50%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
						opacity: '0.5'
					}
				}
			}
		}
	},
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'animation-delay': (value) => {
						return {
							'animation-delay': value
						}
					}
				},
				{
					values: theme('transitionDelay')
				}
			)
		})
	]
}
