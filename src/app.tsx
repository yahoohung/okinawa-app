import { useEffect } from 'preact/hooks'
import './index.css'

// Hero & Feature Images
import heroImg from './assets/hero1.jpg'
import aquaImg from './assets/1.jpg'
import churaumiImg from './assets/20170925173451_41.jpg'
import gyokusendoImg from './assets/2111847.jpg'
import manzamoImg from './assets/manzamo.png'
import busenaImg from './assets/20220910_102538_80ae1c31_w1920.webp'
import sientaImg from './assets/sienta_ext_596x396_070.png.webp'
import dolphinImg from './assets/dolphin.png'
import kokusaiImg from './assets/kokusai.png'
import fisherImg from './assets/p47010027_03.jpg'
import aguManzaImg from './assets/1560224843-2056648340.jpg'
import pizzaImg from './assets/fit=scale-down,w=1200.avif'
import ryukyuUshiImg from './assets/20250718150116_0_179f85.jpg'
import hamanoyaImg from './assets/shopinfo_img003.jpg'

// Hotel Images
import tokyuImg from './assets/tokyu.png'
import kokoniImg from './assets/459fc3af-d480-486e-9382-aca4f01234a3.jpg.avif'
import villaImg from './assets/villa.png'

// Food Images
import wagyuImg from './assets/wagyu.png'
import aguPorkImg from './assets/agu_pork.png'
import lobsterImg from './assets/lobster.png'
import sushiImg from './assets/sushi.png'
import sobaImg from './assets/soba.png'
import onigiriImg from './assets/onigiri.png'

import itineraryData from './data/itinerary.json'
import foodData from './data/food.json'

const foodImages: Record<string, string> = {
  wagyu: wagyuImg,
  agu_pork: aguPorkImg,
  lobster: lobsterImg,
  sushi: sushiImg,
  soba: sobaImg,
  onigiri: onigiriImg,
  fisher_dining: fisherImg,
  agu_manza: aguManzaImg,
  ryukyu_ushi: ryukyuUshiImg,
  hamanoya: hamanoyaImg,
  kajinhou: pizzaImg,
  pizza: pizzaImg // fallback
}

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

  const getImagesForDay = (day: number) => {
    if (day === 1) return [{ img: kokusaiImg, caption: "那霸國際通。越夜，越精彩。" }];
    if (day === 2) return [{ img: aquaImg, caption: "DMM Kariyushi水族館。深海的新視界。" }];
    if (day === 3) return [
      { img: busenaImg, caption: "部瀨名海中公園。探索沖繩的深藍色大海。" },
      { img: churaumiImg, caption: "美麗海水族館。世界級水槽的視覺震撼。" }
    ];
    if (day === 4) return [{ img: manzamoImg, caption: "萬座毛。絕美日落，隨時定格。" }];
    if (day === 5) return [{ img: dolphinImg, caption: "本部元氣村。與海洋之心的親密接觸。" }];
    if (day === 7) return [{ img: gyokusendoImg, caption: "玉泉洞。探索地底的神秘世界。" }];
    return [];
  }

  const getRecommendedFoodsForDay = (day: number) => {
    if (day === 2) return [foodData.find(f => f.id === 'onigiri')];
    if (day === 4) return [foodData.find(f => f.id === 'sushi')];
    if (day === 5) return [foodData.find(f => f.id === 'soba'), foodData.find(f => f.id === 'kajinhou')];
    if (day === 7) return [foodData.find(f => f.id === 'fisher_dining')];
    return [];
  }

  const renderFoodCard = (food: any) => {
    if (!food) return null;
    return (
      <div
        class={`reveal food-card ${food.needsBooking && !food.booked ? 'needs-booking' : ''}`}
      >
        <div class="food-card-image-wrapper">
          <img src={foodImages[food.id]} alt={food.name} />
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
        <img src={heroImg} alt="Okinawa Pristine Beach" class="hero-bg" />
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
              <img src={tokyuImg} alt="Tokyu Stay Naha" class="card-bg" />
              <div class="large-number-bg">01</div>
              <div class="accommodation-overlay">
                <h3 style="font-size: clamp(24px, 4vw, 32px); font-weight:700; color:#fff; line-height:1.1; margin-bottom: 0;">
                  東急 Stay 那霸。
                </h3>
              </div>
            </div>

            {/* GLANZ */}
            <div class="accommodation-card reveal col-span-8" style="min-height: 500px;">
              <img src={villaImg} alt="Reflexion Villas GLANZ" class="card-bg" />
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
                <img src={kokoniImg} alt="Kokoni Chill House" class="split-img" />
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
                  兩輛 Toyota Sienta Hybrid。結合極致寧靜與現代主動安全科技，為全家人提供最順滑、放心的移動體驗。
                </p>
              </div>

              <div class="vehicle-specs">
                <div class="spec-item">
                  <div class="spec-value" style="font-size: 32px; font-weight: 700;">Safety 3.0</div>
                </div>
                <div class="spec-item">
                  <div class="spec-value" style="font-size: 32px; font-weight: 700;">Hybrid Power</div>
                </div>
              </div>
            </div>

            <div class="vehicle-visual">
              <div class="car-wrapper car-float">
                <img src={sientaImg} alt="Toyota Sienta Hybrid" class="car-hero-img" />
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
            const photoHighlights = getImagesForDay(day.day);

            return (
              <div class="timeline-item" key={day.day}>
                <div class="day-header reveal">
                  <div class="day-intensity" style="font-size: clamp(40px, 10vw, 80px); font-weight: 800; line-height: 1; letter-spacing: -0.04em;">
                    DAY {day.day}.
                  </div>
                  <div class="day-title-massive">DAY {day.day}.</div>
                </div>

                <div class="day-spine"></div>

                <div style="position:relative; z-index:2;">
                  <h3 class="reveal day-title-text" style="font-size: clamp(24px, 5vw, 32px); font-weight:600; margin-bottom: 48px; color:var(--text-main);">{day.title}。</h3>

                  {photoHighlights.map((photo: any, i: number) => (
                    <div class={`photo-highlight reveal reveal-delay-${(i % 2) + 1}`} key={i} style={{ marginBottom: '64px', marginLeft: '0px' }}>
                      <img src={photo.img} alt={photo.caption} />
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
                              <div class="event-title" style={evt.isFood ? { color: '#ff9f0a' } : {}}>
                                {evt.title}
                                {evt.booked && <span class="timeline-badge booked-badge">已預約</span>}
                                {evt.needsBooking && !evt.booked && <span class="timeline-badge needs-booking-badge">需提早預約</span>}
                              </div>
                              {evt.subtitle && <div class="event-subtitle">{evt.subtitle}</div>}
                            </div>
                          </div>
                          {evt.isFood && (() => {
                            const match = foodData.find(f => f.name === evt.title || f.name === evt.title.replace(' · ', ' ') || evt.title.includes(f.name.split(' ')[0]));
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

                  {(() => {
                    const recommended = getRecommendedFoodsForDay(day.day);
                    if (recommended.length === 0 || !recommended[0]) return null;
                    return (
                      <div class="reveal day-title-text" style={{ marginTop: '48px' }}>
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', paddingRight: '24px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.05em' }}>
                            <span style={{ fontSize: '22px' }}>🍽️</span> 當區推薦美食
                          </h4>
                          <div class="grid">
                            {recommended.map((food, idx) => (
                              <div class="col-span-12" key={idx}>
                                {renderFoodCard(food)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
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
            <h2 class="section-title" style="font-size: clamp(32px, 6vw, 48px); margin-bottom: 32px; color: var(--primary-dark);">不只是旅行</h2>
            <p class="section-body" style="font-size: clamp(18px, 3vw, 24px); line-height: 1.8; color: var(--text-secondary); font-weight: 300;">
              留住海風。<br />
              收藏最溫暖的記憶。<br />
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
