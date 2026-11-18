/**
 * Тест сквозной отправки заявки.
 *
 * Поднимает локальный SMTP-сервер, запускает собранный сайт с настройками,
 * указывающими на этот сервер, отправляет заявку через /api/consultation
 * и проверяет, что письмо реально получено и содержит данные заявки.
 */
import { SMTPServer } from 'smtp-server';
import { spawn } from 'node:child_process';
import net from 'node:net';

const SMTP_PORT = 2525;
const APP_PORT = 3901;

const received = [];

const smtp = new SMTPServer({
  authOptional: true,
  disabledCommands: ['STARTTLS'],
  onAuth(auth, session, cb) {
    cb(null, { user: auth.username });
  },
  onData(stream, session, cb) {
    let raw = '';
    stream.on('data', (c) => (raw += c.toString()));
    stream.on('end', () => {
      received.push({
        to: session.envelope.rcptTo.map((r) => r.address),
        from: session.envelope.mailFrom.address,
        raw,
      });
      cb();
    });
  },
});

await new Promise((res, rej) => {
  smtp.listen(SMTP_PORT, '127.0.0.1', (err) => (err ? rej(err) : res()));
});
console.log('SMTP-ловушка слушает порт', SMTP_PORT);

const app = spawn('node', ['dist/server.cjs'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: String(APP_PORT),
    SMTP_HOST: '127.0.0.1',
    SMTP_PORT: String(SMTP_PORT),
    SMTP_SECURE: 'false',
    SMTP_ALLOW_SELF_SIGNED: 'true',
    SMTP_USER: 'site@yustitsiya-irkutsk.ru',
    SMTP_PASS: 'test-pass',
    MAIL_TO: 'Dovod38@gmail.com',
    MAIL_FROM: 'site@yustitsiya-irkutsk.ru',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let appLog = '';
app.stdout.on('data', (d) => (appLog += d.toString()));
app.stderr.on('data', (d) => (appLog += d.toString()));

const waitPort = async (port, tries = 40) => {
  for (let i = 0; i < tries; i++) {
    const ok = await new Promise((res) => {
      const s = net.connect(port, '127.0.0.1');
      s.on('connect', () => { s.destroy(); res(true); });
      s.on('error', () => res(false));
    });
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
};

if (!(await waitPort(APP_PORT))) {
  console.log('СЕРВЕР НЕ ПОДНЯЛСЯ');
  console.log(appLog.slice(-1500));
  process.exit(1);
}

const lead = {
  name: 'Проверка Тестова',
  phone: '+7 (914) 000-11-22',
  format: 'Консультация юриста',
  debtAmountRange: 'Физическое лицо',
  source: 'Автотест формы',
  comment: 'Проверка доставки письма',
};

const resp = await fetch(`http://127.0.0.1:${APP_PORT}/api/consultation`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(lead),
});

const body = await resp.json();

// Ждём, пока письмо дойдёт до ловушки
for (let i = 0; i < 40 && received.length === 0; i++) {
  await new Promise((r) => setTimeout(r, 250));
}

console.log('\n=== HTTP-ответ сервера ===');
console.log('статус:', resp.status);
console.log(JSON.stringify(body, null, 2));

console.log('\n=== Письма, реально полученные SMTP-сервером ===');
console.log('получено писем:', received.length);

let allGood = resp.status === 200 && body.success === true && received.length === 1;

if (received.length > 0) {
  const m = received[0];
  const raw = m.raw;

  // Тело письма приходит в base64 (multipart/alternative), поэтому декодируем
  // все base64-блоки и склеиваем с сырым текстом для поиска.
  const decodedParts = [];
  const re = /Content-Transfer-Encoding: base64\s*\n\s*\n([\s\S]*?)(?=\n----|\n--$|$)/g;
  let mm;
  while ((mm = re.exec(raw)) !== null) {
    try {
      decodedParts.push(Buffer.from(mm[1].replace(/\s+/g, ''), 'base64').toString('utf8'));
    } catch {
      // блок не base64 — пропускаем
    }
  }
  const haystack = raw + '\n' + decodedParts.join('\n');

  const has = (needle) => haystack.includes(needle);

  const checks = {
    'получатель Dovod38@gmail.com': m.to.join(',').includes('Dovod38@gmail.com'),
    'имя клиента': has('Проверка Тестова'),
    'телефон': has('000-11-22'),
    'источник заявки': has('Автотест формы'),
    'тема письма': /Subject:/i.test(raw),
  };
  console.log('\n=== Проверки письма ===');
  for (const [k, v] of Object.entries(checks)) {
    console.log((v ? 'OK   ' : 'ОШИБКА ') + k);
    if (!v) allGood = false;
  }
  console.log('\n--- декодированное тело письма ---');
  console.log(decodedParts.join('\n=====\n'));
}

console.log('\n=== Лог сервера (MAIL) ===');
console.log(appLog.split('\n').filter((l) => l.includes('MAIL')).join('\n') || '(нет записей)');

app.kill();
smtp.close();
console.log('\nИТОГ:', allGood ? 'ПИСЬМО ДОСТАВЛЕНО' : 'ПРОБЛЕМА');
process.exit(allGood ? 0 : 1);
