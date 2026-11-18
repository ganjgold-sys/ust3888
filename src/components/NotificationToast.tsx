import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Михаил (Иркутск)', action: 'рассчитал стоимость банкротства', amount: '1 250 000 ₽' },
  { name: 'Елена (Ангарск)', action: 'записалась на юридический прием', amount: 'долги по МФО' },
  { name: 'Алексей (Шелехов)', action: 'получил решение о списании', amount: '890 000 ₽' },
  { name: 'Сергей (Иркутск)', action: 'оформил удобную рассрочку от 8 000 ₽/мес', amount: 'банкротство ИП' },
];

interface NotificationToastProps {
  onOpenConsultation?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onOpenConsultation }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    // Show initial toast after 4s
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      hideTimer = setTimeout(() => setIsVisible(false), 3000);
    }, 4000);

    // Cycle every 10 seconds
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % NOTIFICATIONS.length);
      setIsVisible(true);
      hideTimer = setTimeout(() => setIsVisible(false), 3000);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  const item = NOTIFICATIONS[currentIdx];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-xs w-full bg-surface/98 border border-gold/40 rounded-xl p-3 shadow-2xl text-xs flex items-center justify-between space-x-3 transition-[transform,background-color,border-color,color,box-shadow] duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="flex items-center space-x-2.5">
        <div className="w-7 h-7 rounded-lg bg-raised border border-line-2 flex items-center justify-center shrink-0 text-ok">
          <ShieldCheck size={16} />
        </div>
        <div>
          <div className="font-bold text-paper text-[11px]">{item.name}</div>
          <div className="text-muted text-[10px]">
            {item.action}: <strong className="text-gold">{item.amount}</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="text-faint hover:text-paper p-1"
      >
        <X size={13} />
      </button>
    </div>
  );
};
