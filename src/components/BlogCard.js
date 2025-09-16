import Link from 'next/link';

export default function BlogCard({ post }) {
  const getCategoryColor = (category) => {
    const colors = {
      'Lifestyle': 'from-pink-500 to-rose-500',
      'Technology': 'from-blue-500 to-cyan-500',
      'Travel': 'from-green-500 to-emerald-500',
      'Food': 'from-orange-500 to-red-500',
      'Health': 'from-purple-500 to-indigo-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 group">
      {post.featured_image && (
        <div className="relative">
          <div className="aspect-video w-full">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(post.category_name)} text-white shadow-lg`}>
            {post.category_name}
          </span>
          <time className="text-sm text-gray-500 font-medium">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {post.content}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">
                {post.author_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-700">
                {post.author_name}
              </span>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
          
          <Link href={`/posts/${post.id}`} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
