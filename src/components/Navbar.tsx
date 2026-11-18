import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { Logo } from './Logo';
import { trackEvent } from '../services/analytics';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenAIChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Ссылки только на секции, которые реально есть на странице.
     Раньше здесь были #audience, #services, #timeline и #faq — эти блоки удалены
     по правкам, и переходы вели в никуда. */
  const navLinks = [
    { name: 'Кому помогаем', href: '#directions' },
    { name: 'Этапы', href: '#process' },
    { name: 'Стоимость', href: '#price' },
    { name: 'Кейсы', href: '#cases' },
    { name: 'Команда', href: '#team' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      {/* Top Banner Info Bar - Lightweight & Clean */}
      <div className="bg-panel border-b border-line/60 text-xs text-muted py-1.5 px-4 hidden md:block">
        <div className="site-container flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-gold">
              <MapPin size={13} className="text-gold" />
              <span>{COMPANY_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-muted">
              <Clock size={13} />
              <span>{COMPANY_INFO.workingHours}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className={`transition-colors duration-300 ${isScrolled ? 'bg-ground border-b border-line py-2.5 shadow-lg' : 'bg-ground py-3.5 border-b border-line/50'}`}>
        <div className="site-container flex items-center justify-between">
          
          {/* Logo Component */}
          <a href="/" className="flex items-center group whitespace-nowrap" aria-label="Юстиция, на главную">
            <Logo variant="light" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-paper hover:text-paper transition-colors relative py-1 after:content-(--nav-underline-content) after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Phone Link */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Phone size={14} />
              <span>{COMPANY_INFO.phones[0]}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="p-2 rounded-lg bg-raised border border-line-2 text-gold whitespace-nowrap"
            >
              <Phone size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-bone-ink border border-line-2 text-paper hover:text-gold"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer — CSS-переход, без библиотеки анимаций */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-ground border-b border-line px-4 pt-3 pb-5 space-y-2 mt-2 overflow-hidden animate-[slideDown_0.2s_ease-out]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-paper hover:text-gold border-b border-raised"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full gold-btn py-2.5 rounded-xl text-center font-bold text-xs"
              >
                Бесплатная консультация
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
