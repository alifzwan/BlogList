const mongoose = require ('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const title = process.argv[3]
const author = process.argv[4]
const url = process.argv[5]
const likes = process.argv[6]

const MongoUrl = 
`mongodb+srv://Blog:${password}@cluster0.0ovcfev.mongodb.net/?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(MongoUrl)


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
})

Blog.find({}).then(result => {
    if(result.length > 0){
        result.forEach(blog => {
            console.log(blog)
        })
    } else {
        console.log('No blogs found')
    }
    mongoose.connection.close()
})

// blog.save().then(result => {
//     console.log(`Blog saved: ${result}`)
//     mongoose.connection.close()
// })


