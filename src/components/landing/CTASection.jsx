import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl mb-8 text-blue-100">Join thousands of users who are already using Nova AI.</p>
        <Link to="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50">
          Start for free
        </Link>
      </div>
    </section>
  );
}
