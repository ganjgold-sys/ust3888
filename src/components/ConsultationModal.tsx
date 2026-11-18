import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Send, ShieldCheck, User, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { sendLeadNotificationToEmail } from '../services/emailService';
import { trackEvent } from '../services/analytics';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string | null;
  onOpenPrivacy?: (tab: 'policy' | 'consent') => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onOpenPrivacy
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // Согласие по 152-ФЗ не должно стоять по умолчанию
  const [consent, setConsent] = useState(false);
  const [direction, setDirection] = useState<'ip' | 'person'>('person');

  // Направление может прийти из карточки клиента (ИП / физлицо)
  useEffect(() => {
    if (!isOpen) return;
    if (initialServiceId === 'business') setDirection('ip');
    else if (initialServiceId === 'person') setDirection('person');
  }, [isOpen, initialServiceId]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setIsSuccess(false);
      setErrorMessage('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setErrorMessage('Пожалуйста, заполните ваше имя');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage('Пожалуйста, укажите корректный номер телефона');
      return;
    }

    if (!consent) {
      setErrorMessage('Необходимо согласие на обработку персональных данных (152-ФЗ)');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await sendLeadNotificationToEmail({
        name: cleanName,
        phone: cleanPhone,
        format: 'Заявка на консультацию (Модальное окно)',
        debtAmountRange: `${
          direction === 'ip' ? 'ИП / бизнес' : 'Физическое лицо'
        }${
          initialServiceId && initialServiceId !== 'person' && initialServiceId !== 'business'
            ? ' / ' + initialServiceId
            : ''
        }`,
        source: 'Модальное окно быстрой записи',
        targetEmail: COMPANY_INFO.email,
      });

      if (!result.success) {
        // Заявка не ушла — не показываем ложное «успешно»
        setErrorMessage(
          (result.error || 'Не удалось отправить заявку.') +
            ' Позвоните нам: ' + COMPANY_INFO.phones[0]
        );
        return;
      }

      trackEvent('form_submit', { direction, source: 'форма на сайте' });
      setIsSuccess(true);
      setName('');
      setPhone('');
    } catch (err) {
      console.error(err);
      // Не показываем ложное «успешно»: заявка не ушла — говорим об этом честно
      setErrorMessage(
        'Не удалось отправить заявку. Позвоните нам: ' + COMPANY_INFO.phones[0]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="dark-card max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/40 p-6 sm:p-7 relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="absolute top-4 right-4 p-2 rounded-xl bg-ink text-muted hover:text-paper hover:bg-line transition-colors whitespace-nowrap"
            >
              <X size={20} />
            </button>

            <div>
              {/* Header */}
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-paper">
                    Запись на консультацию
                  </h3>
                  <p className="text-xs text-muted">ООО «Юстиция» (ИНН {COMPANY_INFO.inn}) в Иркутске</p>
                </div>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-ok/10 border-2 border-ok text-ok flex items-center justify-center mx-auto animate-[fadeIn_0.4s_ease-out]">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-serif font-bold text-paper">
                      Заявка успешно принята!
                    </h4>
                    <p className="text-xs sm:text-sm text-paper">
                      Уведомление направлено юристу на <span className="text-gold font-mono font-semibold">{COMPANY_INFO.email}</span>.
                    </p>
                    <p className="text-xs text-muted">
                      Ведущий юрист перезвонит вам в течение 5 минут для бесплатного анализа ситуации.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold mt-2 whitespace-nowrap"
                  >
                    Отлично, спасибо
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  
                  {/* Feedback Form with Name & Phone */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 bg-card p-4 sm:p-5 rounded-xl border border-line-2">
                    {/* Выбор направления: ИП или физлицо */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDirection('person')}
                        className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${direction === 'person' ? 'bg-gold text-ink border-gold' : 'bg-panel text-muted border-line-2'}`}
                      >
                        Я физическое лицо
                      </button>
                      <button
                        type="button"
                        onClick={() => setDirection('ip')}
                        className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${direction === 'ip' ? 'bg-gold text-ink border-gold' : 'bg-panel text-muted border-line-2'}`}
                      >
                        Я ИП / предприниматель
                      </button>
                    </div>
                    <div className="text-xs font-bold text-paper flex items-center justify-between">
                      <span>Оставьте номер: юрист перезвонит</span>
                      <span className="text-[10px] text-ok font-normal">Звонок бесплатный</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted mb-1 font-medium">
                        Ваше имя <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-faint">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="Например, Александр"
                          className="w-full pl-9 pr-3 py-2.5 bg-panel border border-line-2 focus:border-gold rounded-lg text-sm text-paper placeholder-faint focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted mb-1 font-medium">
                        Номер телефона <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-faint">
                          <Phone size={16} />
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full pl-9 pr-3 py-2.5 bg-panel border border-line-2 focus:border-gold rounded-lg text-sm text-paper placeholder-faint focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* 152-FZ Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start space-x-2 text-[11px] text-faint cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 rounded border-line-2 bg-panel text-gold focus:ring-0 cursor-pointer"
                        />
                        <span>
                          Даю согласие на обработку персональных данных по{' '}
                          <button
                            type="button"
                            onClick={() => onOpenPrivacy && onOpenPrivacy('consent')}
                            className="text-gold hover:underline underline-offset-2 whitespace-nowrap"
                          >
                            152-ФЗ
                          </button>{' '}
                          и принимаю{' '}
                          <button
                            type="button"
                            onClick={() => onOpenPrivacy && onOpenPrivacy('policy')}
                            className="text-gold hover:underline underline-offset-2 whitespace-nowrap"
                          >
                            Политику конфиденциальности
                          </button>
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/50">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-btn w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2  transition-transform disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Отправка на почту…</span>
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          <span>Получить бесплатную консультацию</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-line"></div>
                    <span className="flex-shrink mx-3 text-xs text-faint">или свяжитесь напрямую</span>
                    <div className="flex-grow border-t border-line"></div>
                  </div>

                  {/* Direct Quick Action Buttons */}
                  <div className="space-y-2.5">
                    {/* Option 1: Call Phone */}
                    <a
                      href={`tel:${COMPANY_INFO.rawPhone}`}
                      onClick={() => trackEvent('phone_click')}
                      className="w-full p-3 rounded-xl bg-ink border border-line-2 hover:border-gold flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-line border border-line-2 flex items-center justify-center text-gold  transition-transform">
                          <Phone size={16} />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-paper">Позвонить по телефону</div>
                          <div className="text-[11px] text-gold font-semibold">{COMPANY_INFO.phones[0]}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/20 text-gold">
                        Вызов
                      </span>
                    </a>

                    {/* Option 2: Telegram */}
                    <a
                      href={COMPANY_INFO.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-3 rounded-xl bg-raised border border-brand-tg/40 hover:border-brand-tg flex items-center justify-between group transition-colors whitespace-nowrap"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-tg/20 flex items-center justify-center text-brand-tg  transition-transform">
                          <Send size={16} />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-paper">Написать в Telegram</div>
                          <div className="text-[11px] text-muted">Дежурный юрист @AM_ARBITR</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-tg px-2 py-0.5 rounded bg-card border border-brand-tg/30">
                        Чат
                      </span>
                    </a>
                  </div>

                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
