export default function UserNotRegisteredError() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="max-w-md p-8 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-red-400 mb-4">User Not Registered</h1>
        <p className="text-slate-300 mb-6">
          Your account is not registered. Please contact support or try registering again.
        </p>
        <button
          onClick={() => window.location.href = '/register'}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25"
        >
          Go to Register
        </button>
      </div>
    </div>
  );
}
