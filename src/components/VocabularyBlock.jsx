import React from 'react'
import { FaTrash } from 'react-icons/fa'

function VocabularyBlock(props) {
  return (
    <div className="vocabulary_box">
    <div id="header_vocabulary">
      <u>
        <h4
          className="vocabulary_header"
          data-word={props.header}
          style={{color: 'black'}}
        >
          {props.header}
        </h4>{" "}
      </u>
      <FaTrash
        className="fa fa-trash deleteButton"
        data-uid={props.uid}
      />
    </div>
    <p className="vocabulary_paragraph">{props.content}</p>
  </div>
  )
}

export default VocabularyBlock