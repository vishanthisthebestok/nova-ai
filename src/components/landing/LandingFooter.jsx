import React from "react";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Nova AI</h3>
          <p className="text-slate-400">Your intelligent AI assistant.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Features</li>
            <li>Pricing</li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
        <p>&copy; 2024 Nova AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
