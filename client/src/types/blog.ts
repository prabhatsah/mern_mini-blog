export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface DbBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author_id: string;
  author_name: string;
  category: string;
  read_time: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
