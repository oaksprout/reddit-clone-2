import {
  ADD_COMMENT
} from './types';
import db from '../db';
import firebase from '../firebase';

export const addComment = body => async dispatch => {
  // Create an ID for the comment
  let newDoc = db.collection('comments').doc();

  // Create the newComment to be sent to the database
  let newComment = {...body};
  newComment.id = newDoc.id;
  newComment.created_at = firebase.firestore.FieldValue.serverTimestamp();
  newComment.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await db.collection('comments').doc(newComment.id).set(newComment);
    dispatch({
      type: ADD_COMMENT,
      payload: newComment
    });
  } catch (error) {
    console.error(error.message);
  }
}