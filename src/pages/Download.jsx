export default function Download() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Download</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Download Nova AI Desktop App</h2>
        <p className="text-gray-600 mb-6">
          Get the full Nova AI experience on your desktop with our native application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Windows</h3>
                <p className="text-sm text-gray-500">.exe installer</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">macOS</h3>
                <p className="text-sm text-gray-500">.dmg installer</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Linux</h3>
                <p className="text-sm text-gray-500">.deb package</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">System Requirements</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Windows 10 or later, macOS 10.14 or later, or Linux (Ubuntu 18.04+)</li>
          <li>• 4GB RAM minimum (8GB recommended)</li>
          <li>• 500MB free disk space</li>
          <li>• Active internet connection</li>
        </ul>
      </div>
    </div>
  );
}
