import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import './PostForm.css';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      //1. get single post first
      const res = await API.get(`/posts/${id}`);
      setFormData({
        title: res.data.title,
        content: res.data.content
      });
    } catch (err) {
      toast.error('Failed to load post');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    const loadingToast = toast.loading('Updating your post...');

    try {
      //2. update post
      await API.put(`/posts/${id}`, formData);
      
      toast.update(loadingToast, {
        render: 'Post updated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      setTimeout(() => {navigate(`/post/${id}`);}, 1500);
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || 'Failed to update post',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading post..." />;
  }

  return (
    <div className="post-form-container">
      <h2>Edit Post</h2>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter post content"
            rows="6"
            required
            disabled={saving}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate(`/post/${id}`)} 
            className="cancel-btn"
            disabled={saving}
          >
            Cancel
          </button>
          <button type="submit" disabled={saving} className="submit-btn">
            {saving ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;