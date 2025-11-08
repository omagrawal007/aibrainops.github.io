import React, { useEffect, useState } from 'react';
import { getSortedPostsData, type PostMetadata } from '@/utils/loadPosts';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSEO } from '@/components/useSEO';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // SEO optimization for blog page
  useSEO({
    title: "AI & DevOps Blog - Expert Insights & Best Practices",
    description: "Explore our comprehensive collection of AI development, DevOps automation, and digital transformation insights. Expert articles on machine learning, cloud infrastructure, and automation.",
    url: "https://blog.smsidea.in/blog"
  });

  useEffect(() => {
    try {
      const postsData = getSortedPostsData();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
          AI & DevOps Insights
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Expert insights on AI development, DevOps automation, and digital transformation
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          
          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-600 dark:text-slate-400">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article key={index} className="group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="card p-6 h-full transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-slate-700 dark:hover:bg-slate-700">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-slate-700 bg-slate-100 rounded-full dark:bg-slate-600 dark:text-slate-200 mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-auto">
                    <time dateTime={post.date}>{moment(post.date).format("DD-MM-YYYY")}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">
            No articles found
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
