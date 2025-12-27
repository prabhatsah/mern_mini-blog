import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { BlogPost } from "../types/blog";

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogDetail({ post, onBack }: BlogDetailProps) {
  console.log("post:", post);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to articles</span>
        </button>

        <article className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div className="h-96 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-blue-600 text-blue-100 text-sm font-semibold rounded-full">{post.category}</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
