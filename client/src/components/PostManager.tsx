import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  created_at: string;
  image: string; // New image field
}

const PostManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');

        if (Array.isArray(res.data)) {
          setPosts(res.data);
          setError(null);
        } else {
          throw new Error("Invalid response format: Expected an array.");
        }
      } catch (err: any) {
        console.error(err);
        setPosts([]);
        setError('Unable to load posts.');
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete post.');
    }
  };

  return (
    <div className="bg-white dark:bg-black p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-white">Manage Posts</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-white border border-gray-700">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-4 py-2 border-r border-gray-700">#</th>
              <th className="px-4 py-2 border-r border-gray-700">Image</th>
              <th className="px-4 py-2 border-r border-gray-700">Title</th>
              <th className="px-4 py-2 border-r border-gray-700">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <FileText size={40} className="mb-2 text-gray-500" />
                    <p className="text-base">No posts available</p>
                    <p className="text-sm text-gray-500">Start by adding a new post.</p>
                  </div>
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr key={post.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.created_at}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostManager;
