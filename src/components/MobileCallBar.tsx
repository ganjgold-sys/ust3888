import React, { useEffect, useState } from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';

interface MobileCallBarProps {
  onOpenConsultation: () => void;
}

/**
 * Липкая панель звонка для мобильных устройств (п. 3 рекомендаций:
 * на мобильных должна быть доступна кнопка звонка в любой момент).
 * Показывается только на узких экранах и после прокрутки первого экрана.
 */
export const MobileCallBar: React.FC<MobileCallBarProps> = ({ onOpenConsultation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-line-2 bg-ground transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch gap-2 p-2.5">
        <a
          href={`tel:${COMPANY_INFO.rawPhone}`}
          onClick={() => trackEvent('phone_click', { placement: 'мобильная панель' })}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-gold/60 text-paper text-sm font-bold"
        >
          <Phone size={16} />
          Позвонить
        </a>
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex-1 gold-btn py-3 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <ShieldCheck size={16} />
          Консультация
        </button>
      </div>
    </div>
  );
};
