import React from "react";

export default function FAQ() {
  const faqs = [
    { q: "How does Nova AI work?", a: "Nova AI uses advanced language models to understand and respond to your queries in natural language." },
    { q: "Is my data secure?", a: "Yes, we use industry-standard encryption and security practices to protect your data." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time with no penalties." },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
