import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, UploadCloud } from 'lucide-react';

const categories = ['All', 'Announcement', 'Technical', 'Tutorial', 'DeFi', 'NFT'];
const MAX_WORDS = 300;

const EditPostForm: React.FC = () => {
  const { id } = useParams(); // get blog post ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    date: '',
    readTime: '',
    category: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogposts/${id}`);
        const post = res.data;

        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date.slice(0, 10), // format YYYY-MM-DD
          readTime: post.read_time,
          category: post.category
        });

        setWordCount(post.excerpt.trim().split(/\s+/).length);
        setImagePreview(post.image_url);
      } catch (error) {
        console.error('Failed to load blog post', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    const count = words.filter(w => w !== '').length;

    setWordCount(count);
    setWordLimitExceeded(count > MAX_WORDS);
    setFormData(prev => ({ ...prev, excerpt: text }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordLimitExceeded) return;

    setLoading(true);
    setSuccess(false);

    try {
      const submission = new FormData();
      Object.entries(formData).forEach(([key, value]) => submission.append(key, value));
      if (imageFile) {
        submission.append('image', imageFile);
      }

      await axios.put(`http://localhost:5000/api/blogposts/${id}`, submission, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setTimeout(() => navigate('/blogs'), 2000); // redirect after success
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg min-h-screen flex justify-center items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
          ✏️ Edit Blog Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
          <InputField label="Read Time" name="readTime" value={formData.readTime} onChange={handleChange} placeholder="e.g., 5 min" />
          <InputField label="Author" name="author" value={formData.author} onChange={handleChange} />
          <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content (Max 300 words)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleExcerptChange}
              placeholder="Write your blog content here..."
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border ${wordLimitExceeded ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 resize-y`}
              required
            />
            <p className={`text-sm mt-1 ${wordLimitExceeded ? 'text-red-600' : 'text-gray-600'}`}>
              {wordCount} / {MAX_WORDS} words
              {wordLimitExceeded && ' — Word limit exceeded!'}
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover Image</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full sm:w-auto text-sm text-gray-800 bg-white border border-gray-300 px-4 py-2 rounded-lg"
              />
              <UploadCloud className="text-blue-500" />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full sm:w-64 h-48 object-cover rounded-lg border border-gray-300"
              />
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading || wordLimitExceeded}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : <>
                <Send size={20} />
                Update Blog Post
              </>}
            </button>
          </div>

          {/* Success */}
          {success && (
            <p className="text-center text-green-600 font-medium mt-4 animate-pulse">
              ✅ Blog post updated successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = ''
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      required
      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default EditPostForm;
