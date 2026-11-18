import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, X, Lock, FileText, CheckCircle2 } from "lucide-react";
import { C as COMPANY_INFO } from "../entry-server.js";
import "react-dom/server";
const PrivacyPolicyModal = ({
  isOpen,
  onClose,
  defaultTab = "policy"
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 15 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 15 },
          transition: { duration: 0.2, ease: "easeOut" },
          onClick: (e) => e.stopPropagation(),
          className: "dark-card max-w-3xl w-full h-[85vh] rounded-2xl border border-gold/40 flex flex-col justify-between overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-card border-b border-line-2 p-5 flex items-center justify-between shrink-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 22 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-serif font-bold text-paper", children: "Юридическая документация" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Соответствие законодательству РФ (152-ФЗ, 127-ФЗ, 38-ФЗ)" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-2 rounded-xl bg-ink text-muted hover:text-paper hover:bg-line transition-colors whitespace-nowrap",
                  "aria-label": "Закрыть",
                  children: /* @__PURE__ */ jsx(X, { size: 20 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex border-b border-line bg-panel px-5 pt-2 shrink-0", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab("policy"),
                  className: `pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${activeTab === "policy" ? "border-gold text-gold" : "border-transparent text-muted hover:text-paper"}`,
                  children: [
                    /* @__PURE__ */ jsx(Lock, { size: 15 }),
                    /* @__PURE__ */ jsx("span", { children: "Политика конфиденциальности" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab("consent"),
                  className: `pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${activeTab === "consent" ? "border-gold text-gold" : "border-transparent text-muted hover:text-paper"}`,
                  children: [
                    /* @__PURE__ */ jsx(FileText, { size: 15 }),
                    /* @__PURE__ */ jsx("span", { children: "Согласие на обработку данных (152-ФЗ)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-paper leading-relaxed select-text", children: activeTab === "policy" ? /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-b border-line pb-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-paper", children: "Политика в отношении обработки и защиты персональных данных" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-faint mt-1", children: [
                  "Оператор: ",
                  COMPANY_INFO.fullName,
                  " | ИНН: ",
                  COMPANY_INFO.inn,
                  " | ОГРН: ",
                  COMPANY_INFO.ogrn
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "1. Общие положения" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "1.1. Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ",
                  /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.fullName }),
                  " (ИНН ",
                  COMPANY_INFO.inn,
                  ", место нахождения: ",
                  COMPANY_INFO.address,
                  ")."
                ] }),
                /* @__PURE__ */ jsx("p", { children: "1.2. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "2. Основные понятия, используемые в Политике" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "2.1. ",
                  /* @__PURE__ */ jsx("strong", { children: "Персональные данные" }),
                  ": любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "2.2. ",
                  /* @__PURE__ */ jsx("strong", { children: "Обработка персональных данных" }),
                  ": любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "3. Категории обрабатываемых персональных данных" }),
                /* @__PURE__ */ jsx("p", { children: "Оператор может обрабатывать следующие персональные данные Пользователя:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-muted", children: [
                  /* @__PURE__ */ jsx("li", { children: "Фамилия, имя, отчество;" }),
                  /* @__PURE__ */ jsx("li", { children: "Номер контактного телефона;" }),
                  /* @__PURE__ */ jsx("li", { children: "Адрес электронной почты (e-mail);" }),
                  /* @__PURE__ */ jsx("li", { children: "Ориентировочная сумма задолженности и характер обязательств (предоставляемые пользователем добровольно в калькуляторе или форме);" }),
                  /* @__PURE__ */ jsx("li", { children: "Обезличенные данные о посетителях (в т.ч. файлы «cookie»)." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "4. Цели обработки персональных данных" }),
                /* @__PURE__ */ jsx("p", { children: "4.1. Предоставление Пользователю первичных юридических консультаций, разъяснений по нормам Федерального закона от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)»." }),
                /* @__PURE__ */ jsx("p", { children: "4.2. Установление с Пользователем обратной связи, включая направление уведомлений, запросов, обработку заявок и звонков дежурным юристом компании." }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "4.3. Направление служебных уведомлений на электронную почту компании: ",
                  /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.email }),
                  " для своевременного назначения консультации."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "5. Правовые основания обработки персональных данных" }),
                /* @__PURE__ */ jsx("p", { children: "Правовыми основаниями обработки персональных данных являются: Конституция РФ, Гражданский кодекс РФ, Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных», Федеральный закон от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)», согласие Пользователя на обработку персональных данных." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "6. Порядок сбора, хранения и передачи персональных данных" }),
                /* @__PURE__ */ jsx("p", { children: "6.1. Безопасность персональных данных обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных." }),
                /* @__PURE__ */ jsx("p", { children: "6.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в рамках договора на представление интересов в суде." }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "6.3. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на адрес: ",
                  /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.email }),
                  " с пометкой «Отзыв согласия на обработку персональных данных»."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "7. Реквизиты оператора персональных данных" }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-ink border border-line-2 space-y-1 text-xs text-muted", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Наименование:" }),
                    " ",
                    COMPANY_INFO.fullName
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "ИНН:" }),
                    " ",
                    COMPANY_INFO.inn,
                    " | ",
                    /* @__PURE__ */ jsx("strong", { children: "КПП:" }),
                    " ",
                    COMPANY_INFO.kpp
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "ОГРН:" }),
                    " ",
                    COMPANY_INFO.ogrn
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Юридический и фактический адрес:" }),
                    " ",
                    COMPANY_INFO.legalAddress
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Телефон:" }),
                    " ",
                    COMPANY_INFO.phones[0]
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "E-mail для обращений и запросов:" }),
                    " ",
                    COMPANY_INFO.email
                  ] })
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-b border-line pb-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-paper", children: "Согласие на обработку персональных данных" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-faint mt-1", children: "В соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»" })
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Пользователь, отправляя любую форму обратной связи, заявку на консультацию, расчет калькулятора или сообщение на веб-сайте компании ",
                /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.fullName }),
                " (ИНН: ",
                COMPANY_INFO.inn,
                "), свободно, своей волей и в своем интересе выражает безусловное согласие на обработку своих персональных данных Оператором:"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-ink border border-line-2 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Оператор:" }),
                  " ",
                  COMPANY_INFO.fullName,
                  " (ИНН ",
                  COMPANY_INFO.inn,
                  ", ОГРН ",
                  COMPANY_INFO.ogrn,
                  ")"
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Адрес:" }),
                  " ",
                  COMPANY_INFO.address
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Email:" }),
                  " ",
                  COMPANY_INFO.email
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "Перечень персональных данных, на обработку которых дается согласие:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-muted", children: [
                  /* @__PURE__ */ jsx("li", { children: "Имя (или Ф.И.О.);" }),
                  /* @__PURE__ */ jsx("li", { children: "Номер мобильного телефона;" }),
                  /* @__PURE__ */ jsx("li", { children: "Сведения о сумме задолженности и характере кредитных обязательств, указанные в заявке." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-paper", children: "Цели обработки персональных данных:" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-muted", children: [
                  /* @__PURE__ */ jsx("li", { children: "Предоставление бесплатной первичной юридической консультации по вопросу списания задолженностей и банкротства физических лиц по ФЗ № 127-ФЗ;" }),
                  /* @__PURE__ */ jsx("li", { children: "Связь с Пользователем посредством телефонного звонка или мессенджера дежурным юристом;" }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    "Направление уведомления о поступившей заявке на почту ",
                    /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.email }),
                    "."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Настоящее согласие действует со дня его предоставления до дня отзыва в письменной форме путем направления письма на электронный адрес: ",
                /* @__PURE__ */ jsx("strong", { children: COMPANY_INFO.email }),
                "."
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-card border-t border-line p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-faint", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "text-ok" }),
                /* @__PURE__ */ jsx("span", { children: "Оператор строго соблюдает требования 152-ФЗ РФ" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "gold-btn px-6 py-2 rounded-xl text-xs font-bold w-full sm:w-auto whitespace-nowrap",
                  children: "Понятно, закрыть"
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
};
export {
  PrivacyPolicyModal
};
