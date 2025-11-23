import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* ===== Hero Section ===== */}
      <section className="bg-indigo-600 text-white py-32 px-6 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to BlogNest
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Your one-stop place to manage products, blogs, and more.
        </p>
        <Link
          href="/items"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Items
        </Link>
      </section>

      {/* ===== Section 1: Features ===== */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Feature One</h3>
            <p className="text-gray-600">Short description of this feature.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Feature Two</h3>
            <p className="text-gray-600">Short description of this feature.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Feature Three</h3>
            <p className="text-gray-600">Short description of this feature.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Products / Cards ===== */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Items</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="h-40 w-full bg-gray-200 mb-4 rounded-lg"></div>
              <h3 className="font-semibold text-lg mb-1">Item {i}</h3>
              <p className="text-gray-600 mb-2">Short description goes here.</p>
              <p className="font-bold">$19.{i}9</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Section 3: Testimonials ===== */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">“This app is amazing!”</p>
            <p className="font-semibold">– User One</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">“Super easy to use.”</p>
            <p className="font-semibold">– User Two</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">“Loved the interface!”</p>
            <p className="font-semibold">– User Three</p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Call to Action ===== */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="mb-6 text-lg md:text-xl">
          Sign up or explore our items now!
        </p>
        <Link
          href="/items"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Items
        </Link>
      </section>
    </div>
  );
}
