import { Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-white">BlogNest</h2>
          <p className="mt-3 text-sm">
            Your daily source of tech tutorials, insights, and coding
            inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl text-white font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl text-white font-medium mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white flex items-center gap-2">
              <Facebook size={20} />
            </a>

            <a href="#" className="hover:text-white flex items-center gap-2">
              <Twitter size={20} />
            </a>

            <a href="#" className="hover:text-white flex items-center gap-2">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center pt-8 text-sm text-gray-500 border-t border-gray-800 mt-10">
        © {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
}
