'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BlogCard from '@/components/BlogCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async (category = '') => {
    try {
      setLoading(true);
      const url = category ? `/api/posts?category=${category}` : '/api/posts';
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    fetchPosts(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-3xl font-bold text-white">T</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Welcome to ThinkTank
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                Share your thoughts, ideas, and stories with the world. Connect with like-minded people and discover amazing content.
              </p>
              <div className="flex justify-center">
                <a href="#posts" className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 transform hover:scale-105 border border-white/30">
                  Start Reading
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Category Filter */}
        <div id="posts" className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">All Posts</h2>
            <p className="text-gray-600">Discover content that interests you</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
              }`}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.name)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-500"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto h-24 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No posts found</h3>
              <p className="text-gray-600 text-lg mb-8">
                {selectedCategory 
                  ? `No posts in the ${selectedCategory} category yet.`
                  : 'No blog posts have been published yet.'
                }
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                Be the first to post!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
