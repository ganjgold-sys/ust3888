import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, MessageCircle, Send, Shield, Mail, User, CheckCircle2, Loader2, Scale, Building2, HelpCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { sendLeadNotificationToEmail } from '../services/emailService';
import { trackEvent } from '../services/analytics';

interface ContactSectionProps {
  onOpenConsultation?: () => void;
  onOpenPrivacy?: (tab: 'policy' | 'consent') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultation, onOpenPrivacy }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [direction, setDirection] = useState<'business' | 'person'>('person');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setErrorMessage('Пожалуйста, укажите ваше имя');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage('Пожалуйста, введите корректный номер телефона');
      return;
    }

    if (!consent) {
      setErrorMessage('Необходимо подтвердить согласие на обработку персональных данных (152-ФЗ)');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await sendLeadNotificationToEmail({
        name: cleanName,
        phone: cleanPhone,
        format: direction === 'business' ? 'Долги по бизнесу / ИП' : 'Кредиты и долги физлица',
        debtAmountRange: direction === 'business' ? 'ИП / бизнес' : 'Физическое лицо',
        source: 'Финальная форма «Давайте разберёмся в вашей ситуации»',
        targetEmail: COMPANY_INFO.email,
      });

      if (!result.success) {
        setErrorMessage(
          (result.error || 'Не удалось отправить заявку.') +
            ' Пожалуйста, позвоните нам: ' + COMPANY_INFO.phones[0]
        );
        return;
      }

      trackEvent('form_submit', { direction, source: 'финальный блок' });
      setIsSuccess(true);
      setName('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setErrorMessage(
        'Не удалось отправить заявку через форму. Пожалуйста, позвоните нам: ' + COMPANY_INFO.phones[0]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-24 bg-surface relative border-t border-line overflow-hidden">
      <div className="site-container relative z-10">
        
        {/* Section Header with exact wording from Block 9 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-raised border border-line-2 text-xs font-semibold text-gold shadow-md">
            <HelpCircle size={14} />
            <span>Консультация юриста</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-paper leading-tight">
            Давайте разберёмся <span className="italic font-serif font-normal text-gold">в&nbsp;вашей ситуации</span>
          </h2>
          <p className="text-sm sm:text-base text-muted font-light leading-relaxed max-w-3xl mx-auto">
            Расскажите, с какими долгами вы столкнулись. Специалист поможет определить, какие обстоятельства необходимо проверить и какие варианты решения можно рассмотреть.
          </p>
        </motion.div>

        {/* 2-Column Grid: Contacts & Legal Info + Feedback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
          
          {/* Info & Office Requisites Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-card p-7 sm:p-8 rounded-3xl border border-line hover:border-gold/50 flex flex-col justify-between transition-colors duration-300 space-y-6 shadow-md"
          >
            <div className="space-y-5">
              <div className="border-b border-line pb-4 flex items-center justify-between">
                <div>
                  <div className="text-base font-serif font-bold text-paper">{COMPANY_INFO.fullName}</div>
                  <div className="text-xs text-gold font-mono mt-0.5">ИНН {COMPANY_INFO.inn},  ОГРН {COMPANY_INFO.ogrn}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold shrink-0">
                  <Building2 size={20} />
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-faint font-semibold">Офис в Иркутске:</div>
                  <div className="text-sm font-bold text-paper mt-0.5">{COMPANY_INFO.address}</div>
                  <div className="text-xs text-muted font-light">1 этаж, клиентская парковка</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-faint font-semibold">Телефон для звонков и записи:</div>
                  <a
                    href={`tel:${COMPANY_INFO.rawPhone}`}
                    onClick={() => trackEvent('phone_click')}
                    className="block text-lg font-bold text-gold hover:underline transition-colors mt-0.5 font-mono"
                  >
                    {COMPANY_INFO.phones[0]}
                  </a>
                  <div className="text-xs text-muted font-light">Бесплатный разбор по телефону</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-faint font-semibold">Электронная почта:</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="block text-sm font-semibold text-paper hover:text-gold mt-0.5 font-mono whitespace-nowrap"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Work hours */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs text-faint font-semibold">Режим работы:</div>
                  <div className="text-xs font-semibold text-paper mt-0.5">{COMPANY_INFO.workingHours} (без выходных)</div>
                </div>
              </div>
            </div>

            {/* Messengers */}
            <div className="pt-4 border-t border-line space-y-2.5">
              <div className="text-xs font-semibold text-muted">Связаться напрямую в мессенджере:</div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={COMPANY_INFO.maxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-raised border border-line-2 text-paper font-semibold text-xs flex items-center justify-center space-x-2 hover:border-gold transition-colors whitespace-nowrap"
                >
                  <MessageCircle size={16} className="text-gold" />
                  <span>Чат МАХ</span>
                </a>

                <a
                  href={COMPANY_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-raised border border-brand-tg/40 text-brand-tg font-semibold text-xs flex items-center justify-center space-x-2 hover:bg-line transition-colors whitespace-nowrap"
                >
                  <Send size={16} />
                  <span>Telegram</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Minimal Form Column (Exact specifications from Block 9) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-card p-7 sm:p-9 rounded-3xl border-2 border-gold/40 hover:border-gold flex flex-col justify-between relative shadow-2xl"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-paper">
                    Заявка на индивидуальный разбор
                  </h3>
                  <p className="text-xs text-muted font-light">
                    Юрист свяжется с вами в течение 5 минут для уточнения деталей.
                  </p>
                </div>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center space-y-3.5 bg-surface rounded-2xl border border-ok/40 p-6 mt-4">
                  <div className="w-16 h-16 rounded-full bg-ok/10 border border-ok text-ok flex items-center justify-center mx-auto animate-[fadeIn_0.4s_ease-out]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-paper">Заявка успешно принята!</h4>
                  <p className="text-xs sm:text-sm text-paper max-w-md mx-auto leading-relaxed font-light">
                    Дежурный юрист ООО «Юстиция» уже получил уведомление и свяжется с вами в ближайшие минуты для анализа вашей ситуации.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-gold hover:underline font-semibold pt-2 block mx-auto cursor-pointer"
                  >
                    Отправить ещё одно обращение
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  
                  {/* 1. Выбор направления: «Долги по бизнесу / ИП» или «Кредиты и долги физлица» */}
                  <div>
                    <label className="block text-xs text-muted mb-1.5 font-medium">
                      Выберите ваше направление: <span className="text-gold">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDirection('business')}
                        className={`py-3 px-3 rounded-xl text-xs font-bold border transition-colors text-center cursor-pointer ${
                          direction === 'business'
                            ? 'bg-gold text-ink border-gold shadow-md'
                            : 'bg-panel text-paper border-line-2 hover:border-gold/50'
                        }`}
                      >
                        Долги по бизнесу / ИП
                      </button>

                      <button
                        type="button"
                        onClick={() => setDirection('person')}
                        className={`py-3 px-3 rounded-xl text-xs font-bold border transition-colors text-center cursor-pointer ${
                          direction === 'person'
                            ? 'bg-gold text-ink border-gold shadow-md'
                            : 'bg-panel text-paper border-line-2 hover:border-gold/50'
                        }`}
                      >
                        Кредиты и долги физлица
                      </button>
                    </div>
                  </div>

                  {/* 2. Имя */}
                  <div>
                    <label className="block text-xs text-muted mb-1 font-medium">
                      Ваше имя <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-faint">
                        <User size={17} />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Как к вам обращаться"
                        className="w-full pl-10 pr-3.5 py-3 bg-panel border border-line-2 focus:border-gold rounded-xl text-sm text-paper placeholder-faint focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* 3. Телефон */}
                  <div>
                    <label className="block text-xs text-muted mb-1 font-medium">
                      Номер телефона <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-faint">
                        <Phone size={17} />
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
                        className="w-full pl-10 pr-3.5 py-3 bg-panel border border-line-2 focus:border-gold rounded-xl text-sm text-paper placeholder-faint focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* 4. Ссылка на политику конфиденциальности (требование 152-ФЗ) */}
                  <div className="pt-1">
                    <label className="flex items-start space-x-2.5 text-xs text-faint cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 rounded border-line-2 bg-panel text-gold focus:ring-0 cursor-pointer"
                      />
                      <span className="leading-snug">
                        Даю согласие на обработку персональных данных по{' '}
                        <button
                          type="button"
                          onClick={() => onOpenPrivacy && onOpenPrivacy('consent')}
                          className="text-gold hover:underline whitespace-nowrap cursor-pointer"
                        >
                          152-ФЗ
                        </button>{' '}
                        и принимаю условия{' '}
                        <button
                          type="button"
                          onClick={() => onOpenPrivacy && onOpenPrivacy('policy')}
                          className="text-gold hover:underline whitespace-nowrap cursor-pointer"
                        >
                          Политики конфиденциальности
                        </button>
                      </span>
                    </label>
                  </div>

                  {errorMessage && (
                    <div className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800/50">
                      {errorMessage}
                    </div>
                  )}

                  {/* 5. Кнопка: «Получить консультацию» (exact from Section 3 Table) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gold-btn py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 hover:scale-[1.01] transition-transform disabled:opacity-50 mt-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Отправка заявки…</span>
                      </>
                    ) : (
                      <>
                        <Shield size={18} />
                        <span>Получить консультацию</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[11px] text-faint">
              <div className="flex items-center space-x-1.5">
                <Scale size={14} className="text-gold" />
                <span>Защита по Федеральному закону № 127-ФЗ</span>
              </div>
              <div className="font-mono text-muted">ООО «Юстиция» , конфиденциально</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
