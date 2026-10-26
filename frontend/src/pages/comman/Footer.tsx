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
  FaArrowRight,
} from 'react-icons/fa'
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si'

const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayPuck = 'flex items-center justify-center rounded-full bg-[#e0e5ec] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff] transition-all duration-150 hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#c3cad5]/40 bg-[#e0e5ec]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-sm font-bold text-white shadow-[4px_4px_10px_#b8bec7,-4px_-4px_10px_#ffffff]">
                TS
              </div>
              <span className="text-xl font-extrabold text-[#4a5568]">
                Team<span className="text-indigo-500">Sync</span>
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-[#718096]">
              Empowering teams to collaborate seamlessly and achieve extraordinary results together.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-[#718096]">
              <FaHeart className="text-indigo-400" />
              <span>Built with love for better teamwork</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#4a5568]">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/features', label: 'Features' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/blog', label: 'Blog' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-sm font-semibold text-[#718096] transition-colors hover:text-indigo-500"
                  >
                    <FaArrowRight className="text-xs opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#4a5568]">Support</h3>
            <ul className="space-y-3">
              {[
                { to: '/help', label: 'Help Center' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/faq', label: 'FAQ' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm font-semibold text-[#718096] transition-colors hover:text-indigo-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#4a5568]">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm font-medium text-[#718096]">
                <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-indigo-500" />
                <span>123 Collaboration St, Suite 100<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-[#718096]">
                <FaEnvelope className="flex-shrink-0 text-indigo-500" />
                <a href="mailto:support@teamsync.com" className="hover:text-indigo-500">support@teamsync.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-[#718096]">
                <FaPhone className="flex-shrink-0 text-indigo-500" />
                <a href="tel:+1234567890" className="hover:text-indigo-500">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 h-px bg-[#c3cad5]/60" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm font-medium text-[#718096]">© {currentYear} TeamSync. All rights reserved.</p>

          {/* Social clay pucks */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: SiFacebook, href: 'https://facebook.com', label: 'Facebook' },
              { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: SiInstagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: SiYoutube, href: 'https://youtube.com', label: 'YouTube' },
              { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`h-10 w-10 text-[#718096] hover:text-indigo-500 ${clayPuck}`}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-[#a0aec0]">
            <Link to="/privacy" className="hover:text-indigo-500">Privacy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-indigo-500">Terms</Link>
            <span>|</span>
            <Link to="/cookies" className="hover:text-indigo-500">Cookies</Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 border-t border-[#c3cad5]/40 pt-6 text-xs font-semibold text-[#a0aec0]">
          {['GDPR Compliant', 'SOC 2 Certified', '99.9% Uptime', '24/7 Support'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer