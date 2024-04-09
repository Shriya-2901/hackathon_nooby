import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, [postId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
