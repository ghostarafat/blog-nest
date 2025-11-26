import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* ===== Hero Section ===== */}
      <section className="bg-indigo-600 text-white py-32 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About BlogNest</h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto">
          BlogNest is your all-in-one platform for managing blogs, products, and
          sharing your creativity with the world.
        </p>
      </section>

      {/* ===== Our Mission ===== */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Mission</h2>
        <p className="text-gray-700 text-center md:text-lg">
          Our mission is to empower creators, writers, and entrepreneurs by
          providing tools that make managing content and products seamless and
          enjoyable.
        </p>
      </section>

      {/* ===== Story Section ===== */}
      <section className="bg-gray-50 py-16 px-6 space-y-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="https://i.postimg.cc/GmRDN1Wv/about.png"
              alt="Our Story"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              BlogNest started as a small idea to create a platform that allows
              anyone to share their stories, showcase their products, and reach
              a wider audience. Over time, we’ve grown into a full-fledged
              platform with powerful tools for creators and businesses alike.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition text-center">
            <div className="h-40 w-40 mx-auto mb-4 bg-gray-200 rounded-full"></div>
            <h3 className="font-semibold text-xl mb-1">Alice</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition text-center">
            <div className="h-40 w-40 mx-auto mb-4 bg-gray-200 rounded-full"></div>
            <h3 className="font-semibold text-xl mb-1">Bob</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition text-center">
            <div className="h-40 w-40 mx-auto mb-4 bg-gray-200 rounded-full"></div>
            <h3 className="font-semibold text-xl mb-1">Carol</h3>
            <p className="text-gray-600">Marketing Head</p>
          </div>
        </div>
      </section>
    </div>
  );
}
