import React from "react";

export default function Pricing() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="text-3xl font-bold mb-4">$0</div>
            <ul className="space-y-2 text-slate-600 mb-6">
              <li>• 100 messages/month</li>
              <li>• Basic modes</li>
              <li>• Community support</li>
            </ul>
            <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Get started</button>
          </div>
          <div className="border-2 border-blue-600 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 text-sm rounded-full">Popular</div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-4">$19</div>
            <ul className="space-y-2 text-slate-600 mb-6">
              <li>• Unlimited messages</li>
              <li>• All modes</li>
              <li>• Priority support</li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upgrade to Pro</button>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <div className="text-3xl font-bold mb-4">Custom</div>
            <ul className="space-y-2 text-slate-600 mb-6">
              <li>• Custom integrations</li>
              <li>• Dedicated support</li>
              <li>• SLA guarantee</li>
            </ul>
            <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Contact sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
