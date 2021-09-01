"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = __importStar(require("ramda"));
var fse = __importStar(require("fs-extra"));
var production = process.env.NODE_ENV === 'production';
var defaultConfig = {
    server: {
        host: production ? 'localhost' : undefined,
        port: 13797,
        origin: production
            ? 'https://www.weblite.me:3000'
            : 'http://localhost:3000',
    },
};
var getLocalConfig = function () {
    try {
        var config = fse.readJsonSync(process.env.WEBLITE_CONFIG_PATH)['dots-and-boxes'];
        if (!R.is(Object, config) || R.is(Array, config))
            throw new TypeError();
        return config;
    }
    catch (e) {
        return {};
    }
};
exports.default = R.mergeDeepRight(defaultConfig, getLocalConfig());
