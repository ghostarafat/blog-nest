"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ reusable animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomePage() {
  const router = useRouter();
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(
          "https://blog-nest-api-server.vercel.app/items"
        );
        const data = await res.json();
        const latest = [...data].reverse().slice(0, 3);
        setLatestPosts(latest);
      } catch (err) {
        console.error("Failed to fetch latest posts:", err);
      }
    };
    fetchLatestPosts();
  }, []);

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
    <div className="space-y-20">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full max-w-[1440px] mx-auto overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[230px] sm:h-[400px] md:h-[500px] lg:h-[700px]"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center text-center px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4">
                    {slide.tagline}
                  </h1>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Discover tools to write, publish, organize, and grow your
                    content effortlessly.
                  </p>
                  <button
                    onClick={() => router.push("/items")}
                    className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-transform hover:scale-105"
                  >
                    Explore
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      {/* ===== Features ===== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            [
              "Write Seamlessly",
              "A clean, distraction-free writing experience built for focus.",
            ],
            [
              "Organize Smartly",
              "Manage blogs, items, and drafts with clarity and ease.",
            ],
            [
              "Publish Instantly",
              "Go live anytime with a simple one-click publish.",
            ],
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-8 border border-gray-400 rounded-2xl bg-white shadow-sm hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* ===== Latest Posts ===== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-50 py-20 px-6"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Latest Posts</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {latestPosts.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ y: -6 }}
              className="bg-white border border-gray-400 rounded-xl p-5 shadow-sm hover:shadow-xl transition"
            >
              <div className="h-44 bg-gray-100 mb-4 rounded-lg overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-xl mb-2 line-clamp-1">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.shortDescription ||
                  post.description ||
                  "No description available."}
              </p>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>{post.category || "Uncategorized"}</span>
                <span>{post.publishDate || "-"}</span>
              </div>

              <Link
                href={`/items/${post._id}`}
                className="block w-full bg-indigo-600 text-white py-2.5 rounded-lg text-center hover:bg-indigo-700 transition"
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "“This app helps me publish faster!”", name: "– Arif" },
            { text: "“Perfect for managing my blog.”", name: "– Rafi" },
            { text: "“Clean UI, super easy to use.”", name: "– Jannat" },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-8 border border-gray-400 bg-white rounded-2xl shadow-sm hover:shadow-xl transition"
            >
              <p className="italic text-gray-600 mb-4">{t.text}</p>
              <p className="font-semibold text-right">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* ===== CTA ===== */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-indigo-600 text-white py-20 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-lg">Sign up or explore our posts now!</p>
        <Link
          href="/items"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 inline-block transition"
        >
          Explore Posts
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
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
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className={`border border-gray-400 rounded-lg p-5 cursor-pointer transition shadow-sm hover:shadow-md ${item.color}`}
            >
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-100 py-16 px-6"
      >
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
              className="w-full sm:w-2/3 px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
