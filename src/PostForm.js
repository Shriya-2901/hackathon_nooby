import React, { useState } from 'react';
import styles from './PostForm.module.css';
const PostForm = ({ submitPost }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: 1, // Static userId for example
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.title || !post.body) {
      alert('Please fill in all fields');
      return;
    }
    submitPost(post);
    setPost({ title: '', body: '', userId: 1 }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <div>
      <label className={styles.label}>Title</label>
      <input type="text" name="title" value={post.title} onChange={handleChange} className={styles.input} />
    </div>
    <div>
      <label className={styles.label}>Body</label>
      <textarea name="body" value={post.body} onChange={handleChange} className={styles.textarea}></textarea>
    </div>
    <button type="submit" className={styles.button}>Submit</button>
  </form>
  );
};

export default PostForm;
