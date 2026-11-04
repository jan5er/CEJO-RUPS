import { Link } from "react-router";
import { equippedItem, useProgress } from "./progress";
import "./Shop.css";

export default function CoinBadge() {
  const progress = useProgress();
  const avatar = equippedItem(progress, "avatar");

  return (
    <Link to="/shop" className="coin-badge" title="Odpri trgovino">
      <span aria-hidden="true">{avatar.emoji}</span>
      <strong>{progress.coins}</strong>
      <span aria-hidden="true">🪙</span>
      <span className="coin-badge-sr">kovancev, trgovina</span>
    </Link>
  );
}
