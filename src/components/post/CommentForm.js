import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MarkedText from '../layout/MarkedText';

const CommentForm = ({
  addComment,
  currentUser,
  subreddit_id,
  post_id
}) => {
  const [ previewMarkdown, togglePreviewMarkdown ] = useState(false);
  const [ input, setInput ] = useState({
    content: ''
  });
  const { content } = input;

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    let user_id = currentUser.id;
    let newComment = {
      ...input,
      user_id,
      post_id,
      subreddit_id,
      parent_id: null
    }
    addComment(newComment);
    setInput({ content: '' })
  }
  return (
    <form className="post-form" onSubmit={event => handleSubmit(event)}>
      <button
        type="button"
        className="button is-info is-small mb-3"
        onClick={() => togglePreviewMarkdown(!previewMarkdown)}
      >
        {previewMarkdown ? 'Hide Preview' : 'Preview Description'}
      </button>

      <div className="field">
        <div className="control">
          {
            previewMarkdown ? (
              <div className="preview-markdown">
                <MarkedText>{content}</MarkedText>
              </div>
            ) : (
              <textarea
                className="textarea"
                placeholder="Comment"
                type="text"
                value={content}
                name="content"
                onChange={event => handleChange(event)}
              >
              </textarea>
            )
          }
        </div>
      </div>
      <div className="control">
        <button className="button is-primary">Comment</button>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  post_id: PropTypes.string,
  subreddit_id: PropTypes.string,
}

export default CommentForm;