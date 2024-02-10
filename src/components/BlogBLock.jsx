import React from "react";
import "../Style/Blogs.css";

function BlogBLock(props) {
  function firstSentence(text) {
    // var sentenceRegex = /[\.!\?]+/g;
    var sentenceRegex = /^[^.!?]*[.!?]/;
    var sentences = text.match(sentenceRegex);
    return sentences[0];
  }
  return (
    <div className="blog_image blog" data-id={props.uid_key}>
      <img src={props.Image} alt="blog pictures blog" data-id={props.uid_key} />

      <h3 className="blog" data-id={props.uid_key}>
        {props.title}
      </h3>
      <p className="blog" data-id={props.uid_key}>
        {firstSentence(props.body)}
      </p>
      <button data-id={props.uid_key} className="readme_button blog">
        Read more
      </button>
    </div>
  )
}

export default BlogBLock;
