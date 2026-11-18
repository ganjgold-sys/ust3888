import React from 'react';
import { Phone, ArrowDown } from 'lucide-react';
import { AUDIENCE_CARDS } from '../data/content';
import { COMPANY_INFO } from '../data/mockData';
import { trackEvent } from '../services/analytics';
import { VideoPlayer } from './VideoPlayer';
import { SectionHead } from './SectionHead';

interface VideoSectionProps {
  onOpenConsultation: () => void;
}

/**
 * Видеоблок.
 *
 * Раньше под видео шёл длинный список «в видео подробно объясняется: …».
 * Его убрали: осталась одна строка-подводка и кнопка звонка.
 * Ниже — текст, который ведёт к пошаговому разбору процедуры.
 */
export const VideoSection: React.FC<VideoSectionProps> = ({ onOpenConsultation }) => {
  const card = AUDIENCE_CARDS.find((c) => c.id === 'person') ?? AUDIENCE_CARDS[0];

  return (
    <section id="video" className="py-12 sm:py-16 bg-ink relative border-t border-line/60">
      <div className="site-container">
        <SectionHead
          index="02"
          className="mb-7 sm:mb-9"
          title={<>Смотрим вместе: <em className="italic font-normal text-gold">видеоразбор</em></>}
          lead="Пять минут о том, что происходит с долгами, имуществом и доходами на каждом этапе."
        />

        <div className="max-w-5xl mx-auto mt-7">
          <VideoPlayer
            src={card.videoSrc ?? ''}
            poster={card.videoPoster}
            wide
            label="видео о процедуре банкротства"
          />

          <div className="mt-5 flex flex-col items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              onClick={() => trackEvent('phone_click', { placement: 'под видео' })}
              className="gold-btn px-7 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
            >
              <Phone size={16} />
              Позвонить
            </a>
            <div className="text-base text-faint font-mono">{COMPANY_INFO.phones[0]}</div>
          </div>

          <p className="mt-6 text-base sm:text-xl text-paper/85 leading-relaxed text-center">
            Ниже разобрали для Вас по шагам саму процедуру банкротства, чтобы Вы понимали,
            что Вам нужно сделать и сколько времени займёт процедура.
          </p>

          <div className="mt-4 flex justify-center">
            <a
              href="#process"
              className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-deep transition-colors"
            >
              Перейти к шагам
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
