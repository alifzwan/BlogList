import React from 'react'

const Blog = ({ blogs, onClick }) => {
  return (
    <div>
        <ul>
            {blogs.map(blog => 
                <div key={blog.id}>
                  <h3>{blog.title}</h3>
                  <a href={blog.url} target="_blank" rel="noopener noreferrer">Read Me</a>
                  <p>Author: <b>{blog.author}</b></p>
                  <button onClick={() => onClick(blog.id)}>Delete</button>
                </div>
            )}
        </ul>
    </div>
  )
}

export default Blog