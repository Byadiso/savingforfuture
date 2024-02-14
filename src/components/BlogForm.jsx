import React from 'react'

function BlogForm() {
  return (
    <div>
         <div className="dashboard_item_rigt " id="from_edit">
                <div className="add_blog edit_modal" id="form_blog">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="add title"
                  />

                  <textarea
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Add your content here"
                  ></textarea>

                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="add image"
                  />

                  <input
                    className="addBlog add_blog_button"
                    type="submit"
                    value="Update Blog"
                    id="updateBlog"
                  />
                </div>
              </div>
    </div>
  )
}

export default BlogForm