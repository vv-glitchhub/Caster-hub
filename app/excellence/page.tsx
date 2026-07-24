import { buildProductExcellence } from '../../lib/product-excellence'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Product Excellence | Caster OS',
  description: 'Measurable completion gates for every Caster product.',
}

export default function ExcellencePage() {
  const products = buildProductExcellence()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Product Excellence</p>
          <h1 className="home-title">100% means verified.</h1>
          <h2 className="home-subtitle">Not just more features.</h2>
          <p className="home-lead">
            Every product is measured separately for code completeness and production verification. External credentials, providers and real-user security tests remain visible instead of being counted as finished.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/production-readiness">Production readiness</a>
            <a className="secondary-button" href="/release-center">Release center</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">All products</p>
          <h2 className="section-title">Completion with evidence and one next action.</h2>
          <div className="home-module-grid">
            {products.map((product) => (
              <article className="home-module-card min-h-0" key={product.product}>
                <p className="home-module-label">{product.product}</p>
                <h3 className="home-module-title">Code {product.codeScore}% · Production {product.productionScore}%</h3>
                {product.gates.map((gate) => (
                  <div className="home-core-item" key={gate.title}>
                    <strong>{gate.title} · {gate.status}</strong>
                    <p className="home-module-text">{gate.evidence}</p>
                    <p className="home-module-text"><strong>Next:</strong> {gate.nextAction}</p>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
