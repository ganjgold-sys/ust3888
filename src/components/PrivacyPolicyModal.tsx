import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'policy' | 'consent';
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'policy'
}) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'consent'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="dark-card max-w-3xl w-full h-[85vh] rounded-2xl border border-gold/40 flex flex-col justify-between overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-card border-b border-line-2 p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-paper">
                    Юридическая документация
                  </h3>
                  <p className="text-xs text-muted">
                    Соответствие законодательству РФ (152-ФЗ, 127-ФЗ, 38-ФЗ)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-ink text-muted hover:text-paper hover:bg-line transition-colors whitespace-nowrap"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-line bg-panel px-5 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('policy')}
                className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'policy'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-paper'
                }`}
              >
                <Lock size={15} />
                <span>Политика конфиденциальности</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('consent')}
                className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'consent'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-paper'
                }`}
              >
                <FileText size={15} />
                <span>Согласие на обработку данных (152-ФЗ)</span>
              </button>
            </div>

            {/* Scrollable Document Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-paper leading-relaxed select-text">
              {activeTab === 'policy' ? (
                <div className="space-y-5">
                  <div className="border-b border-line pb-4">
                    <h4 className="text-base font-bold text-paper">
                      Политика в отношении обработки и защиты персональных данных
                    </h4>
                    <p className="text-xs text-faint mt-1">
                      Оператор: {COMPANY_INFO.fullName} | ИНН: {COMPANY_INFO.inn} | ОГРН: {COMPANY_INFO.ogrn}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">1. Общие положения</h5>
                    <p>
                      1.1. Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые <strong>{COMPANY_INFO.fullName}</strong> (ИНН {COMPANY_INFO.inn}, место нахождения: {COMPANY_INFO.address}).
                    </p>
                    <p>
                      1.2. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">2. Основные понятия, используемые в Политике</h5>
                    <p>
                      2.1. <strong>Персональные данные</strong>: любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта.
                    </p>
                    <p>
                      2.2. <strong>Обработка персональных данных</strong>: любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">3. Категории обрабатываемых персональных данных</h5>
                    <p>
                      Оператор может обрабатывать следующие персональные данные Пользователя:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-muted">
                      <li>Фамилия, имя, отчество;</li>
                      <li>Номер контактного телефона;</li>
                      <li>Адрес электронной почты (e-mail);</li>
                      <li>Ориентировочная сумма задолженности и характер обязательств (предоставляемые пользователем добровольно в калькуляторе или форме);</li>
                      <li>Обезличенные данные о посетителях (в т.ч. файлы «cookie»).</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">4. Цели обработки персональных данных</h5>
                    <p>
                      4.1. Предоставление Пользователю первичных юридических консультаций, разъяснений по нормам Федерального закона от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)».
                    </p>
                    <p>
                      4.2. Установление с Пользователем обратной связи, включая направление уведомлений, запросов, обработку заявок и звонков дежурным юристом компании.
                    </p>
                    <p>
                      4.3. Направление служебных уведомлений на электронную почту компании: <strong>{COMPANY_INFO.email}</strong> для своевременного назначения консультации.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">5. Правовые основания обработки персональных данных</h5>
                    <p>
                      Правовыми основаниями обработки персональных данных являются: Конституция РФ, Гражданский кодекс РФ, Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных», Федеральный закон от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)», согласие Пользователя на обработку персональных данных.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">6. Порядок сбора, хранения и передачи персональных данных</h5>
                    <p>
                      6.1. Безопасность персональных данных обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
                    </p>
                    <p>
                      6.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в рамках договора на представление интересов в суде.
                    </p>
                    <p>
                      6.3. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на адрес: <strong>{COMPANY_INFO.email}</strong> с пометкой «Отзыв согласия на обработку персональных данных».
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">7. Реквизиты оператора персональных данных</h5>
                    <div className="p-4 rounded-xl bg-ink border border-line-2 space-y-1 text-xs text-muted">
                      <div><strong>Наименование:</strong> {COMPANY_INFO.fullName}</div>
                      <div><strong>ИНН:</strong> {COMPANY_INFO.inn} | <strong>КПП:</strong> {COMPANY_INFO.kpp}</div>
                      <div><strong>ОГРН:</strong> {COMPANY_INFO.ogrn}</div>
                      <div><strong>Юридический и фактический адрес:</strong> {COMPANY_INFO.legalAddress}</div>
                      <div><strong>Телефон:</strong> {COMPANY_INFO.phones[0]}</div>
                      <div><strong>E-mail для обращений и запросов:</strong> {COMPANY_INFO.email}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="border-b border-line pb-4">
                    <h4 className="text-base font-bold text-paper">
                      Согласие на обработку персональных данных
                    </h4>
                    <p className="text-xs text-faint mt-1">
                      В соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»
                    </p>
                  </div>

                  <p>
                    Пользователь, отправляя любую форму обратной связи, заявку на консультацию, расчет калькулятора или сообщение на веб-сайте компании <strong>{COMPANY_INFO.fullName}</strong> (ИНН: {COMPANY_INFO.inn}), свободно, своей волей и в своем интересе выражает безусловное согласие на обработку своих персональных данных Оператором:
                  </p>

                  <div className="p-4 rounded-xl bg-ink border border-line-2 space-y-1 text-xs">
                    <div><strong>Оператор:</strong> {COMPANY_INFO.fullName} (ИНН {COMPANY_INFO.inn}, ОГРН {COMPANY_INFO.ogrn})</div>
                    <div><strong>Адрес:</strong> {COMPANY_INFO.address}</div>
                    <div><strong>Email:</strong> {COMPANY_INFO.email}</div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">Перечень персональных данных, на обработку которых дается согласие:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-muted">
                      <li>Имя (или Ф.И.О.);</li>
                      <li>Номер мобильного телефона;</li>
                      <li>Сведения о сумме задолженности и характере кредитных обязательств, указанные в заявке.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-paper">Цели обработки персональных данных:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-muted">
                      <li>Предоставление бесплатной первичной юридической консультации по вопросу списания задолженностей и банкротства физических лиц по ФЗ № 127-ФЗ;</li>
                      <li>Связь с Пользователем посредством телефонного звонка или мессенджера дежурным юристом;</li>
                      <li>Направление уведомления о поступившей заявке на почту <strong>{COMPANY_INFO.email}</strong>.</li>
                    </ul>
                  </div>

                  <p>
                    Настоящее согласие действует со дня его предоставления до дня отзыва в письменной форме путем направления письма на электронный адрес: <strong>{COMPANY_INFO.email}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-card border-t border-line p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2 text-xs text-faint">
                <CheckCircle2 size={16} className="text-ok" />
                <span>Оператор строго соблюдает требования 152-ФЗ РФ</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="gold-btn px-6 py-2 rounded-xl text-xs font-bold w-full sm:w-auto whitespace-nowrap"
              >
                Понятно, закрыть
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
