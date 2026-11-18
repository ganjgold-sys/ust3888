/**
 * Отправка заявок с сайта на почту компании.
 *
 * Как работает:
 * 1. Заявка уходит на наш сервер POST /api/consultation.
 * 2. Сервер через SMTP отправляет письмо на TARGET_EMAIL (nodemailer).
 * 3. Если SMTP не настроен или отправка не удалась — сервер отвечает ошибкой,
 *    и форма честно говорит об этом, а не показывает ложное «успешно».
 *
 * Раньше здесь был запрос к formsubmit.co и таймаут на 3.5 секунды, который
 * возвращал success=true независимо от результата. Из-за этого посетитель видел
 * «заявка отправлена», хотя письмо не уходило никуда. Заменено на реальную отправку.
 */

export interface LeadSubmissionData {
  name: string;
  phone: string;
  format?: string;
  debtAmountRange?: string;
  preferredDate?: string;
  comment?: string;
  source?: string;
  targetEmail?: string;
}

export interface LeadSubmitResult {
  success: boolean;
  message?: string;
  /** Заявка сохранена на сервере, но письмо ушло не всем получателям */
  partial?: boolean;
  /** Куда реально доставлено письмо */
  deliveredTo?: string[];
  error?: string;
}

export async function sendLeadNotificationToEmail(
  data: LeadSubmissionData
): Promise<LeadSubmitResult> {
  const irkutskTime = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Irkutsk' });

  // Локальная копия заявки: если сервер недоступен, данные не потеряются у клиента
  try {
    const existing = JSON.parse(localStorage.getItem('yustitsiya_leads') || '[]');
    existing.push({
      ...data,
      id: 'LEAD-' + Date.now(),
      irkutskTime,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('yustitsiya_leads', JSON.stringify(existing));
  } catch {
    // localStorage может быть недоступен (приватный режим) — это не критично
  }

  let response: Response;
  try {
    response = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, irkutskTime }),
    });
  } catch {
    return {
      success: false,
      error: 'Нет связи с сервером сайта. Проверьте подключение к интернету.',
    };
  }

  let payload: (LeadSubmitResult & { error?: string }) | null = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    return {
      success: false,
      error: payload?.error || 'Сервер не принял заявку.',
    };
  }

  return {
    success: true,
    partial: payload.partial,
    deliveredTo: payload.deliveredTo,
    message: payload.message,
  };
}
