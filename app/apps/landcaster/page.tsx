import LandcasterAreaIntelligence from '../../../components/LandcasterAreaIntelligence'
import LandcasterBuyVsRent from '../../../components/LandcasterBuyVsRent'
import LandcasterFairValueV2 from '../../../components/LandcasterFairValueV2'
import LandcasterFundamentalsV2 from '../../../components/LandcasterFundamentalsV2'
import LandcasterWorkspace from '../../../components/LandcasterWorkspace'
import MotionSurface from '../../../components/MotionSurface'

const layers = [
  {
    label: 'Market',
    title: 'Alueiden hintakehitys',
    text: 'Postinumeroalueiden toteutuneet hinnat, kauppamäärät, trendit ja likviditeetti koko Suomessa.',
  },
  {
    label: 'Fundamentals',
    title: 'Alueen elinvoima',
    text: 'Paavo tuo mukaan väestörakenteen, mediaanitulot ja työmarkkinan, jotta markkinahinta ei jää ainoaksi signaaliksi.',
  },
  {
    label: 'Property',
    title: 'Kohteen riskikorjattu arvo',
    text: 'Pyyntihinta, alueen toteutunut hintataso, kunto, yhtiölaina, tiedossa olevat remontit ja vastikkeet samassa näkymässä.',
  },
  {
    label: 'Finance',
    title: 'Laina + ASP',
    text: 'Omarahoitus, ASP-korkotukikatto, kuukausierä, korkostressi ja todellinen asumiskustannus samassa näkymässä.',
  },
  {
    label: 'Decision',
    title: 'Osta, vuokraa vai odota?',
    text: 'Skenaariot huomioivat sivukulut, myyntiarvon, jäljellä olevan velan, vuokran kehityksen ja omistusajan.',
  },
]

export default function LandcasterPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Landcaster · Finland Housing Intelligence</p>
          <h1 className="home-title">Landcaster</h1>
          <h2 className="home-subtitle">Asuntomarkkina, alue, kohde ja rahoitus yhdessä päätöksessä.</h2>
          <p className="home-lead">
            Landcaster yhdistää nyt Tilastokeskuksen toteutuneet asuntohinnat, Area Score V2:n Paavo-fundamentalsit, Fair Value V2:n kohderiskit, ASP- ja lainalaskennan sekä osta-vs-vuokraa-skenaarion yhdeksi päätöskerrokseksi.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#area-score-v2">Avaa Area Score V2</a>
            <a className="secondary-button" href="#fair-value-v2">Arvioi kohde</a>
          </div>
        </div>
      </section>

      <LandcasterAreaIntelligence />
      <LandcasterFundamentalsV2 />
      <LandcasterFairValueV2 />

      <div id="plan">
        <LandcasterWorkspace />
      </div>

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
          <p className="section-label">Finland Data Layer</p>
          <h2 className="section-title">Virallinen data ensin, mallinnus vasta sen päälle.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Tilastokeskus · 13mt</p>
              <p className="home-card-text">Postinumeroalueiden toteutuneet vanhojen osakeasuntojen neliöhinnat ja kauppamäärät neljännesvuosittain. Area Score V1:n markkinakerros käyttää tätä.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Tilastokeskus · Paavo</p>
              <p className="home-card-text">V2 käyttää nyt 1 700+ postinumeroalueen väestö-, tulo- ja työmarkkinadataa. Pisteytys säilyttää lähdevuoden ja postinumeroalueluokituksen caveatit näkyvinä.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Maanmittauslaitos</p>
              <p className="home-card-text">Kiinteistökauppojen tarkempi vertailukauppakerros on luvan- ja sopimuksenvarainen. Landcaster ei esitä lisensoitua dataa avoimena datana.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Valtiokonttori + Suomen Pankki</p>
              <p className="home-card-text">ASP-säännöt ovat versionoituina. Seuraava rahoituskerros tuo Suomen Pankin korkosarjat ja pankkikohtaisten tarjousten vertailurakenteen.</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">MVP 0.3 · Fundamentals + Property Risk</p>
          <h2 className="final-title">Seuraava iso kerros: vertailukaupat, korkodata ja oma päätösmoottori.</h2>
          <p className="home-final-text">Area Score V2 erottaa markkinan ja alueen perustekijät. Fair Value V2 erottaa velattoman arvon, yhtiölainan ja tiedossa olevan remonttiriskin. Seuraavaksi Landcaster voi siirtyä kohdekohtaisiin vertailukauppoihin ja BUY / WAIT / RENT / BUILD -suosituksen evidenssikerrokseen.</p>
          <a className="primary-button home-final-button" href="#area-score-v2">Aloita V2-analyysi</a>
        </div>
      </section>
    </main>
  )
}
