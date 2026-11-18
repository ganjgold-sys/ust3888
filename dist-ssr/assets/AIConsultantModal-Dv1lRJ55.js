import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, X, User, Sparkles, Send, PhoneCall } from "lucide-react";
import { C as COMPANY_INFO } from "../entry-server.js";
import "react-dom/server";
const AIConsultantModal = ({ isOpen, onClose, onOpenConsultation }) => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Здравствуйте! Я интеллектуальный ИИ-юрист компании «Юстиция» в Иркутске. Напишите ваш вопрос по списанию долгов, кредитам или защите имущества по ФЗ № 127. С удовольствием отвечу прямо сейчас!`,
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  const quickQuestions = [
    "Заберут ли единственное жилье по ФЗ-127?",
    "Как списать долги от 500 000 рублей?",
    "Прекратятся ли звонки коллекторов?",
    "Сколько стоит рассрочка в месяц?"
  ];
  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;
    const userTime = (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { sender: "user", text: textToSend, time: userTime }]);
    if (!queryText) setInputQuery("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: textToSend })
      });
      const data = await res.json();
      const aiTime = (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [...prev, {
        sender: "ai",
        text: data.reply || `Наш юрист в Иркутске готов проанализировать ваше дело детально. Позвоните ${COMPANY_INFO.phones[0]}.`,
        time: aiTime
      }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, {
        sender: "ai",
        text: "По ФЗ № 127 гражданин имеет право на полное списание задолженностей при отсутствии возможности их погашать. Оставьте заявку на бесплатный очный разбор в Иркутске.",
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 15 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 15 },
          transition: { duration: 0.2, ease: "easeOut" },
          onClick: (e) => e.stopPropagation(),
          className: "bg-card max-w-2xl w-full h-[85vh] rounded-2xl border border-gold/40 flex flex-col justify-between overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-card border-b border-line-2 p-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-line-2 to-ground border border-gold flex items-center justify-center text-gold", children: /* @__PURE__ */ jsx(Bot, { size: 22 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-base font-serif font-bold text-paper", children: "ИИ-Юрист «Юстиция» 24/7" }),
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-ok" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted", children: "Иркутск, консультации по ФЗ № 127 в режиме реального времени" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Закрыть чат",
                  className: "p-2 rounded-lg bg-raised text-muted hover:text-paper active:scale-[0.98] transition-transform whitespace-nowrap",
                  children: /* @__PURE__ */ jsx(X, { size: 20 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-ground", children: [
              messages.map((msg, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-start space-x-3 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${msg.sender === "user" ? "bg-gold text-ground" : "bg-line border border-line-2 text-gold"}`, children: msg.sender === "user" ? /* @__PURE__ */ jsx(User, { size: 16 }) : /* @__PURE__ */ jsx(Bot, { size: 16 }) }),
                    /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${msg.sender === "user" ? "bg-line text-paper border border-line-2" : "bg-card text-bone-line border border-line-2"}`, children: [
                      /* @__PURE__ */ jsx("div", { children: msg.text }),
                      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-faint text-right mt-1.5", children: msg.time })
                    ] })
                  ]
                },
                index
              )),
              isLoading && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-gold bg-card p-3 rounded-xl max-w-xs border border-line-2", children: [
                /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "animate-spin" }),
                /* @__PURE__ */ jsx("span", { children: "ИИ-Юрист анализирует судебную практику…" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-surface border-t border-line overflow-x-auto flex space-x-2 no-scrollbar", children: quickQuestions.map((q, idx) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleSendMessage(q),
                className: "px-3 py-1.5 rounded-lg bg-raised border border-line-2 text-xs text-muted hover:text-gold-soft hover:border-gold active:scale-[0.98] whitespace-nowrap shrink-0 transition-colors",
                children: q
              },
              idx
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-card border-t border-line-2 space-y-3", children: [
              /* @__PURE__ */ jsxs(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    handleSendMessage();
                  },
                  className: "flex items-center space-x-2",
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        "aria-label": "Ваш вопрос по долгам",
                        placeholder: "Задайте ваш вопрос по долгам…",
                        value: inputQuery,
                        onChange: (e) => setInputQuery(e.target.value),
                        className: "flex-1 bg-ground border border-line-2 rounded-xl px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        "aria-label": "Отправить вопрос",
                        disabled: isLoading || !inputQuery.trim(),
                        className: "gold-btn px-4 py-3 rounded-xl font-bold flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-[0.98] transition-transform whitespace-nowrap",
                        children: /* @__PURE__ */ jsx(Send, { size: 18 })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted pt-1 border-t border-line/50", children: [
                /* @__PURE__ */ jsx("span", { children: "Нужна личная встреча с человеком?" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      onClose();
                      onOpenConsultation();
                    },
                    className: "text-gold-soft font-bold hover:underline active:opacity-70 flex items-center space-x-1 whitespace-nowrap",
                    children: [
                      /* @__PURE__ */ jsx(PhoneCall, { size: 12 }),
                      /* @__PURE__ */ jsx("span", { children: "Записаться на очный разбор" })
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
};
export {
  AIConsultantModal
};
