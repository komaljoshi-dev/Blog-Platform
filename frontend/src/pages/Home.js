import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading posts..." />;

  return (
    <div className="home-container">
      <h1>Latest Blog Posts</h1>

      {posts.length === 0 ? (
        
        //initially check for post length if no post provide link to ctreate one and if posts are present then shaow them
        <div className="no-posts">
          <p className="no-post-msg">No posts yet. Be the first to create a post!</p>
          <Link to="/create" className="create-post-link">Create Post</Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <Link to={`/post/${post._id}`} className="post-link">
                <h3 className="post-title">{post.title}</h3>
              </Link>
              <p className="post-content">
                {post.content.length > 150 
                  ? `${post.content.substring(0, 150)}...` 
                  : post.content}
              </p>
              <div className="post-meta">
                <span className="post-author">By {post.user?.username || 'Unknown'}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;