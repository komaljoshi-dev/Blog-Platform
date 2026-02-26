import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import './SinglePost.css';

const SinglePost = () => {
  const { id } = useParams(); // get post id from url
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // get logged-in user

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      //1. fetches single post
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } 
    catch (err) {
      toast.error('Post not found');
      navigate('/');
    } 
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // Show confirmation toast
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
    if (!confirmDelete) return;

    setDeleting(true);
    const loadingToast = toast.loading('Deleting post...');

    try {
      //2. deletes post 
      await API.delete(`/posts/${id}`);
      
      toast.update(loadingToast, {
        render: 'Post deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      setTimeout(() => {navigate("/");}, 1500);
    } 
    catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || 'Failed to delete post',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setDeleting(false);
    }
  };

  //check for ownership
  const isOwner = (() => {
    if (!user || !post || !post.user) return false;
    
    const currentUserId = String(user.id || user._id);
    const postUserId = String(post.user._id || post.user);
    
    return currentUserId === postUserId;
  })();

  console.log(isOwner);

  if (loading) return <Loading message="Loading post..." />;

  return (
    <div className="single-post-container">
      <article className="post-content">
        <h1>{post.title}</h1>
        
        <div className="post-metadata">
          <span className="post-author">By {post.user?.username || "unkmown"}</span>
          <span className="post-date">
            Posted on {new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}          
            </span>
        </div>

        <div className="post-body">
          <p>{post.content}</p>
        </div>

{/* checking ownership for deletion and editing*/}
        {isOwner && (
          <div className="post-actions">
            <button 
              onClick={() => navigate(`/edit/${id}`)} 
              className="edit-btn"
              disabled={deleting}
            >
              Edit Post
            </button>
            <button 
              onClick={handleDelete} 
              className="delete-btn"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Post'}
            </button>
          </div>
        )}
      </article>
    </div>
  );
};

export default SinglePost;