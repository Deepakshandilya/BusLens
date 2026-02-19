"use client"

import Link from 'next/link'
import { Bus, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Routes', href: '#routes' },
  { name: 'Map', href: '#map' },
  { name: 'About', href: '#about' },
]

const supportLinks = [
  { name: 'Contact', href: '#contact' },
  { name: 'Help Center', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/deepakshandilya', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/deepakshandilyaa', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                BusLens
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Smart bus route planning for the Tricity area. Making public transportation 
              accessible, efficient, and enjoyable for everyone.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <a
                  href="mailto:info@buslens.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  info@buslens.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400">
                  Chandigarh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BusLens. All rights reserved. Built with ❤️ for the Tricity community.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://github.com/deepakshandilya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/deepakshandilyaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:deepakshandilya@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
