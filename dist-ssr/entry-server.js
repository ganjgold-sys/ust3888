import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useState, useEffect, Suspense, createContext, useContext, useRef, useMemo, lazy } from "react";
import { MapPin, Clock, Phone, X, Menu, Briefcase, ArrowRight, User, ShieldCheck, Check, Search, Home, ChevronDown, Play, Pause, ArrowDown, AlertCircle, FileSignature, ShieldOff, Car, Wallet, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Quote, HelpCircle, PhoneCall, Building2, Mail, MessageCircle, Send, Shield, CheckCircle2, Loader2, Scale, FileText } from "lucide-react";
import { motion } from "motion/react";
const team1Photo = "/assets/team-1-9Pi5zHab.jpg";
const team2Photo = "/assets/team-2-CvMIiI2D.jpg";
const team3Photo = "/assets/team-3-DYR4VcUb.jpg";
const team4Photo = "/assets/team-4-D9hQ85th.jpg";
const COMPANY_INFO = {
  name: "Юстиция",
  fullName: "ООО «Юстиция»",
  slogan: "Юридическая помощь и законное списание долгов в Иркутске",
  city: "г. Иркутск",
  address: "г. Иркутск, ул. Верхняя Набережная, 167/8",
  phones: ["+7 (914) 938-54-44"],
  rawPhone: "+79149385444",
  whatsappUrl: "https://wa.me/79149385444?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%20%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BB%D0%B3%D0%BE%D0%B2",
  telegramUrl: "https://t.me/AM_ARBITR",
  maxUrl: "https://max.ru/u/f9LHodD0cOL9KIkEYpk-FYraOdzaGKCfLYNw7y5Zzg2hZ5Ba1gGXd_mKO4A",
  workingHours: "10:00 - 19:00",
  email: "Dovod38@gmail.com",
  inn: "3811452733",
  ogrn: "1213800018590",
  kpp: "381101001",
  legalAddress: "664000, Иркутская область, г. Иркутск, ул. Верхняя Набережная, 167/8",
  experienceText: "Ведущие юристы Иркутска",
  stats: {
    totalCasesWon: 980,
    totalWrittenOffDebts: "750 млн ₽",
    successRate: "индивидуально",
    avgSavings: "1.2 млн ₽"
  },
  advantages: [
    {
      title: "Ведущие юристы Иркутска",
      description: "В штате только квалифицированные юристы по банкротству с фундаментальным опытом работы в Арбитражном суде Иркутской области."
    },
    {
      title: "Связь с ведущим юристом",
      description: "У дела есть ведущий юрист: он отвечает на вопросы по вашему делу в рабочие часы и предупреждает о сроках заранее."
    },
    {
      title: "Доступная помощь очно и онлайн",
      description: "Проводим личные приемы в комфортном офисе в Иркутске на Верхней Набережной или ведем процесс дистанционно по всей области."
    },
    {
      title: "Первые шаги при первом обращении",
      description: "Сразу составляем план действий, перенаправляем звонки коллекторов на наш юридический отдел и защищаем ваши права."
    },
    {
      title: "Официальная рассрочка оплаты",
      description: "Честная фиксированная стоимость в договоре без скрытых платежей. Удобная рассрочка от 8 000 ₽/мес."
    }
  ]
};
const CASE_STUDIES_DATA = [
  {
    id: "case-andrey-ch",
    caseNumber: "Дело № А19-1501/2025",
    clientName: "Андрей Ч., г. Иркутск",
    initialDebt: "1 190 000 ₽",
    writtenOffDebt: "1 190 000 ₽",
    duration: "6 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 5,
    judgeResult: "Машину сохранили и клиент освобожден от долгов.",
    category: "авто и кредиты",
    audience: "person",
    details: "Ситуация: Андрей обратился с запросом на банкротство и сохранение имущества — автомобиль. Результат: Машину сохранили и клиент освобожден от долгов. Процедура завершена с полным списанием задолженности более 1 190 000 ₽ в Арбитражном суде Иркутской области."
  },
  {
    id: "case-sergey-k",
    caseNumber: "Дело № А19-24010/2024",
    clientName: "Сергей К., г. Иркутск",
    initialDebt: "847 000 ₽",
    writtenOffDebt: "847 000 ₽",
    duration: "5.5 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 4,
    judgeResult: "Процедура завершена, опубликовано сообщение о завершении реализации имущества. Долг списан в полном объёме.",
    category: "кредиты",
    audience: "person",
    details: "Ситуация: Сергей оказался в трудной финансовой ситуации и больше не мог справиться с задолженностью. Результат: Процедура завершена, опубликовано сообщение о завершении реализации имущества. Долг списан в полном объёме (847 000 ₽)."
  },
  {
    id: "case-elena-n",
    caseNumber: "Дело № А78-2915/2025",
    clientName: "Елена Н., г. Чита",
    initialDebt: "2 320 000 ₽",
    writtenOffDebt: "2 320 000 ₽",
    duration: "6 месяцев",
    courtName: "Арбитражный суд Забайкальского края",
    creditorsCount: 7,
    judgeResult: "Процедура завершена успешно. Все долги списаны.",
    category: "кредиты и дети",
    audience: "person",
    details: "Ситуация: Елена больше не могла платить по кредитам и содержать детей. Результат: Процедура завершена успешно. Все долги списаны в полном объёме (2 320 000 ₽), доходы семьи защищены."
  },
  {
    id: "case-lodon-s",
    caseNumber: "Дело № А78-7716/2025",
    clientName: "Лодон С., г. Чита (Забайкальский край / Бурятия)",
    initialDebt: "1 480 000 ₽",
    writtenOffDebt: "1 480 000 ₽",
    duration: "5 месяцев",
    courtName: "Арбитражный суд Забайкальского края",
    creditorsCount: 5,
    judgeResult: "Процедура завершена с освобождением от всех долговых обязательств.",
    category: "сокращение",
    audience: "person",
    details: "Ситуация: Лодон оказался в трудной ситуации в связи с сокращением на работе. Результат: Процедура завершена с освобождением от всех долговых обязательств."
  },
  {
    id: "case-irina-z",
    caseNumber: "Дело № А19-13896/2024",
    clientName: "Ирина З., г. Иркутск",
    initialDebt: "10 598 330 ₽",
    writtenOffDebt: "10 598 330 ₽",
    duration: "7.5 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 6,
    judgeResult: "Сохранили жилье. Долги списаны в полном объеме.",
    category: "бизнес и жилье",
    audience: "business",
    details: "Ситуация: Ирина обратилась с запросом разрешения последствий неудачной продажи бизнеса с возможным сохранением жилья. Результат: Сохранили жилье. Долги списаны в полном объеме (10 598 330 ₽)."
  },
  {
    id: "case-sergey-ip",
    caseNumber: "Дело № А19-1596/2025",
    clientName: "Сергей К. (бывший ИП), г. Иркутск",
    initialDebt: "4 100 000 ₽",
    writtenOffDebt: "4 100 000 ₽",
    duration: "8 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 4,
    judgeResult: "Освободить от всех задолженностей перед ФНС Иркутской области и коммерческими банками.",
    category: "ип",
    audience: "business",
    details: "Из-за кассового разрыва ИП закрылось с долгами перед поставщиками и налоговой. Команда «Юстиции» доказала добросовестность предпринимателя и защитила его от субсидиарной ответственности."
  },
  {
    id: "case-pavel-ooo",
    caseNumber: "Дело № А19-24969/2024",
    clientName: "Павел Е. (ООО), г. Иркутск",
    initialDebt: "5 600 000 ₽",
    writtenOffDebt: "5 600 000 ₽",
    duration: "8.5 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 4,
    judgeResult: "Завершить конкурсное производство. Списать задолженность.",
    category: "бизнес",
    audience: "business",
    details: "Защита руководства компании от субсидиарной ответственности и полное списание долгов перед поставщиками."
  },
  {
    id: "case-anna-biz",
    caseNumber: "Дело № А19-1502/2025",
    clientName: "Анна П. (ИП), г. Шелехов",
    initialDebt: "780 000 ₽",
    writtenOffDebt: "780 000 ₽",
    duration: "5.5 месяцев",
    courtName: "Арбитражный суд Иркутской области",
    creditorsCount: 3,
    judgeResult: "Применить положения статьи 213.28 ФЗ-127 и списать всю сумму задолженности.",
    category: "налоги",
    audience: "business",
    details: "Задолженность по предпринимательской деятельности и налогам. Процедура завершена с полным списанием."
  }
];
const TEAM_MEMBERS_DATA = [
  {
    id: "team-1",
    name: "Стельмакова Татьяна Эдуардовна",
    role: "Юрист",
    experienceYears: 8,
    specialization: "Первичный правовой анализ, подготовка справок и документов к судебному заседанию",
    casesCount: 320,
    photoUrl: team1Photo,
    description: "Татьяна помогает Вам на первоначальном этапе. Подготавливает документы и справки. Изучает сведения о долгах, проверяет, какие нормы закона относятся к ситуации. Передает Ваше дело о банкротстве для судебного заседания.",
    responsibility: "Подготовка документов и справок, первичный анализ сведений о долгах, передача дела в суд.",
    contacts: "Связь по подготовке документов и статусу справок"
  },
  {
    id: "team-2",
    name: "Михалев Иван Сергеевич",
    role: "Судебный юрист",
    experienceYears: 10,
    specialization: "Судебное представительство физических лиц и ИП в Арбитражном суде",
    casesCount: 410,
    photoUrl: team2Photo,
    description: "Сопровождает процедуру банкротства физических лиц и предпринимателей. Представляет Ваши интересы в суде.",
    responsibility: "Судебное представительство, процессуальное сопровождение и защита интересов в суде.",
    contacts: "Участие в заседаниях без обязательного личного присутствия клиента"
  },
  {
    id: "team-3",
    name: "Сафаров Бехруз Джумаевич",
    role: "Ведущий юрист по банкротству",
    experienceYears: 12,
    specialization: "Комплексное сопровождение процедур банкротства граждан и бизнеса",
    casesCount: 480,
    photoUrl: team3Photo,
    description: "Специализируется на комплексном сопровождении процедур банкротства. Помогает как предпринимателям, так и просто людям, оказавшимся в сложной финансовой ситуации.",
    quote: "«В банкротстве не бывает стандартных кейсов. Моя цель — найти нестандартное, но строго законное решение, которое защитит интересы клиента даже в самой запутанной ситуации».",
    responsibility: "Комплексное сопровождение дел граждан и предпринимателей, выбор стратегии защиты в сложных ситуациях.",
    contacts: "Личная связь по ходу ведения дела и антикризисным решениям"
  },
  {
    id: "team-4",
    name: "Лукин Алексей Ильич",
    role: "Руководитель направления банкротства физических лиц и ИП",
    experienceYears: 10,
    specialization: "Руководство процедурами банкротства физических лиц и ИП, контроль работы арбитражного управляющего",
    casesCount: 450,
    photoUrl: team4Photo,
    description: "Действующий арбитражный управляющий с опытом 10 лет. Контролирует процесс на протяжении всей процедуры в суде.",
    responsibility: "Комплексное сопровождение дел граждан и предпринимателей, антикризисное консультирование.",
    contacts: "Рабочий чат и очные консультации в офисе"
  }
];
const Logo = ({
  variant = "light",
  className = "",
  showSubtitle = true
}) => {
  const isDarkBg = variant === "light" || variant === "gold";
  const textColor = isDarkBg ? "text-bone" : "text-bone-ink";
  const subtitleColor = isDarkBg ? "text-muted" : "text-bone-mute";
  const featherColor = variant === "gold" ? "var(--color-gold)" : isDarkBg ? "var(--color-gold-soft)" : "var(--color-bone-mute)";
  const strokeLineColor = variant === "gold" ? "var(--color-gold)" : isDarkBg ? "var(--color-gold)" : "var(--color-bone-mute)";
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center space-x-3 select-none ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "relative shrink-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        "aria-hidden": "true",
        className: "w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 hover:scale-105",
        viewBox: "0 0 120 120",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: "4",
              y: "4",
              width: "112",
              height: "112",
              rx: "24",
              fill: isDarkBg ? "rgba(38, 30, 24, 0.6)" : "rgba(245, 240, 235, 0.8)",
              stroke: featherColor,
              strokeWidth: "2",
              strokeOpacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M86 22C68 26 44 44 32 68C38 65 48 62 56 63C42 72 34 82 28 88C48 84 66 72 80 54C92 40 92 28 86 22Z",
              fill: featherColor
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M28 88L92 24",
              stroke: isDarkBg ? "var(--color-paper-2)" : "var(--color-bone)",
              strokeWidth: "3.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M48 50L38 42M60 38L52 30M70 30L64 22",
              stroke: isDarkBg ? "var(--color-card)" : "var(--color-bone)",
              strokeWidth: "2",
              strokeLinecap: "round",
              opacity: "0.6"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M22 92C35 90 60 90 102 92",
              stroke: strokeLineColor,
              strokeWidth: "3.5",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `font-serif text-xl sm:text-2xl font-black leading-none ${textColor}`,
          children: "Юстиция"
        }
      ),
      showSubtitle && /* @__PURE__ */ jsx(
        "div",
        {
          className: `text-xs font-sans font-semibold mt-1 ${subtitleColor}`,
          children: "Юридическая компания"
        }
      )
    ] })
  ] });
};
const Navbar = ({ onOpenConsultation }) => {
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Кому помогаем", href: "#directions" },
    { name: "Этапы", href: "#process" },
    { name: "Стоимость", href: "#price" },
    { name: "Кейсы", href: "#cases" },
    { name: "Команда", href: "#team" },
    { name: "Контакты", href: "#contacts" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-panel border-b border-line/60 text-xs text-muted py-1.5 px-4 hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "site-container flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5 text-gold", children: [
        /* @__PURE__ */ jsx(MapPin, { size: 13, className: "text-gold" }),
        /* @__PURE__ */ jsx("span", { children: COMPANY_INFO.address })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5 text-muted", children: [
        /* @__PURE__ */ jsx(Clock, { size: 13 }),
        /* @__PURE__ */ jsx("span", { children: COMPANY_INFO.workingHours })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("nav", { className: `transition-colors duration-300 ${isScrolled ? "bg-ground border-b border-line py-2.5 shadow-lg" : "bg-ground py-3.5 border-b border-line/50"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "site-container flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center group whitespace-nowrap", "aria-label": "Юстиция, на главную", children: /* @__PURE__ */ jsx(Logo, { variant: "light" }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center space-x-7", children: navLinks.map((link) => /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-xs font-semibold text-paper hover:text-paper transition-colors relative py-1 after:content-(--nav-underline-content) after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-colors whitespace-nowrap",
            children: link.name
          },
          link.name
        )) }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex items-center space-x-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onOpenConsultation,
            className: "gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 14 }),
              /* @__PURE__ */ jsx("span", { children: COMPANY_INFO.phones[0] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onOpenConsultation,
              className: "p-2 rounded-lg bg-raised border border-line-2 text-gold whitespace-nowrap",
              children: /* @__PURE__ */ jsx(Phone, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "p-2 rounded-lg bg-bone-ink border border-line-2 text-paper hover:text-gold",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
            }
          )
        ] })
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden bg-ground border-b border-line px-4 pt-3 pb-5 space-y-2 mt-2 overflow-hidden animate-[slideDown_0.2s_ease-out]", children: [
        navLinks.map((link) => /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            onClick: () => setIsMobileMenuOpen(false),
            className: "block py-2 text-sm font-medium text-paper hover:text-gold border-b border-raised",
            children: link.name
          },
          link.name
        )),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setIsMobileMenuOpen(false);
              onOpenConsultation();
            },
            className: "w-full gold-btn py-2.5 rounded-xl text-center font-bold text-xs",
            children: "Бесплатная консультация"
          }
        ) })
      ] })
    ] })
  ] });
};
const STORAGE_KEY = "yustitsiya_analytics";
function trackEvent(event, payload = {}) {
  const record = {
    event,
    ...payload,
    page: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    if (typeof window.ym === "function" && typeof window.YM_COUNTER_ID === "number") {
      window.ym(window.YM_COUNTER_ID, "reachGoal", event, payload);
    }
  } catch {
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(record);
    }
  } catch {
  }
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-200)));
  } catch {
  }
}
const themisImg1000 = "/assets/themis-1000-S71of0Xl.webp";
const themisImg640 = "/assets/themis-640-CglJI8sU.webp";
const Hero = ({ onOpenConsultation, onSelectDirection }) => {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-ink pt-24 pb-14 sm:pt-28 sm:pb-20 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,160,89,0.12),transparent_50%)]"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "site-container relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-line-2 bg-surface/70 p-6 sm:p-10 lg:p-12", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-gold shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold", children: "Юридическая компания «Юстиция» · Иркутск" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.06 },
              className: "mt-7 sm:mt-9 pl-5 sm:pl-7 border-l-2 border-gold/50",
              children: [
                /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold text-paper leading-[0.95] tracking-[-0.02em] text-[52px] sm:text-[72px] lg:text-[88px]", children: "Банкротство" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-gold text-[11px] sm:text-sm font-semibold uppercase tracking-[0.16em]", children: "ИП и физических лиц" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.12 },
              className: "mt-8 sm:mt-10",
              children: [
                /* @__PURE__ */ jsxs("p", { className: "font-serif text-[26px] sm:text-[34px] leading-[1.15] text-paper", children: [
                  "Долг можно списать законно.",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "text-gold", children: "Имущество — сохранить." })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-[15px] sm:text-lg text-faint leading-relaxed", children: "Работаем по 127-ФЗ. Стоимость фиксируем в договоре, судебные расходы называем заранее." })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.18 },
              className: "mt-9 sm:mt-10",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-faint mb-3", children: "Выберите свою ситуацию" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onSelectDirection?.("business"),
                      className: "group h-full flex flex-col text-left rounded-xl border border-gold/50 bg-gold/[0.07] hover:bg-gold/[0.13] hover:border-gold transition-colors p-4 sm:p-5",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsx(Briefcase, { size: 20, className: "text-gold" }),
                          /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "text-gold transition-transform group-hover:translate-x-1" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "mt-4 block font-serif font-bold text-paper text-lg sm:text-xl leading-tight", children: "Индивидуальные предприниматели" }),
                        /* @__PURE__ */ jsx("span", { className: "mt-1.5 block text-sm text-gold leading-snug", children: "У меня долги бизнеса" }),
                        /* @__PURE__ */ jsx("span", { className: "mt-auto pt-4 text-xs text-faint", children: "7 вопросов с ответами" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onSelectDirection?.("person"),
                      className: "group h-full flex flex-col text-left rounded-xl border border-line-2 bg-surface hover:bg-raised hover:border-gold/50 transition-colors p-4 sm:p-5",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsx(User, { size: 20, className: "text-paper/70" }),
                          /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "text-faint transition-transform group-hover:translate-x-1" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "mt-4 block font-serif font-bold text-paper text-lg sm:text-xl leading-tight", children: "Физические лица" }),
                        /* @__PURE__ */ jsx("span", { className: "mt-1.5 block text-sm text-faint leading-snug", children: "У меня долги по кредитам" }),
                        /* @__PURE__ */ jsx("span", { className: "mt-auto pt-4 text-xs text-faint", children: "7 вопросов с ответами" })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4, delay: 0.24 },
            className: "mt-6 flex flex-col sm:flex-row gap-3",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    trackEvent("cta_click", { placement: "первый экран" });
                    onOpenConsultation();
                  },
                  className: "gold-btn px-7 py-4 rounded-xl text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 16 }),
                    "Бесплатная консультация"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `tel:${COMPANY_INFO.rawPhone}`,
                  onClick: () => trackEvent("phone_click", { placement: "первый экран" }),
                  className: "px-7 py-4 rounded-xl border border-line-2 text-paper text-sm sm:text-base font-bold inline-flex items-center justify-center hover:border-gold hover:text-gold transition-colors tabular-nums",
                  children: COMPANY_INFO.phones[0]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 flex items-center gap-2 text-[13px] sm:text-sm text-faint", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 15, className: "text-gold shrink-0" }),
          "Консультация бесплатна и не обязывает заключать договор"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "hidden lg:flex lg:col-span-5 justify-center items-center",
          children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-sm xl:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_8px_48px_rgba(0,0,0,0.6)] bg-panel group", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: themisImg1000,
                srcSet: `${themisImg640} 640w, ${themisImg1000} 1000w`,
                sizes: "(max-width: 1280px) 380px, 440px",
                width: 1e3,
                height: 558,
                alt: "Статуэтка Фемиды с весами и мечом в юридической библиотеке",
                fetchPriority: "high",
                decoding: "async",
                loading: "eager",
                className: "w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.03]"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-black/30 pointer-events-none" })
          ] })
        }
      )
    ] }) })
  ] });
};
const MobileCallBar = ({ onOpenConsultation }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-line-2 bg-ground transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`,
      style: { paddingBottom: "env(safe-area-inset-bottom)" },
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-2 p-2.5", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${COMPANY_INFO.rawPhone}`,
            onClick: () => trackEvent("phone_click", { placement: "мобильная панель" }),
            className: "flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-gold/60 text-paper text-sm font-bold",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              "Позвонить"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onOpenConsultation,
            className: "flex-1 gold-btn py-3 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
              "Консультация"
            ]
          }
        )
      ] })
    }
  );
};
const U = (n) => `calc(var(--u)*${n})`;
const MobileHero = ({ onSelectDirection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const phone = COMPANY_INFO.phones[0];
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const go = (direction) => (event) => {
    event.preventDefault();
    setMenuOpen(false);
    trackEvent("cta_click", { placement: "первый экран, мобильный", direction });
    onSelectDirection?.(direction);
  };
  const links = [
    { href: "#directions", label: "Кому помогаем" },
    { href: "#process", label: "Этапы" },
    { href: "#price", label: "Стоимость" },
    { href: "#cases", label: "Кейсы" },
    { href: "#contacts", label: "Контакты" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "mt", children: [
    /* @__PURE__ */ jsxs("header", { className: "mt-bar", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "mt-tile mt-logo",
          href: "/",
          "aria-label": "Юстиция, на главную",
          style: { left: U(23.62), top: U(12.85), width: U(37), height: U(36) },
          children: /* @__PURE__ */ jsx("svg", { style: { left: U(2.49), top: U(2.48), width: U(32.33), height: U(31.08) }, className: "mt-ic", viewBox: "0 0 32.33 31.08", fill: "#e5c691", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M27.41 3.68 27.20 3.57 26.89 3.68 26.37 4.20 26.06 4.20 25.64 3.68 25.33 3.68 25.02 3.89 24.30 3.89 24.19 3.99 23.26 4.09 22.43 4.40 21.71 4.51 21.40 4.71 20.36 5.03 19.95 5.34 19.53 5.34 19.22 5.65 18.70 5.85 17.56 6.58 16.01 8.03 15.70 8.55 14.87 8.55 13.42 9.69 12.69 10.41 12.38 11.03 12.07 11.35 11.76 12.28 11.55 12.38 11.45 12.07 11.24 11.97 10.31 13.00 9.69 14.04 9.17 14.66 9.07 14.97 8.76 15.28 8.65 15.70 8.24 16.22 8.03 16.94 7.82 17.15 7.62 17.67 7.62 17.87 8.03 17.87 9.58 16.94 10.62 16.63 11.66 16.01 11.97 16.01 12.80 15.59 13.21 15.59 13.31 15.70 13.00 16.32 12.69 16.53 10.72 18.60 9.48 19.63 5.13 24.30 4.51 25.33 4.20 25.54 3.89 25.54 3.78 25.44 3.26 25.44 3.16 25.54 3.26 25.96 3.57 26.06 3.89 26.37 3.89 26.78 4.20 26.89 4.40 26.16 4.82 25.85 5.13 25.85 5.85 26.16 6.06 26.06 10.31 25.96 10.41 25.85 12.28 25.75 12.38 25.64 14.04 25.64 14.14 25.75 14.76 25.75 14.87 25.85 18.70 25.85 18.81 25.75 19.43 25.75 19.53 25.85 19.84 25.75 20.05 25.85 20.36 25.75 22.23 25.75 22.33 25.85 22.85 25.85 22.95 25.75 23.99 25.75 24.09 25.85 25.64 25.85 25.75 25.96 26.47 25.96 26.58 26.06 28.65 26.06 28.75 26.16 29.58 26.16 30.00 25.85 29.89 25.23 29.06 25.33 28.96 25.23 27.51 25.23 27.41 25.13 25.75 25.13 25.64 25.02 24.40 25.02 24.30 24.92 23.68 24.92 23.57 24.82 22.95 24.82 22.85 24.71 14.76 24.71 14.66 24.82 13.11 24.82 13.00 24.92 10.21 24.92 10.10 24.82 9.79 24.82 9.69 24.92 8.76 24.92 8.65 25.02 6.89 25.02 6.79 24.92 6.99 24.61 8.55 24.09 9.58 23.47 9.90 23.47 10.10 23.26 11.03 22.85 12.17 22.12 12.38 22.12 13.00 21.71 14.76 20.88 16.22 19.84 16.73 19.63 18.91 17.87 19.01 17.67 20.46 16.32 21.50 14.97 22.54 13.94 24.19 11.45 24.19 11.24 24.82 10.21 24.92 9.69 25.33 8.96 25.54 8.13 25.85 7.51 25.96 6.27 26.06 6.16 26.16 5.44 27.41 4.09Z" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "mt-t mt-serif",
          style: { left: U(72.13), top: U(11.22), fontSize: U(20), lineHeight: U(20), letterSpacing: U(0.07), color: "#fdfaf3" },
          children: "Юстиция"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "mt-t mt-sans4",
          style: { left: U(71.88), top: U(36.31), fontSize: U(10.72), lineHeight: U(10.72), letterSpacing: U(-0.07), color: "#fffffb" },
          children: "Юридическая компания"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "mt-tile mt-call",
          href: tel,
          onClick: () => trackEvent("phone_click", { placement: "первый экран, мобильный" }),
          "aria-label": `Позвонить: ${phone}`,
          style: { left: U(284.73), top: U(12.85), width: U(37), height: U(36) },
          children: /* @__PURE__ */ jsx("svg", { style: { left: U(2.9), top: U(2.9), width: U(31.08), height: U(30.26) }, className: "mt-ic", viewBox: "0 0 31.08 30.26", fill: "#e5c691", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M6.68 7.93 6.37 8.65 6.37 10.52 6.48 10.62 6.48 11.14 6.79 11.76 6.79 12.07 7.51 14.04 8.03 14.97 8.13 15.39 8.44 15.70 9.38 17.36 11.97 20.05 12.28 20.15 13.52 21.19 13.94 21.29 14.14 21.50 16.42 22.64 16.73 22.64 17.36 22.95 18.70 23.36 19.22 23.36 19.32 23.47 20.98 23.47 21.19 23.57 21.50 23.36 21.81 23.36 22.74 22.85 23.26 22.33 23.78 21.29 23.78 20.67 23.99 20.26 23.99 19.53 24.19 18.91 24.19 18.39 23.47 17.56 22.33 16.94 21.71 16.73 21.50 16.53 20.98 16.42 20.67 16.22 19.53 16.11 18.60 16.53 17.25 17.77 16.73 17.56 16.42 17.25 16.22 17.25 15.28 16.53 13.11 14.25 12.59 13.31 12.59 13.00 13.83 11.35 13.83 9.79 13.63 9.58 13.52 8.76 13.00 7.72 12.49 7.20 11.55 6.58 11.24 6.58 10.72 6.37 10.00 6.58 9.17 6.48 7.82 6.99 7.30 7.30ZM8.34 8.34 9.07 8.03 10.21 7.82 10.31 7.93 11.14 8.03 11.86 8.65 12.49 10.52 12.17 11.14 11.55 11.66 11.45 12.07 11.03 12.69 11.03 13.21 11.45 13.94 11.55 14.45 11.97 15.08 12.38 15.39 13.52 16.73 13.83 16.94 13.94 17.25 14.97 18.08 15.39 18.60 15.80 18.70 16.32 19.12 17.36 19.43 17.77 19.22 19.32 17.56 19.95 17.46 20.46 17.67 21.19 18.18 21.50 18.18 22.43 18.81 22.64 19.22 22.64 19.74 22.43 20.05 22.23 20.98 21.81 21.71 21.50 22.02 19.53 21.91 19.01 21.71 18.29 21.71 17.56 21.50 16.01 20.67 15.80 20.67 15.28 20.26 14.87 20.15 14.45 19.74 14.25 19.74 13.73 19.43 12.28 18.29 11.24 17.25 9.79 15.39 9.48 14.66 9.27 14.45 9.27 14.14 8.86 13.63 8.86 13.21 8.55 12.80 8.24 11.66 8.03 11.35 7.93 10.31 7.72 10.10 7.72 9.17 7.93 8.76Z" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "mt-tile mt-menu",
          "aria-label": menuOpen ? "Закрыть меню" : "Открыть меню",
          "aria-expanded": menuOpen,
          "aria-controls": "mt-panel",
          onClick: () => setMenuOpen((open) => !open),
          style: { left: U(329.9), top: U(12.85), width: U(37), height: U(36) },
          children: /* @__PURE__ */ jsx("svg", { style: { left: U(2.91), top: U(2.9), width: U(31.08), height: U(30.26) }, className: "mt-ic", viewBox: "0 0 31.08 30.26", fill: "#fdfaf3", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M7.10 20.88 7.10 21.40 7.51 21.91 7.93 21.91 8.03 22.02 22.74 22.02 23.05 21.91 23.47 21.29 23.26 20.46 22.95 20.26 7.82 20.26 7.41 20.46ZM7.10 14.76 7.10 15.18 7.30 15.59 7.93 15.90 19.43 15.90 19.53 15.80 22.23 15.80 22.33 15.90 22.64 15.90 23.16 15.70 23.47 15.28 23.47 14.66 23.36 14.45 22.85 14.04 7.72 14.04 7.41 14.25ZM6.99 8.86 7.20 9.38 7.93 9.90 8.44 9.90 8.55 9.79 22.85 9.79 23.05 9.69 23.47 9.17 23.47 8.76 23.26 8.24 22.64 7.93 22.12 7.93 22.02 8.03 21.71 7.93 7.93 7.93 7.51 8.13Z" }) })
        }
      ),
      /* @__PURE__ */ jsx("i", { className: "mt-sep", style: { left: U(0), top: U(61.46), width: U(390), height: U(1) } })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "mt-panel", id: "mt-panel", "aria-label": "Разделы сайта", hidden: !menuOpen, children: [
      links.map((link) => /* @__PURE__ */ jsx("a", { href: link.href, onClick: () => setMenuOpen(false), children: link.label }, link.href)),
      /* @__PURE__ */ jsx("a", { href: tel, onClick: () => setMenuOpen(false), children: phone })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-canvas", children: [
      /* @__PURE__ */ jsxs("svg", { className: "mt-wave", viewBox: "0 0 390 693", "aria-hidden": "true", focusable: "false", style: { left: U(0), top: U(0), width: U(390), height: U(693), transform: `translateY(calc(var(--e)*1))` }, children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: "mtWG", x1: "0", x2: "1", y1: "0", y2: "0", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#f5c56b", stopOpacity: "0" }),
            /* @__PURE__ */ jsx("stop", { offset: ".12", stopColor: "#f5c56b", stopOpacity: ".55" }),
            /* @__PURE__ */ jsx("stop", { offset: ".45", stopColor: "#f5c56b", stopOpacity: ".92" }),
            /* @__PURE__ */ jsx("stop", { offset: ".75", stopColor: "#f5c56b" }),
            /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#f5c56b", stopOpacity: ".8" })
          ] }),
          /* @__PURE__ */ jsx("filter", { id: "mtWF", x: "-5%", y: "-300%", width: "110%", height: "700%", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "1.8" }) })
        ] }),
        /* @__PURE__ */ jsx("path", { d: "M12.43 641.16 L15.75 642.82 L19.06 644.47 L22.38 646.13 L25.70 647.38 L29.01 649.03 L32.33 650.69 L35.64 651.93 L38.96 653.18 L42.27 654.42 L45.59 655.66 L48.91 656.91 L52.22 658.15 L55.54 658.98 L58.85 660.22 L62.17 661.05 L65.48 661.88 L68.80 663.12 L72.11 663.95 L75.43 664.37 L78.75 665.20 L82.06 666.03 L85.38 666.85 L88.69 667.27 L92.01 668.10 L95.32 668.51 L98.64 668.93 L101.96 669.34 L105.27 669.76 L108.59 670.17 L111.90 670.58 L115.22 671.00 L118.53 671.41 L121.85 671.83 L125.16 671.83 L128.48 671.83 L131.80 671.83 L135.11 671.83 L138.43 671.83 L141.74 671.83 L145.06 671.41 L148.37 670.58 L151.69 670.17 L155.01 669.76 L158.32 669.76 L161.64 668.93 L164.95 668.10 L168.27 667.68 L171.58 666.85 L174.90 666.44 L178.21 665.61 L181.53 665.61 L184.85 665.20 L188.16 664.37 L191.48 663.12 L194.79 662.30 L198.11 661.88 L201.42 661.47 L204.74 660.22 L208.06 659.81 L211.37 658.98 L214.69 658.15 L218.00 657.32 L221.32 656.49 L224.63 656.08 L227.95 655.25 L231.26 654.01 L234.58 653.59 L237.90 652.76 L241.21 653.18 L244.53 651.93 L247.84 650.69 L251.16 650.28 L254.47 649.45 L257.79 649.03 L261.11 648.20 L264.42 647.38 L267.74 646.55 L271.05 645.72 L274.37 645.30 L277.68 644.47 L281.00 643.65 L284.31 643.23 L287.63 642.40 L290.95 641.99 L294.26 641.57 L297.58 641.16 L300.89 640.33 L304.21 639.91 L307.52 639.50 L310.84 639.09 L314.16 639.09 L317.47 638.67 L320.79 638.26 L324.10 638.26 L327.42 638.26 L330.73 637.84 L334.05 637.84 L337.36 637.84 L340.68 637.84 L344.00 637.84 L347.31 637.84 L350.63 638.26 L350.63 638.26 L347.31 638.67 L344.00 639.91 L340.68 651.93 L337.36 651.52 L334.05 651.52 L330.73 651.11 L327.42 650.69 L324.10 650.69 L320.79 650.69 L317.47 650.28 L314.16 650.28 L310.84 650.28 L307.52 650.28 L304.21 650.28 L300.89 650.28 L297.58 650.69 L294.26 650.69 L290.95 650.69 L287.63 651.11 L284.31 651.52 L281.00 651.52 L277.68 651.93 L274.37 652.35 L271.05 653.59 L267.74 654.42 L264.42 655.25 L261.11 656.49 L257.79 656.91 L254.47 658.15 L251.16 658.57 L247.84 658.98 L244.53 658.98 L241.21 658.57 L237.90 657.74 L234.58 658.15 L231.26 658.57 L227.95 659.39 L224.63 659.81 L221.32 660.64 L218.00 661.05 L214.69 661.88 L211.37 662.30 L208.06 663.12 L204.74 663.95 L201.42 664.37 L198.11 665.20 L194.79 665.61 L191.48 666.44 L188.16 667.27 L184.85 667.68 L181.53 668.51 L178.21 668.93 L174.90 669.34 L171.58 669.76 L168.27 670.17 L164.95 670.58 L161.64 671.00 L158.32 671.41 L155.01 671.83 L151.69 671.83 L148.37 672.24 L145.06 672.24 L141.74 672.24 L138.43 672.24 L135.11 672.24 L131.80 672.24 L128.48 671.83 L125.16 671.83 L121.85 671.83 L118.53 671.41 L115.22 671.41 L111.90 671.00 L108.59 670.58 L105.27 670.17 L101.96 670.58 L98.64 670.58 L95.32 670.17 L92.01 670.17 L88.69 670.58 L85.38 670.58 L82.06 670.17 L78.75 670.17 L75.43 670.17 L72.11 669.76 L68.80 669.34 L65.48 668.93 L62.17 668.10 L58.85 667.68 L55.54 666.85 L52.22 667.27 L48.91 666.44 L45.59 665.61 L42.27 665.20 L38.96 663.95 L35.64 663.54 L32.33 661.88 L29.01 661.47 L25.70 658.98 L22.38 656.49 L19.06 655.25 L15.75 653.59 L12.43 651.93 Z", fill: "url(#mtWG)", filter: "url(#mtWF)", opacity: ".5" }),
        /* @__PURE__ */ jsx("path", { d: "M12.43 641.16 L15.75 642.82 L19.06 644.47 L22.38 646.13 L25.70 647.38 L29.01 649.03 L32.33 650.69 L35.64 651.93 L38.96 653.18 L42.27 654.42 L45.59 655.66 L48.91 656.91 L52.22 658.15 L55.54 658.98 L58.85 660.22 L62.17 661.05 L65.48 661.88 L68.80 663.12 L72.11 663.95 L75.43 664.37 L78.75 665.20 L82.06 666.03 L85.38 666.85 L88.69 667.27 L92.01 668.10 L95.32 668.51 L98.64 668.93 L101.96 669.34 L105.27 669.76 L108.59 670.17 L111.90 670.58 L115.22 671.00 L118.53 671.41 L121.85 671.83 L125.16 671.83 L128.48 671.83 L131.80 671.83 L135.11 671.83 L138.43 671.83 L141.74 671.83 L145.06 671.41 L148.37 670.58 L151.69 670.17 L155.01 669.76 L158.32 669.76 L161.64 668.93 L164.95 668.10 L168.27 667.68 L171.58 666.85 L174.90 666.44 L178.21 665.61 L181.53 665.61 L184.85 665.20 L188.16 664.37 L191.48 663.12 L194.79 662.30 L198.11 661.88 L201.42 661.47 L204.74 660.22 L208.06 659.81 L211.37 658.98 L214.69 658.15 L218.00 657.32 L221.32 656.49 L224.63 656.08 L227.95 655.25 L231.26 654.01 L234.58 653.59 L237.90 652.76 L241.21 653.18 L244.53 651.93 L247.84 650.69 L251.16 650.28 L254.47 649.45 L257.79 649.03 L261.11 648.20 L264.42 647.38 L267.74 646.55 L271.05 645.72 L274.37 645.30 L277.68 644.47 L281.00 643.65 L284.31 643.23 L287.63 642.40 L290.95 641.99 L294.26 641.57 L297.58 641.16 L300.89 640.33 L304.21 639.91 L307.52 639.50 L310.84 639.09 L314.16 639.09 L317.47 638.67 L320.79 638.26 L324.10 638.26 L327.42 638.26 L330.73 637.84 L334.05 637.84 L337.36 637.84 L340.68 637.84 L344.00 637.84 L347.31 637.84 L350.63 638.26 L350.63 638.26 L347.31 638.67 L344.00 639.91 L340.68 651.93 L337.36 651.52 L334.05 651.52 L330.73 651.11 L327.42 650.69 L324.10 650.69 L320.79 650.69 L317.47 650.28 L314.16 650.28 L310.84 650.28 L307.52 650.28 L304.21 650.28 L300.89 650.28 L297.58 650.69 L294.26 650.69 L290.95 650.69 L287.63 651.11 L284.31 651.52 L281.00 651.52 L277.68 651.93 L274.37 652.35 L271.05 653.59 L267.74 654.42 L264.42 655.25 L261.11 656.49 L257.79 656.91 L254.47 658.15 L251.16 658.57 L247.84 658.98 L244.53 658.98 L241.21 658.57 L237.90 657.74 L234.58 658.15 L231.26 658.57 L227.95 659.39 L224.63 659.81 L221.32 660.64 L218.00 661.05 L214.69 661.88 L211.37 662.30 L208.06 663.12 L204.74 663.95 L201.42 664.37 L198.11 665.20 L194.79 665.61 L191.48 666.44 L188.16 667.27 L184.85 667.68 L181.53 668.51 L178.21 668.93 L174.90 669.34 L171.58 669.76 L168.27 670.17 L164.95 670.58 L161.64 671.00 L158.32 671.41 L155.01 671.83 L151.69 671.83 L148.37 672.24 L145.06 672.24 L141.74 672.24 L138.43 672.24 L135.11 672.24 L131.80 672.24 L128.48 671.83 L125.16 671.83 L121.85 671.83 L118.53 671.41 L115.22 671.41 L111.90 671.00 L108.59 670.58 L105.27 670.17 L101.96 670.58 L98.64 670.58 L95.32 670.17 L92.01 670.17 L88.69 670.58 L85.38 670.58 L82.06 670.17 L78.75 670.17 L75.43 670.17 L72.11 669.76 L68.80 669.34 L65.48 668.93 L62.17 668.10 L58.85 667.68 L55.54 666.85 L52.22 667.27 L48.91 666.44 L45.59 665.61 L42.27 665.20 L38.96 663.95 L35.64 663.54 L32.33 661.88 L29.01 661.47 L25.70 658.98 L22.38 656.49 L19.06 655.25 L15.75 653.59 L12.43 651.93 Z", fill: "url(#mtWG)" })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-h", style: { transform: `translateY(calc(var(--e)*0.12))` }, children: [
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-serif", style: { left: U(50.47), top: U(66.58), fontSize: U(45.78), lineHeight: U(45.78), letterSpacing: U(-0.21), color: "#fdfaf3" }, children: "Банкротство" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-serif", style: { left: U(82.51), top: U(126.74), fontSize: U(20.47), lineHeight: U(20.47), letterSpacing: U(0.39), color: "#f3d196" }, children: "ИП и физических лиц" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mt-pill", style: { left: U(63.9), top: U(121.51), width: U(261.57), height: U(35.69), transform: `translateY(calc(var(--e)*0.12))` } }),
      /* @__PURE__ */ jsx("i", { className: "mt-rule", style: { left: U(30.67), top: U(137), width: U(26.52), height: U(2.5), background: "linear-gradient(90deg,rgba(243,209,150,.62),#f3d196)", transform: `translateY(calc(var(--e)*0.12))` } }),
      /* @__PURE__ */ jsx("i", { className: "mt-rule", style: { left: U(332.39), top: U(137), width: U(27.77), height: U(2.5), background: "linear-gradient(270deg,rgba(243,209,150,.62),#f3d196)", transform: `translateY(calc(var(--e)*0.12))` } }),
      /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans4", style: { left: U(66.04), top: U(170.46), fontSize: U(11.52), lineHeight: U(11.52), letterSpacing: U(0.21), color: "#fffffb", transform: `translateY(calc(var(--e)*0.12))` }, children: "Списание долгов и сохранение имущества." }),
      /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans4", style: { left: U(42.83), top: U(186.44), fontSize: U(11.52), lineHeight: U(11.52), letterSpacing: U(-0.26), color: "#fffffb", transform: `translateY(calc(var(--e)*0.12))` }, children: "Онлайн, по всей России. Судебное представительство:" }),
      /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans4", style: { left: U(70.78), top: U(201.76), fontSize: U(11.52), lineHeight: U(11.52), letterSpacing: U(-0.27), color: "#fffffb", transform: `translateY(calc(var(--e)*0.12))` }, children: "в Иркутской области и Забайкальском крае." }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-h", style: { transform: `translateY(calc(var(--e)*0.58))` }, children: [
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(79.58), top: U(391.24), fontSize: U(41.41), lineHeight: U(41.41), letterSpacing: U(-0.97), color: "#fefefb" }, children: "Какая у вас" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(84.2), top: U(423.49), fontSize: U(41.41), lineHeight: U(41.41), letterSpacing: U(0.67), color: "#fefefb" }, children: "ситуация?" })
      ] }),
      /* @__PURE__ */ jsx("i", { className: "mt-rule", style: { left: U(35.64), top: U(436.42), width: U(30.67), height: U(1.66), background: "linear-gradient(90deg,rgba(229,198,145,.6),#e5c691)", transform: `translateY(calc(var(--e)*0.58))` } }),
      /* @__PURE__ */ jsx("i", { className: "mt-rule", style: { left: U(324.1), top: U(436.42), width: U(31.91), height: U(1.66), background: "linear-gradient(270deg,rgba(229,198,145,.6),#e5c691)", transform: `translateY(calc(var(--e)*0.58))` } }),
      /* @__PURE__ */ jsxs("div", { className: "mt-card", style: { left: U(16.8), top: U(228.5), width: U(172.4), height: U(54.2), transform: `translateY(calc(var(--e)*0.32))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 29.84 32.33", fill: "#e5c691", "aria-hidden": "true", focusable: "false", style: { left: U(15.36), top: U(10.05), width: U(29.84), height: U(32.33) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M24.19 22.02 23.68 21.40 23.36 21.40 22.85 21.81 20.46 24.30 20.26 24.30 19.32 23.47 18.91 23.47 18.39 23.99 18.39 24.19 20.15 26.06 20.57 26.06 20.88 25.85 21.71 24.82 23.78 22.74 24.19 22.23ZM6.58 20.36 6.58 20.77 6.99 21.29 12.80 21.29 13.00 21.19 13.21 20.57 13.21 20.26 12.90 19.95 7.30 19.95 6.79 20.15ZM19.95 17.46 19.84 17.56 19.12 17.67 18.60 17.98 18.29 17.98 16.84 18.91 15.80 20.05 15.18 21.09 14.87 22.02 14.76 23.57 14.66 23.68 14.76 24.82 14.87 24.92 14.87 25.33 15.08 25.64 15.08 26.06 15.28 26.27 15.28 26.47 15.70 27.30 16.94 28.75 17.25 28.86 17.87 29.37 19.22 30.00 20.26 30.00 20.36 30.10 22.33 30.00 22.43 29.89 23.47 29.69 23.68 29.48 24.92 28.86 25.54 28.34 26.37 27.41 26.99 26.37 27.51 24.82 27.51 22.23 26.99 21.09 26.99 20.88 26.78 20.67 26.78 20.46 26.27 19.63 25.54 18.91 24.82 18.39 23.26 17.67 21.71 17.56 21.60 17.46 20.36 17.46 20.26 17.56ZM20.67 18.81 21.40 18.81 21.50 18.91 22.02 18.81 22.54 19.12 23.16 19.22 23.68 19.63 24.09 19.74 24.92 20.46 25.85 21.71 26.06 22.43 26.06 23.68 26.16 23.78 26.16 24.09 25.96 24.61 25.96 25.13 25.44 26.27 24.09 27.61 23.78 27.72 23.47 28.03 23.26 28.03 22.43 28.44 20.05 28.55 19.53 28.34 19.12 28.34 18.08 27.61 16.84 26.37 16.63 26.06 16.22 24.82 16.22 22.95 16.73 21.40 17.46 20.46 18.49 19.63 18.70 19.63 19.22 19.22 19.63 19.22 19.95 19.01ZM6.58 16.42 6.79 16.73 7.10 16.73 7.20 16.84 9.90 16.84 10.00 16.94 11.55 16.94 11.66 16.84 16.22 16.84 16.53 16.53 16.73 15.90 16.42 15.49 16.11 15.39 15.90 15.49 12.17 15.49 12.07 15.39 11.86 15.49 11.03 15.49 10.93 15.39 10.62 15.49 7.10 15.49 6.68 15.80ZM6.58 11.76 6.68 11.97 6.58 12.07 6.58 12.38 6.68 12.59 6.99 12.80 7.41 12.80 7.51 12.69 7.62 12.80 12.38 12.80 12.69 12.49 12.69 11.66 12.59 11.45 12.38 11.35 6.99 11.35 6.79 11.45ZM3.89 2.75 3.06 3.26 2.43 3.89 2.02 4.61 1.92 5.44 1.81 5.54 1.92 5.65 1.92 8.86 1.81 8.96 1.92 25.33 1.81 25.44 1.81 25.85 1.92 25.96 2.02 26.89 3.06 28.03 4.51 28.65 13.94 28.65 14.04 28.75 14.45 28.55 14.35 28.23 13.42 26.99 6.27 26.99 6.16 27.09 5.54 27.09 5.34 26.99 5.23 27.09 4.71 27.09 3.99 26.68 3.57 26.27 3.47 25.96 3.47 5.34 3.68 4.92 4.20 4.40 4.40 4.40 4.71 4.20 15.28 4.20 15.59 4.51 15.59 9.90 16.22 10.41 20.98 10.41 21.09 10.52 21.40 10.41 21.81 10.72 21.81 15.70 22.12 15.90 23.16 15.90 23.36 15.70 23.36 9.58 23.26 9.48 23.26 9.17 20.57 6.27 19.74 5.54 19.22 4.82 17.04 2.85 16.63 2.64 7.62 2.64 7.51 2.54 5.54 2.64 5.44 2.54 4.92 2.54 4.82 2.64ZM17.04 5.85 17.36 5.54 17.67 5.65 18.49 6.58 19.43 7.30 20.77 8.65 20.77 8.86 20.57 9.07 19.32 9.07 19.22 8.96 18.91 8.96 18.81 9.07 17.77 9.07 17.67 8.96 17.36 8.96 17.15 8.76 17.15 6.06Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr", style: { left: U(56.1), top: U(8.1), height: U(36) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.54), top: U(7.71), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0), color: "#fffdf7" }, children: "Договор" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.74), top: U(21.41), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0.35), color: "#fffdf7" }, children: "с гарантией" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.74), top: U(34.26), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0.21), color: "#fffdf7" }, children: "списания долгов" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-card", style: { left: U(199.8), top: U(228.5), width: U(173.2), height: U(54.2), transform: `translateY(calc(var(--e)*0.32))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 27.77 27.77", fill: "#e5c691", "aria-hidden": "true", focusable: "false", style: { left: U(12.64), top: U(12.13), width: U(27.77), height: U(27.77) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M3.68 3.89 2.75 4.92 2.33 5.65 2.33 8.24 2.75 9.27 2.85 10.10 3.06 10.41 3.16 11.03 3.57 11.66 3.68 12.28 4.61 13.73 4.61 13.94 5.03 14.56 5.23 15.18 8.44 19.12 10.93 21.29 11.24 21.40 11.86 22.02 12.38 22.23 13.31 22.85 13.52 22.85 14.14 23.26 14.76 23.47 15.18 23.78 15.39 23.78 15.80 24.09 16.32 24.19 17.04 24.61 17.67 24.61 18.70 25.02 19.32 25.02 19.43 25.13 20.67 25.23 20.77 25.33 21.81 25.33 22.43 25.02 22.85 25.02 23.16 24.71 23.47 24.61 24.19 23.88 24.19 23.68 24.50 23.36 24.61 22.85 24.92 22.43 25.02 21.81 25.33 21.19 25.44 19.53 25.13 19.01 25.02 18.60 24.71 18.39 24.40 17.98 23.88 17.67 23.68 17.67 23.36 17.36 22.85 17.15 22.64 16.94 22.12 16.84 21.71 16.53 21.29 16.42 20.77 16.11 19.43 15.70 19.32 15.80 18.91 15.80 18.29 16.01 16.53 17.67 15.90 17.67 13.63 15.90 11.55 13.63 11.45 13.31 10.00 11.55 10.00 11.24 11.66 9.17 11.76 8.76 12.17 8.24 12.17 7.62 11.97 7.30 11.97 7.10 11.45 6.37 11.35 5.96 10.93 5.54 10.10 4.20 8.96 3.06 8.76 3.06 8.34 2.75 7.51 2.64 7.41 2.54 5.96 2.64 4.61 3.26ZM4.09 5.75 5.03 4.92 6.37 4.30 7.62 4.30 7.82 4.20 9.07 5.54 9.58 6.27 9.58 6.48 10.00 7.30 10.41 7.72 10.41 8.34 9.07 9.79 8.65 10.41 8.55 10.83 8.24 11.14 8.24 11.66 9.27 13.42 10.72 15.18 12.59 17.15 14.14 18.39 16.32 19.53 16.63 19.53 17.15 19.22 17.36 18.91 18.39 17.98 19.22 17.46 19.74 17.46 20.36 17.87 21.50 18.29 22.23 18.81 22.64 18.91 22.85 19.12 23.36 19.32 23.88 19.84 23.88 20.57 22.54 23.36 22.02 23.68 20.36 23.68 20.26 23.57 19.74 23.57 19.63 23.47 18.70 23.36 18.18 23.05 17.77 23.05 16.01 22.23 14.97 21.91 12.59 20.46 11.24 19.32 10.83 19.12 10.72 18.91 9.58 17.98 9.27 17.46 9.07 17.36 7.72 15.70 7.10 14.56 6.79 14.25 6.68 13.94 5.85 12.80 5.85 12.59 5.44 11.97 5.13 10.93 4.71 10.21 4.40 8.86 3.99 7.82 3.89 6.27Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr", style: { left: U(53.8), top: U(8.1), height: U(36) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(67.86), top: U(7.5), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0.43), color: "#fffdf7" }, children: "Защита от звонков" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(68.05), top: U(20.61), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0.08), color: "#fffdf7" }, children: "коллекторов" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(67.86), top: U(33.38), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0.39), color: "#fffdf7" }, children: "с 1 дня" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-card", style: { left: U(16.8), top: U(288.4), width: U(172.4), height: U(54.2), transform: `translateY(calc(var(--e)*0.32))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 42.27 33.99", fill: "#e5c691", "aria-hidden": "true", focusable: "false", style: { left: U(10.38), top: U(9.01), width: U(42.27), height: U(33.99) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M28.23 20.15 28.13 20.36 28.23 20.67 28.13 20.88 28.13 22.23 28.23 22.43 28.65 22.54 29.06 22.95 29.48 23.16 31.14 23.16 31.55 22.95 31.65 22.64 31.55 22.54 31.55 22.23 31.65 22.02 31.55 21.91 31.55 20.26 31.45 19.95 31.14 20.05 30.93 19.95 30.51 19.95 30.41 20.05 30.00 20.05 29.89 19.95 28.86 20.05 28.55 19.95ZM23.05 20.15 23.05 20.46 23.68 20.88 24.09 20.88 25.02 21.19 25.54 21.19 25.64 21.09 25.64 20.77 25.75 20.67 25.75 20.15 25.64 20.05 23.68 20.05 23.57 19.95ZM2.23 23.68 2.33 23.88 2.33 24.30 2.23 24.40 2.23 25.02 2.33 25.13 2.33 25.44 2.23 25.54 2.23 26.58 2.33 26.68 2.23 28.03 2.54 28.96 2.75 29.17 3.26 29.37 4.40 29.37 4.82 29.58 5.03 29.79 5.34 30.62 5.96 31.24 6.68 31.65 6.99 31.65 7.10 31.76 8.03 31.76 9.07 31.45 9.90 30.62 10.21 29.89 10.62 29.58 19.53 29.58 19.95 29.89 20.26 30.62 21.29 31.55 21.50 31.55 21.81 31.76 23.16 31.76 24.40 31.14 25.02 30.31 25.33 29.58 25.85 29.37 26.68 29.37 27.20 29.06 27.82 28.34 28.03 27.92 28.03 26.68 28.13 26.58 28.03 26.37 28.03 25.23 27.92 25.13 27.92 24.71 27.51 24.09 26.27 23.05 25.13 22.43 24.19 22.33 24.09 22.23 22.85 22.23 22.43 22.02 20.88 20.46 20.15 19.53 18.91 18.49 18.29 18.18 9.17 18.18 9.07 18.29 8.34 18.39 7.72 18.91 6.89 19.95 6.89 20.15 6.68 20.46 5.23 22.02 5.03 22.12 4.20 22.12 3.47 22.33 2.43 23.26ZM7.20 27.20 7.93 27.20 8.44 27.41 8.86 27.82 9.07 28.34 9.07 28.96 8.86 29.58 8.34 30.10 7.82 30.31 7.10 30.31 6.48 29.69 6.27 29.27 6.27 28.03 6.68 27.51ZM22.33 27.09 22.85 27.09 23.57 27.61 23.88 28.13 23.88 29.37 22.85 30.31 22.02 30.31 21.19 29.48 21.09 29.17 21.19 27.82 21.60 27.41ZM3.78 24.30 3.89 23.99 4.20 23.68 5.65 23.36 6.16 23.05 9.17 19.95 9.69 19.63 17.98 19.63 20.36 21.71 21.19 22.64 21.50 22.74 21.91 23.26 23.05 23.78 24.61 23.78 25.75 24.40 26.37 25.02 26.68 25.54 26.78 27.20 26.68 27.30 26.68 27.61 26.27 28.03 26.06 28.13 25.54 28.13 25.13 27.82 24.92 27.09 24.30 26.27 23.05 25.64 22.12 25.64 21.81 25.85 21.19 25.96 20.26 26.78 19.95 27.72 19.53 28.03 18.81 28.03 18.70 27.92 18.39 28.03 10.62 28.03 10.21 27.61 10.10 27.09 9.69 26.58 9.07 26.06 8.34 25.75 6.79 25.75 5.85 26.16 5.13 26.89 4.82 27.41 4.71 27.82 4.40 28.13 4.09 28.13 3.89 27.92 3.89 27.30 3.78 27.20ZM28.13 15.39 28.13 15.80 28.03 15.90 28.03 16.22 28.13 16.32 28.03 17.56 28.23 17.98 31.34 17.98 31.55 17.87 31.65 17.67 31.65 17.15 31.55 17.04 31.65 16.73 31.65 15.49 31.45 15.18 28.34 15.18ZM22.23 15.39 22.23 17.56 22.12 17.67 22.33 17.98 25.64 17.98 25.75 17.87 25.75 16.01 25.85 15.90 25.85 15.59 25.64 15.18 22.43 15.18ZM26.58 2.33 25.96 2.75 24.82 3.78 24.30 4.40 23.88 4.61 21.81 6.58 21.19 6.99 20.98 7.30 19.43 8.76 15.90 11.76 15.28 12.49 14.35 13.21 14.04 13.63 13.21 14.35 13.00 14.97 13.52 15.39 13.94 15.39 14.76 14.87 15.18 14.87 15.49 15.28 15.49 16.11 15.59 16.22 16.42 16.22 16.53 16.32 16.63 16.22 16.94 16.22 17.04 16.01 17.04 14.56 16.94 14.45 16.94 13.52 17.04 13.31 21.29 9.27 21.60 9.17 22.12 8.55 22.43 8.44 22.74 8.03 23.36 7.62 24.71 6.37 25.33 5.65 25.96 5.23 26.47 4.71 26.68 4.61 27.09 4.71 27.51 5.13 28.03 5.44 28.44 5.96 29.27 6.58 30.31 7.51 30.62 7.93 31.45 8.55 32.07 9.27 33.10 10.10 33.62 10.72 35.69 12.49 36.52 13.31 36.63 13.63 36.63 14.04 36.52 14.14 36.52 27.41 36.42 27.61 36.01 27.92 31.45 27.92 31.34 28.03 30.93 28.03 30.82 27.92 30.10 28.03 29.89 27.92 29.58 28.23 29.58 28.75 29.27 29.06 29.17 29.48 29.27 29.58 34.66 29.58 34.76 29.48 34.87 29.58 35.49 29.58 35.59 29.48 36.32 29.58 36.42 29.48 36.73 29.48 37.87 28.44 38.18 27.72 38.18 16.01 38.08 15.90 38.08 15.59 38.29 15.28 38.60 15.28 39.94 16.22 40.36 16.22 40.46 16.11 40.56 14.76 39.42 13.52 38.80 13.11 37.66 12.07 37.25 11.55 34.55 9.17 33.21 7.82 32.79 7.62 32.28 6.99 30.10 5.13 27.41 2.54 26.99 2.33Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr", style: { left: U(56.1), top: U(8.1), height: U(36) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(76.79), top: U(6.86), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(0.25), color: "#fffdf7" }, children: "Законное" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(76.79), top: U(20.78), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(-0), color: "#fffdf7" }, children: "сохранение" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(76.98), top: U(35.31), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(0.38), color: "#fffdf7" }, children: "имущества" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-card", style: { left: U(199.8), top: U(288.4), width: U(173.2), height: U(54.2), transform: `translateY(calc(var(--e)*0.32))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 31.50 29.84", fill: "#e5c691", "aria-hidden": "true", focusable: "false", style: { left: U(12.23), top: U(11.49), width: U(31.5), height: U(29.84) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M28.75 4.61 28.03 3.89 26.89 3.26 26.37 3.16 25.54 2.75 24.50 2.64 24.40 2.54 23.47 2.43 23.36 2.33 22.33 2.33 22.23 2.23 18.29 2.43 17.87 2.64 16.73 2.85 16.22 3.16 15.90 3.16 14.56 3.89 13.73 4.71 13.42 5.44 13.42 5.75 13.52 5.85 13.52 8.55 13.42 8.65 13.52 8.96 13.52 9.38 13.42 9.48 13.52 9.58 13.52 12.90 13.21 13.21 12.38 13.11 12.28 13.00 11.35 13.00 11.24 12.90 8.76 12.90 8.65 13.00 6.89 13.11 6.79 13.21 5.65 13.42 4.82 13.83 4.30 13.94 3.16 14.66 2.54 15.28 2.33 15.90 2.33 24.82 2.64 25.33 3.06 25.75 3.26 25.75 3.68 26.16 4.09 26.27 4.61 26.68 5.03 26.68 5.44 26.99 5.75 26.99 5.85 27.09 6.37 27.09 6.79 27.30 8.03 27.41 8.13 27.51 8.96 27.51 9.07 27.61 12.07 27.61 12.17 27.51 12.69 27.51 14.04 27.09 14.87 26.99 15.39 26.68 15.80 26.58 16.22 26.27 16.42 26.27 16.73 25.96 17.04 25.85 17.87 25.02 18.18 24.50 18.29 19.95 18.49 19.74 18.91 19.74 19.53 19.95 20.15 19.95 20.26 20.05 22.95 20.05 23.05 19.95 24.09 19.95 24.61 19.74 25.13 19.74 26.37 19.22 26.99 19.12 27.82 18.60 28.65 17.77 29.06 16.94 29.06 13.73 28.96 13.63 29.06 5.44 28.75 4.82ZM3.78 22.85 4.09 22.54 4.30 22.54 4.71 22.85 6.06 23.47 6.79 23.57 6.89 23.68 7.51 23.68 7.62 23.78 8.65 23.78 8.76 23.88 11.97 23.88 12.07 23.78 13.11 23.68 13.21 23.57 13.63 23.57 13.73 23.47 14.87 23.26 15.80 22.85 16.11 22.54 16.42 22.54 16.73 22.95 16.73 23.78 16.63 24.09 16.32 24.30 16.11 24.61 14.45 25.54 13.73 25.54 13.63 25.64 13.21 25.64 13.11 25.75 12.69 25.75 12.07 25.96 8.03 25.96 7.93 25.85 7.51 25.85 7.10 25.64 6.37 25.54 6.06 25.33 4.71 24.92 4.30 24.61 3.78 23.99ZM16.73 20.15 16.63 20.46 16.11 20.98 15.39 21.40 15.18 21.40 13.83 22.02 13.00 22.12 12.90 22.23 12.28 22.23 12.17 22.33 9.17 22.43 9.07 22.33 8.13 22.33 8.03 22.23 6.58 22.12 6.27 21.91 5.65 21.81 4.30 21.09 3.89 20.57 3.89 19.63 3.78 19.53 4.09 19.12 4.51 19.12 5.03 19.53 6.68 20.05 7.41 20.05 7.93 20.26 8.86 20.26 8.96 20.36 11.55 20.36 11.66 20.26 12.28 20.26 12.38 20.15 13.31 20.05 13.83 19.84 14.45 19.84 14.87 19.63 15.18 19.63 16.22 19.01 16.53 19.01 16.73 19.63ZM27.61 15.49 27.61 16.53 26.89 17.36 25.44 18.08 25.02 18.08 24.30 18.39 22.85 18.49 22.74 18.60 22.02 18.60 21.91 18.49 21.71 18.60 20.15 18.60 20.05 18.49 19.43 18.49 19.32 18.39 18.60 18.39 18.29 18.18 18.29 17.87 18.18 17.77 18.18 16.53 18.39 16.32 19.53 16.32 19.63 16.42 20.26 16.42 20.36 16.53 23.26 16.42 23.36 16.32 24.71 16.22 25.44 15.90 25.96 15.90 26.68 15.59 27.09 15.28 27.41 15.28ZM3.78 16.32 3.89 16.11 4.61 15.49 5.65 14.97 6.48 14.87 7.20 14.56 8.44 14.45 8.55 14.35 12.17 14.35 12.90 14.66 13.42 14.66 14.04 14.97 14.66 15.08 16.01 15.70 16.63 16.32 16.53 16.94 16.11 17.46 14.14 18.49 13.42 18.60 12.59 18.91 12.07 18.91 11.97 19.01 9.07 19.01 8.96 18.91 8.03 18.91 7.10 18.60 6.27 18.49 5.03 17.98 3.89 17.04ZM27.61 12.07 27.61 13.00 27.41 13.42 26.78 13.94 25.13 14.66 24.71 14.66 24.61 14.76 24.19 14.76 23.57 14.97 22.95 14.97 22.85 15.08 19.95 15.08 19.84 14.97 19.12 14.97 18.60 14.76 18.08 14.76 17.36 14.45 16.94 14.45 15.49 13.83 15.08 13.42 15.08 12.69 14.97 12.59 15.08 12.28 15.39 11.97 16.42 12.49 16.73 12.49 17.15 12.69 17.87 12.69 17.98 12.80 18.91 12.90 19.01 13.00 19.74 13.00 19.84 13.11 22.43 13.11 22.54 13.00 23.99 12.90 24.61 12.69 25.33 12.69 26.58 12.28 27.20 11.86 27.41 11.86ZM14.97 8.44 15.28 8.13 15.49 8.13 16.22 8.65 18.29 9.27 19.74 9.38 20.46 9.58 22.02 9.58 22.12 9.48 22.95 9.48 23.05 9.38 23.68 9.38 23.78 9.27 24.40 9.27 25.02 9.07 25.54 9.07 27.30 8.24 27.61 8.55 27.61 9.58 27.41 10.10 27.20 10.31 26.58 10.62 26.27 10.62 25.23 11.14 23.99 11.35 23.88 11.45 22.85 11.45 22.74 11.55 22.02 11.55 21.91 11.66 21.60 11.55 21.50 11.66 21.19 11.66 21.09 11.55 19.95 11.55 19.84 11.45 18.81 11.45 18.70 11.35 17.15 11.14 16.01 10.62 15.80 10.62 14.97 9.90ZM15.08 5.75 15.70 5.03 16.01 4.92 16.32 4.61 16.63 4.61 18.18 3.99 18.91 3.99 19.01 3.89 19.63 3.89 19.74 3.78 23.05 3.78 23.16 3.89 23.99 3.89 24.50 4.09 24.92 4.09 26.16 4.51 27.20 5.23 27.61 5.75 27.61 6.06 26.89 6.79 26.16 7.10 25.96 7.30 25.02 7.62 24.71 7.62 24.30 7.82 22.95 7.93 22.85 8.03 19.95 8.03 19.84 7.93 18.49 7.82 16.84 7.30 15.59 6.58 15.08 6.06Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr", style: { left: U(53.8), top: U(8.1), height: U(36) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.43), top: U(6.56), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(0.02), color: "#fffdf7" }, children: "Удобная" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.3), top: U(20.78), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(0.22), color: "#fffdf7" }, children: "рассрочка" }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(69.52), top: U(33.5), fontSize: U(10.76), lineHeight: U(10.76), letterSpacing: U(0.6), color: "#fffdf7" }, children: "от 8 000 руб." })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "mt-btn", href: "#directions", "aria-label": "У меня долги как у ИП", onClick: go("business"), style: { left: U(17), top: U(492), width: U(356), height: U(59.1), transform: `translateY(calc(var(--e)*0.95))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 33.16 30.26", fill: "#080300", "aria-hidden": "true", focusable: "false", style: { left: U(20.3), top: U(13.63), width: U(33.16), height: U(30.26) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M1.61 7.82 1.30 8.34 1.19 9.17 1.09 9.27 1.09 25.23 1.50 26.37 1.81 26.89 2.95 27.92 3.16 27.92 3.37 28.13 4.20 28.44 28.13 28.44 28.23 28.34 28.75 28.34 29.17 28.03 29.89 27.72 31.03 26.47 31.24 26.06 31.34 25.13 31.45 25.02 31.45 12.69 31.34 12.59 31.34 12.28 31.45 12.17 31.45 8.86 31.03 7.93 30.20 6.99 29.69 6.58 29.27 6.48 28.55 6.06 27.92 6.06 27.82 5.96 26.78 5.96 26.68 6.06 26.06 6.06 25.96 5.96 23.05 5.96 22.74 5.65 22.74 4.20 22.64 4.09 22.64 3.47 21.91 2.33 20.67 1.50 20.26 1.50 20.15 1.40 12.59 1.40 12.49 1.50 11.76 1.61 11.55 1.81 11.14 1.92 10.52 2.54 10.10 3.37 10.10 3.78 10.00 3.89 10.00 5.23 9.90 5.34 9.90 5.75 9.69 5.96 9.38 6.06 8.86 6.06 8.76 5.96 5.13 5.96 5.03 6.06 4.09 6.06 3.57 6.37 3.06 6.48 2.33 6.99ZM15.39 14.66 15.59 14.56 17.04 14.56 17.46 14.87 17.56 16.73 17.04 17.46 16.73 17.56 15.70 17.46 15.08 16.94 15.18 16.63 15.08 16.53 15.08 15.49 15.18 15.39 15.08 15.08ZM2.95 14.35 3.37 14.04 3.78 14.25 4.20 14.66 5.13 15.18 5.34 15.18 5.75 15.49 7.93 16.22 13.00 16.22 13.31 16.53 13.42 17.15 13.31 17.25 13.42 17.77 13.63 18.18 14.25 18.81 15.28 19.32 16.84 19.32 16.94 19.22 17.67 19.22 17.98 18.91 18.29 18.81 19.01 18.08 19.22 17.77 19.22 16.53 19.43 16.32 20.15 16.32 20.26 16.22 20.46 16.32 20.98 16.32 21.09 16.22 22.64 16.32 22.74 16.22 23.99 16.22 24.92 15.90 25.54 15.90 26.58 15.49 27.20 15.39 27.41 15.18 27.61 15.18 28.55 14.66 28.96 14.25 29.48 14.04 29.69 14.25 29.69 14.87 29.58 14.97 29.58 16.53 29.69 16.63 29.69 24.92 29.37 25.64 28.65 26.37 27.72 26.68 13.00 26.68 12.90 26.58 5.65 26.68 5.54 26.58 4.20 26.47 3.16 25.64 2.95 25.02ZM2.85 9.58 3.06 8.96 3.78 8.13 4.82 7.72 5.23 7.72 5.34 7.82 5.65 7.72 12.28 7.72 12.38 7.82 13.11 7.82 13.21 7.72 27.92 7.72 28.75 8.03 29.48 8.96 29.58 9.27 29.58 11.14 29.17 11.86 28.03 13.00 27.72 13.11 27.20 13.52 26.68 13.63 26.47 13.83 24.30 14.45 23.68 14.45 23.57 14.56 19.53 14.56 19.22 14.25 19.12 13.83 18.49 13.21 17.67 12.90 15.28 12.90 15.18 13.00 14.45 13.11 13.73 13.63 13.21 14.35 12.80 14.56 12.59 14.45 7.93 14.45 7.82 14.35 7.51 14.35 6.99 14.04 6.48 13.94 5.75 13.52 5.54 13.52 5.23 13.21 4.30 12.69 3.16 11.55 2.95 10.93ZM11.86 4.30 12.07 3.78 12.49 3.37 13.21 3.26 13.31 3.16 14.35 3.16 14.45 3.26 19.84 3.26 20.26 3.47 20.67 3.89 20.77 4.20 20.77 5.44 20.67 5.75 20.36 5.96 12.69 5.96 12.49 6.06 12.17 5.96 11.86 5.54Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr mt-vr--dark", style: { left: U(67.68), top: U(14), height: U(29.9) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(83.72), top: U(17.03), fontSize: U(18.01), lineHeight: U(18.01), letterSpacing: U(0.03), color: "#080300" }, children: "У меня долги как у ИП" }),
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 23.21 20.31", fill: "#080300", "aria-hidden": "true", focusable: "false", style: { left: U(319.54), top: U(18.61), width: U(23.21), height: U(20.31) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.90 1.81 12.17 2.43 12.28 3.37 15.28 6.58 15.49 6.68 17.04 8.34 17.56 8.65 17.36 8.96 17.15 9.07 3.47 9.07 3.37 8.96 2.85 8.96 2.75 9.07 2.23 9.07 2.02 9.17 1.50 9.69 1.50 10.21 1.61 10.31 1.61 10.62 2.23 11.03 17.46 11.03 17.56 11.14 17.46 11.45 13.94 14.87 12.28 16.73 12.07 17.25 12.17 17.87 12.80 18.39 13.21 18.39 13.73 17.98 14.04 17.87 20.98 10.72 21.19 10.31 21.19 9.79 20.88 9.17 19.63 8.03 14.25 2.33 13.73 1.92Z" }) })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "mt-btn", href: "#directions", "aria-label": "У меня долги по кредитам", onClick: go("person"), style: { left: U(17), top: U(561.1), width: U(356), height: U(59.1), transform: `translateY(calc(var(--e)*0.95))` }, children: [
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 32.74 31.50", fill: "#080300", "aria-hidden": "true", focusable: "false", style: { left: U(19.47), top: U(13.75), width: U(32.74), height: U(31.5) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M30.62 4.09 29.48 2.95 28.96 2.64 28.65 2.64 28.03 2.23 27.09 1.92 26.78 1.92 26.06 1.61 25.54 1.61 24.82 1.40 23.47 1.40 23.36 1.30 19.74 1.40 19.63 1.50 19.12 1.50 19.01 1.61 17.56 1.81 16.94 2.12 15.80 2.43 14.76 3.16 13.94 4.09 13.94 4.40 13.63 4.92 13.63 12.80 13.42 13.21 12.17 13.11 12.07 13.00 10.72 13.00 10.62 12.90 8.76 12.90 8.65 13.00 6.68 13.11 6.06 13.42 4.82 13.63 4.51 13.83 3.78 14.04 3.57 14.25 3.37 14.25 2.75 14.76 2.12 15.08 1.71 15.49 1.19 16.32 1.09 16.63 1.09 25.23 0.98 25.33 0.98 25.85 1.19 26.58 1.92 27.61 3.47 28.65 3.68 28.65 4.61 29.17 4.92 29.17 5.54 29.48 6.06 29.48 6.79 29.69 8.76 29.79 8.86 29.89 11.03 29.89 11.14 29.79 13.63 29.58 14.14 29.27 14.87 29.17 16.94 28.13 18.29 26.89 18.81 26.06 18.81 25.75 19.01 25.33 18.91 25.02 18.91 21.91 19.22 21.40 19.53 21.29 20.05 21.50 23.88 21.50 23.99 21.40 26.37 21.19 26.99 20.88 27.72 20.77 28.13 20.46 28.44 20.46 29.69 19.63 30.41 18.91 30.82 18.29 30.93 17.56 31.03 17.46 31.03 16.94 31.14 16.84 31.14 16.42 31.03 16.32 31.03 5.13ZM2.75 24.40 3.06 24.09 3.26 24.09 3.99 24.61 4.30 24.61 4.61 24.82 5.96 25.13 6.37 25.33 7.41 25.44 7.51 25.54 8.13 25.54 8.24 25.64 9.27 25.64 9.38 25.75 10.21 25.75 10.93 25.54 13.73 25.33 14.04 25.13 15.08 25.02 15.80 24.61 16.11 24.61 16.63 24.19 16.94 24.19 17.15 24.40 17.15 25.02 16.84 25.85 16.11 26.58 14.87 27.30 14.56 27.30 13.83 27.61 13.31 27.61 12.80 27.92 10.93 28.03 10.83 28.13 9.27 28.13 9.17 28.03 7.72 28.03 7.62 27.92 6.68 27.82 6.27 27.61 5.85 27.61 5.23 27.30 4.61 27.20 4.09 26.78 3.89 26.78 3.06 26.06 2.75 25.54ZM2.85 20.26 3.26 20.05 3.78 20.46 4.09 20.46 4.71 20.88 5.03 20.88 6.27 21.29 6.99 21.29 7.93 21.60 10.62 21.71 10.72 21.60 11.97 21.60 12.49 21.40 13.63 21.29 13.73 21.19 14.45 21.09 15.70 20.67 16.63 20.05 16.94 20.05 17.15 20.26 17.15 20.57 17.04 20.67 17.15 20.88 17.15 21.50 16.94 21.81 16.01 22.64 15.80 22.64 15.39 22.95 14.66 23.16 14.35 23.36 13.42 23.47 12.69 23.78 12.07 23.78 11.97 23.88 8.34 23.88 8.24 23.78 7.72 23.78 7.20 23.57 5.96 23.47 5.13 23.05 4.71 23.05 4.30 22.74 3.68 22.54 3.16 22.12 2.85 21.71ZM29.37 16.22 29.27 16.53 29.27 17.46 28.86 17.98 27.72 18.81 27.20 18.91 26.47 19.32 26.06 19.32 25.96 19.43 25.54 19.43 24.92 19.63 24.19 19.63 24.09 19.74 21.91 19.74 21.81 19.84 21.19 19.84 21.09 19.74 20.36 19.74 20.26 19.63 19.43 19.63 18.91 19.01 18.91 18.60 19.01 18.49 18.91 17.56 19.32 17.15 19.63 17.15 19.84 17.36 20.77 17.36 20.88 17.46 23.68 17.46 23.78 17.36 24.61 17.36 24.71 17.25 25.75 17.15 25.85 17.04 26.47 17.04 27.82 16.42 28.34 16.32 28.86 15.90 29.06 15.90ZM2.85 17.25 2.95 16.94 3.78 16.11 4.30 15.90 5.03 15.39 5.44 15.39 5.96 15.08 6.99 14.97 7.82 14.66 11.35 14.66 11.76 14.87 13.00 14.97 13.94 15.39 14.56 15.49 14.97 15.80 15.18 15.80 16.42 16.42 17.15 17.15 17.15 17.46 16.32 18.39 16.01 18.49 15.70 18.81 15.18 18.91 14.76 19.22 14.14 19.32 13.52 19.63 12.07 19.74 11.97 19.84 11.03 19.84 10.93 19.95 9.07 19.95 8.44 19.74 6.79 19.63 6.16 19.32 5.44 19.22 5.13 19.01 4.61 18.91 4.09 18.49 3.89 18.49 3.06 17.77ZM15.39 12.38 15.49 12.17 15.80 11.97 16.63 12.59 16.94 12.59 17.25 12.80 17.98 13.00 18.39 13.00 18.81 13.21 19.84 13.31 19.95 13.42 20.98 13.42 21.09 13.52 23.16 13.52 23.26 13.42 24.82 13.42 25.85 13.11 26.27 13.11 28.03 12.59 28.65 12.17 29.06 12.07 29.37 12.49 29.27 12.69 29.37 13.31 29.17 13.73 28.44 14.35 26.89 15.08 26.58 15.08 25.23 15.49 23.78 15.59 23.68 15.70 20.88 15.70 20.77 15.59 19.01 15.49 18.49 15.18 18.08 15.18 17.36 14.76 17.04 14.76 15.49 13.73ZM29.37 9.38 28.34 10.52 27.82 10.62 27.41 10.93 26.89 11.03 26.27 11.35 25.75 11.35 24.40 11.76 21.71 11.86 21.60 11.76 20.67 11.76 20.57 11.66 19.74 11.66 19.22 11.45 18.81 11.45 18.08 11.14 17.04 10.93 16.53 10.62 16.11 10.52 15.49 9.90 15.39 9.27 15.49 9.17 15.39 8.55 15.49 8.34 15.80 8.13 16.73 8.76 17.56 8.86 18.29 9.17 18.91 9.17 19.01 9.27 20.05 9.38 20.15 9.48 20.88 9.48 20.98 9.58 23.68 9.58 23.78 9.48 24.50 9.48 24.61 9.38 25.13 9.38 25.75 9.17 26.27 9.17 26.58 8.96 26.99 8.96 27.82 8.55 28.34 8.44 28.86 8.03 29.06 8.03 29.27 8.24 29.27 9.27ZM15.49 5.34 16.32 4.40 17.25 3.89 17.98 3.78 18.29 3.57 18.60 3.57 19.12 3.37 19.84 3.37 20.46 3.16 22.43 2.95 22.54 3.06 23.57 3.06 24.09 3.26 25.54 3.37 25.64 3.47 26.37 3.57 26.99 3.89 27.30 3.89 28.65 4.61 29.27 5.23 29.27 5.54 28.55 6.37 26.78 7.20 26.47 7.20 26.06 7.41 24.82 7.62 24.71 7.72 24.09 7.72 23.99 7.82 21.40 7.93 21.29 7.82 20.67 7.82 20.57 7.72 19.12 7.62 18.39 7.30 17.98 7.30 16.63 6.68 16.01 6.27 15.59 5.75Z" }) }),
        /* @__PURE__ */ jsx("i", { className: "mt-vr mt-vr--dark", style: { left: U(67.26), top: U(14.2), height: U(29.8) } }),
        /* @__PURE__ */ jsx("span", { className: "mt-t mt-sans7", style: { left: U(77.9), top: U(16.73), fontSize: U(18.01), lineHeight: U(18.01), letterSpacing: U(-0.23), color: "#080300" }, children: "У меня долги по кредитам" }),
        /* @__PURE__ */ jsx("svg", { className: "mt-ic", viewBox: "0 0 23.62 19.89", fill: "#080300", "aria-hidden": "true", focusable: "false", style: { left: U(319.12), top: U(19.55), width: U(23.62), height: U(19.89) }, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M13.52 1.40 13.21 1.50 12.69 2.23 12.69 2.75 13.00 3.26 18.08 8.24 17.77 8.65 17.46 8.55 15.80 8.55 15.70 8.65 15.28 8.65 15.18 8.55 2.75 8.55 2.23 8.76 2.02 8.96 1.81 9.38 1.81 9.90 1.92 10.21 2.23 10.52 2.54 10.62 4.40 10.62 4.51 10.72 4.82 10.72 4.92 10.62 16.32 10.62 16.42 10.72 17.98 10.62 18.08 10.72 18.08 11.03 17.67 11.45 17.15 11.76 16.32 12.80 15.59 13.42 12.90 16.32 12.69 16.84 12.80 17.25 13.31 17.77 13.94 17.87 14.14 17.67 14.56 17.56 21.29 10.62 21.60 10.21 21.71 9.69 21.50 8.96 19.63 6.89 18.49 5.85 14.45 1.71 14.14 1.50Z" }) })
      ] })
    ] })
  ] });
};
const LazyOnVisible = ({ children, minHeight = 320 }) => {
  return /* @__PURE__ */ jsx(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-full",
          style: { minHeight },
          "aria-hidden": "true"
        }
      ),
      children
    }
  );
};
const SEO_PAGES = [
  {
    slug: "bankrotstvo-ip",
    title: "Банкротство ИП в Иркутске | Юстиция",
    description: "Банкротство индивидуального предпринимателя в Иркутске: списание долгов ИП и обязательств после закрытия. Защита имущества, рассрочка от 8 000 ₽ в месяц. Консультация юриста.",
    h1: "Банкротство ИП",
    lead: "Долги индивидуального предпринимателя не исчезают после закрытия ИП — они остаются на человеке. Банкротство списывает и предпринимательские долги, и личные обязательства, которые накопились параллельно. Разбираем ситуацию и определяем, подходит ли процедура.",
    keywords: ["банкротство ИП", "банкротство ИП Иркутск", "списание долгов ИП", "банкротство после закрытия ИП"],
    sections: [
      {
        h2: "Когда ИП нужно банкротство",
        paragraphs: [
          "Процедура подходит, если долги ИП превышают возможность их обслуживать, а восстановить платёжеспособность не получается. Считаем не только сумму, но и соотношение долга к доходу, наличие имущества и сделок за последние три года."
        ],
        bullets: [
          "Долги по кредитам, займам и микрозаймам, оформленным на ИП или на физлицо",
          "Задолженность по налогам и страховым взносам, включая взносы за себя",
          "Обязательства перед поставщиками и подрядчиками по договорам",
          "Поручительства и долги, оставшиеся после официального закрытия ИП"
        ]
      },
      {
        h2: "Что важно знать предпринимателю",
        paragraphs: [
          "Главное заблуждение — что закрытие ИП обнуляет долги. Это не так: статус прекращается, а обязательства остаются за человеком, и взыскание переходит на его личное имущество. Банкротство — единственный законный способ списать такие долги полностью.",
          "Отдельно проверяем сделки за последние три года. Если имущество переоформлялось на родственников, суд может оспорить сделку. Поэтому порядок действий согласовываем до подачи заявления, а не после."
        ]
      },
      {
        h2: "Этапы процедуры",
        paragraphs: [
          "Сначала проверяем состав долгов и признаки банкротства. Затем готовим заявление и пакет документов, подаём в Арбитражный суд Иркутской области или Забайкальского края. После введения процедуры назначается финансовый управляющий: он проводит инвентаризацию, формирует конкурсную массу и рассчитывается с кредиторами.",
          "Единственное жильё защищено статьёй 446 ГПК РФ и в конкурсную массу не включается. По остальному имуществу заранее продумываем стратегию защиты."
        ]
      }
    ],
    faq: [
      {
        q: "Сколько стоит банкротство ИП?",
        a: "Стоимость фиксируется в договоре, оплата — в рассрочку от 8 000 ₽ в месяц. Срок выплат выбираете сами. Судебные расходы: госпошлина, вознаграждение финансового управляющего и публикации — называем заранее и тоже фиксируем. Точную сумму определяем после бесплатного разбора ситуации."
      },
      {
        q: "Спишутся ли долги, если ИП уже закрыто?",
        a: "Да. Закрытие ИП прекращает только статус предпринимателя, но не обязательства: долги переходят на физическое лицо. Банкротство гражданина списывает в том числе те долги, которые возникли в период работы ИП."
      },
      {
        q: "Сколько длится процедура?",
        a: "Минимальный срок — 6 месяцев. Если имущества нет и споров с кредиторами немного, процедура проходит быстрее. При наличии имущества и сделок за три года срок увеличивается."
      }
    ],
    related: ["bankrotstvo-fizlic", "tsena-bankrotstva", "sohranenie-imushchestva"],
    cityLine: "Работаем в Иркутске, Ангарске, Братске, Шелехове, Усолье-Сибирском и по всей Иркутской области."
  },
  {
    slug: "bankrotstvo-zastroyshchikov",
    title: "Банкротство застройщиков в Иркутске | Юстиция",
    description: "Банкротство застройщиков и строительных компаний: защита дольщиков, субсидиарная ответственность, реестр требований. Юрист в Иркутске.",
    h1: "Банкротство застройщиков",
    lead: "Банкротство застройщика — отдельная процедура со своими правилами: в ней защищаются дольщики, а решение о судьбе объекта принимает арбитражный суд с участием конкурсного управляющего. Мы представляем интересы дольщиков и кредиторов, а также сопровождаем руководителей застройщиков в Иркутской области.",
    keywords: ["банкротство застройщиков", "банкротство застройщика иркутск", "дольщики банкротство"],
    sections: [
      {
        h2: "Кто может обратиться",
        paragraphs: [
          "Дольщики, если застройщик не сдал объект или не передал квартиру по договору долевого участия. Кредиторы, которым застройщик не выплачивает долги. Сам застройщик, если строительство остановилось и компания не может обязательства выполнить."
        ]
      },
      {
        h2: "Что происходит с дольщиками",
        paragraphs: [
          "Требования дольщиков включаются в реестр требований и удовлетворяются в приоритетном порядке. Для этого важно вовремя подать заявление в установленный срок и подтвердить права документами по договору."
        ],
        bullets: [
          "Проверка договора долевого участия и оплаты",
          "Включение требования в реестр требований о передаче жилых помещений",
          "Контроль конкурсного управляющего и торгов по объекту"
        ]
      }
    ],
    faq: [
      {
        q: "Что будет с квартирой, если застройщик обанкротился?",
        a: "Квартира может быть передана дольщику из конкурсной массы или выплачена компенсация. Исход зависит от стадии строительства и состава реестра требований."
      },
      {
        q: "Можно ли взыскать деньги с руководителя застройщика?",
        a: "При доказанной вине руководителя, например при выводе средств, — да, через субсидиарную ответственность."
      }
    ],
    related: ["bankrotstvo-ip", "tsena-bankrotstva", "bankrotstvo-fizlic"],
    cityLine: "Ведём дела в Арбитражном суде Иркутской области."
  },
  {
    slug: "vnesudebnoe-bankrotstvo-mfc",
    title: "Внесудебное банкротство через МФЦ в Иркутске | Юстиция",
    description: "Внесудебное банкротство через МФЦ: условия, сумма долга до 1 млн ₽, сроки и документы. Бесплатная консультация юриста в Иркутске.",
    h1: "Внесудебное банкротство через МФЦ",
    lead: "Внесудебное банкротство — упрощённая процедура, которая проходит через МФЦ без участия суда. Подходит не всем: обязательное условие — небольшой долг и отсутствие имущества, на которое можно обратить взыскание. Проверим, подходите ли вы, и подготовим заявление.",
    keywords: ["внесудебное банкротство", "внесудебное банкротство через мфц", "банкротство через мфц иркутск"],
    sections: [
      {
        h2: "Условия внесудебного банкротства",
        paragraphs: [
          "По закону процедура доступна гражданам, у которых общая сумма долгов не превышает установленного порога, нет исполнительных производств по этим долгам и отсутствует имущество, пригодное для взыскания, кроме единственного жилья при определённых условиях."
        ],
        bullets: [
          "Долги в пределах лимита, установленного законом",
          "Отсутствие активного исполнительного производства",
          "Нет подходящего для взыскания имущества",
          "Не было внесудебного банкротства за последние 5 лет"
        ]
      },
      {
        h2: "Как проходит процедура",
        paragraphs: [
          "Сначала проверяем условия. Затем готовим пакет документов и подаём заявление через МФЦ. Финансовый управляющий публикует сведения, после чего долги списываются. Если условий не хватает, предлагаем судебную процедуру."
        ]
      }
    ],
    faq: [
      {
        q: "Можно ли пройти внесудебное банкротство через МФЦ без юриста?",
        a: "Формально да, но ошибка в условиях или документах приводит к отказу. Проверка до подачи экономит время и деньги."
      },
      {
        q: "Что делать, если внесудебное банкротство не подходит?",
        a: "Тогда подаётся заявление в арбитражный суд. Мы сразу оценим, какой вариант подходит вам по сумме и составу имущества."
      }
    ],
    related: ["bankrotstvo-fizlic", "tsena-bankrotstva", "spisanie-dolgov-po-kreditam"],
    cityLine: "Помогаем жителям Иркутска, Ангарска, Братска, Шелехова и Усолья-Сибирского."
  },
  {
    slug: "zashchita-ot-kollektorov",
    title: "Защита от коллекторов и приставов в Иркутске | Юстиция",
    description: "Как остановить звонки коллекторов и аресты приставов: законные способы защиты, жалобы, банкротство. Юрист в Иркутске, консультация бесплатно.",
    h1: "Защита от коллекторов и приставов",
    lead: "Коллекторы не имеют права угрожать, звонить ночью и сообщать родственникам о долге. Приставы обязаны соблюдать сроки и порядок взыскания. Мы помогаем остановить давление законными способами: жалобами, требованиями и, при необходимости, банкротством.",
    keywords: ["защита от коллекторов", "защита от приставов", "коллекторы иркутск"],
    sections: [
      {
        h2: "Что запрещено коллекторам",
        paragraphs: [
          "Федеральный закон о микрофинансовой деятельности и взыскании задолженности ограничивает частоту звонков, запрещает угрозы и обращения к третьим лицам о долге. Нарушения можно и нужно фиксировать."
        ],
        bullets: [
          "Звонки чаще двух раз в сутки и в ночное время",
          "Угрозы и оскорбления",
          "Сообщения родственникам, коллегам и соседям"
        ]
      },
      {
        h2: "Как защититься от приставов",
        paragraphs: [
          "Исполнительные действия можно обжаловать, если нарушен порядок или неверно рассчитана сумма. Аресты счетов и имущества снимаются при подтверждённых основаниях. Иногда быстрее всего помогает подача заявления о банкротстве: с момента его принятия судом взыскания приостанавливаются."
        ]
      }
    ],
    faq: [
      {
        q: "Что делать, если коллекторы звонят каждый день?",
        a: "Зафиксировать звонки, направить коллектору письменное требование прекратить и при нарушениях обращаться с жалобой. Мы подготовим документы."
      },
      {
        q: "Остановит ли банкротство аресты приставов?",
        a: "После принятия заявления судом взыскания по большинству долгов приостанавливаются. Конкретный порядок зависит от вида процедуры."
      }
    ],
    related: ["bankrotstvo-fizlic", "spisanie-dolgov-po-kreditam", "vnesudebnoe-bankrotstvo-mfc"],
    cityLine: "Консультируем в Иркутске и по всей Иркутской области онлайн."
  },
  {
    slug: "reestrukturizatsiya-dolgov",
    title: "Реструктуризация долгов и снижение платежей | Юстиция",
    description: "Реструктуризация долгов в Иркутске: снижение ежемесячных платежей, отсрочка, план выплат. Когда выгоднее реструктуризация, а когда банкротство.",
    h1: "Реструктуризация долгов и снижение платежей",
    lead: "Реструктуризация долгов — процедура, в которой суд утверждает план выплат на срок до 3 лет. Платежи становятся меньше, проценты и штрафы перестают расти. Подходит, если доход есть, но не покрывает текущую нагрузку. Если долги не выплатить вообще, нужна другая процедура.",
    keywords: ["реструктуризация долгов", "снижение платежей по кредитам", "реструктуризация иркутск"],
    sections: [
      {
        h2: "Кому подходит реструктуризация",
        paragraphs: [
          "Реструктуризация рассчитана на тех, у кого стабильный доход, но долги слишком велики для него. Процедура сохраняет имущество и позволяет выплатить долги полностью по согласованному графику."
        ],
        bullets: [
          "Официальный доход, достаточный для минимальных платежей по плану",
          "Долги, которые можно выплатить за 3 года",
          "Желание сохранить имущество"
        ]
      },
      {
        h2: "Реструктуризация или банкротство",
        paragraphs: [
          "Если доход не позволяет платить даже по сниженному графику, реструктуризация не работает. В этом случае рекомендуем банкротство, которое списывает долги. Оценку делаем на бесплатной консультации."
        ]
      }
    ],
    faq: [
      {
        q: "На сколько можно снизить платежи?",
        a: "Суд утверждает план, в котором ежемесячный платёж рассчитывается из прожиточного минимума и дохода. Конкретная сумма зависит от доходов и состава долгов."
      },
      {
        q: "Что будет с процентами и штрафами?",
        a: "В ходе реструктуризации начисление процентов и неустоек, как правило, прекращается. Точные условия зависят от состава долгов."
      }
    ],
    related: ["bankrotstvo-fizlic", "spisanie-dolgov-po-kreditam", "tsena-bankrotstva"],
    cityLine: "Работаем в Иркутске, Ангарске, Братске и по всей области."
  },
  {
    slug: "sohranenie-imushchestva",
    title: "Сохранение имущества и единственного жилья при банкротстве | Юстиция",
    description: "Как сохранить единственное жильё, автомобиль и доходы при банкротстве физлица. Законные исключения по 127-ФЗ. Юрист в Иркутске.",
    h1: "Сохранение имущества и единственного жилья",
    lead: "При банкротстве физического лица часть имущества защищена законом. Единственное жильё сохраняется, если оно не в залоге и не в ипотеке, а также предметы первой необходимости и часть доходов. Мы заранее определяем, что можно сохранить, и выстраиваем стратегию под вашу ситуацию.",
    keywords: ["сохранение имущества при банкротстве", "единственное жилье банкротство", "сохранить квартиру при банкротстве"],
    sections: [
      {
        h2: "Что защищено законом",
        paragraphs: [
          "Статья 446 Гражданского процессуального кодекса и 127-ФЗ определяют перечень имущества, которое нельзя изъять. Единственное пригодное для проживания жильё защищено, если на него не обращено взыскание по ипотеке или залогу."
        ],
        bullets: [
          "Единственное жильё, не находящееся в залоге",
          "Предметы домашнего обихода и одежда",
          "Средства к существованию в пределах прожиточного минимума",
          "Имущество, без которого невозможно работать"
        ]
      },
      {
        h2: "Чего нельзя делать",
        paragraphs: [
          "Переоформлять имущество на родственников за 3 года до подачи заявления или продавать квартиру незадолго до банкротства. Суд признаёт такие сделки недействительными, и имущество возвращается в конкурсную массу."
        ]
      }
    ],
    faq: [
      {
        q: "Можно ли сохранить квартиру, если есть ипотека?",
        a: "Ипотечная квартира является предметом залога, поэтому по ней кредитор имеет приоритет. Варианты сохранения обсуждаем индивидуально."
      },
      {
        q: "Что будет с автомобилем?",
        a: "Автомобиль сохраняется, если он нужен для работы или для инвалида, либо если его стоимость не превышает установленного законом лимита. Иначе он может быть реализован."
      }
    ],
    related: ["bankrotstvo-fizlic", "vyezd-za-granitsu-posle-bankrotstva", "spisanie-dolgov-po-kreditam"],
    cityLine: "Ведём дела в Иркутске и по всей Иркутской области."
  },
  {
    slug: "skolko-dlitsya-bankrotstvo",
    title: "Сколько длится банкротство физлица: сроки процедуры | Юстиция",
    description: "Сроки банкротства физлица: внесудебное, судебное, реализация имущества. От 4 до 12 месяцев. Этапы и от чего зависит длительность.",
    h1: "Сколько времени занимает процедура банкротства",
    lead: "Банкротство физического лица занимает от 4 до 12 месяцев в зависимости от вида процедуры. Внесудебная процедура через МФЦ — самая короткая. Судебная реализация имущества растягивается, если есть имущество для продажи и споры с кредиторами.",
    keywords: ["сколько длится банкротство", "сроки банкротства физлица", "сколько времени занимает процедура банкротства"],
    sections: [
      {
        h2: "Сроки по видам процедуры",
        paragraphs: [
          "Внесудебная процедура обычно занимает около 6 месяцев: это срок публикации сведений и расчётов. Судебная реализация имущества — от 6 до 12 месяцев и дольше, если идут торги."
        ],
        bullets: [
          "Внесудебное банкротство через МФЦ: около 6 месяцев",
          "Судебное банкротство без имущества: от 4 до 6 месяцев",
          "Судебная реализация имущества: от 6 до 12 месяцев"
        ]
      },
      {
        h2: "От чего зависит длительность",
        paragraphs: [
          "Количество кредиторов, наличие имущества и торгов, сроки ответов госорганов и сложность споров. Чем больше документов и активов, тем дольше процедура."
        ]
      }
    ],
    faq: [
      {
        q: "Можно ли ускорить процедуру?",
        a: "Да, если заранее подготовить полный пакет документов и не затягивать с ответами на запросы финансового управляющего."
      }
    ],
    related: ["bankrotstvo-fizlic", "vnesudebnoe-bankrotstvo-mfc", "tsena-bankrotstva"]
  },
  {
    slug: "vyezd-za-granitsu-posle-bankrotstva",
    title: "Выезд за границу после банкротства: ограничения | Юстиция",
    description: "Можно ли выехать за границу после банкротства физлица: ограничения на время процедуры, снятие запрета, загранпаспорт. Юрист в Иркутске.",
    h1: "Выезд за границу после банкротства",
    lead: "Во время процедуры банкротства физлицу могут ограничить выезд за границу, если он является должником по крупным обязательствам или есть решения о взыскании. Сам факт банкротства не означает запрет навсегда: после завершения процедуры ограничения, как правило, снимаются.",
    keywords: ["выезд за границу после банкротства", "банкротство выезд за границу", "ограничение выезда при банкротстве"],
    sections: [
      {
        h2: "Когда выезд ограничен",
        paragraphs: [
          "Ограничение выезда может быть установлено судом в рамках процедуры или судебным приставом при исполнительных производствах. Конкретный порядок зависит от суммы долга и стадии процедуры."
        ]
      },
      {
        h2: "Как снять ограничение",
        paragraphs: [
          "Ограничение снимается после завершения процедуры банкротства или погашения долгов. Если необходимо выехать раньше, например по работе или по семейным обстоятельствам, можно подать ходатайство в суд."
        ]
      }
    ],
    faq: [
      {
        q: "Можно ли получить загранпаспорт во время банкротства?",
        a: "Оформление возможно, но выезд может быть ограничен. Перед подачей документов нужно проверить, есть ли у вас ограничения."
      }
    ],
    related: ["bankrotstvo-fizlic", "sohranenie-imushchestva", "skolko-dlitsya-bankrotstvo"]
  },
  {
    slug: "tsena-bankrotstva",
    title: "Цена банкротства в Иркутске: стоимость и рассрочка | Юстиция",
    description: "Сколько стоит банкротство физлица и ИП в Иркутске: от 89 000 ₽, рассрочка от 10 000 ₽ в месяц. Фиксированная цена в договоре.",
    h1: "Стоимость банкротства: цены и рассрочка",
    lead: "Сопровождение банкротства физлица в Иркутске стоит от 89 000 ₽, банкротство ИП — от 95 000 ₽. Стоимость фиксируется в договоре, без скрытых платежей, есть рассрочка от 10 000 ₽ в месяц.",
    keywords: ["цена банкротства", "стоимость банкротства физлиц иркутск", "сколько стоит банкротство"],
    sections: [
      {
        h2: "Цены по видам услуг",
        paragraphs: [
          "Стоимость зависит от вида процедуры и объёма работы. Ниже ориентиры, точная сумма — после бесплатного разбора вашей ситуации."
        ],
        bullets: [
          "Судебное банкротство физлица «Под ключ» (ФЗ-127): от 89 000 ₽, рассрочка от 10 000 ₽/мес",
          "Банкротство ИП и предпринимателей: от 95 000 ₽",
          "Банкротство юридических лиц: от 120 000 ₽, рассрочка от 15 000 ₽/мес",
          "Внесудебное банкротство через МФЦ: от 19 000 ₽, рассрочка от 10 000 ₽/мес"
        ]
      },
      {
        h2: "Что входит в стоимость",
        paragraphs: [
          "Разбор ситуации, подготовка заявления и документов, представительство в суде, сопровождение у финансового управляющего до завершения процедуры. Госпошлина и публикации оплачиваются отдельно и в договоре указываются заранее."
        ]
      }
    ],
    faq: [
      {
        q: "Есть ли скрытые платежи?",
        a: "Нет. Все платежи перечислены в договоре. Госпошлина и публикации оплачиваются отдельно и указываются заранее."
      },
      {
        q: "Можно ли платить частями?",
        a: "Да, доступна рассрочка от 10 000 ₽ в месяц на весь период процедуры."
      },
      {
        q: "Что дешевле: внесудебное или судебное банкротство?",
        a: "Внесудебное обычно дешевле, но подходит не всем. Судебное подходит при большем долге или наличии имущества."
      }
    ],
    related: ["bankrotstvo-fizlic", "vnesudebnoe-bankrotstvo-mfc", "yurist-po-bankrotstvu-irkutsk"],
    cityLine: "Работаем в Иркутске, Ангарске, Братске, Шелехове, Усолье-Сибирском и онлайн по всей России."
  },
  {
    slug: "yurist-po-bankrotstvu-irkutsk",
    title: "Юрист по банкротству в Иркутске: адвокат и консультация | Юстиция",
    description: "Юрист и адвокат по банкротству в Иркутске. Судебное представительство в Арбитражном суде Иркутской области. Бесплатная консультация.",
    h1: "Юрист по банкротству в Иркутске",
    lead: "Юристы компании «Юстиция» ведут дела о банкротстве в Иркутске, Ангарске, Братске и по всей области. Судебное представительство в Арбитражном суде Иркутской области и Забайкальского края, консультация до подачи заявления. Первый разбор ситуации бесплатный.",
    keywords: ["юрист по банкротству иркутск", "адвокат по банкротству", "адвокат банкротство иркутск"],
    sections: [
      {
        h2: "Почему важен юрист именно по банкротству",
        paragraphs: [
          "Процедура регулируется отдельным законом о банкротстве и требует точных сроков и документов. Ошибка в заявлении или пропущенный срок могут привести к отказу или к субсидиарной ответственности."
        ]
      },
      {
        h2: "Что делает юрист в вашем деле",
        paragraphs: [
          "Проверяет условия, готовит документы, представляет интересы в суде, контролирует финансового управляющего и взаимодействие с кредиторами. Вы получаете понятный план и ответ на каждый вопрос."
        ]
      }
    ],
    faq: [
      {
        q: "Нужен ли адвокат для банкротства или достаточно юриста?",
        a: "Для представительства в суде подходит юрист с доверенностью или адвокат. Мы работаем с обоими вариантами и объясним, что выгоднее в вашем случае."
      },
      {
        q: "Консультация бесплатная?",
        a: "Да, первичный разбор ситуации бесплатный и ни к чему не обязывает."
      }
    ],
    related: ["bankrotstvo-fizlic", "tsena-bankrotstva", "otzyvy-bankrotstvo-irkutsk"],
    cityLine: "Приём в офисе в Иркутске (ул. Верхняя Набережная, 167/8) и онлайн."
  },
  {
    slug: "spisanie-dolgov-po-kreditam",
    title: "Списание долгов по кредитам через суд в Иркутске | Юстиция",
    description: "Списание долгов по кредитам и займам через суд: банкротство физлица по 127-ФЗ. Как списать долги, что нужно и сколько ждать. Иркутск.",
    h1: "Списание долгов по кредитам через суд",
    lead: "Списать долги по кредитам и микрозаймам можно через судебное банкротство физлица. Если выполнены условия закона, суд освобождает от обязательств, которые не удалось выплатить. Проверяем ваш случай бесплатно и говорим честно, что сработает.",
    keywords: ["списать долги по кредитам", "списание долгов через суд", "списание кредитов иркутск"],
    sections: [
      {
        h2: "Как списываются долги",
        paragraphs: [
          "Списание происходит в конце процедуры банкротства: после реализации имущества, если оно есть, суд освобождает должника от оставшихся обязательств. Проценты и штрафы в этот период перестают начисляться."
        ],
        bullets: [
          "Судебное банкротство по 127-ФЗ — списание по окончании процедуры",
          "Внесудебное банкротство через МФЦ — для небольших долгов",
          "Реструктуризация — если доход позволяет выплатить по сниженному плану"
        ]
      }
    ],
    faq: [
      {
        q: "Какие долги можно списать?",
        a: "Кредиты, займы, микрозаймы, налоги и обязательные платежи. Алименты, вред здоровью и некоторые другие обязательства по закону не списываются."
      },
      {
        q: "Сколько времени нужно, чтобы долги списали?",
        a: "Списание происходит в конце процедуры, обычно через 4–12 месяцев."
      }
    ],
    related: ["bankrotstvo-fizlic", "vnesudebnoe-bankrotstvo-mfc", "reestrukturizatsiya-dolgov"],
    cityLine: "Ведём дела в Иркутске, Ангарске, Братске, Шелехове, Усолье-Сибирском и по всей области."
  },
  {
    slug: "bankrotstvo-irkutsk-otzyvy",
    title: "Банкротство в Иркутске: отзывы клиентов | Юстиция",
    description: "Отзывы клиентов о банкротстве в Иркутске: реальные истории дел и результаты. Юридическая компания «Юстиция», Верхняя Набережная.",
    h1: "Банкротство в Иркутске: отзывы клиентов",
    lead: "Отзывы клиентов по делам о банкротстве. Истории публикуются с согласия клиентов и без выдуманных цифр. Результат каждого дела зависит от обстоятельств, поэтому опубликованные примеры не гарантируют аналогичный исход.",
    keywords: ["банкротство иркутск отзывы", "отзывы о банкротстве иркутск", "юстиция отзывы"],
    sections: [
      {
        h2: "Как мы публикуем отзывы",
        paragraphs: [
          "Публикуем только отзывы клиентов, которые дали согласие. Если на сайте указан результат дела, это реальное дело, описанное без приукрашивания. Проверить отзывы можно на картах и в справочниках компаний."
        ]
      }
    ],
    faq: [
      {
        q: "Где посмотреть отзывы независимо от сайта?",
        a: "Отзывы о компании можно найти на картах Яндекса и 2ГИС, а также в открытых источниках о делах в арбитражном суде."
      }
    ],
    related: ["yurist-po-bankrotstvu-irkutsk", "bankrotstvo-fizlic", "tsena-bankrotstva"],
    cityLine: "Работаем в Иркутске, Ангарске, Братске и по всей области."
  },
  {
    slug: "besplatnaya-konsultatsiya-yurista-irkutsk",
    title: "Бесплатная консультация юриста в Иркутске по долгам | Юстиция",
    description: "Бесплатная консультация юриста по долгам и банкротству в Иркутске. Разбор ситуации за 5 минут, без предоплаты. Телефон +7 (914) 938-54-44.",
    h1: "Бесплатная консультация юриста в Иркутске",
    lead: "Бесплатный первичный разбор ситуации по долгам: юрист оценит, подходит ли банкротство, какая процедура выгоднее и сколько это займёт. Консультация ни к чему не обязывает и не требует предоплаты.",
    keywords: ["бесплатная консультация юриста иркутск", "консультация юриста по долгам", "юрист иркутск бесплатно"],
    sections: [
      {
        h2: "Что будет на консультации",
        paragraphs: [
          "Вы рассказываете о долгах и обстоятельствах, юрист задаёт уточняющие вопросы и говорит, какие варианты доступны. Если банкротство не подходит, скажем об этом прямо и предложим другой путь."
        ],
        bullets: [
          "Оценка долгов и условий для банкротства",
          "Варианты: внесудебное, судебное, реструктуризация",
          "Ориентировочная стоимость и сроки"
        ]
      }
    ],
    faq: [
      {
        q: "Как записаться на консультацию?",
        a: "По телефону +7 (914) 938-54-44 или через форму на сайте. Перезвоним в течение 5 минут в рабочее время."
      }
    ],
    related: ["yurist-po-bankrotstvu-irkutsk", "bankrotstvo-fizlic", "tsena-bankrotstva"],
    cityLine: "Офис в Иркутске, ул. Верхняя Набережная, 167/8. Онлайн-консультации по всей России."
  },
  {
    slug: "bankrotstvo-fizlic",
    title: "Банкротство физлиц и ИП в Иркутске: списание долгов по 127-ФЗ",
    description: "Банкротство физлиц и ИП в Иркутске: списание кредитов, микрозаймов и налогов по 127-ФЗ. Сроки, цена от 89 000 ₽, рассрочка. Консультация юриста.",
    h1: "Банкротство физических лиц и ИП",
    lead: "Банкротство физического лица — законная процедура, которая позволяет списать долги, если выплатить их невозможно. Юристы «Юстиции» ведут дела по 127-ФЗ в Иркутске, Ангарске, Братске и по всей Иркутской области. Первый разбор ситуации бесплатный: скажем, подходит ли вам банкротство и какой вариант выгоднее.",
    keywords: ["банкротство физлиц иркутск", "банкротство физических лиц", "банкротство ип иркутск"],
    sections: [
      {
        h2: "Кому подходит банкротство",
        paragraphs: [
          "Процедура доступна гражданам и индивидуальным предпринимателям, которые не могут выплатить долги и не видят возможности восстановить платёжеспособность. Главные критерии: долги подтверждены, доход не позволяет рассчитаться по графику, а имущество не покрывает обязательства."
        ],
        bullets: [
          "Кредиты, займы, микрозаймы и кредитные карты",
          "Задолженность по налогам и обязательным платежам",
          "Исполнительные производства и аресты счетов",
          "Долги ИП, которые нельзя закрыть за счёт бизнеса"
        ]
      },
      {
        h2: "Какие бывают процедуры",
        paragraphs: [
          "Выбор зависит от суммы долга, наличия имущества и доходов. Для небольших долгов без имущества подходит внесудебное банкротство через МФЦ. Для больших долгов и при наличии имущества нужна судебная процедура. Если доход позволяет платить, иногда выгоднее реструктуризация."
        ],
        bullets: [
          "Внесудебное банкротство через МФЦ: для небольших долгов",
          "Судебное банкротство: при большом долге или имуществе",
          "Реструктуризация: если есть доход для сниженных платежей"
        ]
      },
      {
        h2: "Что остаётся у должника",
        paragraphs: [
          "Закон защищает часть имущества: единственное жильё при определённых условиях, предметы первой необходимости, средства в пределах прожиточного минимума. Перед подачей заявления мы проверяем, что можно сохранить, и не допускаем сделок, которые суд признает недействительными."
        ]
      }
    ],
    faq: [
      {
        q: "Можно ли списать долги по кредитам?",
        a: "Да, через судебное или внесудебное банкротство, если выполнены условия закона. Алименты и вред здоровью по закону не списываются."
      },
      {
        q: "Сколько стоит банкротство физлица?",
        a: "Сопровождение «Под ключ» по 127-ФЗ — от 89 000 ₽, рассрочка от 10 000 ₽ в месяц. Точная сумма — после разбора ситуации."
      },
      {
        q: "Сколько длится процедура?",
        a: "От 4 до 12 месяцев, в зависимости от вида процедуры и наличия имущества."
      }
    ],
    related: ["spisanie-dolgov-po-kreditam", "vnesudebnoe-bankrotstvo-mfc", "tsena-bankrotstva", "skolko-dlitsya-bankrotstvo"],
    cityLine: "Работаем в Иркутске, Ангарске, Братске, Шелехове, Усолье-Сибирском и по всей области."
  }
];
const SEO_PAGES_BY_SLUG = Object.fromEntries(SEO_PAGES.map((p) => [p.slug, p]));
function useSeoHead(page) {
  useEffect(() => {
    const url = `https://ust38.ru/${page.slug}/`;
    document.title = page.title;
    const setMeta = (sel, attr, value) => {
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        const [k, v] = attr.split("=");
        el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', "name=description", page.description);
    setMeta('meta[property="og:title"]', "property=og:title", page.title);
    setMeta('meta[property="og:description"]', "property=og:description", page.description);
    setMeta('meta[property="og:url"]', "property=og:url", url);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "seo-page-ld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.h1,
          description: page.description,
          isPartOf: { "@id": "https://ust38.ru/#website" }
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://ust38.ru/" },
            { "@type": "ListItem", position: 2, name: page.h1, item: url }
          ]
        }
      ]
    });
    document.head.querySelector("#seo-page-ld")?.remove();
    document.head.appendChild(ld);
    return () => {
      ld.remove();
    };
  }, [page]);
}
const SeoLanding = ({ page, onOpenConsultation }) => {
  useSeoHead(page);
  return /* @__PURE__ */ jsx("article", { className: "bg-ink text-paper min-h-dvh pt-28 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "site-container space-y-14", children: [
    /* @__PURE__ */ jsx("nav", { "aria-label": "Навигация", className: "text-xs text-faint", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap gap-1.5", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-gold", children: "Главная" }) }),
      /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
      /* @__PURE__ */ jsx("li", { className: "text-muted", children: page.h1 })
    ] }) }),
    /* @__PURE__ */ jsxs("header", { className: "max-w-3xl space-y-5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-5xl font-serif font-bold leading-tight", children: page.h1 }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-muted leading-relaxed", children: page.lead }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              trackEvent("seo_landing_cta", { page: page.slug });
              onOpenConsultation();
            },
            className: "gold-btn px-6 py-3.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Бесплатная консультация" }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${COMPANY_INFO.rawPhone}`,
            onClick: () => trackEvent("phone_click", { page: page.slug }),
            className: "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gold/40 text-sm font-semibold text-paper hover:bg-gold/10 transition-colors whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: COMPANY_INFO.phones[0] })
            ]
          }
        )
      ] })
    ] }),
    page.sections.map((s) => /* @__PURE__ */ jsxs("section", { className: "max-w-3xl space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold", children: s.h2 }),
      s.paragraphs.map((p, i) => /* @__PURE__ */ jsx("p", { className: "text-sm text-muted leading-relaxed", children: p }, i)),
      s.bullets && /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 pt-1", children: s.bullets.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-paper", children: [
        /* @__PURE__ */ jsx(Check, { size: 16, className: "text-ok shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { children: b })
      ] }, b)) })
    ] }, s.h2)),
    page.faq.length > 0 && /* @__PURE__ */ jsxs("section", { className: "max-w-3xl space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold", children: "Частые вопросы" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: page.faq.map((f) => /* @__PURE__ */ jsxs("details", { className: "group bg-panel border border-line rounded-xl p-4", children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-sm font-semibold text-paper list-none", children: f.q }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted leading-relaxed pt-3", children: f.a })
      ] }, f.q)) })
    ] }),
    page.cityLine && /* @__PURE__ */ jsxs("p", { className: "max-w-3xl text-xs text-faint flex items-start gap-2", children: [
      /* @__PURE__ */ jsx(MapPin, { size: 14, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsx("span", { children: page.cityLine })
    ] }),
    page.related.length > 0 && /* @__PURE__ */ jsxs("nav", { "aria-label": "Другие услуги", className: "max-w-3xl space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-serif font-bold", children: "Другие вопросы по теме" }),
      /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: page.related.map((slug) => SEO_PAGES_BY_SLUG[slug]).filter(Boolean).map((r) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `/${r.slug}`,
          className: "block p-3 rounded-lg border border-line-2 bg-panel text-sm text-paper hover:border-gold transition-colors",
          children: r.h1
        }
      ) }, r.slug)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl pt-4 border-t border-line", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-faint leading-relaxed", children: "Информация носит общий характер и не является юридической консультацией. Результат каждого дела зависит от обстоятельств и не гарантируется." }) })
  ] }) });
};
const Link = ({ href, children, ...rest }) => /* @__PURE__ */ jsx("a", { href, ...rest, children });
const NotFoundPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink flex flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-line", children: /* @__PURE__ */ jsxs("div", { className: "site-container py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsx("span", { className: "font-serif text-xl font-bold text-gold", children: "Юстиция" }),
        /* @__PURE__ */ jsxs("span", { className: "hidden sm:block text-[11px] text-faint leading-tight", children: [
          "банкротство",
          /* @__PURE__ */ jsx("br", {}),
          "в Иркутске"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `tel:${COMPANY_INFO.phones[0].replace(/[^\d+]/g, "")}`,
          className: "flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-deep transition-colors",
          children: [
            /* @__PURE__ */ jsx(Phone, { size: 16 }),
            COMPANY_INFO.phones[0]
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 flex items-center justify-center px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl w-full text-center space-y-7", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface border border-gold/30 mx-auto", children: /* @__PURE__ */ jsx(Search, { size: 34, className: "text-gold" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-6xl sm:text-7xl font-bold text-gold/25 leading-none", children: "404" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-serif font-bold", children: "Такой страницы нет" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-faint leading-relaxed max-w-md mx-auto", children: "Возможно, адрес набран с ошибкой или страница переехала. Позвоните нам — подскажем, где найти нужное." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center pt-2", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/",
            className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold-deep transition-colors",
            children: [
              /* @__PURE__ */ jsx(Home, { size: 16 }),
              "На главную"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${COMPANY_INFO.phones[0].replace(/[^\d+]/g, "")}`,
            className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold font-semibold text-sm hover:bg-gold/10 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              COMPANY_INFO.phones[0]
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-line", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-faint mb-4", children: "Частые разделы сайта" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: [
          { href: "/bankrotstvo-fizlic/", label: "Банкротство физлиц" },
          { href: "/bankrotstvo-ip/", label: "Банкротство ИП" },
          { href: "/tsena-bankrotstva/", label: "Цена банкротства" },
          { href: "/spisanie-dolgov-po-kreditam/", label: "Списание долгов" },
          { href: "/sohranenie-imushchestva/", label: "Сохранение жилья" }
        ].map((l) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: l.href,
            className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-paper hover:border-gold/50 hover:text-gold transition-colors",
            children: [
              l.label,
              /* @__PURE__ */ jsx(ArrowRight, { size: 12 })
            ]
          },
          l.href
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-line py-6", children: /* @__PURE__ */ jsx("div", { className: "site-container text-center text-[11px] text-faint", children: "ООО «Юстиция» · Иркутск, ул. Верхняя Набережная, 167/8 · ИНН 3811452733" }) })
  ] });
};
const RouteContext = createContext(null);
function useRoutePath() {
  const fromCtx = useContext(RouteContext);
  if (fromCtx !== null) return fromCtx;
  if (typeof window !== "undefined") return window.location.pathname;
  return "/";
}
const clientStoryVideo = "/assets/client-story-9WwYiq2i.mp4";
const clientStoryPoster = "/assets/client-story-poster-BXGVhheC.jpg";
const AUDIENCE_CARDS = [
  {
    id: "business",
    badge: "Предпринимателям и ИП",
    title: "Долги бизнеса, кредиты, налоги, блокировка счетов",
    lead: "Разбираем ситуацию предпринимателя и определяем, какая процедура применима именно в вашем случае. Своевременное банкротство позволяет избежать давления кредиторов и сохранить личные активы.",
    bullets: [
      "Долги по кредитам, займам, налогам и обязательствам перед кредиторами",
      "Блокировка расчетных счетов и угроза ареста имущества",
      "Обязательства ИП, в том числе после официального прекращения деятельности",
      "Защита единственного жилья и минимизация рисков по залоговому имуществу"
    ],
    qaList: [
      {
        question: "Что делать, если мои счета еще не заблокированы, но я уже не справляюсь с кредитной нагрузкой?",
        answer: "Вы можете начать процедуру банкротства вовремя, с наименьшими потерями и контролем ситуации. Это позволит избежать нарастающего давления со стороны кредиторов и поставщиков."
      },
      {
        question: "Что делать, если счета заблокированы, а кредиторы требуют вернуть деньги?",
        answer: "У Вас есть два выхода: например, взять деньги у знакомых и еще больше увеличить долги, либо срочно обратиться к нам. Мы расскажем, как правильно выйти из ситуации до того, как последует арест имущества и процедура станет сложнее и дольше."
      },
      {
        question: "Если заблокированы счета и арестовано имущество?",
        answer: "В этой стадии поможет только процедура банкротства. Приставы вправе реализовать имущество (кроме единственного жилья) по цене значительно ниже рыночной, и долг всё равно останется. При банкротстве мы спишем все долги, а ограничения и аресты будут сняты."
      },
      {
        question: "Какие долги можно списать у ИП?",
        answer: "Списать можно не только кредиты, взятые в банке, но и займы у поставщиков, контрагентов и частных лиц, а также налоговые недоимки."
      },
      {
        question: "Можно ли сохранить квартиру и другое имущество?",
        answer: "Индивидуальный предприниматель отвечает по обязательствам своим имуществом как физическое лицо. Единственное жилье по закону всегда остается у Вас. Остальное имущество — это индивидуальные ситуации, требующие детального правового анализа."
      },
      {
        question: "Можно ли продолжить заниматься бизнесом после банкротства?",
        answer: "Многие полагают, что после банкротства ИП 5 лет нельзя вести бизнес. Но выход есть! Проконсультируем бесплатно и подберем законную модель работы."
      },
      {
        question: "Когда снимают аресты со счетов?",
        answer: "Аресты со счетов снимаются, как только суд выносит решение и признает Вас банкротом. После этого можно открывать дебетовые карты и свободно пользоваться услугами банков."
      }
    ],
    videoQuestion: "Что нужно проверить до начала процедуры банкротства ИП",
    videoCta: "Обсудить долги моего бизнеса",
    videoDuration: "8 минут",
    videoTopics: [
      "Какие долги и обстоятельства могут быть основанием для процедуры",
      "Что происходит с обязательствами ИП, в том числе после прекращения деятельности",
      "Как процедура влияет на счета, имущество и возможность заниматься бизнесом",
      "Риски при ипотеке и залоговом имуществе",
      "Ограничения после завершения процедуры",
      "В каких случаях освобождение от долгов ограничено или не применяется"
    ]
  },
  {
    id: "person",
    badge: "Физическим лицам",
    title: "Кредиты, микрозаймы и налоги, которые стало тяжело платить",
    lead: "Объясняем простым языком, что происходит с долгами, доходами и имуществом при банкротстве по ФЗ № 127, и чего ждать на каждом этапе.",
    bullets: [
      "Просрочки по потребительским кредитам, картам и микрозаймам (МФО)",
      "Звонки коллекторов, удержания из зарплаты и аресты карт приставами",
      "Гарантированное сохранение единственного жилья и защита прожиточного минимума",
      "Полное списание задолженностей и восстановление финансовой свободы"
    ],
    qaList: [
      {
        question: "Когда и в каком случае подавать на банкротство?",
        answer: "Если Ваши расходы стали превышать доходы, нет возможности вовремя платить по счетам, появились просрочки по кредитам, угрозы от коллекторов, потеря работы или другие сложные жизненные обстоятельства."
      },
      {
        question: "Что будет с квартирой, единственным жильём, ипотекой, автомобилем и другим имуществом?",
        answer: "Единственное жилье по закону (ст. 446 ГПК РФ) забрать не могут. В случае с ипотекой заключается мировое соглашение с банком и жилье сохраняется при своевременных платежах. По остальному имуществу и автомобилям наши юристы разрабатывают стратегию защиты."
      },
      {
        question: "Что произойдёт с зарплатой, доходами, банковскими счетами и списаниями?",
        answer: "Во время процедуры банкротства картами распоряжается финансовый управляющий, но положенную Вам сумму (прожиточный минимум на Вас и иждивенцев) Вы будете получать ежемесячно. Все исполнительные удержания приставов прекращаются!"
      },
      {
        question: "Какие последствия ждут после банкротства: ограничения, работа, выезд за границу?",
        answer: "Ограничения минимальны: 5 лет нельзя занимать должность руководителя юрлица, кредитная история восстанавливается постепенно (кредиты обычно одобряют через 3 года). Выезжать за границу можно сразу после завершения процедуры. С работы никого не увольняют: банкротятся обычные люди — врачи, педагоги, инженеры."
      },
      {
        question: "Какие долги могут не списать?",
        answer: "Не подлежат списанию долги по алиментам, возмещению вреда здоровью, материальный ущерб от преступлений и текущие долги, возникшие уже после подачи заявления в суд."
      },
      {
        question: "Сколько времени занимает процедура?",
        answer: "Всё зависит от количества кредиторов и состава имущества. Минимальный срок составляет 6 месяцев. Этот срок рассчитывается юристом индивидуально для каждого клиента."
      },
      {
        question: "Как правильно начать процесс и какие расходы нужно учитывать?",
        answer: "Для начала обратиться к нам за бесплатной консультацией. Мы детально разберем ситуацию, и если процедура не подходит, скажем об этом честно. При сотрудничестве заключаем официальный договор с рассрочкой. Все расходы прозрачны и фиксируются заранее."
      }
    ],
    videoQuestion: "Что будет с имуществом и доходами после банкротства",
    videoCta: "Уточнить последствия банкротства в моей ситуации",
    videoDuration: "10 секунд",
    videoSrc: clientStoryVideo,
    videoPoster: clientStoryPoster,
    videoCaption: "Короткий видеоролик о том, что меняется после завершения процедуры банкротства",
    videoTopics: [
      "Какие задолженности могут быть списаны, а какие обязательства сохраняются",
      "Что будет с зарплатой, доходами, счетами, взысканиями и списаниями",
      "Что будет с единственным жильём, ипотекой, автомобилем и другим имуществом",
      "Какие последствия наступают после банкротства",
      "Можно ли продолжать официально работать и как процедура влияет на доход",
      "Как правильно начать процесс и что может повлиять на результат"
    ]
  }
];
const REVIEWS_DATA = [
  {
    id: "review-1",
    text: "Главное, что изменилось — исчезло постоянное напряжение и страх телефонных звонков. С первого же дня юристы «Юстиции» взяли всё общение с коллекторами и банками на себя. Впервые за четыре года я наконец-то сплю спокойно.",
    author: "Клиент, банкротство физического лица",
    audience: "person",
    context: "Долг 2,85 млн ₽ (6 кредиторов)",
    emotionalTag: "Больше нет напряжения из-за долгов",
    consent: true
  },
  {
    id: "review-2",
    text: "Появилось невероятное ощущение свободы. Раньше вся зарплата подчистую уходила на бесконечные проценты по микрозаймам, а долг только увеличивался. Теперь долг списан полностью по решению суда, жизнь началась с чистого листа!",
    author: "Клиентка, г. Ангарск",
    audience: "person",
    context: "Списано 1,24 млн ₽ (14 займов в МФО)",
    emotionalTag: "Ощущение свободы и жизни без кредитов",
    consent: true
  },
  {
    id: "review-3",
    text: "Единственное, о чём я искренне жалею — что тянул почти два года, брал новые микрозаймы и пытался перекредитоваться, загоняя себя в глухой угол. Надо было сразу обращаться в «Юстицию»!",
    author: "Клиент, г. Иркутск",
    audience: "person",
    context: "Списано 1,19 млн ₽, авто сохранили",
    emotionalTag: "Жалею, что долго откладывал решение",
    consent: true
  },
  {
    id: "review-4",
    text: "После завершения процедуры и списания долгов бизнеса я наконец-то могу спокойно планировать повседневные расходы и будущее семьи. Счета разблокированы, никаких ограничений, работаем дальше.",
    author: "Индивидуальный предприниматель",
    audience: "business",
    context: "Долги бизнеса 4,1 млн ₽ перед банками и ФНС",
    emotionalTag: "Планирование будущего и расходов",
    consent: true
  }
];
const SectionHead = ({
  index,
  title,
  lead,
  tone = "dark",
  className = ""
}) => {
  const isDark = tone === "dark";
  return /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-8 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: `font-mono text-xs sm:text-sm font-semibold tabular-nums tracking-wider ${isDark ? "text-gold" : "text-gold-deep"}`,
          children: index
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `h-px flex-1 lg:w-full lg:flex-none ${isDark ? "bg-line-2" : "bg-bone-line-2"}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-10", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: `font-serif font-bold leading-[1.08] tracking-tight text-[28px] sm:text-[40px] lg:text-[52px] ${isDark ? "text-paper" : "text-bone-ink"}`,
          children: title
        }
      ),
      lead && /* @__PURE__ */ jsx(
        "p",
        {
          className: `mt-3.5 sm:mt-4 max-w-2xl text-[15px] sm:text-lg lg:text-xl leading-relaxed ${isDark ? "text-faint" : "text-bone-mute"}`,
          children: lead
        }
      )
    ] })
  ] });
};
const DirectionsSection = ({
  onOpenConsultation,
  openId = null,
  onOpenChange
}) => {
  const toggle = (id) => {
    const next = openId === id ? null : id;
    onOpenChange?.(next);
    if (next) trackEvent("direction_open", { direction: id });
  };
  const ordered = [...AUDIENCE_CARDS].sort(
    (a, b) => a.id === "business" ? -1 : b.id === "business" ? 1 : 0
  );
  return /* @__PURE__ */ jsx("section", { id: "directions", className: "py-12 sm:py-16 bg-ink relative border-t border-line/60", children: /* @__PURE__ */ jsxs("div", { className: "site-container", children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        index: "01",
        className: "mb-8 sm:mb-10",
        title: /* @__PURE__ */ jsxs(Fragment, { children: [
          "Мы собрали важные вопросы ",
          /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold", children: "о банкротстве" })
        ] }),
        lead: "Если у Вас похожая ситуация — ознакомьтесь с ответами нашего юриста. Выберите свой вариант ниже."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto space-y-3", children: ordered.map((card) => {
      const isOpen = openId === card.id;
      const isBusiness = card.id === "business";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `rounded-2xl border-2 transition-colors overflow-hidden ${isOpen ? "border-gold/70 bg-surface" : "border-line-2 bg-surface/60 hover:border-gold/40"}`,
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle(card.id),
                "aria-expanded": isOpen,
                className: "w-full text-left px-4 py-4 sm:px-6 sm:py-5 flex items-center gap-3 cursor-pointer bg-transparent",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${isBusiness ? "bg-gold/15 text-gold" : "bg-raised text-paper"}`,
                      children: isBusiness ? /* @__PURE__ */ jsx(Briefcase, { size: 18 }) : /* @__PURE__ */ jsx(User, { size: 18 })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("div", { className: "font-serif font-bold text-paper text-xl sm:text-2xl lg:text-3xl leading-tight", children: isBusiness ? "Индивидуальные предприниматели" : "Физические лица" }),
                    /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-sm text-faint", children: isBusiness ? "У меня долги бизнеса или ИП" : "У меня долги по кредитам, займам, налогам" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-xs sm:text-sm text-gold font-semibold", children: isOpen ? "Свернуть" : `${card.qaList?.length ?? 0} вопросов` }),
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        size: 20,
                        className: `text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"}`,
                "aria-hidden": !isOpen,
                children: /* @__PURE__ */ jsxs("div", { className: "px-4 pb-5 sm:px-6 sm:pb-6 space-y-3 border-t border-line-2 pt-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "space-y-2", children: card.qaList?.map((qa, i) => /* @__PURE__ */ jsxs(
                    "details",
                    {
                      className: "group bg-ink/60 border border-line-2 rounded-xl px-3.5 py-3",
                      children: [
                        /* @__PURE__ */ jsxs("summary", { className: "font-semibold text-paper text-[17px] sm:text-xl lg:text-2xl leading-snug cursor-pointer list-none flex justify-between items-start gap-3", children: [
                          /* @__PURE__ */ jsx("span", { children: qa.question }),
                          /* @__PURE__ */ jsx("span", { className: "text-gold text-base leading-none transition-transform group-open:rotate-45 shrink-0 mt-0.5", children: "+" })
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] sm:text-lg lg:text-xl text-faint leading-relaxed border-t border-line-2 pt-3", children: qa.answer })
                      ]
                    },
                    i
                  )) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2.5 pt-1", children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => onOpenConsultation(card.id),
                        className: "gold-btn px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2",
                        children: [
                          "Обсудить мою ситуацию",
                          /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: `tel:${COMPANY_INFO.rawPhone}`,
                        onClick: () => trackEvent("phone_click", { placement: "направления" }),
                        className: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-line-2 text-sm font-semibold text-paper hover:border-gold/50 hover:text-gold transition-colors",
                        children: [
                          /* @__PURE__ */ jsx(Phone, { size: 15, className: "text-gold" }),
                          COMPANY_INFO.phones[0]
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-faint", children: "Консультация бесплатна и не обязывает заключать договор." })
                ] })
              }
            )
          ]
        },
        card.id
      );
    }) })
  ] }) });
};
const VideoPlayer = ({ src, poster, caption, label, wide = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
      trackEvent("video_cta_click", { action: "play", label: label ?? "видео" });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  return /* @__PURE__ */ jsxs("figure", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative mx-auto w-full overflow-hidden rounded-2xl border border-line-2 bg-ground shadow-deep group ${wide ? "aspect-video" : "max-w-[340px] sm:max-w-[380px] aspect-[9/16]"}`,
        children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              src,
              poster,
              preload: "none",
              playsInline: true,
              controls: isPlaying,
              onPlay: () => setIsPlaying(true),
              onPause: () => setIsPlaying(false),
              onEnded: () => setIsPlaying(false),
              className: "w-full h-full object-cover",
              "aria-label": caption ?? "Видео о процедуре банкротства",
              children: "Ваш браузер не поддерживает встроенное видео."
            }
          ),
          !isPlaying && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: toggle,
              "aria-label": "Воспроизвести видео",
              className: "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-colors hover:bg-ink/70 whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-16 h-16 rounded-full bg-gold text-ink flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsx(Play, { size: 26, className: "ml-1", fill: "currentColor" }) }),
                /* @__PURE__ */ jsx("span", { className: "mt-4 text-xs font-semibold text-paper px-4 text-center", children: "Смотреть видео" })
              ]
            }
          ),
          isPlaying && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: toggle,
              "aria-label": "Пауза",
              className: "absolute bottom-3 left-3 p-2 rounded-lg bg-ink/80 text-paper opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity whitespace-nowrap",
              children: /* @__PURE__ */ jsx(Pause, { size: 16 })
            }
          )
        ]
      }
    ),
    (caption || label) && /* @__PURE__ */ jsx("figcaption", { className: `text-xs text-muted leading-relaxed text-center mx-auto ${wide ? "max-w-xl" : "max-w-[340px] sm:max-w-[380px]"}`, children: caption })
  ] });
};
const VideoSection = ({ onOpenConsultation }) => {
  const card = AUDIENCE_CARDS.find((c) => c.id === "person") ?? AUDIENCE_CARDS[0];
  return /* @__PURE__ */ jsx("section", { id: "video", className: "py-12 sm:py-16 bg-ink relative border-t border-line/60", children: /* @__PURE__ */ jsxs("div", { className: "site-container", children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        index: "02",
        className: "mb-7 sm:mb-9",
        title: /* @__PURE__ */ jsxs(Fragment, { children: [
          "Смотрим вместе: ",
          /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold", children: "видеоразбор" })
        ] }),
        lead: "Пять минут о том, что происходит с долгами, имуществом и доходами на каждом этапе."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto mt-7", children: [
      /* @__PURE__ */ jsx(
        VideoPlayer,
        {
          src: card.videoSrc ?? "",
          poster: card.videoPoster,
          wide: true,
          label: "видео о процедуре банкротства"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${COMPANY_INFO.rawPhone}`,
            onClick: () => trackEvent("phone_click", { placement: "под видео" }),
            className: "gold-btn px-7 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              "Позвонить"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-base text-faint font-mono", children: COMPANY_INFO.phones[0] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-base sm:text-xl text-paper/85 leading-relaxed text-center", children: "Ниже разобрали для Вас по шагам саму процедуру банкротства, чтобы Вы понимали, что Вам нужно сделать и сколько времени займёт процедура." }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#process",
          className: "inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-deep transition-colors",
          children: [
            "Перейти к шагам",
            /* @__PURE__ */ jsx(ArrowDown, { size: 14 })
          ]
        }
      ) })
    ] })
  ] }) });
};
const INCLUDED = [
  "Сбор полного пакета документов и справок по банкам, МФО и госорганам",
  "Подготовка и подача заявления в Арбитражный суд",
  "Участие утверждённого финансового управляющего на весь период",
  "Судебные заседания и представительство без вашего личного присутствия",
  "Защита единственного жилья (ст. 446 ГПК РФ) и сохранение прожиточного минимума"
];
const ADVANTAGES = [
  {
    icon: FileSignature,
    title: "Договор с понятными условиями до начала работы",
    text: "Стоимость, сроки и рассрочка зафиксированы в договоре. Никаких доплат по ходу дела."
  },
  {
    icon: ShieldOff,
    title: "Защита от звонков коллекторов",
    text: "После подачи документов общение с кредиторами ведём мы, а не Вы."
  },
  {
    icon: Car,
    title: "Законное сохранение авто и имущества",
    text: "Продумываем стратегию защиты имущества до подачи заявления в суд."
  },
  {
    icon: Wallet,
    title: "Рассрочка без банков и процентов",
    text: "Срок выплат выбираете сами — от 6 месяцев. Переплаты нет."
  }
];
const PriceSection = ({ onOpenConsultation }) => {
  return /* @__PURE__ */ jsx("section", { id: "price", className: "py-14 sm:py-20 bg-surface text-paper relative border-t border-line/60", children: /* @__PURE__ */ jsxs("div", { className: "site-container-narrow", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-8 sm:mb-10",
        children: /* @__PURE__ */ jsx(
          SectionHead,
          {
            index: "04",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Стоимость и ",
              /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold", children: "условия" })
            ] }),
            lead: "Стоимость услуг фиксируется в договоре. Судебные расходы называем заранее и тоже фиксируем."
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.05 },
        className: "max-w-7xl mx-auto rounded-2xl border-2 border-gold/50 bg-ink p-6 sm:p-9",
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-faint uppercase tracking-wide font-semibold", children: "Для ИП и физических лиц" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-baseline gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx("span", { className: "text-4xl sm:text-6xl font-serif font-bold text-gold leading-none", children: "от 8 000 ₽" }),
              /* @__PURE__ */ jsx("span", { className: "text-base sm:text-xl text-paper/80 font-semibold", children: "в месяц" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-lg lg:text-xl text-faint leading-relaxed", children: "Наша внутренняя рассрочка. Срок выплат Вы выбираете самостоятельно — от 6 месяцев." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-xl border border-gold/40 bg-gold/[0.08] px-4 py-3.5 flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(AlertCircle, { size: 18, className: "text-gold shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base leading-relaxed text-paper", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gold", children: "Важно!" }),
                " ",
                "Мы не ждём оплаты всей стоимости процедуры, а подаём дело в суд сразу, после сбора документов."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col sm:flex-row gap-2.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    trackEvent("cta_click", { placement: "стоимость" });
                    onOpenConsultation();
                  },
                  className: "flex-1 gold-btn px-5 py-3.5 rounded-xl text-sm font-bold",
                  children: "Обсудить мою ситуацию"
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: `tel:${COMPANY_INFO.rawPhone}`,
                  onClick: () => trackEvent("phone_click", { placement: "стоимость" }),
                  className: "inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-line-2 text-sm font-semibold text-paper hover:border-gold/50 hover:text-gold transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 15, className: "text-gold" }),
                    "Позвонить"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:border-l lg:border-line-2 lg:pl-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gold mb-2", children: "Честно о судебных расходах" }),
              /* @__PURE__ */ jsx("p", { className: "text-[15px] sm:text-lg lg:text-xl text-faint leading-relaxed", children: "Государственная пошлина, вознаграждение финансового управляющего и публикации оплачиваются отдельно. Мы называем их сумму заранее и фиксируем в договоре — сюрпризов в процессе не будет." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-5 border-t border-line-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-paper mb-3", children: "Что входит в процедуру:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: INCLUDED.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-[15px] sm:text-lg lg:text-xl text-paper/80 leading-snug", children: [
                /* @__PURE__ */ jsx(Check, { size: 15, className: "text-gold shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: item })
              ] }, item)) })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto mt-9 sm:mt-11 grid grid-cols-1 lg:grid-cols-3 gap-3.5", children: ADVANTAGES.map((a, i) => {
      const Icon = a.icon;
      const isLead = i === 0;
      if (isLead) {
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4 },
            className: "rounded-2xl border border-gold/45 bg-gold/[0.06] p-5 sm:p-6 lg:row-span-1",
            children: [
              /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-gold" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 font-serif font-bold text-paper text-lg sm:text-xl leading-snug", children: a.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-[15px] sm:text-base text-paper/75 leading-relaxed", children: a.text })
            ]
          },
          a.title
        );
      }
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: (i - 1) * 0.05, duration: 0.4 },
          className: "flex items-start gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3.5",
          children: [
            /* @__PURE__ */ jsx(Icon, { size: 16, className: "text-faint shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[15px] font-semibold text-paper leading-snug", children: a.title }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-[13px] text-faint leading-relaxed", children: a.text })
            ] })
          ]
        },
        a.title
      );
    }) })
  ] }) });
};
const STEPS = [
  {
    title: "Обсуждаем Вашу ситуацию и состав задолженности",
    body: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Разбираем, какие долги есть, перед кем и в каком объёме, есть ли имущество и сделки за последние годы. На этом этапе определяем, какая процедура подходит именно Вам и что будет с Вашим имуществом.",
      /* @__PURE__ */ jsx("span", { className: "block mt-2 text-gold", children: "Консультация бесплатная, документы на этом этапе не обязательны." })
    ] })
  },
  {
    title: "Заключаем договор",
    body: /* @__PURE__ */ jsxs(Fragment, { children: [
      "В договоре фиксируем стоимость услуг, сроки и рассрочку — без скрытых доплат.",
      /* @__PURE__ */ jsx("span", { className: "block mt-2 text-paper", children: "Важно! Вы платите не всю сумму сразу, а частями по удобному Вам графику." })
    ] })
  },
  {
    title: "Наша компания собирает документы",
    body: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Все справки, выписки по счетам, сведения о доходах и имуществе, запросы в банки, МФО и государственные органы. Готовим заявление в суд и полный пакет приложений.",
      /* @__PURE__ */ jsx("span", { className: "block mt-2 text-gold", children: "Срок этого этапа — от 2 недель до 2 месяцев." })
    ] })
  },
  {
    title: "Подаём дело в суд",
    body: /* @__PURE__ */ jsxs(Fragment, { children: [
      "В суде интересы представляет наш юрист. Ваше личное присутствие не требуется. От Вас нужна будет нотариальная доверенность.",
      /* @__PURE__ */ jsx("span", { className: "block mt-2 text-paper", children: "Важно! Мы не ждём полной оплаты — подаём дело сразу после сбора документов." })
    ] })
  },
  {
    title: "Первое судебное заседание",
    body: /* @__PURE__ */ jsx(Fragment, { children: "На этом этапе суд проверяет добросовестность должника и определяет, под какую процедуру Вы подходите: реструктуризация долгов или сразу реализация имущества." })
  },
  {
    title: "Реструктуризация долгов",
    body: /* @__PURE__ */ jsx(Fragment, { children: "Если у Вас стабильный официальный доход, долги не списываются, а пересчитываются с уменьшением процентов, полной отменой штрафов и пеней, и выплачиваются равными посильными платежами." })
  },
  {
    title: "Реализация имущества",
    body: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Продолжительность этого этапа во многом зависит от наличия у вас имущества и сделок купли-продажи, совершённых за последние 3 года. Если в вашей собственности нет имущества, срок прохождения этого этапа может составить от 4 до 6 месяцев.",
      /* @__PURE__ */ jsx("span", { className: "block mt-2 text-gold", children: "Единственное жильё защищено законом и исключается из конкурсной массы." })
    ] })
  },
  {
    title: "Завершение процедуры и списание долгов",
    body: /* @__PURE__ */ jsx(Fragment, { children: "Вас признают банкротом с полным освобождением от обязательств. Все долги списываются, аресты и ограничения снимаются — самое время начинать новую жизнь!" })
  }
];
const ProcessSection = ({ onOpenConsultation }) => {
  const [openSteps, setOpenSteps] = useState([]);
  const toggle = (idx) => setOpenSteps((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  return /* @__PURE__ */ jsx("section", { id: "process", className: "py-14 sm:py-20 bg-ink text-paper relative border-t border-line/60", children: /* @__PURE__ */ jsxs("div", { className: "site-container-narrow", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-9 sm:mb-12",
        children: /* @__PURE__ */ jsx(
          SectionHead,
          {
            index: "03",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Как проходит ",
              /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold", children: "процедура" })
            ] }),
            lead: "Восемь шагов от первого разговора до списания долгов. Сроки и расходы указаны на каждом этапе."
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("ol", { className: "max-w-7xl mx-auto border-t border-line-2", children: STEPS.map((s, idx) => {
      const isOpen = openSteps.includes(idx);
      return /* @__PURE__ */ jsxs("li", { className: "border-b border-line-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggle(idx),
            "aria-expanded": isOpen,
            "aria-controls": `step-${idx}`,
            className: "group w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left",
            children: [
              /* @__PURE__ */ jsx("span", { className: "shrink-0 font-mono text-sm sm:text-base text-gold tabular-nums w-8", children: String(idx + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 font-serif font-bold text-paper text-lg sm:text-2xl leading-snug group-hover:text-gold transition-colors", children: s.title }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-[transform,border-color,background-color] duration-200 ease-out ${isOpen ? "border-gold bg-gold/10 rotate-180" : "border-line-2 group-hover:border-gold/60"}`,
                  children: /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: "text-gold" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: `step-${idx}`,
            role: "region",
            hidden: !isOpen,
            className: "pb-6 sm:pb-7 pl-12 sm:pl-14 pr-2 max-w-3xl",
            children: /* @__PURE__ */ jsx("div", { className: "text-[15px] sm:text-lg text-paper/80 leading-relaxed", children: s.body })
          }
        )
      ] }, s.title);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto mt-5 flex justify-between items-center gap-4 text-sm text-faint", children: [
      /* @__PURE__ */ jsx("span", { children: "Раскройте этап, чтобы увидеть подробности" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setOpenSteps(openSteps.length === STEPS.length ? [] : STEPS.map((_, i) => i)),
          className: "text-gold hover:text-gold-soft transition-colors font-semibold",
          children: openSteps.length === STEPS.length ? "Свернуть все" : "Раскрыть все"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto mt-10 sm:mt-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-paper font-semibold", children: "Мы честно говорим о сроках!" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-base text-faint", children: [
        "Минимальная длительность процедуры банкротства — ",
        /* @__PURE__ */ jsx("span", { className: "text-gold font-semibold", children: "6 месяцев" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onOpenConsultation,
          className: "mt-5 gold-btn px-6 sm:px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2",
          children: [
            "Узнать, как будет проходить в моём случае",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs sm:text-sm text-faint", children: "Бесплатно проконсультируем Вас." })
    ] })
  ] }) });
};
const KAD_URL = "https://kad.arbitr.ru/";
const CaseStudies = ({ onOpenConsultation }) => {
  const [activeAudience, setActiveAudience] = useState("person");
  const trackRef = useRef(null);
  const cases = useMemo(
    () => CASE_STUDIES_DATA.filter((c) => (c.audience || "person") === activeAudience),
    [activeAudience]
  );
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx("section", { id: "cases", className: "py-14 sm:py-20 bg-bone text-bone-ink relative border-t border-bone-line theme-light", children: /* @__PURE__ */ jsxs("div", { className: "site-container", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-8 sm:mb-9",
        children: /* @__PURE__ */ jsx(
          SectionHead,
          {
            index: "05",
            tone: "light",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Выигранные дела ",
              /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold-deep", children: "наших клиентов" })
            ] }),
            lead: "Номера дел настоящие: любой можно проверить в картотеке арбитражных дел."
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [
        { id: "person", label: "Физические лица" },
        { id: "business", label: "ИП и бизнес" }
      ].map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveAudience(tab.id),
          className: `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeAudience === tab.id ? "bg-bone-ink text-bone-card" : "bg-bone-card text-bone-mute border border-bone-line hover:border-gold-deep/40"}`,
          children: tab.label
        },
        tab.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollBy(-1),
            "aria-label": "Предыдущие дела",
            className: "w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors",
            children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollBy(1),
            "aria-label": "Следующие дела",
            className: "w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors",
            children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: trackRef,
        className: "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]",
        children: cases.map((item) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-card": true,
            className: "snap-start shrink-0 w-[88%] sm:w-[52%] lg:w-[calc(33.333%-11px)] rounded-2xl bg-bone-card border border-bone-line p-5 sm:p-6 flex flex-col",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 pb-3 border-b border-bone-line", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-mono text-sm font-bold text-bone-ink", children: item.caseNumber }),
                  /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-bone-mute leading-snug", children: item.courtName })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-ok font-semibold flex items-center gap-1 text-[10px] bg-ok/10 px-2 py-1 rounded-full border border-ok/30 shrink-0 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { size: 12 }),
                  "Завершено"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-3 flex items-baseline justify-between gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "font-serif font-bold text-bone-ink text-base sm:text-lg leading-tight", children: item.clientName }),
                /* @__PURE__ */ jsx("div", { className: "text-[11px] text-bone-mute whitespace-nowrap shrink-0", children: item.duration })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 rounded-xl bg-bone border border-bone-line flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-bone-mute", children: "Было долга" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-bone-mute line-through", children: item.initialDebt })
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-bone-mute mx-2 shrink-0" }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gold-deep font-semibold", children: "Списано" }),
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-serif font-bold text-gold-deep leading-tight", children: item.writtenOffDebt })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2.5 text-[15px] sm:text-base flex-1", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-bone-mute leading-relaxed", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-bone-ink", children: "Ситуация: " }),
                  item.details.replace(/^Ситуация:\s*/, "").split("Результат:")[0]?.trim() || item.details
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-bone-ink leading-relaxed pt-2 border-t border-bone-line", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-ok", children: "Результат: " }),
                  item.judgeResult
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 pt-3 border-t border-bone-line", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    trackEvent("cta_click", { placement: "кейс" });
                    onOpenConsultation();
                  },
                  className: "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bone-ink text-bone-card text-sm font-bold hover:bg-bone-ink/90 transition-colors",
                  children: [
                    "Обсудить ситуацию",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 13 })
                  ]
                }
              ) })
            ]
          },
          item.id
        ))
      }
    ),
    /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm text-bone-mute leading-relaxed text-center max-w-5xl mx-auto", children: [
      "Все номера дел реальные — можете ознакомиться с ними на сайте",
      " ",
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: KAD_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 font-semibold text-gold-deep hover:underline",
          children: [
            "kad.arbitr.ru",
            /* @__PURE__ */ jsx(ExternalLink, { size: 11 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: `tel:${COMPANY_INFO.rawPhone}`,
        onClick: () => trackEvent("phone_click", { placement: "кейсы" }),
        className: "inline-flex items-center gap-2 text-sm font-semibold text-bone-ink hover:text-gold-deep transition-colors",
        children: [
          /* @__PURE__ */ jsx(Phone, { size: 13, className: "text-gold-deep" }),
          COMPANY_INFO.phones[0]
        ]
      }
    ) })
  ] }) });
};
const ReviewsSection = ({ onOpenConsultation }) => {
  return /* @__PURE__ */ jsx("section", { id: "reviews", className: "py-14 sm:py-20 bg-surface relative border-t border-line/60", children: /* @__PURE__ */ jsxs("div", { className: "site-container relative z-10", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "mb-8 sm:mb-10",
        children: /* @__PURE__ */ jsx(
          SectionHead,
          {
            index: "06",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Что меняется ",
              /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold", children: "после процедуры" })
            ] }),
            lead: "Как изменилась повседневная жизнь людей после освобождения от долговой нагрузки."
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]", children: REVIEWS_DATA.map((r, idx) => /* @__PURE__ */ jsxs(
      motion.figure,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: idx * 0.08, duration: 0.5 },
        className: "snap-start shrink-0 w-[85vw] sm:w-[380px] bg-card border border-line hover:border-gold/60 rounded-2xl p-6 transition-colors flex flex-col justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx(Quote, { size: 22, className: "text-gold" }),
              r.emotionalTag && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-gold-soft bg-raised border border-gold/30 px-2.5 py-0.5 rounded-full", children: r.emotionalTag })
            ] }),
            /* @__PURE__ */ jsx("blockquote", { className: "text-sm text-paper leading-relaxed mb-4", children: r.text })
          ] }),
          /* @__PURE__ */ jsxs("figcaption", { className: "border-t border-line pt-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-paper", children: r.author }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted", children: r.context })
          ] })
        ]
      },
      r.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onOpenConsultation,
        className: "gold-btn text-ink font-bold px-8 py-4 rounded-xl text-sm shadow-xl transition-transform hover:scale-[1.02] whitespace-nowrap",
        children: "Уточнить детали"
      }
    ) })
  ] }) });
};
const TeamSection = ({ onOpenConsultation }) => {
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx("section", { id: "team", className: "py-14 sm:py-20 bg-bone text-bone-ink relative border-t border-bone-line theme-light", children: /* @__PURE__ */ jsxs("div", { className: "site-container", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-7 sm:mb-9",
        children: /* @__PURE__ */ jsx(
          SectionHead,
          {
            index: "07",
            tone: "light",
            title: /* @__PURE__ */ jsxs(Fragment, { children: [
              "Команда ",
              /* @__PURE__ */ jsx("em", { className: "italic font-normal text-gold-deep", children: "«Юстиции»" })
            ] }),
            lead: "Практикующие юристы со стажем от 8 до 15 лет."
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5 mb-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => scrollBy(-1),
          "aria-label": "Предыдущий специалист",
          className: "w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => scrollBy(1),
          "aria-label": "Следующий специалист",
          className: "w-9 h-9 rounded-full border border-bone-line bg-bone-card text-bone-ink flex items-center justify-center hover:border-gold-deep transition-colors",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: trackRef,
        className: "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]",
        children: TEAM_MEMBERS_DATA.map((member) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-card": true,
            className: "snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[calc(25%-12px)] rounded-2xl overflow-hidden bg-bone-card border border-bone-line flex flex-col",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-bone-line", children: [
                member.photoUrl ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: member.photoUrl,
                    alt: `${member.name}, ${member.role}`,
                    loading: "lazy",
                    decoding: "async",
                    className: "w-full h-full object-cover object-[center_18%]"
                  }
                ) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    role: "img",
                    "aria-label": `${member.name}, ${member.role}`,
                    className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-bone-line to-bone text-5xl font-serif font-bold text-gold-deep",
                    children: member.name.split(" ").slice(0, 2).map((w) => w[0]).join("")
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2.5 left-2.5 bg-white/95 border border-bone-line px-2 py-0.5 rounded-md text-[11px] font-bold text-bone-ink", children: [
                  "Опыт: ",
                  member.experienceYears,
                  " лет"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2.5 flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-serif font-bold text-bone-ink leading-snug", children: member.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gold-deep font-semibold mt-0.5 leading-snug", children: member.role })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[15px] sm:text-base text-bone-ink/80 leading-relaxed", children: member.description }),
                member.quote && /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm italic text-gold-deep border-l-2 border-gold/50 pl-2.5 py-0.5 leading-snug", children: member.quote }),
                /* @__PURE__ */ jsxs("div", { className: "bg-bone p-2.5 rounded-xl border border-bone-line space-y-0.5 mt-auto", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-gold-deep", children: "Зона ответственности:" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-bone-ink font-medium leading-relaxed", children: member.responsibility || member.specialization })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      trackEvent("cta_click", { placement: "команда" });
                      onOpenConsultation();
                    },
                    className: "w-full py-3 rounded-xl border border-gold-deep/40 text-gold-deep text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-bone transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(HelpCircle, { size: 13 }),
                      "Задать вопрос специалисту"
                    ]
                  }
                )
              ] })
            ]
          },
          member.id
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: `tel:${COMPANY_INFO.rawPhone}`,
        onClick: () => trackEvent("phone_click", { placement: "команда" }),
        className: "inline-flex items-center gap-2 text-xs font-semibold text-bone-ink hover:text-gold-deep transition-colors",
        children: [
          /* @__PURE__ */ jsx(PhoneCall, { size: 13, className: "text-gold-deep" }),
          COMPANY_INFO.phones[0]
        ]
      }
    ) })
  ] }) });
};
async function sendLeadNotificationToEmail(data) {
  const irkutskTime = (/* @__PURE__ */ new Date()).toLocaleString("ru-RU", { timeZone: "Asia/Irkutsk" });
  try {
    const existing = JSON.parse(localStorage.getItem("yustitsiya_leads") || "[]");
    existing.push({
      ...data,
      id: "LEAD-" + Date.now(),
      irkutskTime,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    localStorage.setItem("yustitsiya_leads", JSON.stringify(existing));
  } catch {
  }
  let response;
  try {
    response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, irkutskTime })
    });
  } catch {
    return {
      success: false,
      error: "Нет связи с сервером сайта. Проверьте подключение к интернету."
    };
  }
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok || !payload?.success) {
    return {
      success: false,
      error: payload?.error || "Сервер не принял заявку."
    };
  }
  return {
    success: true,
    partial: payload.partial,
    deliveredTo: payload.deliveredTo,
    message: payload.message
  };
}
const ContactSection = ({ onOpenConsultation, onOpenPrivacy }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [direction, setDirection] = useState("person");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName) {
      setErrorMessage("Пожалуйста, укажите ваше имя");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage("Пожалуйста, введите корректный номер телефона");
      return;
    }
    if (!consent) {
      setErrorMessage("Необходимо подтвердить согласие на обработку персональных данных (152-ФЗ)");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await sendLeadNotificationToEmail({
        name: cleanName,
        phone: cleanPhone,
        format: direction === "business" ? "Долги по бизнесу / ИП" : "Кредиты и долги физлица",
        debtAmountRange: direction === "business" ? "ИП / бизнес" : "Физическое лицо",
        source: "Финальная форма «Давайте разберёмся в вашей ситуации»",
        targetEmail: COMPANY_INFO.email
      });
      if (!result.success) {
        setErrorMessage(
          (result.error || "Не удалось отправить заявку.") + " Пожалуйста, позвоните нам: " + COMPANY_INFO.phones[0]
        );
        return;
      }
      trackEvent("form_submit", { direction, source: "финальный блок" });
      setIsSuccess(true);
      setName("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Не удалось отправить заявку через форму. Пожалуйста, позвоните нам: " + COMPANY_INFO.phones[0]
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "contacts", className: "py-24 bg-surface relative border-t border-line overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "site-container relative z-10", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "text-center max-w-5xl mx-auto mb-14 space-y-3",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-raised border border-line-2 text-xs font-semibold text-gold shadow-md", children: [
            /* @__PURE__ */ jsx(HelpCircle, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: "Консультация юриста" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-paper leading-tight", children: [
            "Давайте разберёмся ",
            /* @__PURE__ */ jsx("span", { className: "italic font-serif font-normal text-gold", children: "в вашей ситуации" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted font-light leading-relaxed max-w-3xl mx-auto", children: "Расскажите, с какими долгами вы столкнулись. Специалист поможет определить, какие обстоятельства необходимо проверить и какие варианты решения можно рассмотреть." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "lg:col-span-5 bg-card p-7 sm:p-8 rounded-3xl border border-line hover:border-gold/50 flex flex-col justify-between transition-colors duration-300 space-y-6 shadow-md",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-b border-line pb-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base font-serif font-bold text-paper", children: COMPANY_INFO.fullName }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-gold font-mono mt-0.5", children: [
                    "ИНН ",
                    COMPANY_INFO.inn,
                    ",  ОГРН ",
                    COMPANY_INFO.ogrn
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold shrink-0", children: /* @__PURE__ */ jsx(Building2, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3.5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md", children: /* @__PURE__ */ jsx(MapPin, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-faint font-semibold", children: "Офис в Иркутске:" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-paper mt-0.5", children: COMPANY_INFO.address }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted font-light", children: "1 этаж, клиентская парковка" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3.5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-faint font-semibold", children: "Телефон для звонков и записи:" }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `tel:${COMPANY_INFO.rawPhone}`,
                      onClick: () => trackEvent("phone_click"),
                      className: "block text-lg font-bold text-gold hover:underline transition-colors mt-0.5 font-mono",
                      children: COMPANY_INFO.phones[0]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted font-light", children: "Бесплатный разбор по телефону" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3.5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-faint font-semibold", children: "Электронная почта:" }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `mailto:${COMPANY_INFO.email}`,
                      className: "block text-sm font-semibold text-paper hover:text-gold mt-0.5 font-mono whitespace-nowrap",
                      children: COMPANY_INFO.email
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3.5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-raised border border-line-2 flex items-center justify-center shrink-0 text-gold shadow-md", children: /* @__PURE__ */ jsx(Clock, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-faint font-semibold", children: "Режим работы:" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-paper mt-0.5", children: [
                    COMPANY_INFO.workingHours,
                    " (без выходных)"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-line space-y-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted", children: "Связаться напрямую в мессенджере:" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: COMPANY_INFO.maxUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "py-2.5 px-3 rounded-xl bg-raised border border-line-2 text-paper font-semibold text-xs flex items-center justify-center space-x-2 hover:border-gold transition-colors whitespace-nowrap",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { size: 16, className: "text-gold" }),
                      /* @__PURE__ */ jsx("span", { children: "Чат МАХ" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: COMPANY_INFO.telegramUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "py-2.5 px-3 rounded-xl bg-raised border border-brand-tg/40 text-brand-tg font-semibold text-xs flex items-center justify-center space-x-2 hover:bg-line transition-colors whitespace-nowrap",
                    children: [
                      /* @__PURE__ */ jsx(Send, { size: 16 }),
                      /* @__PURE__ */ jsx("span", { children: "Telegram" })
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "lg:col-span-7 bg-card p-7 sm:p-9 rounded-3xl border-2 border-gold/40 hover:border-gold flex flex-col justify-between relative shadow-2xl",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold", children: /* @__PURE__ */ jsx(Shield, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-serif font-bold text-paper", children: "Заявка на индивидуальный разбор" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted font-light", children: "Юрист свяжется с вами в течение 5 минут для уточнения деталей." })
                ] })
              ] }),
              isSuccess ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center space-y-3.5 bg-surface rounded-2xl border border-ok/40 p-6 mt-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-ok/10 border border-ok text-ok flex items-center justify-center mx-auto animate-[fadeIn_0.4s_ease-out]", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 36 }) }),
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-serif font-bold text-paper", children: "Заявка успешно принята!" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-paper max-w-md mx-auto leading-relaxed font-light", children: "Дежурный юрист ООО «Юстиция» уже получил уведомление и свяжется с вами в ближайшие минуты для анализа вашей ситуации." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsSuccess(false),
                    className: "text-xs text-gold hover:underline font-semibold pt-2 block mx-auto cursor-pointer",
                    children: "Отправить ещё одно обращение"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs text-muted mb-1.5 font-medium", children: [
                    "Выберите ваше направление: ",
                    /* @__PURE__ */ jsx("span", { className: "text-gold", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setDirection("business"),
                        className: `py-3 px-3 rounded-xl text-xs font-bold border transition-colors text-center cursor-pointer ${direction === "business" ? "bg-gold text-ink border-gold shadow-md" : "bg-panel text-paper border-line-2 hover:border-gold/50"}`,
                        children: "Долги по бизнесу / ИП"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setDirection("person"),
                        className: `py-3 px-3 rounded-xl text-xs font-bold border transition-colors text-center cursor-pointer ${direction === "person" ? "bg-gold text-ink border-gold shadow-md" : "bg-panel text-paper border-line-2 hover:border-gold/50"}`,
                        children: "Кредиты и долги физлица"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs text-muted mb-1 font-medium", children: [
                    "Ваше имя ",
                    /* @__PURE__ */ jsx("span", { className: "text-gold", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-faint", children: /* @__PURE__ */ jsx(User, { size: 17 }) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        required: true,
                        value: name,
                        onChange: (e) => {
                          setName(e.target.value);
                          if (errorMessage) setErrorMessage("");
                        },
                        placeholder: "Как к вам обращаться",
                        className: "w-full pl-10 pr-3.5 py-3 bg-panel border border-line-2 focus:border-gold rounded-xl text-sm text-paper placeholder-faint focus:outline-none transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs text-muted mb-1 font-medium", children: [
                    "Номер телефона ",
                    /* @__PURE__ */ jsx("span", { className: "text-gold", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-faint", children: /* @__PURE__ */ jsx(Phone, { size: 17 }) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "tel",
                        required: true,
                        value: phone,
                        onChange: (e) => {
                          setPhone(e.target.value);
                          if (errorMessage) setErrorMessage("");
                        },
                        placeholder: "+7 (___) ___-__-__",
                        className: "w-full pl-10 pr-3.5 py-3 bg-panel border border-line-2 focus:border-gold rounded-xl text-sm text-paper placeholder-faint focus:outline-none transition-colors font-mono"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-start space-x-2.5 text-xs text-faint cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: consent,
                      onChange: (e) => setConsent(e.target.checked),
                      className: "mt-0.5 rounded border-line-2 bg-panel text-gold focus:ring-0 cursor-pointer"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "leading-snug", children: [
                    "Даю согласие на обработку персональных данных по",
                    " ",
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onOpenPrivacy && onOpenPrivacy("consent"),
                        className: "text-gold hover:underline whitespace-nowrap cursor-pointer",
                        children: "152-ФЗ"
                      }
                    ),
                    " ",
                    "и принимаю условия",
                    " ",
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onOpenPrivacy && onOpenPrivacy("policy"),
                        className: "text-gold hover:underline whitespace-nowrap cursor-pointer",
                        children: "Политики конфиденциальности"
                      }
                    )
                  ] })
                ] }) }),
                errorMessage && /* @__PURE__ */ jsx("div", { className: "text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800/50", children: errorMessage }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSubmitting,
                    className: "w-full gold-btn py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 hover:scale-[1.01] transition-transform disabled:opacity-50 mt-3 cursor-pointer",
                    children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
                      /* @__PURE__ */ jsx("span", { children: "Отправка заявки…" })
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Shield, { size: 18 }),
                      /* @__PURE__ */ jsx("span", { children: "Получить консультацию" })
                    ] })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-line flex items-center justify-between text-[11px] text-faint", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5", children: [
                /* @__PURE__ */ jsx(Scale, { size: 14, className: "text-gold" }),
                /* @__PURE__ */ jsx("span", { children: "Защита по Федеральному закону № 127-ФЗ" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-muted", children: "ООО «Юстиция» , конфиденциально" })
            ] })
          ]
        }
      )
    ] })
  ] }) });
};
const Footer = ({ onOpenConsultation, onOpenPrivacy }) => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-ink border-t border-line pt-16 pb-12 text-xs text-faint", itemScope: true, itemType: "http://schema.org/LegalService", children: /* @__PURE__ */ jsxs("div", { className: "site-container space-y-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("a", { href: "/", className: "inline-block whitespace-nowrap", "aria-label": "Юстиция, на главную", children: /* @__PURE__ */ jsx(Logo, { variant: "light", showSubtitle: true }) }),
        /* @__PURE__ */ jsx("p", { className: "text-muted leading-relaxed", itemProp: "description", children: "Юридическая компания в Иркутске. Специализируемся на защите прав заемщиков и банкротстве физических лиц по ФЗ № 127-ФЗ." }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-panel border border-line space-y-1 text-[11px] text-muted", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-paper", children: COMPANY_INFO.fullName }),
          /* @__PURE__ */ jsxs("div", { children: [
            "ИНН: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-gold font-semibold", children: COMPANY_INFO.inn })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            "ОГРН: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: COMPANY_INFO.ogrn }),
            ", КПП: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: COMPANY_INFO.kpp })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-serif font-bold text-paper mb-3", children: "Навигация" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-muted", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#directions", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Кому мы помогаем" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#process", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Как проходит процедура" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#price", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Стоимость и условия" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#cases", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Практика в суде Иркутска" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#reviews", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Отзывы клиентов" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#team", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Команда и ответственность" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#contacts", className: "hover:text-gold transition-colors whitespace-nowrap", children: "Контакты и адрес офиса" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-serif font-bold text-paper mb-3", children: "Законодательство РФ" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-muted", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-1.5", children: [
            /* @__PURE__ */ jsx(Scale, { size: 14, className: "text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Федеральный закон № 127-ФЗ «О банкротстве»" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-1.5", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 14, className: "text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Федеральный закон № 152-ФЗ «О персональных данных»" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-1.5", children: [
            /* @__PURE__ */ jsx(FileText, { size: 14, className: "text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Статья 446 ГПК РФ (Иммунитет единственного жилья)" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-1.5", children: [
            /* @__PURE__ */ jsx(Scale, { size: 14, className: "text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Федеральный закон № 230-ФЗ (Защита от коллекторов)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-serif font-bold text-paper mb-3", children: "Контакты в Иркутске" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 text-muted", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 14, className: "text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: COMPANY_INFO.address })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Phone, { size: 14, className: "text-gold shrink-0" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `tel:${COMPANY_INFO.rawPhone}`,
                onClick: () => trackEvent("phone_click"),
                className: "hover:text-gold font-bold text-paper font-mono",
                children: COMPANY_INFO.phones[0]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Mail, { size: 14, className: "text-gold shrink-0" }),
            /* @__PURE__ */ jsx("a", { href: `mailto:${COMPANY_INFO.email}`, className: "hover:text-gold text-xs font-mono whitespace-nowrap", children: COMPANY_INFO.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-faint", children: [
            "Режим работы: ",
            COMPANY_INFO.workingHours
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-raised space-y-3 leading-relaxed text-[11px] text-bone-mute", children: [
      /* @__PURE__ */ jsx("p", { children: "* Решение о признании гражданина банкротом и полном освобождении от исполнения обязательств (списании задолженности) принимается исключительно Арбитражным судом Иркутской области в соответствии с Федеральным законом от 26.10.2002 № 127-ФЗ «О несостоятельности (банкротстве)»." }),
      /* @__PURE__ */ jsx("p", { children: "Информация, размещенная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями ч. 2 ст. 437 Гражданского кодекса РФ. Услуги оказываются ООО «Юстиция» (ИНН 3811452733, ОГРН 1213800018590)." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-surface text-faint", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          COMPANY_INFO.fullName,
          " (ИНН ",
          COMPANY_INFO.inn,
          "). Все права защищены."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-xs", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onOpenPrivacy && onOpenPrivacy("policy"),
              className: "hover:text-gold underline underline-offset-2 transition-colors whitespace-nowrap",
              children: "Политика конфиденциальности"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onOpenPrivacy && onOpenPrivacy("consent"),
              className: "hover:text-gold underline underline-offset-2 transition-colors whitespace-nowrap",
              children: "Согласие на обработку данных (152-ФЗ)"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
function slugFromPath(pathname) {
  return pathname.replace(/^\/+|\/+$/g, "");
}
const ConsultationModal = lazy(() => import("./assets/ConsultationModal-CJyZT2Ri.js").then((m) => ({ default: m.ConsultationModal })));
const AIConsultantModal = lazy(() => import("./assets/AIConsultantModal-Dv1lRJ55.js").then((m) => ({ default: m.AIConsultantModal })));
const PrivacyPolicyModal = lazy(() => import("./assets/PrivacyPolicyModal-CA_PLlWD.js").then((m) => ({ default: m.PrivacyPolicyModal })));
const NotificationToast = lazy(() => import("./assets/NotificationToast-DlxNKpuH.js").then((m) => ({ default: m.NotificationToast })));
function SeoApp({ seoPage }) {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyTab, setPrivacyTab] = useState("policy");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleCloseConsultation = () => {
    setIsConsultationModalOpen(false);
    setSelectedServiceId(null);
  };
  const handleOpenPrivacy = (tab = "policy") => {
    setPrivacyTab(tab);
    setIsPrivacyModalOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink", children: [
    /* @__PURE__ */ jsx(Navbar, { onOpenConsultation: () => setIsConsultationModalOpen(true), onOpenAIChat: () => setIsAIChatOpen(true) }),
    /* @__PURE__ */ jsx(SeoLanding, { page: seoPage, onOpenConsultation: () => setIsConsultationModalOpen(true) }),
    /* @__PURE__ */ jsx(Footer, { onOpenConsultation: () => setIsConsultationModalOpen(true), onOpenPrivacy: handleOpenPrivacy }),
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      isConsultationModalOpen && /* @__PURE__ */ jsx(ConsultationModal, { isOpen: true, onClose: handleCloseConsultation, initialServiceId: selectedServiceId, onOpenPrivacy: handleOpenPrivacy }),
      isAIChatOpen && /* @__PURE__ */ jsx(AIConsultantModal, { isOpen: true, onClose: () => setIsAIChatOpen(false), onOpenConsultation: () => {
        setIsAIChatOpen(false);
        setIsConsultationModalOpen(true);
      } }),
      isPrivacyModalOpen && /* @__PURE__ */ jsx(PrivacyPolicyModal, { isOpen: true, onClose: () => setIsPrivacyModalOpen(false), defaultTab: privacyTab })
    ] }),
    /* @__PURE__ */ jsx(MobileCallBar, { onOpenConsultation: () => setIsConsultationModalOpen(true) })
  ] });
}
function App() {
  const pathname = useRoutePath();
  const slug = slugFromPath(pathname);
  if (slug === "" || slug === "index.html") return /* @__PURE__ */ jsx(HomeApp, {});
  const seoPage = SEO_PAGES_BY_SLUG[slug];
  if (seoPage) return /* @__PURE__ */ jsx(SeoApp, { seoPage });
  return /* @__PURE__ */ jsx(NotFoundPage, {});
}
function HomeApp() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyTab, setPrivacyTab] = useState("policy");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [openDirection, setOpenDirection] = useState(null);
  const handleSelectDirection = (direction) => {
    setOpenDirection(direction);
    requestAnimationFrame(() => {
      document.getElementById("directions")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const handleOpenConsultation = (serviceId) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsConsultationModalOpen(true);
  };
  const handleCloseConsultation = () => {
    setIsConsultationModalOpen(false);
    setSelectedServiceId(null);
  };
  const handleOpenPrivacy = (tab = "policy") => {
    setPrivacyTab(tab);
    setIsPrivacyModalOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink", children: [
    /* @__PURE__ */ jsx(MobileHero, { onSelectDirection: handleSelectDirection }),
    /* @__PURE__ */ jsx("div", { className: "mt-covered", children: /* @__PURE__ */ jsx(
      Navbar,
      {
        onOpenConsultation: () => handleOpenConsultation(),
        onOpenAIChat: () => setIsAIChatOpen(true)
      }
    ) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("div", { className: "mt-covered", children: /* @__PURE__ */ jsx(
        Hero,
        {
          onOpenConsultation: () => handleOpenConsultation(),
          onSelectDirection: handleSelectDirection
        }
      ) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 420, anchorId: "directions", children: /* @__PURE__ */ jsx(
        DirectionsSection,
        {
          onOpenConsultation: (direction) => handleOpenConsultation(direction),
          openId: openDirection,
          onOpenChange: setOpenDirection
        }
      ) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 520, anchorId: "video", children: /* @__PURE__ */ jsx(VideoSection, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 560, anchorId: "process", children: /* @__PURE__ */ jsx(ProcessSection, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 560, anchorId: "price", children: /* @__PURE__ */ jsx(PriceSection, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 560, anchorId: "cases", children: /* @__PURE__ */ jsx(CaseStudies, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 420, anchorId: "reviews", children: /* @__PURE__ */ jsx(ReviewsSection, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 520, anchorId: "team", children: /* @__PURE__ */ jsx(TeamSection, { onOpenConsultation: () => handleOpenConsultation() }) }),
      /* @__PURE__ */ jsx(LazyOnVisible, { minHeight: 520, anchorId: "contacts", children: /* @__PURE__ */ jsx(ContactSection, { onOpenConsultation: () => handleOpenConsultation(), onOpenPrivacy: handleOpenPrivacy }) })
    ] }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        onOpenConsultation: () => handleOpenConsultation(),
        onOpenPrivacy: handleOpenPrivacy
      }
    ),
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      isConsultationModalOpen && /* @__PURE__ */ jsx(
        ConsultationModal,
        {
          isOpen: isConsultationModalOpen,
          onClose: handleCloseConsultation,
          initialServiceId: selectedServiceId,
          onOpenPrivacy: handleOpenPrivacy
        }
      ),
      isAIChatOpen && /* @__PURE__ */ jsx(
        AIConsultantModal,
        {
          isOpen: isAIChatOpen,
          onClose: () => setIsAIChatOpen(false),
          onOpenConsultation: () => {
            setIsAIChatOpen(false);
            handleOpenConsultation();
          }
        }
      ),
      isPrivacyModalOpen && /* @__PURE__ */ jsx(
        PrivacyPolicyModal,
        {
          isOpen: isPrivacyModalOpen,
          onClose: () => setIsPrivacyModalOpen(false),
          defaultTab: privacyTab
        }
      ),
      /* @__PURE__ */ jsx(NotificationToast, { onOpenConsultation: () => handleOpenConsultation() })
    ] }),
    /* @__PURE__ */ jsx(MobileCallBar, { onOpenConsultation: () => handleOpenConsultation() })
  ] });
}
function render(pathname = "/") {
  return renderToString(
    /* @__PURE__ */ jsx(RouteContext.Provider, { value: pathname, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  COMPANY_INFO as C,
  render,
  sendLeadNotificationToEmail as s,
  trackEvent as t
};
