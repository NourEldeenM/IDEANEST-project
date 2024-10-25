require("dotenv").config();

export = {
	SERVER: {
		localPort: process.env.PORT ?? 8080,
	},
	DATABASE: {
		mongoDBUrl:
			process.env.MONGODB_URL,
	},
	ACCESS: {
		hashSaltRounds: process.env.HASH_SALT_ROUNDS,
	},
};
