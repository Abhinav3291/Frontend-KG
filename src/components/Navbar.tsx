import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm stiky top-0 z-50">
      <Container className="flex justify-between items-center py-2">

        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/kg_logo.jpg"
            alt="KG Logo"
            className="w-14 h-14 object-cover rounded-md"
          />
          <div className="leading-snug">
            <h1 className="text-lg sm:text-xl font-bold text-blue-900 mb-0 mt-2">
              KG Training & Placements
            </h1>
            <p className="text-xs sm:text-sm italic text-blue-900 mt-0">
              Banking Education Redefined
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-md',
                isActive(link.path) ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="ml-4">
            Get Started
          </Button>
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium',
                isActive(link.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200">
            <Button className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
