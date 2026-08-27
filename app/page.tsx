import LandcasterAreaIntelligence from '../components/LandcasterAreaIntelligence'
import LandcasterBuyVsRent from '../components/LandcasterBuyVsRent'
import LandcasterFairValueV2 from '../components/LandcasterFairValueV2'
import LandcasterFundamentalsV2 from '../components/LandcasterFundamentalsV2'
import LandcasterWorkspace from '../components/LandcasterWorkspace'
import MotionSurface from '../components/MotionSurface'

const layers = [
  { label: 'Market', title: 'Alueiden hintakehitys', text: 'Postinumeroalueiden toteutuneet hinnat, kauppamäärät, trendit ja likviditeetti koko Suomessa.' },
  { label: 'Fundamentals', title: 'Alueen elinvoima', text: 'Paavo tuo mukaan väestörakenteen, mediaanitulot ja työmarkkinan, jotta markkinahinta ei jää ainoaksi signaaliksi.' },
  { label: 'Property', title: 'Kohteen riskikorjattu arvo', text: 'Pyyntihinta, alueen toteutunut hintataso, kunto, yhtiölaina, tiedossa olevat remontit ja vastikkeet samassa näkymässä.' },
  { label: 'Finance', title: 'Laina + ASP', text: 'Omarahoitus, ASP-korkotukikatto, kuukausierä, korkostressi ja todellinen asumiskustannus samassa näkymässä.' },
  { label: 'Decision', title: 'Osta, vuokraa vai odota?', text: 'Skenaariot huomioivat sivukulut, myyntiarvon, jäljellä olevan velan, vuokran kehityksen ja omistusajan.' },
]

export default function Home() {
  return (
    <main className="home-page">
      <header className="caster-nav-v2">
        <a href="#top" className="caster-nav-brand"><span className="caster-nav-mark">L</span><span>Landcaster</span></a>
        <nav className="caster-nav-links" aria-label="Landcaster navigation">
          <a href="#area-intelligence">Market</a>
          <a href="#area-score-v2">Area V2</a>
          <a href="#fair-value-v2">Fair Value</a>
          <a href="#plan">Finance</a>
          <a href="#buy-vs-rent">Decision</a>
        </nav>
        <a className="caster-nav-action" href="#area-score-v2">Analysoi</a>
      </header>

      <section className="home-hero" id="top">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Landcaster · Finland Housing Intelligence</p>
          <h1 className="home-title">Landcaster</h1>
          <h2 className="home-subtitle">Asuntomarkkina, alue, kohde ja rahoitus yhdessä päätöksessä.</h2>
          <p className="home-lead">Itsenäinen asuntojen päätösalusta. Tilastokeskuksen markkinadata, Area Score V2, Fair Value V2, ASP, lainat ja osta-vs-vuokraa samassa tuotteessa.</p>
          <div className="home-actions">
            <a className="primary-button" href="#area-score-v2">Avaa Area Score V2</a>
            <a className="secondary-button" href="#fair-value-v2">Arvioi kohde</a>
          </div>
        </div>
      </section>

      <LandcasterAreaIntelligence />
      <LandcasterFundamentalsV2 />
      <LandcasterFairValueV2 />
      <div id="plan"><LandcasterWorkspace /></div>
      <LandcasterBuyVsRent />

      <section className="home-section" id="roadmap">
        <div className="home-container">
          <p className="section-label">Decision Stack</p>
          <h2 className="section-title">Viisi kerrosta ennen BUY / WAIT / RENT / BUILD -päätöstä.</h2>
          <div className="home-module-grid">
            {layers.map((layer) => (
              <MotionSurface key={layer.label} className="home-module-card">
                <p className="home-module-label">{layer.label}</p>
                <h3 className="home-module-title">{layer.title}</h3>
                <p className="home-module-text">{layer.text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Independent Data Layer</p>
          <h2 className="section-title">Landcaster ei tarvitse CasterHubia toimiakseen.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Tilastokeskus · 13mt</p><p className="home-card-text">Toteutuneet vanhojen osakeasuntojen hinnat ja kauppamäärät.</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Tilastokeskus · Paavo</p><p className="home-card-text">Väestö-, tulo- ja työmarkkinafundamentals postinumeroalueille.</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Landcaster Engine</p><p className="home-card-text">ASP, lainat, Fair Value ja Buy vs Rent ovat omassa laskentakerroksessa.</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Dedicated API</p><p className="home-card-text">Landcasterin API-reitit kulkevat omassa sovelluksessa ilman Caster OS -riippuvuutta.</p></MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">Standalone Landcaster</p>
          <h2 className="final-title">Seuraavaksi oma repository, oma Vercel-projekti ja myöhemmin oma Supabase.</h2>
          <p className="home-final-text">Tämä koodipuu on tarkoituksella irrotettu CasterHubin muista sovelluksista ja sisältää vain Landcasterin tuotekerroksen.</p>
          <a className="primary-button home-final-button" href="#area-score-v2">Aloita analyysi</a>
        </div>
      </section>
    </main>
  )
}
