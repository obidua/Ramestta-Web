import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/store';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isDesktopResourcesOpen, setIsDesktopResourcesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);


  const { logout, userToken } = useAuthStore();



  const mainNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Ecosystem', href: '/ecosystem' },
  ];

  const resourcesNavigation = [
    { name: 'Developers', href: '/developers' },
    { name: 'Validator', href: '/validator' },
    { name: 'Bridge', href: '/bridge' },
    { name: 'Explorer', href: '/explorer' },
  ];

  const otherNavigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isResourcesActive = () => resourcesNavigation.some(item => isActive(item.href));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-800/50">
      <nav className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/rama_logo.png"
              alt="Ramestta Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Zilap-Orion' }}>Ramestta</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation */}
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-200 py-2 px-4 rounded-md ${isActive(item.href)
                  ? 'text-primary-400 bg-primary-500/10'
                  : 'text-gray-300 hover:text-primary-400 hover:bg-primary-500/5'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setIsDesktopResourcesOpen(true)}
                className={`font-medium transition-all duration-200 py-2 px-4 rounded-md flex items-center space-x-1 ${isResourcesActive()
                  ? 'text-primary-400 bg-primary-500/10'
                  : 'text-gray-300 hover:text-primary-400 hover:bg-primary-500/5'
                  }`}
              >
                <span>Resources</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${isDesktopResourcesOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`dropdown-menu ${isDesktopResourcesOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsDesktopResourcesOpen(true)}
                onMouseLeave={() => setIsDesktopResourcesOpen(false)}
              >
                {resourcesNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsDesktopResourcesOpen(false)}
                    className={`dropdown-item ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Navigation */}
            {otherNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-200 py-2 px-4 rounded-md ${isActive(item.href)
                  ? 'text-primary-400 bg-primary-500/10'
                  : 'text-gray-300 hover:text-primary-400 hover:bg-primary-500/5'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block ml-6">
            {userToken ? (
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false);
                }}
                className="btn-primary "
              >
                logout
              </button>
            ) : (
              <Link
                to="/developers"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary "
              >
                Start Building
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-primary-400 hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 max-h-screen overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {/* Main Navigation Items */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-3 px-4 rounded-md transition-colors duration-200 ${isActive(item.href)
                    ? 'text-primary-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Resources Submenu */}
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`w-full flex items-center justify-between font-medium py-3 px-4 rounded-md transition-colors duration-200 ${isResourcesActive()
                    ? 'text-primary-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                    }`}
                >
                  <span>Resources</span>
                  {isResourcesOpen ? (
                    <ChevronDown size={20} className="transform transition-transform duration-200" />
                  ) : (
                    <ChevronRight size={20} className="transform transition-transform duration-200" />
                  )}
                </button>

                {/* Submenu Items */}
                {isResourcesOpen && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-700 pl-4">
                    {resourcesNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block font-medium py-2 px-3 rounded-md transition-colors duration-200 text-sm ${isActive(item.href)
                          ? 'text-primary-400 bg-gray-800/50'
                          : 'text-gray-400 hover:text-primary-400 hover:bg-gray-800/50'
                          }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Navigation Items */}
              {otherNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-3 px-4 rounded-md transition-colors duration-200 ${isActive(item.href)
                    ? 'text-primary-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA Button */}

              {userToken ? (
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary mx-4 text-center mt-4"
                >
                  logout
                </button>
              ) : (
                <Link
                  to="/developers"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary mx-4 text-center mt-4"
                >
                  Start Building
                </Link>
              )}

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;