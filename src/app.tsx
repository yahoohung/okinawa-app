import { useEffect } from 'preact/hooks'
import './index.css'

import itineraryData from './data/itinerary2.json'
import foodData from './data/food.json'

// Dynamic Image Loading System
// This automatically finds all images in the assets folder
const imageModules = import.meta.glob('./assets/*.{png,jpg,jpeg,webp,avif,svg}', { 
  eager: true, 
  query: '?url',
  import: 'default' 
});

/**
 * Helper to get image URL by filename/key
 * Supports: 
 * 1. Exact match (e.g. "hero1.jpg")
 * 2. Key match (e.g. "kokusai" matches "kokusai.png")
 * 3. Fallback to placeholder
 */
// Map legacy names or descriptive keys to actual filenames if they don't match exactly
const legacyMapper: Record<string, string> = {
  'ryukyu_ushi': '20250718150116_0_179f85.jpg',
  'hamanoya': 'shopinfo_img003.jpg',
  'agu_manza': '1560224843-2056648340.jpg',
  'fisher_dining': 'p47010027_03.jpg',
  'kajinhou': 'fit=scale-down,w=1200.avif',
  'pizza': 'fit=scale-down,w=1200.avif',
  'churaumi': '20170925173451_41.jpg',
  'gyokusendo': '2111847.jpg',
  'busena': '20220910_102538_80ae1c31_w1920.webp',
  'aqua': '1.jpg'
};

/**
 * Helper to get image URL by filename/key
 */
const getImage = (name: string | undefined): string => {
  if (!name) return 'https://placehold.co/600x400?text=No+Image';

  // 1. Try legacy mapper first
  const mappedName = legacyMapper[name] || name;

  const resolveResult = (res: any) => {
    if (!res) return null;
    if (typeof res === 'string') return res;
    if (typeof res === 'object') return res.default || res;
    return String(res);
  };

  // 2. Try exact match
  const exactMatch = imageModules[`./assets/${mappedName}`];
  if (exactMatch) {
    const resolved = resolveResult(exactMatch);
    if (resolved && typeof resolved === 'string') return resolved;
  }

  // 3. Try matching by filename without extension
  const matches = Object.keys(imageModules).filter(path => {
    const filename = path.split('/').pop() || '';
    const base = filename.split('.').slice(0, -1).join('.');
    return base === mappedName || filename === mappedName;
  });

  if (matches.length > 0) {
    const resolved = resolveResult(imageModules[matches[0]]);
    if (resolved && typeof resolved === 'string') return resolved;
  }

  // 4. Fallback for specific hardcoded placeholders
  if (name === 'placeholder') return 'https://placehold.co/600x400?text=Okinawa';

  return 'https://placehold.co/600x400?text=' + encodeURIComponent(name);
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export function App() {
  useReveal();

  const renderFoodCard = (food: any) => {
    if (!food) return null;
    return (
      <div
        class={`reveal food-card ${food.needsBooking && !food.booked ? 'needs-booking' : ''}`}
      >
        <div class="food-card-image-wrapper">
          <img src={getImage(food.img || food.id)} alt={food.name} />
        </div>

        <div class="food-card-content">
          <div class="food-card-type">{food.type}</div>
          <h3 class="food-card-title">{food.name}</h3>
          <p class="food-card-desc">{food.desc}</p>

          <div class="food-card-footer">
            <div class="food-card-note">
              {food.note}
            </div>
            {food.booked ? (
              <div class="food-card-badge booked">已預約</div>
            ) : food.needsBooking ? (
              <div class="food-card-badge needs-booking">需提早預約</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="app-wrapper">
      {/* Minimal immersive experience - no global navigation */}

      <header class="hero">
        <img src={getImage('hero1.jpg')} alt="Okinawa Pristine Beach" class="hero-bg" />
        <div class="hero-content">
          <h1 class="hero-headline">Okinawa 2026.</h1>
          <h2 class="hero-subheadline">每一刻，都精彩絕倫。</h2>

        </div>
      </header>

      <main>
        {/* Overview Intro Section */}
        <section id="overview" class="section reveal">
          <div class="text-center">
            <h2 class="section-title" style="font-size: clamp(40px, 10vw, 80px); line-height: 1.05; letter-spacing: -0.03em;">極致，放鬆。<br />2026，沖繩。</h2>
            <p class="section-body text-center" style="margin-bottom: 0;">
              我們將 8 天 7 夜的旅程，打磨至完美。從那霸街頭的繁華，到北部深海的靜謐。一切為全家人量身定做。這，就是極致的假期體驗。
            </p>
          </div>
        </section>

        {/* Accommodations Section */}
        <section id="accommodations" class="section reveal" style="padding: 120px 20px;">
          <div class="text-center" style="margin-bottom: 80px;">
            <h2 class="section-title" style="font-size: clamp(32px, 8vw, 64px);">三大頂級住宿。<br />全然沉浸。</h2>
          </div>
          <div class="grid" style="max-width: 1100px; width: 100%; margin: 0 auto;">
            {/* Tokyu Stay */}
            <div class="accommodation-card reveal col-span-4" style="min-height: 500px;">
              <img src={getImage('tokyu.png')} alt="Tokyu Stay Naha" class="card-bg" />
              <div class="large-number-bg">01</div>
              <div class="accommodation-overlay">
                <h3 style="font-size: clamp(24px, 4vw, 32px); font-weight:700; color:#fff; line-height:1.1; margin-bottom: 0;">
                  東急 Stay 那霸。
                </h3>
              </div>
            </div>

            {/* GLANZ */}
            <div class="accommodation-card reveal col-span-8" style="min-height: 500px;">
              <img src={getImage('villa.png')} alt="Reflexion Villas GLANZ" class="card-bg" />
              <div class="large-number-bg">02</div>
              <div class="accommodation-overlay">
                <h3 style="font-size: clamp(28px, 5vw, 42px); font-weight:700; color:#fff; line-height:1.1; margin-bottom:0;">
                  琉池名護奢華別墅。
                </h3>
              </div>
            </div>

            {/* Kokoni */}
            <div class="accommodation-card accommodation-split reveal col-span-12">
              <div class="split-img-container">
                <img src={getImage('459fc3af-d480-486e-9382-aca4f01234a3.jpg.avif')} alt="Kokoni Chill House" class="split-img" />
              </div>
              <div class="split-content">
                <div class="large-number-bg" style="top: auto; bottom: -20px;">03</div>
                <h3 style="font-size: clamp(28px, 5vw, 40px); font-weight:700; color:var(--text-main); line-height:1.1; margin-bottom:0;">恩納村<br />可可尼之殿。
                </h3>
                <div style="border-top:1px solid var(--border-color); padding-top:24px; font-size:12px; color:var(--text-tertiary); font-weight:700; letter-spacing:0.1em;">
                  FAMILY BASE · COMFORT STAY
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicles Section - Full Page Immersion */}
        <section id="vehicles" class="section reveal full-page-vehicle">
          <div class="vehicle-container">
            <div class="vehicle-content">
              <div class="vehicle-header">
                <h3 class="vehicle-title">雙車編制。<br />全方位守護。</h3>
                <p class="vehicle-description">
                  兩輛 Toyota Sienta Hybrid。結合極致寧靜與現代主動安全科技，提供最順滑、放心的移動體驗。
                </p>
              </div>
            </div>

            <div class="vehicle-visual">
              <div class="car-wrapper car-float">
                <img src={getImage('sienta_ext_596x396_070.png.webp')} alt="Toyota Sienta Hybrid" class="car-hero-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Header Section */}
        <section id="itinerary" class="section reveal">
          <div class="text-center">
            <h2 class="section-title" style="font-size: clamp(40px, 8vw, 72px); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 0;">
              8 天 7 夜。<br />最高傑作。
            </h2>
          </div>
        </section>

        {/* Day-by-Day Itinerary Timeline */}
        <div class="timeline">
          {itineraryData.map((day) => {
            return (
              <div class="timeline-item" key={day.day}>
                <div class="day-header reveal">
                  <div class="day-intensity" style="font-size: clamp(40px, 10vw, 80px); font-weight: 800; line-height: 1; letter-spacing: -0.04em; color: var(--primary);">
                    DAY {day.day}.
                  </div>
                  <div class="day-title-massive">{day.date}</div>
                </div>

                <div class="day-spine"></div>

                <div style="position:relative; z-index:2;">
                  <h3 class="reveal day-title-text" style="font-size: clamp(24px, 5vw, 32px); font-weight:600; margin-bottom: 48px; color:var(--text-main);">{day.title}。</h3>

                  {day.highlights?.map((photo: any, i: number) => (
                    <div class={`photo-highlight reveal reveal-delay-${(i % 2) + 1}`} key={i} style={{ marginBottom: '64px', marginLeft: '0px' }}>
                      <img src={getImage(photo.img)} alt={photo.caption} />
                      <div class="photo-caption">{photo.caption}</div>
                    </div>
                  ))}

                  <div class="activity-cluster">
                    {day.events.map((evt: any, i: number) => {
                      if (evt.transit) {
                        return (
                          <div class="transit-row reveal" key={i}>
                            <div class={`transit-label ${evt.transit.mode}`}>
                              <span>{evt.transit.mode === 'car' ? '🚗' : evt.transit.mode === 'walk' ? '🚶🏻‍♂️' : '🚆'}</span>
                              <span>{evt.transit.label} · {evt.transit.time}</span>
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={i}>
                          <div class="event-row reveal">
                            <div class={`event-node ${evt.isFood ? 'food' : ''}`}></div>
                            <div class="event-time">{evt.time}</div>
                            <div class="event-details" style={{ flex: 1 }}>
                              <div class="event-title" style={evt.isFood ? { color: 'var(--accent-gold)' } : {}}>
                                {evt.title}
                                {evt.booked && <span class="timeline-badge booked-badge">已預約</span>}
                                {evt.needsBooking && !evt.booked && <span class="timeline-badge needs-booking-badge">需提早預約</span>}
                              </div>
                              {evt.subtitle && <div class="event-subtitle">{evt.subtitle}</div>}
                            </div>
                          </div>
                          {evt.isFood && (() => {
                            const match = foodData.find(f => {
                              if (!f || !f.name) return false;
                              return f.name === evt.title ||
                                f.name === evt.title.replace(' · ', ' ') ||
                                evt.title.includes(f.name.split(' ')[0]);
                            });
                            if (!match) return null;
                            return (
                              <div class="reveal day-title-text" style={{ paddingRight: '24px', marginBottom: '48px', marginTop: '-16px' }}>
                                {renderFoodCard(match)}
                              </div>
                            );
                          })()}
                        </div>
                      )
                    })}
                  </div>


                </div>
              </div>
            )
          })}
        </div>
        {/* End of content */}
        {/* End of Timeline */}

        {/* Sentimental Conclusion */}
        <section class="section reveal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: 'linear-gradient(180deg, #f7f9fa 0%, #fff 100%)' }}>
          <div class="text-center" style="max-width: 800px;">
            <h2 class="section-title" style="font-size: clamp(32px, 6vw, 48px); margin-bottom: 32px; color: var(--primary-dark);">這，不只是旅行。</h2>
            <p class="section-body" style="font-size: clamp(18px, 3vw, 24px); line-height: 1.8; color: var(--text-secondary); font-weight: 300;">
              定格，海邊的笑聲。<br />
              收藏，最純粹的溫暖。<br />
            </p>
            <div style="margin-top: 60px; font-weight: 600; letter-spacing: 0.2em; color: var(--text-tertiary); font-size: 14px;">
              OKINAWA · 2026
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
