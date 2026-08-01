export default function PageNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">404</h1>
                <p className="text-xl text-slate-400 mb-8">Page Not Found</p>
                <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25">
                    Back to Synaptix
                </a>
            </div>
        </div>
    )
}
