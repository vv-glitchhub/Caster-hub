import LandcasterAreaIntelligence from '../../../components/LandcasterAreaIntelligence'
import LandcasterBuyVsRent from '../../../components/LandcasterBuyVsRent'
import LandcasterWorkspace from '../../../components/LandcasterWorkspace'
import MotionSurface from '../../../components/MotionSurface'

const layers = [
  {
    label: 'Market',
    title: 'Alueiden hintakehitys',
    text: 'Kunta- ja postinumeroalueiden toteutuneet hinnat, kauppamäärät, trendit ja likviditeetti koko Suomessa.',
  },
  {
    label: 'Property',
    title: 'Kohteen käypä arvo',
    text: 'Pyyntihinta vastaan alueen toteutunut hintataso, pinta-ala, kunto ja myöhemmin tarkemmat kohdekohtaiset vertailutekijät.',
  },
  {
    label: 'Finance',
    title: 'Laina + ASP',
    text: 'Omarahoitus, ASP-korkotukikatto, kuukausierä, korkostressi ja todellinen asumiskustannus samassa näkymässä.',
  },
  {
    label: 'Decision',
    title: 'Osta, vuokraa vai odota?',
    text: 'Skenaariot, joissa huomioidaan myös sivukulut, myyntiarvo, jäljellä oleva velka, vuokran kehitys ja omistusaika.',
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
            Landcaster kattaa nyt ASP- ja lainalaskennan lisäksi Tilastokeskuksen postinumeroaluekohtaisen markkinadatan, Area Score V1:n, Fair Value V1:n, koko Suomen aluevertailun ja osta-vs-vuokraa-skenaarion.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#area-intelligence">Analysoi alue</a>
            <a className="secondary-button" href="#plan">Avaa oma suunnitelma</a>
          </div>
        </div>
      </section>

      <LandcasterAreaIntelligence />

      <div id="plan">
        <LandcasterWorkspace />
      </div>

      <LandcasterBuyVsRent />

      <section className="home-section" id="roadmap">
        <div className="home-container">
          <p className="section-label">Decision Stack</p>
          <h2 className="section-title">Neljä kerrosta ennen BUY / WAIT / RENT / BUILD -päätöstä.</h2>
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
              <p className="home-card-text">Postinumeroalueiden toteutuneet vanhojen osakeasuntojen neliöhinnat ja kauppamäärät neljännesvuosittain. Landcasterin live-aluehaku ja ranking käyttävät tätä nyt.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Paavo</p>
              <p className="home-card-text">Seuraava Area Score -laajennus tuo väestön, tulot, työpaikat, koulutuksen ja asumisrakenteen postinumeroalueelle.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Maanmittauslaitos</p>
              <p className="home-card-text">Kiinteistökauppojen tarkempi vertailukauppakerros on luvan- ja sopimuksenvarainen. Arkkitehtuuri on valmisteltu, mutta Landcaster ei teeskentele luvanvaraista dataa avoimeksi dataksi.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Valtiokonttori + Suomen Pankki</p>
              <p className="home-card-text">ASP-säännöt on versionoitu 1.6.2026 voimaan tulleiden ehtojen mukaan. Korkokerros voidaan seuraavaksi kytkeä Suomen Pankin ajantasaiseen lainakorkodataan.</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">MVP 0.2 · Area Intelligence</p>
          <h2 className="final-title">Seuraava laatuhyppy: Paavo + kohdekohtaiset vertailutekijät.</h2>
          <p className="home-final-text">Area Score V1 käyttää nyt markkinadataa läpinäkyvästi. Seuraava versio nostaa pisteytyksen markkinapisteestä oikeaksi alueen elinvoima- ja kysyntämalliksi ja vie Fair Value -mallin kohti kohdekohtaista arviota.</p>
          <a className="primary-button home-final-button" href="#area-intelligence">Aloita alueanalyysi</a>
        </div>
      </section>
    </main>
  )
}
