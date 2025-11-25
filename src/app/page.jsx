"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const router = useRouter();

  // ===== Latest Posts State =====
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch("https://blog-nest-api-server.vercel.app");
        const data = await res.json();
        const latest = [...data].reverse().slice(0, 3); // latest 3 posts
        setLatestPosts(latest);
      } catch (err) {
        console.error("Failed to fetch latest posts:", err);
      }
    };
    fetchLatestPosts();
  }, []);

  // ===== Slider Settings + Slides =====
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    appendDots: (dots) => (
      <div className="absolute bottom-3 sm:bottom-5 w-full flex justify-center">
        <ul className="flex space-x-2 sm:space-x-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 hover:bg-yellow-400 transition"></div>
    ),
  };

  const slides = [
    {
      image: "https://i.postimg.cc/VvkRKTg4/ct1.png",
      tagline: "Write. Share. Inspire.",
    },
    {
      image: "https://i.postimg.cc/fbh9qX9c/feature4.png",
      tagline: "Your Ideas Deserve a Beautiful Home.",
    },
    {
      image: "https://i.postimg.cc/yNCyMWn1/ct3.png",
      tagline: "Create Stories That Matter.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full max-w-[1440px] mx-auto overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[230px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10">
                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg">
                  {slide.tagline}
                </h1>
                <p className="text-white text-sm sm:text-lg md:text-xl mb-6 opacity-90 max-w-2xl">
                  Discover tools to write, publish, organize, and grow your
                  content effortlessly.
                </p>
                <button
                  onClick={() => router.push("/items")}
                  className="bg-yellow-400 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded shadow-lg hover:bg-yellow-500 transition-all text-sm sm:text-base md:text-lg"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ===== Section 1: Features ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-8 border border-gray-300 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all bg-white">
            <h3 className="font-semibold text-2xl mb-3">Write Seamlessly</h3>
            <p className="text-gray-600 leading-relaxed">
              A clean, distraction-free writing experience built for focus.
            </p>
          </div>

          <div className="p-8 border border-gray-300 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all bg-white">
            <h3 className="font-semibold text-2xl mb-3">Organize Smartly</h3>
            <p className="text-gray-600 leading-relaxed">
              Manage blogs, items, and drafts with clarity and ease.
            </p>
          </div>

          <div className="p-8 border border-gray-300 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all bg-white">
            <h3 className="font-semibold text-2xl mb-3">Publish Instantly</h3>
            <p className="text-gray-600 leading-relaxed">
              Go live anytime with a simple one-click publish.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Latest Posts ===== */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Latest Posts</h2>

        {latestPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {latestPosts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Image */}
                <div className="h-44 w-full bg-gray-100 mb-4 rounded-lg overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 flex items-center justify-center h-full">
                      No Image
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-xl mb-2 line-clamp-1">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {post.shortDescription ||
                    post.description ||
                    "No description available."}
                </p>

                {/* Meta */}
                <div className="text-gray-500 text-xs mb-4 flex justify-between">
                  <span>{post.category || "Uncategorized"}</span>
                  <span>{post.publishDate || "-"}</span>
                </div>

                {/* Button */}
                <Link
                  href={`/items/${post._id}`}
                  className="block w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-center hover:bg-indigo-700 transition"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== Section 3: Testimonials ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <p className="text-gray-600 italic mb-4">
              “This app helps me publish faster!”
            </p>
            <p className="font-semibold text-gray-800 text-right">– Arif</p>
          </div>

          <div className="p-8 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <p className="text-gray-600 italic mb-4">
              “Perfect for managing my blog.”
            </p>
            <p className="font-semibold text-gray-800 text-right">– Rafi</p>
          </div>

          <div className="p-8 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <p className="text-gray-600 italic mb-4">
              “Clean UI, super easy to use.”
            </p>
            <p className="font-semibold text-gray-800 text-right">– Jannat</p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Call to Action ===== */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="mb-6 text-lg md:text-xl">
          Sign up or explore our posts now!
        </p>
        <Link
          href="/items"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Posts
        </Link>
      </section>

      {/* ===== Section 5: Categories ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Browse by Category
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Writing Tips", color: "bg-indigo-100 text-indigo-700" },
            { name: "Tech & Programming", color: "bg-blue-100 text-blue-700" },
            { name: "Productivity", color: "bg-green-100 text-green-700" },
            { name: "Lifestyle", color: "bg-rose-100 text-rose-700" },
            { name: "Blog Management", color: "bg-yellow-100 text-yellow-700" },
            {
              name: "Business & Marketing",
              color: "bg-purple-100 text-purple-700",
            },
            { name: "Creative Writing", color: "bg-teal-100 text-teal-700" },
            { name: "Tutorials", color: "bg-orange-100 text-orange-700" },
          ].map((item, i) => (
            <div
              key={i}
              className={`border border-gray-400 rounded-lg p-5 cursor-pointer hover:shadow-md hover:-translate-y-1 transition ${item.color}`}
            >
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Section 6: Newsletter Signup ===== */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get the latest writing tips, blog tools, and updates delivered to
            your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
