// src/components/Footer.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 pt-10 px-16 py-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">Blogger’s Corner</h3>
          <p className="text-sm leading-relaxed">
            A platform for tech writers, designers, developers, and thinkers to share ideas,
            tutorials, and insights with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-500 transition"> Home</a></li>
            <li><a href="/dashboard" className="hover:text-orange-500 transition"> Dashboard</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">Connect</h3>
          <div className="flex  space-x-5 text-xl ">
            <a href="https://www.instagram.com/bharath_guddadar" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="1x" color="#f97316" />
            </a>
            <a href="https://www.linkedin.com/in/bharathguddadar" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="1x" color="#f97316" />
            </a>
            <a href="https://github.com/BharathGuddadar" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="1x" color="#f97316" />
            </a>
          </div>
          <p className="mt-4 text-sm">
            Email:{" "}
            <a href="mailto:bharathps821@gmail.com" className="hover:text-orange-500">
              contact@bloggerscorner.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-300 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Blogger’s Corner. All rights reserved.
      </div>
    </footer>
  );
}
