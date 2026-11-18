import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Sparkles, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({ isOpen, onClose, onOpenConsultation }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Здравствуйте! Я интеллектуальный ИИ-юрист компании «Юстиция» в Иркутске. Напишите ваш вопрос по списанию долгов, кредитам или защите имущества по ФЗ № 127. С удовольствием отвечу прямо сейчас!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickQuestions = [
    'Заберут ли единственное жилье по ФЗ-127?',
    'Как списать долги от 500 000 рублей?',
    'Прекратятся ли звонки коллекторов?',
    'Сколько стоит рассрочка в месяц?'
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: textToSend, time: userTime }]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: textToSend })
      });

      const data = await res.json();
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: data.reply || `Наш юрист в Иркутске готов проанализировать ваше дело детально. Позвоните ${COMPANY_INFO.phones[0]}.`,
        time: aiTime
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: 'По ФЗ № 127 гражданин имеет право на полное списание задолженностей при отсутствии возможности их погашать. Оставьте заявку на бесплатный очный разбор в Иркутске.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card max-w-2xl w-full h-[85vh] rounded-2xl border border-gold/40 flex flex-col justify-between overflow-hidden"
          >
            
            {/* Modal Header */}
            <div className="bg-card border-b border-line-2 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-line-2 to-ground border border-gold flex items-center justify-center text-gold">
                  <Bot size={22} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-serif font-bold text-paper">ИИ-Юрист «Юстиция» 24/7</h3>
                    <span className="w-2 h-2 rounded-full bg-ok"></span>
                  </div>
                  <div className="text-[11px] text-muted">Иркутск, консультации по ФЗ № 127 в режиме реального времени</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть чат"
                className="p-2 rounded-lg bg-raised text-muted hover:text-paper active:scale-[0.98] transition-transform whitespace-nowrap"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ground">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${msg.sender === 'user' ? 'bg-gold text-ground' : 'bg-line border border-line-2 text-gold'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-line text-paper border border-line-2' : 'bg-card text-bone-line border border-line-2'}`}>
                    <div>{msg.text}</div>
                    <div className="text-[10px] text-faint text-right mt-1.5">{msg.time}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center space-x-2 text-xs text-gold bg-card p-3 rounded-xl max-w-xs border border-line-2">
                  <Sparkles size={16} className="animate-spin" />
                  <span>ИИ-Юрист анализирует судебную практику…</span>
                </div>
              )}
            </div>

            {/* Quick Questions Chips */}
            <div className="p-3 bg-surface border-t border-line overflow-x-auto flex space-x-2 no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-lg bg-raised border border-line-2 text-xs text-muted hover:text-gold-soft hover:border-gold active:scale-[0.98] whitespace-nowrap shrink-0 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input & CTA */}
            <div className="p-4 bg-card border-t border-line-2 space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  aria-label="Ваш вопрос по долгам"
                  placeholder="Задайте ваш вопрос по долгам…"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 bg-ground border border-line-2 rounded-xl px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  aria-label="Отправить вопрос"
                  disabled={isLoading || !inputQuery.trim()}
                  className="gold-btn px-4 py-3 rounded-xl font-bold flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-[0.98] transition-transform whitespace-nowrap"
                >
                  <Send size={18} />
                </button>
              </form>

              <div className="flex items-center justify-between text-xs text-muted pt-1 border-t border-line/50">
                <span>Нужна личная встреча с человеком?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                  className="text-gold-soft font-bold hover:underline active:opacity-70 flex items-center space-x-1 whitespace-nowrap"
                >
                  <PhoneCall size={12} />
                  <span>Записаться на очный разбор</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
