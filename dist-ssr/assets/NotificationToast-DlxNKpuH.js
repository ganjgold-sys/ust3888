import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
const NOTIFICATIONS = [
  { name: "Михаил (Иркутск)", action: "рассчитал стоимость банкротства", amount: "1 250 000 ₽" },
  { name: "Елена (Ангарск)", action: "записалась на юридический прием", amount: "долги по МФО" },
  { name: "Алексей (Шелехов)", action: "получил решение о списании", amount: "890 000 ₽" },
  { name: "Сергей (Иркутск)", action: "оформил удобную рассрочку от 8 000 ₽/мес", amount: "банкротство ИП" }
];
const NotificationToast = ({ onOpenConsultation }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    let hideTimer;
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      hideTimer = setTimeout(() => setIsVisible(false), 3e3);
    }, 4e3);
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % NOTIFICATIONS.length);
      setIsVisible(true);
      hideTimer = setTimeout(() => setIsVisible(false), 3e3);
    }, 1e4);
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);
  const item = NOTIFICATIONS[currentIdx];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed bottom-6 left-6 z-40 max-w-xs w-full bg-surface/98 border border-gold/40 rounded-xl p-3 shadow-2xl text-xs flex items-center justify-between space-x-3 transition-[transform,background-color,border-color,color,box-shadow] duration-300 ${isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2.5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-raised border border-line-2 flex items-center justify-center shrink-0 text-ok", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-paper text-[11px]", children: item.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-muted text-[10px]", children: [
              item.action,
              ": ",
              /* @__PURE__ */ jsx("strong", { className: "text-gold", children: item.amount })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsVisible(false),
            className: "text-faint hover:text-paper p-1",
            children: /* @__PURE__ */ jsx(X, { size: 13 })
          }
        )
      ]
    }
  );
};
export {
  NotificationToast
};
