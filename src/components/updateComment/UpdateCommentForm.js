import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateComment } from '../../actions/comments';

const UpdateCommentForm = ({
  comment_id,
  oldContent,
  toggleUpdateForm,
  updateComment,
}) => {
  const [ input, setInput ] = useState({
    content: oldContent
  });
  const { content } = input;

  const handleChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = event => {
    event.preventDefault();
    let updatedComment = {
      content,
      id: comment_id
    }
    updateComment(updatedComment);
    toggleUpdateForm(false);
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            name="content"
            value={content}
            placeholder="Comment"
            onChange={event => handleChange(event)}
          ></textarea>
        </div>
      </div>
      <div className="control">
        <button className="button is-primary is-small">Update</button>
      </div>
    </form>
  )
}

UpdateCommentForm.propTypes = {
  updateComment: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    updateComment
  }
)(UpdateCommentForm);