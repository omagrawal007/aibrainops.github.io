import { getSortedPostsData, type PostMetadata } from '@/utils/loadPosts';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/components/useSEO';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  
  // SEO optimization for homepage
  useSEO({
    title: "AI & DevOps Services - Expert Development & Automation Solutions",
    description: "Leading AI Agency providing cutting-edge AI development, DevOps automation, and digital transformation services. Expert insights on AI, machine learning, automation, and cloud infrastructure.",
    url: "https://blog.smsidea.in/"
  });
  
  useEffect(() => {
    try {
      const postsData = getSortedPostsData();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50">
            AI & DevOps Development Services
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Expert AI development, DevOps automation, and digital transformation services. 
            We help businesses leverage cutting-edge technology for competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/blog" className="btn bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              Read Our Insights
            </Link>
            <a href="#services" className="btn btn-outline border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-50">
            Our AI & DevOps Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 h-full border border-slate-200 dark:border-slate-700">
              <div className="text-slate-600 dark:text-slate-400 text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-50">AI Development</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Custom AI solutions, machine learning models, and intelligent automation systems 
                tailored to your business needs.
              </p>
            </div>
            <div className="card p-6 h-full border border-slate-200 dark:border-slate-700">
              <div className="text-slate-600 dark:text-slate-400 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-50">DevOps Automation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                CI/CD pipelines, infrastructure as code, cloud deployment, and automated 
                testing for faster, reliable software delivery.
              </p>
            </div>
            <div className="card p-6 h-full border border-slate-200 dark:border-slate-700">
              <div className="text-slate-600 dark:text-slate-400 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-50">Digital Transformation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                End-to-end digital transformation consulting, helping businesses modernize 
                their technology stack and processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-slate-50">
            Latest AI & DevOps Insights
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Stay updated with the latest trends, best practices, and expert insights in AI development and DevOps automation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, index) => (
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
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog" className="btn btn-outline border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default HomePage;
