"use strict";
var _a, _b, _c;
require("dotenv").config();
module.exports = {
    SERVER: {
        localPort: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080,
    },
    DATABASE: {
        mongoDBUrl: (_b = process.env.MONGODB_URL) !== null && _b !== void 0 ? _b : "mongodb://localhost:27017/localDB",
    },
    ACCESS: {
        hashSaltRounds: (_c = process.env.HASH_SALT_ROUNDS) !== null && _c !== void 0 ? _c : 11,
    },
};
