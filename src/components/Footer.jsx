import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import Contact from "./Contact";

const Footer = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <footer className="bg-black bg-opacity-50 text-white py-6 w-full mt-auto">
      <Contact open={openContact} onClose={() => setOpenContact(false)} />

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="order-3 md:order-1 text-left">
          <div className="flex items-center gap-3">
            <img
              src="logo.png"
              alt="Protein Pro Logo"
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold">PROTEIN PRO</h2>
              <p className="text-sm mt-1">
                Your fitness partner, always with you.
              </p>
            </div>
          </div>
        </div>

        <div className="order-2 text-center border-l border-white/30 pl-6 md:ml-6">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="order-1 md:order-3 text-right border-l border-white/30 pl-6 md:ml-6">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <button
            onClick={() => setOpenContact(true)}
            className="border border-white bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded mb-3 transition"
          >
            Contact Us
          </button>

          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-end space-x-4 text-lg">
            <button
              onClick={() => window.open("https://facebook.com")}
              className="hover:text-blue-400"
            >
              <FaFacebook />
            </button>
            <button
              onClick={() => window.open("https://instagram.com")}
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </button>
            <button
              onClick={() => window.open("https://twitter.com")}
              className="hover:text-black"
            >
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-300">
        © 2025 Protein Pro. All rights reserved. Created by Amir Shahin
        <button
          onClick={() => window.open("https://github.com/amirShahin-7")}
          className="hover:text-blue-300 text-xl ml-2"
        >
          <FaGithub />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
