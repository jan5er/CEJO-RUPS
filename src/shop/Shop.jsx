import { useState } from "react";
import { Link } from "react-router";
import "../home/Home.css";
import { CATEGORIES, ITEMS } from "./items";
import { buyItem, equipItem, equippedItem, useProgress } from "./progress";
import "./shop.css";

const REASONS = {
  poor: "Še nimaš dovolj kovancev. Reši nekaj nalog!",
  owned: "Ta predmet že imaš.",
  unknown: "Predmeta ni mogoče najti.",
};

function themeStyle(progress) {
  const colors = equippedItem(progress, "theme").colors;
  return { "--h-bg": colors.bg, "--h-bg-2": colors.bg2 };
}

export default function Shop() {
  const progress = useProgress();
  const [category, setCategory] = useState("avatar");
  const [message, setMessage] = useState(null);

  const avatar = equippedItem(progress, "avatar");
  const title = equippedItem(progress, "title");

  const act = (item) => {
    if (progress.owned.includes(item.id)) {
      equipItem(item.id);
      setMessage({
        ok: true,
        text: `${item.emoji} ${item.name} je opremljen!`,
      });
      return;
    }
    const result = buyItem(item.id);
    setMessage(
      result.ok
        ? {
            ok: true,
            text: `Kupljeno in opremljeno: ${item.emoji} ${item.name}!`,
          }
        : { ok: false, text: REASONS[result.reason] },
    );
  };

  return (
    <div className="home shop" style={themeStyle(progress)}>
      <div className="home-stars" aria-hidden="true" />

      <nav className="home-nav">
        <Link to="/" className="home-logo">
          <span className="home-logo-mark">{"</>"}</span>
          <span>CEJO</span>
        </Link>
        <div className="home-nav-links">
          <Link to="/sandbox">Sandbox</Link>
          <Link to="/level/1" className="home-btn home-btn-small">
            Nazaj k učenju
          </Link>
        </div>
      </nav>

      <header className="shop-head">
        <div className="shop-profile">
          <span className="shop-profile-avatar" aria-hidden="true">
            {avatar.emoji}
          </span>
          <div>
            <h1>Trgovina</h1>
            <p>
              {title.emoji} {title.name}
            </p>
          </div>
        </div>
        <div className="shop-wallet" aria-live="polite">
          <strong>{progress.coins}</strong> <span aria-hidden="true">🪙</span>
          <small>Za vsako rešeno nalogo dobiš 10 kovancev</small>
        </div>
      </header>

      <div className="shop-tabs" role="tablist">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            className={category === c.id ? "on" : ""}
            onClick={() => {
              setCategory(c.id);
              setMessage(null);
            }}
          >
            <span aria-hidden="true">{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      <p
        className={`shop-message${message ? (message.ok ? " ok" : " bad") : ""}`}
        role="status"
      >
        {message?.text ?? " "}
      </p>

      <ul className="shop-grid">
        {ITEMS.filter((item) => item.category === category).map((item) => {
          const owned = progress.owned.includes(item.id);
          const equipped = progress.equipped[item.category] === item.id;
          const affordable = progress.coins >= item.price;

          return (
            <li
              key={item.id}
              className={`shop-item${equipped ? " equipped" : ""}`}
            >
              <span
                className="shop-item-art"
                aria-hidden="true"
                style={
                  item.colors
                    ? {
                        background: `linear-gradient(135deg, ${item.colors.bg}, ${item.colors.bg2})`,
                        boxShadow: `0 0 0 4px ${item.colors.ac}`,
                      }
                    : undefined
                }
              >
                {item.emoji}
              </span>
              <h3>{item.name}</h3>
              <button
                type="button"
                className={`shop-btn${owned ? "" : affordable ? " buy" : " locked"}`}
                disabled={equipped}
                aria-disabled={!owned && !affordable}
                onClick={() => act(item)}
              >
                {equipped
                  ? "✓ Opremljeno"
                  : owned
                    ? "Opremi"
                    : `${item.price} 🪙 Kupi`}
              </button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
