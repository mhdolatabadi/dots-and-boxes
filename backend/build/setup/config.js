"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        var config = fse.readJsonSync(process.env.WEBLITE_CONFIG_PATH || '')['dots-and-boxes'];
        if (Array.isArray(config))
            throw new TypeError();
        return config;
    }
    catch (e) {
        return {};
    }
};
exports.default = __assign(__assign({}, defaultConfig), getLocalConfig());
