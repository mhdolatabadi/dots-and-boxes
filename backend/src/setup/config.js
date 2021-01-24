import * as R from 'ramda'
import fse from 'fs-extra'

const production = process.env.NODE_ENV === 'production'

const defaultConfig = {
    server: {
        host: production ? 'localhost' : undefined, // all IPs
        port: 3000,
    },

}

const getLocalConfig = () => {
    try {
        const config = fse.readJsonSync(process.env.WEBLITE_CONFIG_PATH)[
            'نقطه‌بازی'
        ]
        if (!R.is(Object, config) || R.is(Array, config)) throw new TypeError()
        return config
    } catch (e) {
        return {}
    }
}

export default R.mergeDeepRight(defaultConfig, getLocalConfig())
