import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa'
import { 
  SiFacebook, 
  SiInstagram, 
  SiYoutube 
} from 'react-icons/si'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-indigo-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm">
                TS
              </div>
              <span className="text-xl font-bold text-gray-800">
                Team<span className="text-indigo-600">Sync</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering teams to collaborate seamlessly and achieve extraordinary results together.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaHeart className="text-indigo-400" />
              <span>Built with love for better teamwork</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/features', label: 'Features' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/blog', label: 'Blog' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/help', label: 'Help Center' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/faq', label: 'FAQ' },
                { to: '/privacy', label: 'Privacy Policy' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <FaMapMarkerAlt className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <span>123 Collaboration St, Suite 100<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaEnvelope className="text-indigo-500 flex-shrink-0" />
                <a href="mailto:support@teamsync.com" className="hover:text-indigo-600 transition-colors">
                  support@teamsync.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaPhone className="text-indigo-500 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-indigo-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-indigo-100 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} TeamSync. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Facebook"
            >
              <SiFacebook size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <SiInstagram size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="YouTube"
            >
              <SiYoutube size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">
              Terms
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/cookies" className="hover:text-indigo-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 pt-6 border-t border-indigo-50 flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
            GDPR Compliant
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
            SOC 2 Certified
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
            99.9% Uptime
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
            24/7 Support
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer