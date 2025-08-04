import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo/enliven.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false); // For desktop dropdown
  const [isMobileRoomsOpen, setIsMobileRoomsOpen] = useState(false); // For mobile dropdown
  const menuRef = useRef(null);
  const roomsDropdownRef = useRef(null);

  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileRoomsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Desktop dropdown close when clicking outside
  React.useEffect(() => {
    if (!isRoomsOpen) return;
    const handle = e => {
      if (
        roomsDropdownRef.current &&
        !roomsDropdownRef.current.contains(e.target)
      ) {
        setIsRoomsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isRoomsOpen]);

  // Close mobile menu if clicking outside
  React.useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        // ignore if click on menu button itself
        !event.target.closest('.navbar-menu-btn')
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 4px 15px rgba(104, 0, 30, 0.2)' }}>
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-[25px]">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group/logo focus:outline-none" tabIndex={0}>
            <img
              src={logo}
              alt="Hotel Enliven"
              className="h-16 w-auto "
            />
            <img
              src="/LOGO.svg"
              alt=""
              className="h-[150px] w-auto ml-[2px] mt-[10px] "
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-primary hover:text-secondary transition-all duration-300 font-semibold font-content relative group"
              >
                HOME
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-secondary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              {/* ROOMS Dropdown (NOW ONLY CLICK to open/close) */}
              <div
                id="rooms-dropdown"
                className="relative"
                ref={roomsDropdownRef}
              >
                <button
                  className="text-primary hover:text-secondary transition-all duration-300 font-semibold font-content relative group flex items-center"
                  onClick={() => setIsRoomsOpen((v) => !v)}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isRoomsOpen}
                >
                  ROOMS
                  <svg className="ml-1 h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.587l3.71-3.356a.75.75 0 1 1 .98 1.137l-4.2 3.8a.75.75 0 0 1-1.06 0l-4.2-3.8a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Desktop Dropdown with fade/scale transition */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 pointer-events-auto transform transition-all duration-300 ease-in-out
                    ${isRoomsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  <Link
                    to="/enliven-patia"
                    className="block px-5 py-3 text-primary hover:text-white hover:bg-secondary transition font-semibold font-content"
                    onClick={() => setIsRoomsOpen(false)}
                  >
                    Enliven Patia
                  </Link>
                  <Link
                    to="/enliven-niladri"
                    className="block px-5 py-3 text-primary hover:text-white hover:bg-secondary transition font-semibold font-content"
                    onClick={() => setIsRoomsOpen(false)}
                  >
                    Enliven Niladri Vihar
                  </Link>
                </div>
              </div>
              <Link
                to="/about"
                className="text-primary hover:text-secondary transition-all duration-300 font-semibold font-content relative group"
              >
                ABOUT US
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-secondary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Contact Icons */}
            <div className="flex items-center space-x-4">
              {/* WhatsApp: 83288 18871 */}
              <a
                href="https://wa.me/918328818871"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaWhatsapp className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium font-content">83288 18871</span>
              </a>
              {/* WhatsApp: 97779 59859 */}
              <a
                href="https://wa.me/919777959859"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaWhatsapp className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium font-content">97779 59859</span>
              </a>
              {/* Email */}
              <a
                href="mailto:aghranbhubaneswar@gmail.com"
                className="flex items-center text-primary hover:text-secondary transition-colors duration-300"
              >
                <FaEnvelope className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium font-content">aghranbhubaneswar@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button (top right) */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-secondary p-2 navbar-menu-btn"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu: slides from right, links right-aligned */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white transition-transform duration-500 ease-in-out z-50 shadow-2xl ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="px-8 py-8 flex flex-col items-end space-y-4 h-full">
          {/* Navigation Links, right-aligned */}
          <Link
            to="/"
            className="text-primary hover:text-secondary font-semibold font-content py-2 text-right w-full border-b"
            onClick={toggleMenu}
          >
            HOME
          </Link>
          {/* ROOMS Dropdown (collapsible) */}
          <div className="w-full">
            <button
              className="text-primary hover:text-secondary font-semibold font-content py-2 flex items-center justify-end w-full border-b"
              onClick={() => setIsMobileRoomsOpen((v) => !v)}
              type="button"
              aria-haspopup="true"
              aria-expanded={isMobileRoomsOpen}
            >
              ROOMS
              <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.587l3.71-3.356a.75.75 0 1 1 .98 1.137l-4.2 3.8a.75.75 0 0 1-1.06 0l-4.2-3.8a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {isMobileRoomsOpen && (
              <div className="flex flex-col items-end transition-all duration-300 ease-in-out animate-duration-300">
                <Link
                  to="/enliven-patia"
                  className="text-primary hover:text-secondary font-content py-2 w-full pr-2 text-right"
                  onClick={() => { setIsMobileRoomsOpen(false); toggleMenu(); }}
                >
                  Enliven Patia
                </Link>
                <Link
                  to="/enliven-niladri"
                  className="text-primary hover:text-secondary font-content py-2 w-full pr-2 text-right"
                  onClick={() => { setIsMobileRoomsOpen(false); toggleMenu(); }}
                >
                  Enliven Niladri Vihar
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="text-primary hover:text-secondary font-semibold font-content py-2 w-full text-right border-b"
            onClick={toggleMenu}
          >
            ABOUT US
          </Link>
          {/* Contact icons */}
          <div className="mt-auto w-full flex flex-col items-end gap-3 pt-8 border-t">
            {/* WhatsApp: 83288 18871 */}
            <a
              href="https://wa.me/918328818871"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-secondary py-1"
              onClick={toggleMenu}
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              <span className="font-medium font-content">83288 18871</span>
            </a>
            {/* WhatsApp: 97779 59859 */}
            <a
              href="https://wa.me/919777959859"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-secondary py-1"
              onClick={toggleMenu}
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              <span className="font-medium font-content">97779 59859</span>
            </a>
            {/* Email */}
            <a
              href="mailto:aghranbhubaneswar@gmail.com"
              className="flex items-center text-primary hover:text-secondary py-1"
              onClick={toggleMenu}
            >
              <FaEnvelope className="w-5 h-5 mr-2" />
              <span className="font-medium font-content">aghranbhubaneswar@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
