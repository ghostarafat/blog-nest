"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // custom arrows removed
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
      image: "https://i.postimg.cc/RZHTpw78/ct2.png",
      tagline: "Your Ideas Deserve a Beautiful Home.",
    },
    {
      image: "https://i.postimg.cc/yNCyMWn1/ct3.png",
      tagline: "Create Stories That Matter.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ===== Hero Banner Slider Section ===== */}
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
                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg">
                  {slide.tagline}
                </h1>
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
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Write Seamlessly</h3>
            <p className="text-gray-600">
              A clean, distraction-free writing experience.
            </p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Organize Smartly</h3>
            <p className="text-gray-600">
              Manage your blogs, items & drafts effortlessly.
            </p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Publish Instantly</h3>
            <p className="text-gray-600">Go live with one click — anytime.</p>
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
            <p className="text-gray-600 mb-2">
              “This app helps me publish faster!”
            </p>
            <p className="font-semibold">– Arif</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">
              “Perfect for managing my blog.”
            </p>
            <p className="font-semibold">– Rafi</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">“Clean UI, super easy to use.”</p>
            <p className="font-semibold">– Jannat</p>
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
              className={`border rounded-lg p-5 cursor-pointer hover:shadow-md hover:-translate-y-1 transition ${item.color}`}
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
              className="w-full sm:w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
