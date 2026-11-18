import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { trackEvent } from '../services/analytics';

interface VideoPlayerProps {
  src: string;
  /** Широкий кадр 16:9 на всю ширину блока (как на схеме), иначе вертикальный 9:16 */
  wide?: boolean;
  poster?: string;
  caption?: string;
  /** Подпись для аналитики */
  label?: string;
}

/**
 * Вертикальный видеоплеер (9:16) для раздела «Кому помогаем».
 *
 * Ролик короткий и атмосферный, поэтому:
 * - не автозапускается со звуком (браузеры всё равно блокируют, плюс это раздражает);
 * - `preload="none"` — видео не скачивается, пока человек не нажал Play;
 * - постер показывается сразу, поэтому блок не выглядит пустым;
 * - кнопки воспроизведения и паузы с подписями для доступности.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, caption, label, wide = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
      trackEvent('video_cta_click', { action: 'play', label: label ?? 'видео' });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <figure className="space-y-3">
      <div
        className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-line-2 bg-ground shadow-deep group ${
          wide ? 'aspect-video' : 'max-w-[340px] sm:max-w-[380px] aspect-[9/16]'
        }`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
          aria-label={caption ?? 'Видео о процедуре банкротства'}
        >
          Ваш браузер не поддерживает встроенное видео.
        </video>

        {/* Кнопка Play поверх постера — пока видео не запущено */}
        {!isPlaying && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Воспроизвести видео"
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-colors hover:bg-ink/70 whitespace-nowrap"
          >
            <span className="w-16 h-16 rounded-full bg-gold text-ink flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <Play size={26} className="ml-1" fill="currentColor" />
            </span>
            <span className="mt-4 text-xs font-semibold text-paper px-4 text-center">
              Смотреть видео
            </span>
          </button>
        )}

        {/* Пауза изнутри, когда идут системные контролы */}
        {isPlaying && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Пауза"
            className="absolute bottom-3 left-3 p-2 rounded-lg bg-ink/80 text-paper opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity whitespace-nowrap"
          >
            <Pause size={16} />
          </button>
        )}
      </div>

      {(caption || label) && (
        <figcaption className={`text-xs text-muted leading-relaxed text-center mx-auto ${wide ? 'max-w-xl' : 'max-w-[340px] sm:max-w-[380px]'}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
