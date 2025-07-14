import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative -ml-9">
              <img
                src="/photo_2025-07-04_23-04-32.jpg"
                alt="KG Training Logo"
                className="w-19 h-16 object-cover"
              />

            </div>
            <div className="text-xl sm:text-2xl font-bold flex items-center">
              <span className="text-white text-2xl">KG Training & Placements </span>
              <span className="font-style: italic text-sm px-2 mt-2">Banking Education Redefined</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white px-4 py-2 rounded-lg">
              Home
            </Link>
            <Link to="/about" className="text-white px-4 py-2 rounded-lg">
              About
            </Link>
            <Link to="/contact" className="text-white px-4 py-2 rounded-lg">
              Contact
            </Link>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-bold text-gray-800">Menu</div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-purple-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                <Link
                  to="/"
                  className="block text-white hover:text-purple-600 transition-colors duration-200 px-3 py-2 "
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="block text-white hover:text-purple-600 transition-colors duration-200 px-3 py-2 "
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-purple-600 transition-colors duration-200 px-3 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-700 hover:text-purple-600 transition-colors duration-200 px-3 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
