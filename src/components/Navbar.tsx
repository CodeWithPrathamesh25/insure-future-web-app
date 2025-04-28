
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Policies', path: '/policies' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-insurance-blue-dark text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold font-poppins">InsureProtect</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                    ${isActive(link.path) 
                    ? 'bg-insurance-blue text-white' 
                    : 'text-gray-300 hover:bg-insurance-blue/80 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-insurance-blue/90 transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 rounded-md text-sm font-medium bg-insurance-green text-white hover:bg-insurance-green-dark transition-all duration-300"
            >
              Register
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-insurance-blue/80 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-insurance-blue-dark border-t border-insurance-blue">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.path) 
                  ? 'bg-insurance-blue text-white' 
                  : 'text-gray-300 hover:bg-insurance-blue/80 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-insurance-blue/30 flex flex-col space-y-2">
              <Link 
                to="/login" 
                className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-insurance-blue/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-2 rounded-md text-base font-medium bg-insurance-green text-white hover:bg-insurance-green-dark mx-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
