import { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import BlogCard from "./BlogCard";
import CreateBlogModal from "./CreateBlogModal";
import axios from "axios";
import { DbBlogPost } from "../types/blog";

interface MyBlogsProps {
  onSelectPost: (post: DbBlogPost) => void;
  refreshTrigger: number;
}

export default function MyBlogs({ onSelectPost, refreshTrigger }: MyBlogsProps) {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios({ method: "get", url: `${apiUrl}/api/v1/blog`, withCredentials: true });

      setMyPosts(data.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user, refreshTrigger]);

  const handleDelete = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      // const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
      // if (error) throw error;
      fetchMyPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Blog Posts</h2>
          <p className="text-gray-400">Manage your published articles</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Post
        </button>
      </div>

      {myPosts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">You haven't created any blog posts yet.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPosts?.map((post) => (
            <div key={post.id} className="relative group">
              <BlogCard
                post={{
                  id: parseInt(post.id),
                  title: post.title,
                  excerpt: post.excerpt,
                  content: post.content,
                  author: post.author_name,
                  date: post.createdAt,
                  category: post.category,
                  readTime: post.read_time,
                  image: post.image,
                }}
                onClick={() => onSelectPost(post)}
              />
              {/* <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleDelete(post.id, e)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}

      {showCreateModal && <CreateBlogModal onClose={() => setShowCreateModal(false)} onSuccess={fetchMyPosts} />}
    </div>
  );
}
