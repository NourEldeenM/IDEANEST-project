require("dotenv").config();

export = {
	SERVER: {
		localPort: process.env.PORT ?? 8080,
	},
	DATABASE: {
		mongoDBUrl:
			process.env.MONGODB_URL ?? "mongodb://localhost:27017/localDB",
	},
	ACCESS: {
		hashSaltRounds: process.env.HASH_SALT_ROUNDS ?? 11,
	},
};
