import { useSyncExternalStore } from "react";
import {
  DEFAULT_EQUIPPED,
  DEFAULT_OWNED,
  ITEMS_BY_ID,
  TASK_REWARD,
} from "./items";

/**
 * Napredek (kovanci, kupljeni predmeti, opremljeno) – shranjeno v localStorage,
 * brez računov. Vse spremembe gredo skozi tole datoteko.
 */
const STORAGE_KEY = "cejo-progress-v1";

const defaults = () => ({
  coins: 0,
  earned: [], // ključi nalog, za katere so kovanci že izplačani
  owned: [...DEFAULT_OWNED],
  equipped: { ...DEFAULT_EQUIPPED },
});

/** Sprejme samo veljavne podatke – pokvarjen localStorage ne sme podreti strani. */
function sanitize(raw) {
  const base = defaults();
  if (!raw || typeof raw !== "object") return base;

  const coins =
    Number.isFinite(raw.coins) && raw.coins > 0 ? Math.floor(raw.coins) : 0;
  const earned = Array.isArray(raw.earned)
    ? raw.earned.filter((k) => typeof k === "string")
    : [];
  const owned = new Set([
    ...DEFAULT_OWNED,
    ...(Array.isArray(raw.owned)
      ? raw.owned.filter((id) => ITEMS_BY_ID[id])
      : []),
  ]);

  const equipped = { ...base.equipped };
  for (const [category, id] of Object.entries(raw.equipped ?? {})) {
    const item = ITEMS_BY_ID[id];
    if (item && item.category === category && owned.has(id))
      equipped[category] = id;
  }

  return { coins, earned, owned: [...owned], equipped };
}

function load() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    return sanitize(text ? JSON.parse(text) : null);
  } catch {
    return defaults();
  }
}

let state = load();
const listeners = new Set();

function commit(next) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Zasebno brskanje ali poln pomnilnik: napredek ostane vsaj v tej seji.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Sinhronizacija med zavihki
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      for (const listener of listeners) listener();
    }
  });
}

export function useProgress() {
  return useSyncExternalStore(subscribe, () => state);
}

/** Izplača kovance za nalogo – vsako nalogo samo enkrat. Vrne prejeto število kovancev. */
export function awardTask(taskKey, amount = TASK_REWARD) {
  if (state.earned.includes(taskKey)) return 0;
  commit({
    ...state,
    coins: state.coins + amount,
    earned: [...state.earned, taskKey],
  });
  return amount;
}

/** Vrne { ok: true } ali { ok: false, reason }. */
export function buyItem(id) {
  const item = ITEMS_BY_ID[id];
  if (!item) return { ok: false, reason: "unknown" };
  if (state.owned.includes(id)) return { ok: false, reason: "owned" };
  if (state.coins < item.price) return { ok: false, reason: "poor" };
  commit({
    ...state,
    coins: state.coins - item.price,
    owned: [...state.owned, id],
    equipped: { ...state.equipped, [item.category]: id },
  });
  return { ok: true };
}

export function equipItem(id) {
  const item = ITEMS_BY_ID[id];
  if (!item || !state.owned.includes(id)) return false;
  commit({ ...state, equipped: { ...state.equipped, [item.category]: id } });
  return true;
}

export const equippedItem = (progress, category) =>
  ITEMS_BY_ID[progress.equipped[category]];
