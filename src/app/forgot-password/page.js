export const metadata = {
  title: 'Forgot Password - ThinkTank',
  description: 'Reset your ThinkTank account password.',
}

export default function ForgotPasswordPage() {
  async function handleSubmit(formData) {
    'use server'
    // This is a stub; in real app you would email a reset link/token.
    // We return a small delay to simulate processing.
    await new Promise(r => setTimeout(r, 400));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot password</h1>
        <p className="text-sm text-gray-600 mb-6">Enter your account email and we'll send you reset instructions.</p>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50" placeholder="you@example.com" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:from-purple-600 hover:to-pink-600">Send reset link</button>
        </form>
        <p className="text-xs text-gray-500 mt-4">Note: For demo purposes this doesn't email; integrate your provider later.</p>
      </div>
    </div>
  );
}
