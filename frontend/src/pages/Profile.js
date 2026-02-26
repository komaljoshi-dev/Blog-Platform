import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      console.log("fetching user posts");

      const res = await API.get("/posts/user/profile");
      setPosts(res.data);
    } 
    catch (err) {
      console.error(err.response);
      toast.error('Failed to load your posts');
    } 
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
    if (!confirmDelete) return;

    setDeletingId(postId);
    const loadingToast = toast.loading('Deleting post...');

    try {
      await API.delete(`/posts/${postId}`);
      
      setPosts(posts.filter(post => post._id !== postId));
      
      toast.update(loadingToast, {
        render: 'Post deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || 'Failed to delete post',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loading message="Loading your profile..." />;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="user-info">
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'N/A'}</p>
        </div>
      </div>

      <div className="my-posts">
        <div className="posts-header">
          <h2>My Posts ({posts.length})</h2>
          <Link to="/create" className="create-post-btn">+ Create New Post</Link>
        </div>
        
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>You haven't created any posts yet.</p>
            <Link to="/create" className="create-post-link-1">Create Your First Post</Link>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post._id} className="profile-post-card">
                <Link to={`/post/${post._id}`} className="post-link"><h3>{post.title}</h3></Link>
                <p className="post-excerpt">
                  {post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content}
                </p>
                <div className="post-footer">
                  <span className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <div className="post-actions">
                    <Link to={`/edit/${post._id}`} className="edit-link">Edit</Link>
                    <button 
                      onClick={() => handleDelete(post._id)} 
                      className="delete-btn-small"
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;