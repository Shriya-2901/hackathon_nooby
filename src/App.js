import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import styles from './App.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data.slice(0, 10)); // Limit to 10 posts for brevity
      })
      .catch(error => console.error('There was an error fetching the posts!', error));
  };

  const addPost = (post) => {
    axios.post('https://jsonplaceholder.typicode.com/posts', post)
      .then(response => {
        setPosts([response.data, ...posts]);
      })
      .catch(error => console.error('There was an error creating the post!', error));
  };

  const updatePost = (id, updatedPost) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
      .then(() => {
        setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
      })
      .catch(error => console.error('There was an error updating the post!', error));
  };

  const deletePost = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error('There was an error deleting the post!', error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2>Welcome to the Post Manager</h2>
        <p>Here you can view, create, delete, and manage posts effortlessly.</p>
      </div>
      <PostForm submitPost={addPost} />
      <TransitionGroup component={null}>
        {posts.map(post => (
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
          >
            <div className={styles.post}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postBody}>{post.body}</p>
              <button onClick={() => deletePost(post.id)} className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <footer className={styles.footer}>
        Created by Shriya Shukla
      </footer>
    </div>
    
  );
};

export default App;
