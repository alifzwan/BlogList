import React from 'react'

const BlogForm = ({onSubmit, titleValue, authorValue, urlValue, likeValue, titleChange, authorChange, urlChange, likeChange}) => {
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div>
                Title: <input value={titleValue} onChange={titleChange} />
            </div>
            <div>
                Author: <input value={authorValue} onChange={authorChange} />
            </div>
            <div>
                Url: <input value={urlValue} onChange={urlChange} />
            </div>
            <div>
                Likes: <input value={likeValue} onChange={likeChange} />
            </div>
            <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm