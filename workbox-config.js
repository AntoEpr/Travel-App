module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,css,js,txt}'
	],
	swDest: 'dist/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};