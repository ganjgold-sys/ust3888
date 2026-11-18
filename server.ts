import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import path from "path";
import { existsSync } from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

// Читаем .env до того, как используются SMTP_* и MAIL_*
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory store for consultation requests
const consultationLeads: Array<{
  id: string;
  name: string;
  phone: string;
  format?: string;
  debtAmountRange?: string;
  preferredDate?: string;
  comment?: string;
  source?: string;
  sentToEmail: string;
  createdAt: string;
}> = [];

const TARGET_NOTIFICATION_EMAIL = "Dovod38@gmail.com";

/**
 * Получатели заявок. Расширяется без правки кода: MAIL_TO=box1@mail.ru,box2@gmail.com
 */
const MAIL_RECIPIENTS = (process.env.MAIL_TO || TARGET_NOTIFICATION_EMAIL)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * SMTP-транспорт. Настраивается переменными окружения:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 * Пример для Яндекс.Почты: SMTP_HOST=smtp.yandex.ru, SMTP_PORT=465,
 * SMTP_USER=...@yandex.ru, SMTP_PASS — пароль приложения из настроек почты.
 */
const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpPort = Number(process.env.SMTP_PORT) || 465;
const mailFrom = process.env.MAIL_FROM || smtpUser || "noreply@yustitsiya-irkutsk.ru";

const mailTransport =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: process.env.SMTP_SECURE
          ? process.env.SMTP_SECURE === "true"
          : smtpPort === 465,
        tls: { rejectUnauthorized: process.env.SMTP_ALLOW_SELF_SIGNED !== "true" },
        auth: { user: smtpUser, pass: smtpPass },
      })
    : null;

if (!mailTransport) {
  console.warn(
    "[MAIL] SMTP не настроен: письма не будут отправляться. " +
      "Задайте SMTP_HOST, SMTP_USER, SMTP_PASS в .env"
  );
}


/**
 * API: приём заявки с сайта + отправка письма на почту.
 *
 * Отвечает 503, если отправка невозможна (SMTP не настроен) — фронтенд
 * покажет честное «не удалось», а не ложное «заявка отправлена».
 */
app.post("/api/consultation", async (req, res) => {
  const { name, phone, format, debtAmountRange, preferredDate, comment, source, irkutskTime } = req.body;

  if (!phone || !name) {
    return res.status(400).json({ error: "Пожалуйста, укажите ваше имя и номер телефона" });
  }

  const newLead = {
    id: "LEAD-" + Math.floor(100000 + Math.random() * 900000),
    name: String(name).trim(),
    phone: String(phone).trim(),
    format: format || "Консультация юриста",
    debtAmountRange: debtAmountRange || "Не указана",
    preferredDate,
    comment: comment || "",
    source: source || "Форма обратной связи на сайте",
    createdAt: new Date().toISOString(),
  };

  consultationLeads.push({ ...newLead, sentToEmail: MAIL_RECIPIENTS.join(", ") });

  if (!mailTransport) {
    console.error(
      "[MAIL] Заявка получена, но письмо НЕ отправлено: SMTP не настроен. Данные:",
      JSON.stringify(newLead)
    );
    return res.status(503).json({
      success: false,
      leadId: newLead.id,
      error: "Отправка почты не настроена на сервере.",
    });
  }

  const safe = (v?: string) => String(v ?? "").replace(/[<>]/g, "");
  const timeLabel = irkutskTime || new Date().toLocaleString("ru-RU", { timeZone: "Asia/Irkutsk" });

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.55">
      <h2 style="margin:0 0 12px;color:#8a6d2f">Новая заявка с сайта «Юстиция»</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><td style="background:#f6f1e7"><b>Имя</b></td><td>${safe(newLead.name)}</td></tr>
        <tr><td style="background:#f6f1e7"><b>Телефон</b></td><td><a href="tel:${safe(newLead.phone)}">${safe(newLead.phone)}</a></td></tr>
        <tr><td style="background:#f6f1e7"><b>Категория</b></td><td>${safe(newLead.debtAmountRange)}</td></tr>
        <tr><td style="background:#f6f1e7"><b>Формат</b></td><td>${safe(newLead.format)}</td></tr>
        <tr><td style="background:#f6f1e7"><b>Источник</b></td><td>${safe(newLead.source)}</td></tr>
        <tr><td style="background:#f6f1e7"><b>Комментарий</b></td><td>${safe(newLead.comment) || "—"}</td></tr>
        <tr><td style="background:#f6f1e7"><b>Время (Иркутск)</b></td><td>${safe(timeLabel)}</td></tr>
      </table>
      <p style="color:#777;font-size:12px;margin-top:16px">
        Заявка №${newLead.id}. Сайт ООО «Юстиция» (ИНН 3811452733), Иркутск.
      </p>
    </div>`;

  const text = [
    "Новая заявка с сайта «Юстиция»",
    "",
    "Имя: " + newLead.name,
    "Телефон: " + newLead.phone,
    "Категория: " + newLead.debtAmountRange,
    "Формат: " + newLead.format,
    "Источник: " + newLead.source,
    "Комментарий: " + (newLead.comment || "—"),
    "Время (Иркутск): " + timeLabel,
    "",
    "Заявка №" + newLead.id,
  ].join("\n");

  const deliveredTo: string[] = [];
  const failed: string[] = [];

  await Promise.all(
    MAIL_RECIPIENTS.map(async (to) => {
      try {
        await mailTransport.sendMail({
          from: `"Сайт Юстиция" <${mailFrom}>`,
          to,
          subject: `Заявка на банкротство: ${newLead.name} (${newLead.phone})`,
          text,
          html,
        });
        deliveredTo.push(to);
      } catch (e) {
        failed.push(to);
        console.error(`[MAIL] Не удалось отправить письмо на ${to}:`, e);
      }
    })
  );

  if (deliveredTo.length === 0) {
    return res.status(502).json({
      success: false,
      leadId: newLead.id,
      error: "Не удалось отправить письмо на почту компании.",
    });
  }

  console.log(
    `[MAIL] Заявка ${newLead.id} отправлена: ${deliveredTo.join(", ")}` +
      (failed.length ? ` | ошибки: ${failed.join(", ")}` : "")
  );

  return res.json({
    success: true,
    leadId: newLead.id,
    partial: failed.length > 0,
    deliveredTo,
    message: "Заявка отправлена. Юрист свяжется с вами в течение 5 минут.",
  });
});

// API Route: AI Legal Assistant Analysis (Gemini)
app.post("/api/ai-consultant", async (req, res) => {
  const { userMessage, debtDetails } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Сообщение не должно быть пустым" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful fallback if GEMINI_API_KEY is not set
    return res.json({
      reply: `Здравствуйте! На основе вашего вопроса: "${userMessage}", по ФЗ № 127 в 98% случаев граждане с долгами от 300 000 рублей имеют полное право на законное списание кредитов, МФО и налогов. Запишитесь на бесплатный разбор с ведущим юристом компании «Юстиция» в Иркутске по телефону +7 (914) 938-54-44.`,
      recommendedAction: "consultation",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Ты — ведущий искусственный интеллект-ассистент юридической компании ООО «Юстиция» (ИНН: 3811452733) в городе Иркутск (адрес: ул. Верхняя Набережная, 167/8, тел: +7 (914) 938-54-44, email: Dovod38@gmail.com).
Твоя задача — давать вежливые, профессиональные, точные и обнадеживающие ответы гражданам по вопросу списания долгов и банкротства физических лиц согласно Федеральному закону № 127-ФЗ в Арбитражном суде Иркутской области.

Контекст о нашей компании ООО «Юстиция»:
- ИНН: 3811452733, ОГРН: 1213800018590.
- Юристы с фундаментальным опытом в Арбитражном суде Иркутской области.
- 100% финансовая гарантия возврата средств в договоре.
- Защита единственного жилья по ст. 446 ГПК РФ.
- Доступная рассрочка от 10 000 руб/мес без процентов.
- Прекращение звонков коллекторов с 1-го дня (ФЗ № 230-ФЗ).
- Офис в Иркутске: ул. Верхняя Набережная, 167/8.

Вопрос клиента: "${userMessage}"
Дополнительные данные по долгу: ${JSON.stringify(debtDetails || {})}

Сформулируй понятный, грамотный и уверенный ответ на русском языке (2-3 абзаца). Разъясни норму закона простыми словами, успокой клиента и порекомендуй записаться на бесплатную консультацию в компанию «Юстиция» по телефону +7 (914) 938-54-44.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const replyText = response.text || "Наш юрист готов лично проанализировать вашу ситуацию. Позвоните +7 (914) 938-54-44.";

    return res.json({
      reply: replyText,
      recommendedAction: "consultation",
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.json({
      reply: "Согласно ФЗ № 127, ситуация с задолженностями решается через официальную процедуру банкротства с полным освобождением от финансовых обязательств. Оставьте заявку, и юрист компании «Юстиция» с опытом более 10 лет проведет персональный разбор вашего дела.",
      recommendedAction: "consultation",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Сжатие: заметно ускоряет загрузку на мобильных и слабых каналах
    app.use(compression());

    // Хешированные файлы сборки кешируем надолго, index.html — никогда
    app.use(
      express.static(distPath, {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith("index.html")) {
            res.setHeader("Cache-Control", "no-cache");
          } else if (/[\\/]assets[\\/]/.test(filePath)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else {
            res.setHeader("Cache-Control", "public, max-age=86400");
          }
        },
      })
    );

    /**
     * Обработка всех остальных адресов.
     *
     * Существующие страницы отдаются как 200. Неизвестные — как 404
     * со страницей dist/404.html и заголовком X-Robots-Tag: noindex.
     *
     * Раньше любой адрес получал главную с кодом 200. Для поисковика это
     * «мягкий 404»: несуществующие страницы попадали в индекс как копии
     * главной, а на сайте не было настоящей страницы ошибки.
     */
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache");

      // Нормализуем путь: убираем слэши по краям и query-строку
      const cleanPath = decodeURIComponent(req.path).replace(/^\/+|\/+$/g, "");

      const isFile =
        cleanPath !== "" && existsSync(path.join(distPath, cleanPath));

      const isPage =
        cleanPath !== "" &&
        /^[a-z0-9-]+$/i.test(cleanPath) &&
        existsSync(path.join(distPath, cleanPath, "index.html"));

      // Главная всегда существует
      if (cleanPath === "" || isPage) {
        return res.sendFile(path.join(distPath, "index.html"));
      }

      // Файл без расширения, но реально лежащий в dist — отдаём его
      if (isFile) {
        return res.sendFile(path.join(distPath, cleanPath));
      }

      // Всё остальное — 404
      const notFoundPage = path.join(distPath, "404.html");
      res.status(404);
      res.setHeader("X-Robots-Tag", "noindex, follow");
      if (existsSync(notFoundPage)) {
        return res.sendFile(notFoundPage);
      }
      return res
        .type("html")
        .send("<h1>404 — страница не найдена</h1><p><a href='/'>На главную</a></p>");
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
