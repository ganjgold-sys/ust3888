import React, { Suspense, lazy, useState } from 'react';

/**
 * Модальные окна грузим отдельными чанками: они не нужны при первом рендере.
 * Секции страницы импортируются сразу — иначе серверный предрендер не сможет
 * их отрисовать, а клиентская разметка разойдётся с серверной, и при загрузке
 * страница «схлопнется». Скорость при этом не страдает: за счёт предрендера
 * контент виден ещё до загрузки JavaScript.
 */
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MobileCallBar } from './components/MobileCallBar';
import { MobileHero } from './components/MobileHero';
import { LazyOnVisible } from './components/LazyOnVisible';
import { SeoLanding } from './components/SeoLanding';
import { NotFoundPage } from './components/NotFoundPage';
import { SEO_PAGES_BY_SLUG } from './data/seoPages';
import { useRoutePath } from './routeContext';

/** Путь без слэша в конце. Берётся из контекста на сервере и из window на клиенте. */
function slugFromPath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, '');
}
import { DirectionsSection } from './components/DirectionsSection';
import { VideoSection } from './components/VideoSection';
import { PriceSection } from './components/PriceSection';
import { ProcessSection } from './components/ProcessSection';
import { CaseStudies } from './components/CaseStudies';
import { ReviewsSection } from './components/ReviewsSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const ConsultationModal = lazy(() => import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal })));
const AIConsultantModal = lazy(() => import('./components/AIConsultantModal').then((m) => ({ default: m.AIConsultantModal })));
const PrivacyPolicyModal = lazy(() => import('./components/PrivacyPolicyModal').then((m) => ({ default: m.PrivacyPolicyModal })));
const NotificationToast = lazy(() => import('./components/NotificationToast').then((m) => ({ default: m.NotificationToast })));


function SeoApp({ seoPage }: { seoPage: (typeof SEO_PAGES_BY_SLUG)[string] }) {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyTab, setPrivacyTab] = useState<'policy' | 'consent'>('policy');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const handleCloseConsultation = () => { setIsConsultationModalOpen(false); setSelectedServiceId(null); };
  const handleOpenPrivacy = (tab: 'policy' | 'consent' = 'policy') => { setPrivacyTab(tab); setIsPrivacyModalOpen(true); };
  return (
      <div className="min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink">
        <Navbar onOpenConsultation={() => setIsConsultationModalOpen(true)} onOpenAIChat={() => setIsAIChatOpen(true)} />
        <SeoLanding page={seoPage} onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        <Footer onOpenConsultation={() => setIsConsultationModalOpen(true)} onOpenPrivacy={handleOpenPrivacy} />
        <Suspense fallback={null}>
          {isConsultationModalOpen && (
            <ConsultationModal isOpen onClose={handleCloseConsultation} initialServiceId={selectedServiceId} onOpenPrivacy={handleOpenPrivacy} />
          )}
          {isAIChatOpen && <AIConsultantModal isOpen onClose={() => setIsAIChatOpen(false)} onOpenConsultation={() => { setIsAIChatOpen(false); setIsConsultationModalOpen(true); }} />}
          {isPrivacyModalOpen && <PrivacyPolicyModal isOpen onClose={() => setIsPrivacyModalOpen(false)} defaultTab={privacyTab} />}
        </Suspense>
        <MobileCallBar onOpenConsultation={() => setIsConsultationModalOpen(true)} />
      </div>
  );
}

export function App() {
  const pathname = useRoutePath();
  const slug = slugFromPath(pathname);

  // Главная страница — единственный адрес, который рендерит HomeApp
  if (slug === '' || slug === 'index.html') return <HomeApp />;

  const seoPage = SEO_PAGES_BY_SLUG[slug];
  if (seoPage) return <SeoApp seoPage={seoPage} />;

  // Неизвестный адрес: страница 404 (сервер отдаёт её с кодом 404)
  return <NotFoundPage />;
}

function HomeApp() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyTab, setPrivacyTab] = useState<'policy' | 'consent'>('policy');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  /**
   * Какое направление раскрыто в блоке вопросов.
   * Плашка в первом экране не открывает форму — она прокручивает к вопросам
   * и раскрывает нужную плашку. Иначе человек видит форму вместо ответов
   * и решает, что кнопка не работает.
   */
  const [openDirection, setOpenDirection] = useState<'person' | 'business' | null>(null);

  const handleSelectDirection = (direction: 'person' | 'business') => {
    setOpenDirection(direction);
    // Прокрутка к блоку вопросов после того, как он отрендерится
    requestAnimationFrame(() => {
      document.getElementById('directions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleOpenConsultation = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsConsultationModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleOpenPrivacy = (tab: 'policy' | 'consent' = 'policy') => {
    setPrivacyTab(tab);
    setIsPrivacyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ink text-paper font-sans antialiased selection:bg-gold selection:text-ink">
      {/* Первый экран для телефонов. На экранах до 767 px в портретной ориентации
          заменяет шапку и герой, на остальных скрыт (см. mobile-hero.css) */}
      <MobileHero onSelectDirection={handleSelectDirection} />

      {/* Header & Fixed Navigation */}
      <div className="mt-covered">
        <Navbar
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAIChat={() => setIsAIChatOpen(true)}
        />
      </div>

      {/* Main Content Sections */}
      <main>
        {/* 1. Первый экран: «Банкротство» в рамке + две плашки */}
        <div className="mt-covered">
          <Hero
            onOpenConsultation={() => handleOpenConsultation()}
            onSelectDirection={handleSelectDirection}
          />
        </div>

        {/* 2. Два направления с раскрывающимися вопросами (юрлица и ИП первыми) */}
        <LazyOnVisible minHeight={420} anchorId="directions">
          <DirectionsSection
            onOpenConsultation={(direction) => handleOpenConsultation(direction)}
            openId={openDirection}
            onOpenChange={setOpenDirection}
          />
        </LazyOnVisible>

        {/* 3. Видео + кнопка «Позвонить» + подводка к шагам */}
        <LazyOnVisible minHeight={520} anchorId="video">
          <VideoSection onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 4. Как проходит процедура — 8 шагов */}
        <LazyOnVisible minHeight={560} anchorId="process">
          <ProcessSection onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 5. Стоимость и условия + четыре довода (перенесены из первого экрана) */}
        <LazyOnVisible minHeight={560} anchorId="price">
          <PriceSection onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 6. Выигранные дела — карусель */}
        <LazyOnVisible minHeight={560} anchorId="cases">
          <CaseStudies onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 7. Отзывы */}
        <LazyOnVisible minHeight={420} anchorId="reviews">
          <ReviewsSection onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 8. Команда — карусель */}
        <LazyOnVisible minHeight={520} anchorId="team">
          <TeamSection onOpenConsultation={() => handleOpenConsultation()} />
        </LazyOnVisible>

        {/* 9. Контакты и форма */}
        <LazyOnVisible minHeight={520} anchorId="contacts">
          <ContactSection onOpenConsultation={() => handleOpenConsultation()} onOpenPrivacy={handleOpenPrivacy} />
        </LazyOnVisible>
      </main>

      {/* Site Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenPrivacy={handleOpenPrivacy}
      />

      {/* Модалки монтируются только когда открыты: их код не грузится на старте */}
      <Suspense fallback={null}>
        {isConsultationModalOpen && (
          <ConsultationModal
            isOpen={isConsultationModalOpen}
            onClose={handleCloseConsultation}
            initialServiceId={selectedServiceId}
            onOpenPrivacy={handleOpenPrivacy}
          />
        )}

        {isAIChatOpen && (
          <AIConsultantModal
            isOpen={isAIChatOpen}
            onClose={() => setIsAIChatOpen(false)}
            onOpenConsultation={() => {
              setIsAIChatOpen(false);
              handleOpenConsultation();
            }}
          />
        )}

        {isPrivacyModalOpen && (
          <PrivacyPolicyModal
            isOpen={isPrivacyModalOpen}
            onClose={() => setIsPrivacyModalOpen(false)}
            defaultTab={privacyTab}
          />
        )}

        {/* Всплывающее уведомление: грузится отложенно, после первого экрана */}
        <NotificationToast onOpenConsultation={() => handleOpenConsultation()} />
      </Suspense>

      {/* Липкая панель звонка на мобильных */}
      <MobileCallBar onOpenConsultation={() => handleOpenConsultation()} />
    </div>
  );
}

export default App;
