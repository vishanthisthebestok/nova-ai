import React from "react";

export default function Pricing() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
            <h3 className="text-xl font-semibold mb-2 text-white">Free</h3>
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">$0</div>
            <ul className="space-y-2 text-slate-400 mb-6">
              <li>• 100 messages/month</li>
              <li>• Basic modes</li>
              <li>• Community support</li>
            </ul>
            <button className="w-full py-3 border border-blue-500 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-colors">Get started</button>
          </div>
          <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-8 relative hover:scale-105 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 text-sm rounded-full font-medium">Popular</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Pro</h3>
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">$19</div>
            <ul className="space-y-2 text-slate-300 mb-6">
              <li>• Unlimited messages</li>
              <li>• All modes</li>
              <li>• Priority support</li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:shadow-lg hover:shadow-blue-500/25">Upgrade to Pro</button>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
            <h3 className="text-xl font-semibold mb-2 text-white">Enterprise</h3>
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Custom</div>
            <ul className="space-y-2 text-slate-400 mb-6">
              <li>• Custom integrations</li>
              <li>• Dedicated support</li>
              <li>• SLA guarantee</li>
            </ul>
            <button className="w-full py-3 border border-purple-500 text-purple-400 rounded-xl hover:bg-purple-500/10 transition-colors">Contact sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
