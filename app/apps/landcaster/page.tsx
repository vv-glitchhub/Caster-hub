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
    text: 'Pyyntihinta vastaan vertailukaupat, rakennusvuosi, pinta-ala, tontti, kunto, energia ja remonttivelka.',
  },
  {
    label: 'Finance',
    title: 'Laina + ASP',
    text: 'Omarahoitus, ASP-korkotukikatto, kuukausierä, korkostressi ja todellinen asumiskustannus samassa näkymässä.',
  },
  {
    label: 'Decision',
    title: 'Osta, vuokraa vai rakenna?',
    text: 'Skenaariot, joissa huomioidaan myös sivukulut, vaihtoehtoiskustannus, rakentamisen riskit ja omistusaika.',
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
            Landcaster rakentuu koko Suomen kattavaksi asunnonostamisen päätöksenteon alustaksi. Ensimmäinen toimiva MVP laskee ASP-ostovalmiuden, lainan kuukausierän, 6 % korkostressin ja omakotitalon todellisen kuukausikustannuksen.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#plan">Avaa laskuri</a>
            <a className="secondary-button" href="#roadmap">Katso data-arkkitehtuuri</a>
          </div>
        </div>
      </section>

      <div id="plan">
        <LandcasterWorkspace />
      </div>

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
          <h2 className="section-title">V1 rakennetaan virallisen datan varaan.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Maanmittauslaitos</p>
              <p className="home-card-text">Kiinteistökauppojen toteutuneet hinnat, alueelliset kauppamäärät ja myöhemmin tarkempi vertailukauppakerros.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Tilastokeskus</p>
              <p className="home-card-text">Postinumeroalueiden hinnat, väestö, asuminen, työpaikat ja pitkän aikavälin aluekehitys.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Suomen Pankki</p>
              <p className="home-card-text">Asuntolainojen korot, markkinakorkojen seuranta ja rahoitusskenaarioiden ajantasainen korkokerros.</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Valtiokonttori</p>
              <p className="home-card-text">ASP-säännöt, kuntakohtaiset korkotukikatot ja valtiontakauksen ehdot versionoituna sääntömoottorina.</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">MVP 0.1</p>
          <h2 className="final-title">Seuraavaksi: koko Suomen alue- ja hintadatakerros.</h2>
          <p className="home-final-text">Kun viralliset lähteet on normalisoitu Supabaseen, Landcaster voi siirtyä laskurista oikeaksi Area Score-, Fair Value- ja ostosuositusten analyysialustaksi.</p>
          <a className="primary-button home-final-button" href="#plan">Testaa oma suunnitelma</a>
        </div>
      </section>
    </main>
  )
}
