import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostData, getSortedPostsData, type PostMetadata } from '@/utils/loadPosts';
import { useSEO } from '@/components/useSEO';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  // SEO optimization for blog post - called at top level
  useSEO({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || post?.description || 'AI and DevOps insights',
    image: post?.image || `https://blog.smsidea.in/images/blog/${slug}.png`,
    url: `https://blog.smsidea.in/blog/${slug}`,
    type: 'article',
    author: post?.author || 'AI Agency',
    publishedTime: post?.date,
    modifiedTime: post?.lastModified || post?.date,
    keywords: post?.keywords || 'AI development, DevOps, automation, technology',
    category: post?.category
  });

  useEffect(() => {
    if (slug) {
      try {
        const postData = getPostData(slug);
        setPost(postData);
        
        // Get related posts from the same category
        const allPosts = getSortedPostsData();
        const related = allPosts
          .filter(p => p.category === postData.category && p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setLoading(false);
      }
    }
  }, [slug]);



  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">→</span>
        <Link to="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">→</span>
        <span>{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {post.excerpt || post.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <time dateTime={post.date}>
            {moment(post.date).format("MMMM DD, YYYY")}
          </time>
          <span className="mx-2">•</span>
          <span>{post.readTime || '5 min read'}</span>
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </>
          )}
        </div>
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, require('rehype-raw')]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-4 mt-8" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-3 mt-6" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-6" {...props} />
            ),
            code: ({node, inline, ...props}) => 
              inline ? (
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
              ) : (
                <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props} />
              ),
            pre: ({node, ...props}) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
            img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg my-6" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {(Array.isArray(post.tags) ? post.tags : []).map((tag: string, index: number) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
         
         <div className="flex justify-between items-center">
           <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
             ← Back to Blog
           </Link>
           <div className="flex space-x-4">
             <button 
               onClick={() => window.print()}
               className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
             >
               📄 Print
             </button>
             <button 
               onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
               className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
             >
               📤 Share
             </button>
           </div>
         </div>
      </footer>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Link 
                key={index} 
                to={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <article className="card p-6 h-full transition-all duration-300 hover:shadow-lg dark:hover:bg-gray-700">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-3">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <time dateTime={relatedPost.date}>
                      {moment(relatedPost.date).format("MMM DD, YYYY")}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPostPage;
