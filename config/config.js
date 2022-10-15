require('dotenv').config()

module.exports = {
	PORT: process.env.PORT || 8080,
	JWT_SECRET: process.env.JWT_SECRET,
	SENDER_EMAIL_API_KEY: process.env.SENDER_EMAIL_API_KEY,
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
}
