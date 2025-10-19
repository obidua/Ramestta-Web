import React, { useState } from 'react';
import axios from 'axios';
import { Send, UploadCloud, ImageIcon, Calendar, Clock, User, Tag, FileText, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Announcement', 'Technical', 'Tutorial', 'DeFi', 'NFT'];
const MAX_WORDS = 300;

const BlogPost: React.FC = () => {
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
      if (imageFile) submission.append('image', imageFile);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setFormData({
        title: '',
        excerpt: '',
        author: '',
        date: '',
        readTime: '',
        category: ''
      });
      setImageFile(null);
      setImagePreview(null);
      setWordCount(0);
      setWordLimitExceeded(false);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center text-slate-400 hover:text-white transition-all duration-300 mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Login</span>
          </button> */}

          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">Content Creation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Create Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Blog Post
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Share your insights and knowledge with the blockchain community.
            Create engaging content that drives innovation forward.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 shadow-2xl">
          {/* Gradient Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-3xl"></div>

          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-10" encType="multipart/form-data">
              {/* Title */}
              <InputField
                label="Post Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                icon={FileText}
                placeholder="Enter an engaging title that captures your audience"
              />

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Author */}
                <InputField
                  label="Author Name"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Your full name"
                />

                {/* Read Time */}
                <InputField
                  label="Estimated Read Time"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  icon={Clock}
                  placeholder="e.g., 5 min read"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Date */}
                <InputField
                  label="Publication Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  icon={Calendar}
                  type="date"
                />

                {/* Category */}
                <div>
                  <label htmlFor="category" className="flex items-center text-sm font-semibold text-slate-300 mb-4">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  >
                    <option value="" disabled className="bg-slate-800">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="excerpt" className="flex items-center justify-between text-sm font-semibold text-slate-300 mb-4">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Blog Content
                  </div>
                  <span className="text-xs text-slate-500">Max {MAX_WORDS} words</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleExcerptChange}
                  placeholder="Write your blog content here... Share your insights, experiences, and knowledge with the blockchain community. What unique perspective can you offer?"
                  rows={10}
                  className={`w-full px-4 py-4 bg-slate-900/50 border ${wordLimitExceeded ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600/50 focus:ring-blue-500/50'
                    } rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:border-blue-500/50 transition-all duration-200 resize-y`}
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <p className={`text-sm font-medium ${wordLimitExceeded ? 'text-red-400' : 'text-slate-400'}`}>
                    {wordCount} / {MAX_WORDS} words
                    {wordLimitExceeded && ' — Please reduce word count'}
                  </p>
                  <div className="w-32 bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${wordLimitExceeded ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        }`}
                      style={{ width: `${Math.min((wordCount / MAX_WORDS) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-300 mb-4">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center hover:border-slate-500/50 transition-all duration-300 bg-slate-900/30">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-6">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-64 object-cover rounded-xl mx-auto border border-slate-600/50 shadow-lg"
                        />
                        <p className="text-slate-400 text-sm font-medium">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto">
                          <UploadCloud className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg mb-2">Upload cover image</p>
                          <p className="text-slate-400 mb-4">Drag and drop your image here, or click to browse</p>
                          <p className="text-slate-500 text-sm">PNG, JPG, GIF up to 10MB • Recommended: 1200x630px</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading || wordLimitExceeded}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-5 rounded-xl flex justify-center items-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Publishing your post...
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Publish Blog Post
                      <Zap className="w-4 h-4 opacity-70" />
                    </>
                  )}
                </button>
              </div>

              {/* Success Message */}
              {success && (
                <div className="relative bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-green-400 font-bold text-xl mb-2">
                      🎉 Blog post published successfully!
                    </p>
                    <p className="text-green-300/80">
                      Your content has been submitted and will be reviewed by our team shortly.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
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
  placeholder = '',
  icon: Icon
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div>
    <label htmlFor={name} className="flex items-center text-sm font-semibold text-slate-300 mb-4">
      <Icon className="w-4 h-4 mr-2" />
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
      className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
    />
  </div>
);

export default BlogPost;