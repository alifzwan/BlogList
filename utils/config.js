require('dotenv').config() // The dotenv package is used to read environment variables from a .env file.

const mongoUrl = process.env.mongoUrl
const port = process.env.port

module.exports = {
    mongoUrl,
    port
}