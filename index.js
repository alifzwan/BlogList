require('dotenv').config() // The dotenv package is used to read environment variables from a .env file.

const express = require('express')
const cors = require('cors') 
const Blog = require('./models/blog') 
const app = express()


app.use(express.static('dist')) // The express.static middleware is used to serve static files from the dist directory.
app.use(express.json()) // The express.json middleware is used to parse JSON payloads in the request body.
app.use(cors()) // The cors middleware is used to allow requests from all origins.

// requestLogger middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger) // The requestLogger middleware is used to log information about the requests that are made to the server.


// GET
app.get('/', (request, response) => { 
    response.send('<h1>Hello World!</h1>') // Send a response to the client
})

// GET
app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
        console.log(blogs)
    })
})

// GET
app.get('/api/blogs/:id', (request, response, next) => { 
    Blog.findById(request.params.id)
        .then(blog => {
            if(blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// DELETE
app.delete('/api/blogs/:id', (request, response, next) => { 
    Blog.findByIdAndDelete(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error))
})

// PUT
app.put('/api/blogs/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(
        request.params.id, 
        { title, author, url, likes }, 
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})


// POST
app.post('/api/blogs', (request, response, next) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const blog = new Blog({
      title : body.title,
      author: body.author,
      url   : body.url,
      likes : body.likes
    })
  
    blog.save()
        .then(savedblog => {
            response.json(savedblog)
        })
        .catch(error => next(error))
})






// unknownEndpoint middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ 
        error: 'unknown endpoint' 
    })
}

// errorHandler middleware
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if( error.name === 'CastError') {
        return response.status(400)
            .send({ 
                error: 'malformatted id' 
            })
    } else if (error.name === 'ValidationError'){
        return response.status(400)
            .json({ 
                error: error.message 
            })
    }
    next(error)
}

app.use(unknownEndpoint) // The unknownEndpoint middleware is used to catch requests made to unknown routes.
app.use(errorHandler) // The errorHandler middleware is used to catch errors in request handling.



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})