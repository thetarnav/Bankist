export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Bankist',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'shortcut icon', type: 'image/png', href: 'img/icon.png' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap',
			},
		],
		// script: [
		// 	{
		// 		src:
		// 			'https://www.gstatic.com/firebasejs/8.0.1/firebase-analytics.js',
		// 		async: true,
		// 		defer: true,
		// 	},
		// ],
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['@/assets/style.css'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: ['~/plugins/globalEvents.js', '~/plugins/directives.ts'],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/dotenv',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/firebase',
	],

	firebase: {
		config: {
			apiKey: process.env.FIREBASE_KEY,
			authDomain: `${process.env.FIREBASE_PROJECT}.firebaseapp.com`,
			databaseURL: `https://${process.env.FIREBASE_PROJECT}.firebaseio.com`,
			projectId: process.env.FIREBASE_PROJECT,
			storageBucket: `${process.env.FIREBASE_PROJECT}.appspot.com`,
			messagingSenderId: process.env.FIREBASE_SENDER,
			appId: process.env.FIREBASE_ID,
			measurementId: 'G-04WT9WBS76',
		},
		services: {
			auth: {
				initialize: {
					onAuthStateChangedAction: 'onAuthStateChanged',
				},
			},
			firestore: true,
			functions: true,
		},
		onFirebaseHosting: true,
		// lazy: true,
	},

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {},

	server: {
		port: 8080,
	},

	'vue-devtools': process.env.NODE_ENV !== 'production',
}
