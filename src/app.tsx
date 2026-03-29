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
        class="reveal"
        style={{
          marginTop: '24px',
          background: '#fff',
          borderRadius: '24px',
          border: food.needsBooking && !food.booked ? '2px solid rgba(255, 159, 10, 0.6)' : '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ height: '220px', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={foodImages[food.id]} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ color: food.needsBooking && !food.booked ? '#e68a00' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '6px' }}>{food.type}</div>
          <h3 style={{ marginBottom: '8px', lineHeight: 1.2, fontSize: 'clamp(20px, 4vw, 24px)', color: 'var(--text-main)', fontWeight: 800, letterSpacing: '-0.02em' }}>{food.name}</h3>
          <p style={{ marginBottom: '24px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{food.desc}</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-main)', background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '99px', fontWeight: 600 }}>
              {food.note}
            </div>
            {food.booked ? (
              <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700, padding: '6px 16px', background: '#30d158', borderRadius: '99px', boxShadow: '0 4px 12px rgba(48,209,88,0.3)' }}>已預約</div>
            ) : food.needsBooking ? (
              <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700, padding: '6px 16px', background: '#ff9f0a', borderRadius: '99px', boxShadow: '0 4px 12px rgba(255,159,10,0.3)' }}>需提早預約</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="app-wrapper">
      <nav class="global-nav">
        <div class="local-nav-title">Okinawa 2026.</div>
        <div class="nav-links">
          <a href="#itinerary">絕美行程</a>
          <a href="#food">美食評鑑</a>
        </div>
      </nav>

      <header class="hero">
        <img src={heroImg} alt="Okinawa Pristine Beach" class="hero-bg" />
        <div class="hero-content">
          <h1 class="hero-headline">Okinawa 2026.</h1>
          <h2 class="hero-subheadline">每一刻，都精彩絕倫。</h2>
          <div class="hero-cta">
            <a href="#itinerary" class="btn btn-primary" style="text-decoration: none; font-size:17px; padding:12px 24px;">深入探究</a>
          </div>
        </div>
      </header>

      <main>
        {/* Overview Section */}
        <section id="overview" class="section reveal">
          <div class="text-center">
            <h2 class="section-title">極致的放鬆。<br />前所未見的享受。</h2>
            <p class="section-body text-center" style="margin-bottom: var(--section-padding);">
              我們將 8 天 7 夜的旅程，打磨至完美。從那霸街頭的繁華，到北部深海的靜謐。一切為全家人量身定做。這，就是極致的假期體驗。
            </p>
          </div>

          <div class="grid" id="accommodations" style="margin-bottom: 80px;">
            <div class="col-span-12">
              <h3 class="section-title reveal" style="font-size: clamp(32px, 6vw, 48px); margin-bottom:48px;">三大頂級住宿。<br />全然沉浸。</h3>
            </div>

            {/* Tokyu Stay - The Urban Pearl */}
            <div class="accommodation-card reveal col-span-4" style="min-height: 500px;">
              <img src={tokyuImg} alt="Tokyu Stay Naha" class="card-bg" />
              <div class="large-number-bg">01</div>
              <div class="accommodation-overlay">
                <div style="margin-bottom: 16px;">
                  <span class="glass-chip">那霸市中心</span>
                </div>
                <h3 style="font-size: clamp(22px, 3.5vw, 28px); font-weight:700; color:#fff; line-height:1.2; margin-bottom:12px;">
                  東急 Stay 那霸。
                </h3>
                <p style="font-size: 14px; color:rgba(255,255,255,0.6); max-width: 200px;">
                  與國際通近在咫尺。為你的沖繩之行開啟最完美的都市篇章。
                </p>
              </div>
            </div>

            {/* GLANZ - The Star */}
            <div class="accommodation-card reveal col-span-8" style="min-height: 500px;">
              <img src={villaImg} alt="Reflexion Villas GLANZ" class="card-bg" />
              <div class="large-number-bg">02</div>
              <div class="accommodation-overlay">
                <div style="margin-bottom: 16px; display: flex; gap: 8px;">
                  <span class="glass-chip">名護市</span>
                  <span class="glass-chip">Luxury Villa</span>
                </div>
                <h3 style="font-size: clamp(28px, 5vw, 42px); font-weight:700; color:#fff; line-height:1.1; margin-bottom:12px;">
                  琉池名護奢華別墅。
                </h3>
                <p style="font-size: 16px; color:rgba(255,255,255,0.7); font-weight:500; letter-spacing:0.02em; margin-bottom:16px;">Reflexion Villas GLANZ</p>
                <p style="font-size: 14px; color:rgba(255,255,255,0.5); line-height:1.5; max-width:440px;">
                  這不只是住宿，而是在沖繩北部的私密領地。無邊際泳池與森林環繞，享受絕對的寧靜。
                </p>
              </div>
            </div>

            {/* Kokoni - The Home Foundation - REFINED SPLIT LAYOUT */}
            <div class="accommodation-card accommodation-split reveal col-span-12">
              <div class="split-img-container">
                <img src={kokoniImg} alt="Kokoni Chill House" class="split-img" />
              </div>
              <div class="split-content">
                <div class="large-number-bg" style="top: auto; bottom: -20px;">03</div>
                <div style="margin-bottom: 24px;">
                  <span class="glass-chip" style="background:rgba(41, 151, 255, 0.2); border-color:rgba(41, 151, 255, 0.3);">核心據點</span>
                  <span class="glass-chip">連續 5 晚</span>
                </div>
                <h3 style="font-size: clamp(28px, 5vw, 40px); font-weight:700; color:var(--text-main); line-height:1.1; margin-bottom:16px;">恩納村<br />可可尼之殿。
                </h3>
                <p style="font-size: 16px; color:var(--text-secondary); line-height:1.6; margin-bottom:32px; max-width:350px;">
                  Kokoni Chill House。位於沖繩正中央的家。避免搬遷的疲憊，讓旅行回歸放鬆本質。
                </p>
                <div style="border-top:1px solid var(--border-color); padding-top:24px; font-size:12px; color:var(--text-tertiary); font-weight:700; letter-spacing:0.1em;">
                  FAMILY BASE · COMFORT STAY
                </div>
              </div>
            </div>

            {/* Vehicles - The Movement */}
            <div class="accommodation-card accommodation-split reveal col-span-12" style="min-height: 320px !important;">
              <div class="split-content" style="border-left: none; border-right: 1px solid var(--border-color);">
                <h3 style="font-size: clamp(24px, 5vw, 36px); font-weight:700; color:var(--text-main); margin-bottom:16px;">雙車編制。動力全開。</h3>
                <p style="font-size: 16px; color:var(--text-secondary); max-width:360px;">
                  兩輛 Toyota Sienta Hybrid。為家人提供最寧靜、順滑的移動體驗。
                </p>
              </div>
              <div class="split-img-container" style="overflow: visible;">
                <div class="car-slide car-float">
                  <img src={sientaImg} alt="Toyota Sienta Hybrid" class="split-img" style="object-position: center 30%;" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Itinerary Section */}
        <section id="itinerary" class="timeline">
          <h2 class="section-title reveal text-center" style="margin-bottom: var(--section-padding);">
            8 天 7 夜。<br />每一天，都是最高傑作。
          </h2>

          {itineraryData.map((day) => {
            const photoHighlights = getImagesForDay(day.day);

            return (
              <div class="timeline-item" key={day.day}>
                <div class="day-header reveal">
                  <div class="day-intensity">
                    {day.date}
                    <span class={`intensity-badge ${day.intensity}`}>{day.intensity}</span>
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
        </section>
        {/* Food Evaluation Section */}
        <section id="food" class="section reveal" style={{ paddingTop: '0' }}>
          <div class="text-center">
            <h2 class="section-title">美食評鑑。<br />舌尖上的沖繩。</h2>
            <p class="section-body text-center" style="margin-bottom: var(--section-padding);">
              從頂級和牛到地道小食，我們精選了 10 家最值得收藏的餐廳。不只是味覺的享受，更是旅程中不可磨滅的記憶。
            </p>
          </div>
          <div class="grid">
            {foodData.map((food) => (
              <div class="col-span-6" key={food.id}>
                {renderFoodCard(food)}
              </div>
            ))}
          </div>
        </section>
        {/* End of Timeline */}
      </main>

      <footer style="text-align:center; padding: 120px 0; color:var(--text-tertiary); font-size:12px; border-top: 1px solid var(--border-color); margin-top:80px; font-weight:500;">
        <p>Okinawa Family Trip 2026. Designed with perfection.</p>
        <p style="margin-top:8px;">Copyright © 2026. All rights reserved.</p>
      </footer>
    </div>
  )
}
