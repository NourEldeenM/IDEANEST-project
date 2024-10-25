"use strict";
var _a;
require("dotenv").config();
module.exports = {
    SERVER: {
        localPort: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080,
    },
    DATABASE: {
        mongoDBUrl: process.env.MONGODB_URL,
    },
    ACCESS: {
        hashSaltRounds: process.env.HASH_SALT_ROUNDS,
    },
};
