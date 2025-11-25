import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="space-y-16">
      {/* ===== Hero Section ===== */}
      <section className="bg-indigo-600 text-white py-32 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto">
          Have questions or feedback? Reach out to us, and we’ll get back to you
          as soon as possible.
        </p>
      </section>

      {/* ===== Contact Form Section ===== */}
      <section className="max-w-4xl mx-auto px-6 py-16 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* ===== Contact Info Section ===== */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center bg-gray-100 rounded-lg shadow-lg">
        <div>
          <h3 className="font-bold text-xl mb-2">Email</h3>
          <p className="text-gray-700">contact@blognest.com</p>
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2">Phone</h3>
          <p className="text-gray-700">+880 1234 567890</p>
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2">Address</h3>
          <p className="text-gray-700">Dhaka, Bangladesh</p>
        </div>
      </section>
    </div>
  );
}
