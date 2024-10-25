require("dotenv").config();

export = {
	SERVER: {
		localPort: process.env.PORT ?? 8080,
	},
	DATABASE: {
		mongoDBUrl: process.env.MONGODB_URL ?? "mongodb://localhost:27017",
	},
	ACCESS: {
		hashSaltRounds: process.env.HASH_SALT_ROUNDS ?? "11",
		jwt: process.env.JWT_SECRET ?? "secret",
	},
};
