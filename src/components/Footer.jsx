import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import Contact from "./Contact";

const Footer = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <footer className="bg-gradient-to-br from-[#181c2b]/90 via-[#232946]/90 to-[#0f172a]/90 text-gray-100 py-10 w-full mt-auto border-t border-white/10 shadow-2xl relative overflow-hidden">
      <Contact open={openContact} onClose={() => setOpenContact(false)} />

      {/* Gradient overlays for effect */}
      <div className="pointer-events-none absolute -top-20 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="order-3 md:order-1 text-left flex items-center gap-4">
          <img
            src="https://i.postimg.cc/YCXJv7tR/logo.png"
            alt="Protein Pro Logo"
            className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-[#00c6fb]"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea] drop-shadow-lg">
              PROTEIN PRO
            </h2>
            <p className="text-sm mt-1 text-gray-300">
              Your fitness partner, always with you.
            </p>
          </div>
        </div>

        <div className="order-2 text-center border-l border-white/20 pl-8 md:ml-6">
          <h3 className="font-semibold mb-3 text-[#ffb86b]">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:underline text-[#00c6fb] hover:text-[#ffb86b] font-semibold transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:underline text-[#00c6fb] hover:text-[#ffb86b] font-semibold transition"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="order-1 md:order-3 text-right border-l border-white/20 pl-8 md:ml-6">
          <h3 className="font-semibold mb-3 text-[#ff6bcb]">Need Help?</h3>
          <button
            onClick={() => setOpenContact(true)}
            className="border-2 border-[#00c6fb] bg-gradient-to-r from-[#00c6fb]/30 to-[#005bea]/30 hover:from-[#00c6fb]/60 hover:to-[#005bea]/60 text-white px-5 py-2 rounded-xl mb-4 font-bold shadow-lg transition"
          >
            Contact Us
          </button>

          <h3 className="font-semibold mb-3 text-[#ffb86b]">Follow Us</h3>
          <div className="flex justify-end space-x-4 text-2xl">
            <button
              onClick={() => window.open("https://facebook.com")}
              className="hover:text-[#00c6fb] transition"
            >
              <FaFacebook />
            </button>
            <button
              onClick={() => window.open("https://instagram.com")}
              className="hover:text-[#ff6bcb] transition"
            >
              <FaInstagram />
            </button>
            <button
              onClick={() => window.open("https://twitter.com")}
              className="hover:text-[#ffb86b] transition"
            >
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 text-center text-sm text-gray-300 border-t border-white/10 pt-6">
        © 2025 Protein Pro. All rights reserved. Created by Amir Shahin
        <button
          onClick={() => window.open("https://github.com/amirShahin-7")}
          className="hover:text-[#00c6fb] text-2xl ml-2 align-middle transition"
        >
          <FaGithub />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
