import React, {useEffect, useState} from 'react'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const showMessage = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showError = (error) => {
    setError(error)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  useEffect(() => {
    console.log('Effect')
    blogsService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  console.log('render', blogs.length, 'blogs')

  

  const addBlog = (event) => {
    event.preventDefault()
    blogsService
      .create({ title: newTitle, author: newAuthor, url: newUrl, likes: newLikes })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showMessage(`Added ${newTitle} by ${newAuthor}`)
      })
    setNewAuthor()
    setNewTitle()
    setNewUrl()
    setNewLikes()
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog)
    if (blog){
      const result = window.confirm(`Delete ${blog.author}?`)
      if (result) {
        blogsService
          .remove(id)
          .then(response => {
            setBlogs(blogs.filter(blog => blog.id !== id))
          })
      }
    }
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setNewLikes(event.target.value)
  }
  
  
  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={notification} error={error}/>

      <h2>Add new blog</h2>
      <BlogForm 
        onSubmit={addBlog} 
        titleValue={newTitle}
        authorValue={newAuthor}
        urlValue={newUrl}
        likeValue={newLikes}

        titleChange={handleTitleChange}
        authorChange={handleAuthorChange}
        urlChange={handleUrlChange}
        likeChange={handleLikesChange}
      />

      <h2>Blogs</h2>
      <Blog blogs={blogs} onClick={deleteBlog}/>
    </div>
  )
}

export default App