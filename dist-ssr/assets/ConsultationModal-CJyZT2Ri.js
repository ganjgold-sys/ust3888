import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ShieldCheck, CheckCircle2, User, Phone, Loader2, Mail, Send } from "lucide-react";
import { C as COMPANY_INFO, t as trackEvent, s as sendLeadNotificationToEmail } from "../entry-server.js";
import "react-dom/server";
const ConsultationModal = ({
  isOpen,
  onClose,
  initialServiceId,
  onOpenPrivacy
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [direction, setDirection] = useState("person");
  useEffect(() => {
    if (!isOpen) return;
    if (initialServiceId === "business") setDirection("ip");
    else if (initialServiceId === "person") setDirection("person");
  }, [isOpen, initialServiceId]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setIsSuccess(false);
      setErrorMessage("");
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName) {
      setErrorMessage("Пожалуйста, заполните ваше имя");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage("Пожалуйста, укажите корректный номер телефона");
      return;
    }
    if (!consent) {
      setErrorMessage("Необходимо согласие на обработку персональных данных (152-ФЗ)");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await sendLeadNotificationToEmail({
        name: cleanName,
        phone: cleanPhone,
        format: "Заявка на консультацию (Модальное окно)",
        debtAmountRange: `${direction === "ip" ? "ИП / бизнес" : "Физическое лицо"}${initialServiceId && initialServiceId !== "person" && initialServiceId !== "business" ? " / " + initialServiceId : ""}`,
        source: "Модальное окно быстрой записи",
        targetEmail: COMPANY_INFO.email
      });
      if (!result.success) {
        setErrorMessage(
          (result.error || "Не удалось отправить заявку.") + " Позвоните нам: " + COMPANY_INFO.phones[0]
        );
        return;
      }
      trackEvent("form_submit", { direction, source: "форма на сайте" });
      setIsSuccess(true);
      setName("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Не удалось отправить заявку. Позвоните нам: " + COMPANY_INFO.phones[0]
      );
    } finally {
      setIsSubmitting(false);
    }
  };
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
          className: "dark-card max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/40 p-6 sm:p-7 relative",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Закрыть окно",
                className: "absolute top-4 right-4 p-2 rounded-xl bg-ink text-muted hover:text-paper hover:bg-line transition-colors whitespace-nowrap",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-raised border border-line-2 flex items-center justify-center text-gold shrink-0", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 24 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-serif font-bold text-paper", children: "Запись на консультацию" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted", children: [
                    "ООО «Юстиция» (ИНН ",
                    COMPANY_INFO.inn,
                    ") в Иркутске"
                  ] })
                ] })
              ] }),
              isSuccess ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center space-y-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-ok/10 border-2 border-ok text-ok flex items-center justify-center mx-auto animate-[fadeIn_0.4s_ease-out]", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 36 }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-xl font-serif font-bold text-paper", children: "Заявка успешно принята!" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-paper", children: [
                    "Уведомление направлено юристу на ",
                    /* @__PURE__ */ jsx("span", { className: "text-gold font-mono font-semibold", children: COMPANY_INFO.email }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Ведущий юрист перезвонит вам в течение 5 минут для бесплатного анализа ситуации." })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "gold-btn px-6 py-2.5 rounded-xl text-xs font-bold mt-2 whitespace-nowrap",
                    children: "Отлично, спасибо"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3.5 bg-card p-4 sm:p-5 rounded-xl border border-line-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setDirection("person"),
                        className: `py-2.5 rounded-lg text-xs font-bold border transition-colors ${direction === "person" ? "bg-gold text-ink border-gold" : "bg-panel text-muted border-line-2"}`,
                        children: "Я физическое лицо"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setDirection("ip"),
                        className: `py-2.5 rounded-lg text-xs font-bold border transition-colors ${direction === "ip" ? "bg-gold text-ink border-gold" : "bg-panel text-muted border-line-2"}`,
                        children: "Я ИП / предприниматель"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-paper flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Оставьте номер: юрист перезвонит" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-ok font-normal", children: "Звонок бесплатный" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-[11px] text-muted mb-1 font-medium", children: [
                      "Ваше имя ",
                      /* @__PURE__ */ jsx("span", { className: "text-gold", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-faint", children: /* @__PURE__ */ jsx(User, { size: 16 }) }),
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
                          placeholder: "Например, Александр",
                          className: "w-full pl-9 pr-3 py-2.5 bg-panel border border-line-2 focus:border-gold rounded-lg text-sm text-paper placeholder-faint focus:outline-none transition-colors"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-[11px] text-muted mb-1 font-medium", children: [
                      "Номер телефона ",
                      /* @__PURE__ */ jsx("span", { className: "text-gold", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-faint", children: /* @__PURE__ */ jsx(Phone, { size: 16 }) }),
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
                          className: "w-full pl-9 pr-3 py-2.5 bg-panel border border-line-2 focus:border-gold rounded-lg text-sm text-paper placeholder-faint focus:outline-none transition-colors font-mono"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-start space-x-2 text-[11px] text-faint cursor-pointer select-none", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: consent,
                        onChange: (e) => setConsent(e.target.checked),
                        className: "mt-0.5 rounded border-line-2 bg-panel text-gold focus:ring-0 cursor-pointer"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Даю согласие на обработку персональных данных по",
                      " ",
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => onOpenPrivacy && onOpenPrivacy("consent"),
                          className: "text-gold hover:underline underline-offset-2 whitespace-nowrap",
                          children: "152-ФЗ"
                        }
                      ),
                      " ",
                      "и принимаю",
                      " ",
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => onOpenPrivacy && onOpenPrivacy("policy"),
                          className: "text-gold hover:underline underline-offset-2 whitespace-nowrap",
                          children: "Политику конфиденциальности"
                        }
                      )
                    ] })
                  ] }) }),
                  errorMessage && /* @__PURE__ */ jsx("div", { className: "text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/50", children: errorMessage }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: isSubmitting,
                      className: "gold-btn w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2  transition-transform disabled:opacity-50 cursor-pointer",
                      children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
                        /* @__PURE__ */ jsx("span", { children: "Отправка на почту…" })
                      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Mail, { size: 18 }),
                        /* @__PURE__ */ jsx("span", { children: "Получить бесплатную консультацию" })
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative flex py-1 items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-line" }),
                  /* @__PURE__ */ jsx("span", { className: "flex-shrink mx-3 text-xs text-faint", children: "или свяжитесь напрямую" }),
                  /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-line" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `tel:${COMPANY_INFO.rawPhone}`,
                      onClick: () => trackEvent("phone_click"),
                      className: "w-full p-3 rounded-xl bg-ink border border-line-2 hover:border-gold flex items-center justify-between group transition-colors",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-line border border-line-2 flex items-center justify-center text-gold  transition-transform", children: /* @__PURE__ */ jsx(Phone, { size: 16 }) }),
                          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-paper", children: "Позвонить по телефону" }),
                            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-gold font-semibold", children: COMPANY_INFO.phones[0] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold px-2 py-0.5 rounded bg-gold/20 text-gold", children: "Вызов" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: COMPANY_INFO.telegramUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "w-full p-3 rounded-xl bg-raised border border-brand-tg/40 hover:border-brand-tg flex items-center justify-between group transition-colors whitespace-nowrap",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-brand-tg/20 flex items-center justify-center text-brand-tg  transition-transform", children: /* @__PURE__ */ jsx(Send, { size: 16 }) }),
                          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-paper", children: "Написать в Telegram" }),
                            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted", children: "Дежурный юрист @AM_ARBITR" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-brand-tg px-2 py-0.5 rounded bg-card border border-brand-tg/30", children: "Чат" })
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  ) });
};
export {
  ConsultationModal
};
