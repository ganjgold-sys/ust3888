import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Scale, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { Logo } from './Logo';
import { trackEvent } from '../services/analytics';

interface FooterProps {
  onOpenConsultation?: () => void;
  onOpenPrivacy?: (tab: 'policy' | 'consent') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenPrivacy }) => {
  return (
    <footer className="bg-ink border-t border-line pt-16 pb-12 text-xs text-faint" itemScope itemType="http://schema.org/LegalService">
      <div className="site-container space-y-10">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info & Legal Requisites */}
          <div className="space-y-3">
            <a href="/" className="inline-block whitespace-nowrap" aria-label="Юстиция, на главную">
              <Logo variant="light" showSubtitle={true} />
            </a>
            <p className="text-muted leading-relaxed" itemProp="description">
              Юридическая компания в Иркутске. Специализируемся на защите прав заемщиков и банкротстве физических лиц по ФЗ № 127-ФЗ.
            </p>
            <div className="p-3 rounded-xl bg-panel border border-line space-y-1 text-[11px] text-muted">
              <div className="font-bold text-paper">{COMPANY_INFO.fullName}</div>
              <div>ИНН: <span className="font-mono text-gold font-semibold">{COMPANY_INFO.inn}</span></div>
              <div>ОГРН: <span className="font-mono">{COMPANY_INFO.ogrn}</span>, КПП: <span className="font-mono">{COMPANY_INFO.kpp}</span></div>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-sm font-serif font-bold text-paper mb-3">Навигация</div>
            <ul className="space-y-2 text-muted">
              <li><a href="#directions" className="hover:text-gold transition-colors whitespace-nowrap">Кому мы помогаем</a></li>
              <li><a href="#process" className="hover:text-gold transition-colors whitespace-nowrap">Как проходит процедура</a></li>
              <li><a href="#price" className="hover:text-gold transition-colors whitespace-nowrap">Стоимость и условия</a></li>
              <li><a href="#cases" className="hover:text-gold transition-colors whitespace-nowrap">Практика в суде Иркутска</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors whitespace-nowrap">Отзывы клиентов</a></li>
              <li><a href="#team" className="hover:text-gold transition-colors whitespace-nowrap">Команда и ответственность</a></li>
              <li><a href="#contacts" className="hover:text-gold transition-colors whitespace-nowrap">Контакты и адрес офиса</a></li>
            </ul>
          </div>

          {/* Legal references */}
          <div>
            <div className="text-sm font-serif font-bold text-paper mb-3">Законодательство РФ</div>
            <ul className="space-y-2 text-muted">
              <li className="flex items-start space-x-1.5">
                <Scale size={14} className="text-gold shrink-0 mt-0.5" />
                <span>Федеральный закон № 127-ФЗ «О банкротстве»</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <ShieldCheck size={14} className="text-gold shrink-0 mt-0.5" />
                <span>Федеральный закон № 152-ФЗ «О персональных данных»</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <FileText size={14} className="text-gold shrink-0 mt-0.5" />
                <span>Статья 446 ГПК РФ (Иммунитет единственного жилья)</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Scale size={14} className="text-gold shrink-0 mt-0.5" />
                <span>Федеральный закон № 230-ФЗ (Защита от коллекторов)</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="text-sm font-serif font-bold text-paper mb-3">Контакты в Иркутске</div>
            <div className="space-y-2.5 text-muted">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${COMPANY_INFO.rawPhone}`}
 onClick={() => trackEvent('phone_click')} className="hover:text-gold font-bold text-paper font-mono">
                  {COMPANY_INFO.phones[0]}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gold text-xs font-mono whitespace-nowrap">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="text-[11px] text-faint">Режим работы: {COMPANY_INFO.workingHours}</div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Compliance Statement */}
        <div className="pt-8 border-t border-raised space-y-3 leading-relaxed text-[11px] text-bone-mute">
          <p>
            * Решение о признании гражданина банкротом и полном освобождении от исполнения обязательств (списании задолженности) принимается исключительно Арбитражным судом Иркутской области в соответствии с Федеральным законом от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)».
          </p>
          <p>
            Информация, размещенная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями ч. 2 ст. 437 Гражданского кодекса РФ. Услуги оказываются ООО «Юстиция» (ИНН 3811452733, ОГРН 1213800018590).
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-surface text-faint">
            <div>
              © {new Date().getFullYear()} {COMPANY_INFO.fullName} (ИНН {COMPANY_INFO.inn}). Все права защищены.
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <button
                type="button"
                onClick={() => onOpenPrivacy && onOpenPrivacy('policy')}
                className="hover:text-gold underline underline-offset-2 transition-colors whitespace-nowrap"
              >
                Политика конфиденциальности
              </button>
              <button
                type="button"
                onClick={() => onOpenPrivacy && onOpenPrivacy('consent')}
                className="hover:text-gold underline underline-offset-2 transition-colors whitespace-nowrap"
              >
                Согласие на обработку данных (152-ФЗ)
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
