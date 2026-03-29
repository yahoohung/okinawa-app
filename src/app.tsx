import { useEffect } from 'preact/hooks'
import './index.css'

// Hero & Feature Images
import heroImg from './assets/hero.png'
import aquariumImg from './assets/aquarium.png'
import manzamoImg from './assets/manzamo.png'
import sientaImg from './assets/sienta.png'
import dolphinImg from './assets/dolphin.png'
import kokusaiImg from './assets/kokusai.png'

// Hotel Images
import tokyuImg from './assets/tokyu.png'
import kokoniImg from './assets/kokoni.png'
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
  pizza: lobsterImg // fallback visually impressive image
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

  const getImageForDay = (day: number) => {
    if (day === 1) return { img: kokusaiImg, caption: "那霸國際通。越夜，越精彩。" };
    if (day === 2) return { img: aquariumImg, caption: "DMM Kariyushi水族館。深海的新視界。" };
    if (day === 4) return { img: manzamoImg, caption: "萬座毛。絕美日落，隨時定格。" };
    if (day === 5) return { img: dolphinImg, caption: "本部元氣村。與海洋之心的親密接觸。" };
    return null;
  }

  return (
    <div class="app-wrapper">
      <nav class="global-nav">
        <a href="#overview">總覽</a>
        <a href="#accommodations">頂級住宿</a>
        <a href="#itinerary">絕美行程</a>
        <a href="#food">頂級評鑑</a>
      </nav>

      <div class="local-nav">
        <div class="local-nav-title">Okinawa 2026.</div>
      </div>

      <header class="hero">
        <img src={heroImg} alt="Okinawa Pristine Beach" class="hero-bg" />
        <div class="hero-content">
          <h1 class="hero-headline">Okinawa 2026.</h1>
          <h2 class="hero-subheadline">每一刻，都精彩絕倫。</h2>
          <div class="hero-cta">
            <a href="#overview" class="btn btn-primary" style="text-decoration: none; font-size:17px; padding:12px 24px;">深入探究</a>
          </div>
        </div>
      </header>

      <main>
        {/* Overview Section */}
        <section id="overview" class="section reveal">
          <div class="text-center">
            <h2 class="section-title">極致的放鬆。<br/>前所未見的享受。</h2>
            <p class="section-body text-center" style="margin-bottom:120px;">
              我們將 8 天 7 夜的旅程，打磨至完美。從那霸街頭的繁華，到北部深海的靜謐。一切為全家人量身定做。這，就是極致的假期體驗。
            </p>
          </div>

          <div class="grid" id="accommodations">
            <h3 class="section-title reveal text-center col-span-2" style="font-size:48px; margin-bottom:40px;">三大頂級住宿。<br/>全然沉浸。</h3>

            {/* Tokyu Stay */}
            <div class="bento-card reveal col-span-2" style="padding:0; overflow:hidden; position:relative; background:#000;">
              <img src={tokyuImg} alt="Tokyu Stay Naha" style="width:100%; height:450px; object-fit:cover; opacity:0.85; filter:brightness(0.9);" />
              <div style="position:absolute; bottom:0; left:0; width:100%; padding:48px; background:linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);">
                <h3 style="font-size:36px; font-weight:600; margin-bottom:12px; color:#f5f5f7;">
                  東急 Stay 那霸。<br/>
                  <span style="font-size:24px; color:var(--text-secondary); font-weight:500;">Tokyu Stay Okinawa Naha</span>
                </h3>
                <p style="font-size:17px; color:#e5e5ea; line-height:1.47; max-width:600px;">
                  那霸市區的完美起點。為城市探索奠定基礎。
                </p>
              </div>
            </div>

            {/* GLANZ */}
            <div class="bento-card reveal col-span-2" style="padding:0; overflow:hidden; position:relative; background:#000;">
              <img src={villaImg} alt="Reflexion Villas GLANZ" style="width:100%; height:450px; object-fit:cover; opacity:0.85; filter:brightness(0.9);" />
              <div style="position:absolute; bottom:0; left:0; width:100%; padding:48px; background:linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);">
                <h3 style="font-size:36px; font-weight:600; margin-bottom:12px; color:#f5f5f7;">
                  琉池名護奢華別墅。<br/>
                  <span style="font-size:24px; color:var(--text-secondary); font-weight:500;">Reflexion Villas GLANZ</span>
                </h3>
                <p style="font-size:17px; color:#e5e5ea; line-height:1.47; max-width:600px;">
                  極盡奢華。北部名護的專屬無邊際泳池 Villa。
                </p>
              </div>
            </div>

            {/* Kokoni */}
            <div class="bento-card reveal col-span-2" style="padding:0; overflow:hidden; position:relative; background:#000; margin-bottom:80px;">
              <img src={kokoniImg} alt="Kokoni Chill House" style="width:100%; height:450px; object-fit:cover; opacity:0.85; filter:brightness(0.9);" />
              <div style="position:absolute; bottom:0; left:0; width:100%; padding:48px; background:linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);">
                <h3 style="font-size:36px; font-weight:600; margin-bottom:12px; color:#f5f5f7;">
                  恩納村可可尼之殿。<br/>
                  <span style="font-size:24px; color:var(--text-secondary); font-weight:500;">Kokoni Chill House</span>
                </h3>
                <p style="font-size:17px; color:#e5e5ea; line-height:1.47; max-width:600px;">
                  連續 5 晚的寧靜舒適大本營。不奔波，只專注於放鬆。
                </p>
              </div>
            </div>
            
            {/* Cars */}
            <div class="bento-card reveal col-span-2" style="padding:0; overflow:hidden; position:relative; background:#000;">
              <img src={sientaImg} alt="Toyota Sienta Hybrid" style="width:100%; height:500px; object-fit:cover; opacity:0.9;" />
              <div style="position:absolute; top:48px; left:48px; max-width:500px;">
                <h3 style="font-size:36px; font-weight:600; margin-bottom:12px; color:#f5f5f7;">雙車編制。動力全開。</h3>
                <p style="font-size:17px; color:rgba(255,255,255,0.8); line-height:1.47;">
                  Toyota Sienta Hybrid 7座 × 2 輛。<br/>雙線並行，為全家人打造寧靜且餘裕十足的移動體驗。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Itinerary Section */}
        <section id="itinerary" class="timeline">
          <h2 class="section-title reveal text-center" style="margin-bottom:120px;">
            8 天 7 夜。<br/>每一天，都是最高傑作。
          </h2>

          {itineraryData.map((day) => {
            const photoHighlight = getImageForDay(day.day);

            return (
              <div class="timeline-item" key={day.day}>
                <div class="day-header reveal">
                  <div class="day-intensity">
                    {day.date}
                    <span class={`intensity-badge ${day.intensity}`}>{day.intensity}</span>
                  </div>
                  <div class="day-title-massive">DAY {day.day}.</div>
                </div>

                <div class="bento-card reveal">
                  <h3 style="font-size:32px; font-weight:600; margin-bottom:48px; color:#f5f5f7;">{day.title}。</h3>
                  
                  {photoHighlight && (
                    <div class="photo-highlight reveal" style={{ marginBottom: '48px' }}>
                      <img src={photoHighlight.img} alt={photoHighlight.caption} />
                      <div class="photo-caption">{photoHighlight.caption}</div>
                    </div>
                  )}

                  <div style="display:flex; flex-direction:column; position: relative;">
                    {day.events.map((evt: any, i: number) => {
                      if (evt.transit) {
                        return (
                          <div key={i} style="display:flex; align-items:center; margin-top:-8px; margin-bottom:24px; padding-left:14px; position:relative;">
                            <div style="position:absolute; top:-24px; bottom:-24px; left:21px; width:2px; background-image: linear-gradient(to bottom, rgba(255,255,255,0.15) 50%, transparent 50%); background-size: 2px 10px; background-repeat: repeat-y;"></div>
                            <div style="background:var(--card-bg); z-index:2; display:flex; gap:12px; align-items:center; color:var(--text-secondary); padding:8px 0;">
                              <span style="font-size:15px; opacity:0.9;">{evt.transit.mode === 'car' ? '🚗' : evt.transit.mode === 'walk' ? '🚶🏻‍♂️' : '🚆'}</span>
                              <span style="font-size:14px; font-weight:500; letter-spacing:-0.01em;">{evt.transit.label} <span style="opacity:0.6; margin-left:4px;">{evt.transit.time}</span></span>
                            </div>
                          </div>
                        )
                      }
                      
                      const isLast = i === day.events.length - 1 || (day.events[i+1] && day.events[i+1].transit);
                      
                      return (
                        <div class="event-row" key={i} style={isLast ? { borderBottom: 'none', marginBottom: 24, paddingBottom: 0 } : { marginBottom: 32, paddingBottom: 32 }}>
                          <div class="event-time" style={{ color: evt.isFood ? '#ff9f0a' : 'var(--text-secondary)' }}>
                            {evt.time}
                          </div>
                          <div>
                            <div class="event-title" style={{ color: evt.isFood ? '#ff9f0a' : 'var(--text-main)' }}>
                              {evt.title}
                            </div>
                            {evt.subtitle && <div class="event-subtitle">{evt.subtitle}</div>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Food Guide Section */}
        <section id="food" class="section" style="padding-top:0;">
          <h2 class="section-title reveal text-center" style="margin-bottom:80px;">
            舌尖上的震撼。<br/>A5 和牛與深海鮮甜。
          </h2>
          
          <div class="photo-highlight reveal" style="margin-bottom: 80px; aspect-ratio:21/9;">
            <img src={wagyuImg} alt="頂級和牛" />
            <div class="photo-caption" style="padding-top:120px;">琉球の牛 — 奢華，在你口中融化。</div>
          </div>

          <div class="grid">
            {foodData.map((food, idx) => (
              <div 
                class="bento-card reveal col-span-2" 
                key={idx} 
                style={`padding:0; overflow:hidden; position:relative; background:#000; border: ${food.booked ? '1px solid rgba(255, 159, 10, 0.4)' : '1px solid var(--border-color)'}`}
              >
                <img src={foodImages[food.id]} alt={food.name} style="width:100%; height:450px; object-fit:cover; opacity:0.85;" />
                <div style="position:absolute; bottom:0; left:0; width:100%; padding:48px; background:linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);">
                  <div class="food-type" style={food.booked ? { color: '#ff9f0a' } : {}}>{food.type}</div>
                  <h3 class="food-name" style={`margin-bottom:12px; ${food.booked ? 'font-size:40px; color:#ff9f0a;' : 'font-size:36px;'}`}>{food.name}。</h3>
                  <p class="food-desc" style="margin-bottom:24px; max-width:600px; color:#e5e5ea;">{food.desc}</p>
                  <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:15px; color:var(--text-secondary); background:rgba(255,255,255,0.15); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); padding:12px 16px; border-radius:12px; display:inline-block; color:#fff; font-weight:500;">
                      {food.note}
                    </div>
                    {food.booked && <div style="color:#000; font-size:15px; font-weight:600; padding:12px 24px; background:#ff9f0a; border-radius:99px;">已成功預約</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer style="text-align:center; padding: 120px 0; color:var(--text-tertiary); font-size:12px; border-top: 1px solid var(--border-color); margin-top:120px; font-weight:500;">
        <p>Okinawa Family Trip 2026. Designed with perfection in mind.</p>
        <p style="margin-top:8px;">Copyright © 2026. All rights reserved.</p>
      </footer>
    </div>
  )
}
