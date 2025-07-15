import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // npm install lucide-react (or use Heroicons if preferred)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-0 sm:px-1 lg:px-2 py-0.5 flex justify-between items-center">

        {/* Logo and Brand */}
        <div className="flex items-center gap-1 ml-0">
          <img
            src="/photo_2025-07-04_23-04-32.jpg"
            alt="KG Logo"
            className="w-14 h-14 object-cover rounded-md"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              KG Training & Placements
            </h1>
            <p className="text-xs sm:text-sm italic text-gray-500">
              Banking Education Redefined
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 mr-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium py-2 border-b"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
