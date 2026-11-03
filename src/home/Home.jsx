import { useState } from "react";
import { Link } from "react-router";
import CoinBadge from "../shop/CoinBadge";
import { equippedItem, useProgress } from "../shop/progress";
import "./Home.css";

const STEPS = [
  {
    emoji: "🧩",
    title: "Zloži bloke",
    text: "Povleci barvne bloke in jih sestavi kot lego kocke. Nič tipkanja, nič strahu pred napakami.",
  },
  {
    emoji: "▶️",
    title: "Zaženi program",
    text: "Pritisni »Zaženi« in takoj poglej, kaj je naredila tvoja koda.",
  },
  {
    emoji: "🏆",
    title: "Opravi misije",
    text: "Reši naloge, odkleni nove levele in poglej, kako tvoji bloki izgledajo kot prava koda.",
  },
];

export default function Home() {
  const [launched, setLaunched] = useState(false);
  const theme = equippedItem(useProgress(), "theme").colors;

  const launch = () => {
    if (launched) return;
    setLaunched(true);
    setTimeout(() => setLaunched(false), 2200);
  };

  return (
    <div className="home" style={{ "--h-bg": theme.bg, "--h-bg-2": theme.bg2 }}>
      <div className="home-stars" aria-hidden="true" />

      <nav className="home-nav">
        <Link to="/" className="home-logo">
          <span className="home-logo-mark">{"</>"}</span>
          <span>CEJO</span>
        </Link>
        <div className="home-nav-links">
          <a href="#kako">Kako deluje</a>
          <Link to="/sandbox">Sandbox</Link>
          <Link to="/shop">Trgovina</Link>
          <CoinBadge />
          <Link to="/level/1" className="home-btn home-btn-small">
            Začni
          </Link>
        </div>
      </nav>

      <header className="home-hero">
        <div className="home-hero-text">
          <h1>
            Postani <span className="home-gradient-text">mojster kode</span>!
          </h1>
          <p>
            Zlagaj barvne bloke, gradi svoje spletne strani in nauči se pravega
            programiranja — korak za korakom, kot v igri.
          </p>
          <div className="home-hero-actions">
            <Link to="/level/1" className="home-btn home-btn-big">
              <span aria-hidden="true">🚀</span> Začni pustolovščino
            </Link>
            <Link to="/sandbox" className="home-btn home-btn-ghost">
              Sandbox
            </Link>
          </div>
        </div>

        <div className="home-hero-art" aria-hidden="true">
          <div className="home-planet" />
          <div className="home-blocks">
            <div className="home-block b-event">ko kliknem ▶</div>
            <div className="home-block b-loop">
              ponovi <span className="home-chip">3</span> krat
              <div className="home-block b-print">
                izpiši <span className="home-chip str">»Živjo!«</span>
              </div>
            </div>
            <div className="home-block b-if">
              če <span className="home-chip">točke &gt; 10</span>
            </div>
          </div>
          <div className="home-console">
            <span>Živjo!</span>
            <span>Živjo!</span>
            <span>Živjo!</span>
            <span className="home-cursor">▍</span>
          </div>
          <span className="home-float f1">⭐</span>
          <span className="home-float f2">💡</span>
          <span className="home-float f3">🎮</span>
        </div>
      </header>

      <section className="home-section" id="kako">
        <h2>Kako deluje? 🤖</h2>
        <p className="home-section-sub">Tri koraki. To je vse.</p>
        <div className="home-steps">
          {STEPS.map((step, i) => (
            <article className="home-step" key={step.title}>
              <span className="home-step-n">{i + 1}</span>
              <span className="home-step-emoji" aria-hidden="true">
                {step.emoji}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <button
          type="button"
          className={`home-rocket${launched ? " launched" : ""}`}
          onClick={launch}
          aria-label="Izstreli raketo"
        >
          🚀
        </button>
        <h2>Si pripravljen na izstrelitev?</h2>
        <p>Tvoja prva misija te že čaka. Traja manj kot 5 minut!</p>
        <Link to="/level/1" className="home-btn home-btn-big">
          Gremo! <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="home-footer"></footer>
    </div>
  );
}
