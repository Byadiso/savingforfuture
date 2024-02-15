import React from 'react'

function EditForm() {
  return (
  
       <div className="edit_blog_form hide" id="form_edit">
                <div className="close_overlay_button">
                  <h1>X</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  id="title_update"
                  placeholder="add title"
                />

                <textarea
                  type="text"
                  name="body"
                  id="body_update"
                  placeholder="Add your content here edit"
                ></textarea>

                <input
                  type="file"
                  name="image"
                  id="image_update"
                  placeholder="add image"
                />

                <input
                  className="addBlog add_blog_button"
                  type="submit"
                  value="Update Blog"
                  id="updateBlog"
                />
                <input
                  className="add_blog_button"
                  type="submit"
                  value="Cancel"
                  id="cancel_button"
                />
              </div>
   
  )
}

export default EditForm
