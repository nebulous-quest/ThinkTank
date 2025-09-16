import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ThinkTank
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600 max-w-sm">
              Share your thoughts, ideas, and stories with a vibrant community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:text-purple-600" href="/">Home</Link></li>
              <li><Link className="hover:text-purple-600" href="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-purple-600" href="/login">Login</Link></li>
              <li><Link className="hover:text-purple-600" href="/register">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <span className="block">Phone:</span>
                <a className="hover:text-purple-600" href="tel:+880183901368">+88 0183901368</a>
              </li>
              <li>
                <span className="block">LinkedIn:</span>
                <a className="hover:text-purple-600" href="https://www.linkedin.com/in/a-m-sajid-hasan-aa574b1a7/" target="_blank" rel="noreferrer noopener">
                  A. M. Sajid Hasan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-600">Get the latest posts and updates.</p>
            <form className="mt-3 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                type="button"
                className="px-4 py-2 rounded-r-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200/60 text-sm text-gray-500 flex flex-col md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ThinkTank. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ by <Link className="hover:text-purple-600" href="https://github.com/yourusername">Sajid</Link></p>
        </div>
      </div>
    </footer>
  );
}
