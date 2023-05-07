module.exports.PORT = process.env.PORT
module.exports.HOST = process.env.HOST
module.exports.DB = process.env.MONGO_URL
module.exports.API_URL = process.env.API_URL
module.exports.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY
module.exports.JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY
module.exports.SMTP_HOST = process.env.SMTP_HOST
module.exports.SMTP_PORT = process.env.SMTP_PORT
module.exports.SMTP_USER = process.env.SMTP_USER
module.exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD

module.exports.AUTH_URL = process.env.NODE_ENV === 'dev' ? process.env.AUTH_URL_DEV : process.env.AUTH_URL
module.exports.CLIENT_URL = process.env.NODE_ENV === 'dev' ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL
