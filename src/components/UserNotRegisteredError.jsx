export default function UserNotRegisteredError() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">User Not Registered</h1>
        <p className="text-gray-700 mb-4">
          Your account is not registered. Please contact support or try registering again.
        </p>
        <button
          onClick={() => window.location.href = '/register'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Register
        </button>
      </div>
    </div>
  );
}
