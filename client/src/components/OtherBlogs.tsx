import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlogCard from "./BlogCard";
import axios from "axios";
import { DbBlogPost } from "../types/blog";

interface OtherBlogsProps {
  onSelectPost: (post: DbBlogPost) => void;
  searchQuery: string;
  selectedCategory: string | null;
  refreshTrigger: number;
}

export default function OtherBlogs({ onSelectPost, searchQuery, selectedCategory, refreshTrigger }: OtherBlogsProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/blog/other`, { withCredentials: true });

        setPosts(data.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, refreshTrigger]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === null || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Community Blog Posts</h2>
        <p className="text-gray-400">Discover articles from other writers</p>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400">No blog posts found from other users.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
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
          ))}
        </div>
      )}
    </div>
  );
}
