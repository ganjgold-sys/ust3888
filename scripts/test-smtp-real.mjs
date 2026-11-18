/**
 * Проверка реальной отправки через Яндекс SMTP.
 * Отправляет одно письмо на MAIL_TO и печатает результат.
 */
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Читаем настройки из .env, иначе скрипт видит только переменные окружения
dotenv.config();

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT) || 465;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.MAIL_TO;
const from = process.env.MAIL_FROM || user;

console.log('Хост:', host, '| Порт:', port, '| Логин:', user);
console.log('Получатель:', to);
console.log('---');

if (!host || !user || !pass || !to) {
  console.error('Не хватает переменных окружения');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  // Яндекс требует это для корректного HELO
  name: 'yustitsiya-irkutsk.ru',
});

// 1. Сначала проверяем авторизацию, не отправляя письмо
try {
  await transporter.verify();
  console.log('АВТОРИЗАЦИЯ: OK (логин и пароль приняты)');
} catch (e) {
  console.error('АВТОРИЗАЦИЯ: ОШИБКА');
  console.error('  код:', e.code);
  console.error('  ответ:', e.response || e.message);
  process.exit(1);
}

// 2. Отправляем настоящее письмо
const lead = {
  id: 'LEAD-' + Math.floor(100000 + Math.random() * 900000),
  name: 'Проверка Тестова',
  phone: '+7 (914) 000-11-22',
  debtAmountRange: 'Физическое лицо',
  format: 'Консультация юриста',
  source: 'Автотест формы с реальной почты',
  comment: 'Техническая проверка доставки заявок с сайта Юстиция',
};

const timeLabel = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Irkutsk' });

const html = `
  <div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.55">
    <h2 style="margin:0 0 12px;color:#8a6d2f">Новая заявка с сайта «Юстиция»</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td style="background:#f6f1e7"><b>Имя</b></td><td>${lead.name}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Телефон</b></td><td>${lead.phone}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Категория</b></td><td>${lead.debtAmountRange}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Формат</b></td><td>${lead.format}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Источник</b></td><td>${lead.source}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Комментарий</b></td><td>${lead.comment}</td></tr>
      <tr><td style="background:#f6f1e7"><b>Время (Иркутск)</b></td><td>${timeLabel}</td></tr>
    </table>
    <p style="color:#777;font-size:12px;margin-top:16px">Заявка №${lead.id}. Проверка настройки почты.</p>
  </div>`;

try {
  const info = await transporter.sendMail({
    from: `"Сайт Юстиция" <${from}>`,
    to,
    subject: `Заявка на банкротство: ${lead.name} (${lead.phone})`,
    text: `Новая заявка с сайта «Юстиция»\n\nИмя: ${lead.name}\nТелефон: ${lead.phone}\nКатегория: ${lead.debtAmountRange}\nФормат: ${lead.format}\nИсточник: ${lead.source}\nКомментарий: ${lead.comment}\nВремя (Иркутск): ${timeLabel}\n\nЗаявка №${lead.id}`,
    html,
  });
  console.log('ОТПРАВКА: OK');
  console.log('  ответ сервера:', info.response);
  console.log('  messageId:', info.messageId);
  console.log('  принято адресов:', info.accepted);
  console.log('  отклонено:', info.rejected);
  console.log('\nИТОГ: письмо принято Яндексом для доставки на', to);
} catch (e) {
  console.error('ОТПРАВКА: ОШИБКА');
  console.error('  код:', e.code);
  console.error('  ответ:', e.response || e.message);
  process.exit(1);
}
