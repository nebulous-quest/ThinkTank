import Navbar from '@/components/Navbar';
import { headers } from 'next/headers';

async function fetchPost(id) {
  const h = headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const protocol = h.get('x-forwarded-proto') || 'http';
  const base = `${protocol}://${host}`;
  const res = await fetch(`${base}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.post;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) {
    return { title: 'Post not found - ThinkTank' };
  }
  return { title: `${post.title} - ThinkTank`, description: post.content?.slice(0, 140) };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white/80 rounded-2xl p-8 text-center">Post not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full h-80 object-cover" />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                {post.category_name}
              </span>
              <time className="text-sm text-gray-500 font-medium">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">{post.author_name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{post.author_name}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
