import React from "react";

export default function FAQ() {
  const faqs = [
    { q: "How does Nova AI work?", a: "Nova AI uses advanced language models to understand and respond to your queries in natural language." },
    { q: "Is my data secure?", a: "Yes, we use industry-standard encryption and security practices to protect your data." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time with no penalties." },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
