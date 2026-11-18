/**
 * Диагностика почты для сайта.
 *
 *   node scripts/diagnose-smtp.mjs
 *
 * Читает .env и объясняет по-русски, что именно мешает отправке.
 * Ничего не отправляет — только проверяет доступ.
 */
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT) || 465;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.MAIL_TO;

const ok = (s) => console.log('  OK      ' + s);
const bad = (s) => console.log('  ОШИБКА  ' + s);

console.log('=== Настройки из .env ===');
console.log('  Хост:        ', host || '(не задан)');
console.log('  Порт:        ', port);
console.log('  Логин:       ', user || '(не задан)');
console.log('  Пароль:      ', pass ? `${pass.length} символов` : '(не задан)');
console.log('  Получатель:  ', to || '(не задан)');
console.log();

let problems = 0;

if (!host) { bad('SMTP_HOST не задан'); problems++; }
if (!user) { bad('SMTP_USER не задан'); problems++; }
if (!pass) { bad('SMTP_PASS не задан'); problems++; }
if (!to) { bad('MAIL_TO не задан'); problems++; }

if (problems > 0) {
  console.log('\nЗаполните .env по образцу .env.example');
  process.exit(1);
}

console.log('=== Проверка входа на почтовый сервер ===');

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
});

try {
  await transporter.verify();
  ok('сервер принял логин и пароль');
  console.log('\nВсё в порядке — письма будут уходить на', to);
  console.log('Для полной проверки: npm run test:mail');
  process.exit(0);
} catch (e) {
  const resp = String(e.response || e.message || '');

  if (/does not have access rights to this service/i.test(resp)) {
    bad('сервер узнал пароль, но у ящика нет прав на отправку почты');
    console.log(`
Что это значит:
  Пароль верный — Яндекс отвечает не «неверный пароль», а «нет прав на сервис».
  Значит пароль приложения выдан НЕ для почты, либо доступ по протоколам
  закрыт в настройках ящика.

Как исправить (нужно оба шага):

  1. Включить доступ по протоколам:
     Зайдите на ${user}
     → Все настройки → Почтовые программы
     → включите «С сервера imap.yandex.ru по протоколу IMAP»
     → включите «Пароли приложений и OAuth-токены»
     → Сохранить

  2. Создать пароль приложения ИМЕННО ДЛЯ ПОЧТЫ:
     id.yandex.ru → Безопасность → Пароли приложений
     → выбрать тип «Почта» (не «Другое» и не «Календарь»)
     → получите 16 букв, вставьте в SMTP_PASS
     → перезапустите: node scripts/diagnose-smtp.mjs
`);
  } else if (/invalid user or password/i.test(resp)) {
    bad('неверный логин или пароль');
    console.log(`
  Пароль не подходит. Проверьте:
  - SMTP_USER — это полный адрес: ${user}
  - SMTP_PASS — пароль приложения из id.yandex.ru (16 букв, без пробелов)
  - обычный пароль от почты здесь НЕ работает
`);
  } else if (/invalid format/i.test(resp)) {
    bad('пароль пустой или неверного формата');
  } else {
    bad('не удалось подключиться');
    console.log('  код:', e.code);
    console.log('  ответ:', resp.slice(0, 200));
    if (e.code === 'ETIMEDOUT' || e.code === 'ESOCKET') {
      console.log('\n  Похоже, хостинг блокирует исходящие соединения на порт', port);
      console.log('  Попробуйте SMTP_PORT=587 или спросите хостера про исходящий SMTP.');
    }
  }
  process.exit(1);
}
