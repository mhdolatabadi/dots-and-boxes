const R = require('ramda')
const fse = require('fs-extra')

const production = process.env.NODE_ENV === 'production'

const defaultConfig = {
	server: {
		host: production ? 'localhost' : undefined, // all IPs
		port: 13797,
		origin: production
			? 'https://www.weblite.me:3000'
			: 'http://localhost:3000',
	},
}

const getLocalConfig = () => {
	try {
		const config = fse.readJsonSync(process.env.WEBLITE_CONFIG_PATH)[
			'dots-and-boxes'
		]
		if (!R.is(Object, config) || R.is(Array, config)) throw new TypeError()
		return config
	} catch (e) {
		return {}
	}
}

module.exports = R.mergeDeepRight(defaultConfig, getLocalConfig())
