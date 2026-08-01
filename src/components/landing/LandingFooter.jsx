import React from "react";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-950/50 backdrop-blur-xl border-t border-slate-800/50 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Nova AI</h3>
          <p className="text-slate-400">Your intelligent AI assistant.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Features</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Security</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">About</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Privacy</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Terms</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-400">
        <p>&copy; 2024 Nova AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
