import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import CategoryFilter from "./components/CategoryFilter";
import MyBlogs from "./components/MyBlogs";
import OtherBlogs from "./components/OtherBlogs";
import BlogDetail from "./components/BlogDetail";
import { DbBlogPost } from "./types/blog";

function AppContent() {
  const { user, loading } = useAuth();
  const [selectedPost, setSelectedPost] = useState<DbBlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshTrigger] = useState(0);

  const categories = ["Development", "Design", "Architecture", "Trends", "Performance", "CSS"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (selectedPost) {
    return (
      <BlogDetail
        post={{
          id: parseInt(selectedPost.id),
          title: selectedPost.title,
          excerpt: selectedPost.excerpt,
          content: selectedPost.content,
          author: selectedPost.author_name,
          date: selectedPost.createdAt,
          category: selectedPost.category,
          readTime: selectedPost.read_time,
          image: selectedPost.image,
        }}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AuthenticatedHeader onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="space-y-12">
          <MyBlogs onSelectPost={setSelectedPost} refreshTrigger={refreshTrigger} />

          <div className="border-t border-gray-800 pt-12">
            <OtherBlogs
              onSelectPost={setSelectedPost}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
