const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()

const cors = require('cors') 
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MongoUrl)


mongoose.connect(config.MongoUrl)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })


app.use(cors()) // The cors middleware is used to allow requests from all origins.
app.use(express.static('dist')) // The express.static middleware is used to serve static files from the dist directory.
app.use(express.json()) // The express.json middleware is used to parse JSON payloads in the request body.
app.use(middleware.requestLogger) // The requestLogger middleware is used to log information about the requests that are made to the server.

app.use('/api/blogs', blogRouter) // The blogRouter middleware is used to handle requests made to the /api/blogs route.

app.use(middleware.unknownEndpoint) // The unknownEndpoint middleware is used to catch requests made to unknown routes.
app.use(middleware.errorHandler) // The errorHandler middleware is used to catch errors in request handling.

module.exports = app
