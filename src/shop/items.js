export const TASK_REWARD = 10;

export const CATEGORIES = [
  { id: "avatar", label: "Avatarji", emoji: "🐱" },
  { id: "theme", label: "Teme", emoji: "🎨" },
  { id: "title", label: "Nazivi", emoji: "🏅" },
];

export const ITEMS = [
  // Avatarji
  {
    id: "avatar-robot",
    category: "avatar",
    name: "Robot",
    emoji: "🤖",
    price: 0,
  },
  {
    id: "avatar-cat",
    category: "avatar",
    name: "Maček",
    emoji: "🐱",
    price: 20,
  },
  {
    id: "avatar-fox",
    category: "avatar",
    name: "Lisica",
    emoji: "🦊",
    price: 20,
  },
  {
    id: "avatar-dragon",
    category: "avatar",
    name: "Zmaj",
    emoji: "🐲",
    price: 40,
  },
  {
    id: "avatar-unicorn",
    category: "avatar",
    name: "Samorog",
    emoji: "🦄",
    price: 40,
  },
  {
    id: "avatar-alien",
    category: "avatar",
    name: "Vesoljček",
    emoji: "👾",
    price: 60,
  },

  // Teme (spremenijo ozadje domače strani in poudarno barvo v urejevalniku)
  {
    id: "theme-space",
    category: "theme",
    name: "Vesolje",
    emoji: "🌌",
    price: 0,
    colors: { bg: "#1b1442", bg2: "#2a1d6b", ac: "#4c6ef5" },
  },
  {
    id: "theme-sunset",
    category: "theme",
    name: "Zahod sonca",
    emoji: "🌅",
    price: 30,
    colors: { bg: "#4a1942", bg2: "#8a2c1a", ac: "#f76707" },
  },
  {
    id: "theme-forest",
    category: "theme",
    name: "Čarobni gozd",
    emoji: "🌲",
    price: 30,
    colors: { bg: "#0b3d2e", bg2: "#14532d", ac: "#2b9a4b" },
  },
  {
    id: "theme-ocean",
    category: "theme",
    name: "Globoko morje",
    emoji: "🌊",
    price: 50,
    colors: { bg: "#06284d", bg2: "#0b5394", ac: "#1c7ed6" },
  },
  {
    id: "theme-candy",
    category: "theme",
    name: "Bonbon",
    emoji: "🍬",
    price: 70,
    colors: { bg: "#5a1a4a", bg2: "#8a2b78", ac: "#e64980" },
  },

  // Nazivi
  {
    id: "title-rookie",
    category: "title",
    name: "Začetnik",
    emoji: "🌱",
    price: 0,
  },
  {
    id: "title-ninja",
    category: "title",
    name: "Kodni ninja",
    emoji: "🥷",
    price: 20,
  },
  {
    id: "title-loop",
    category: "title",
    name: "Mojster zank",
    emoji: "🔁",
    price: 40,
  },
  {
    id: "title-hacker",
    category: "title",
    name: "Super programer",
    emoji: "💻",
    price: 60,
  },
  {
    id: "title-legend",
    category: "title",
    name: "Legenda",
    emoji: "👑",
    price: 100,
  },
];

export const ITEMS_BY_ID = Object.fromEntries(
  ITEMS.map((item) => [item.id, item]),
);

export const DEFAULT_OWNED = ITEMS.filter((item) => item.price === 0).map(
  (item) => item.id,
);

export const DEFAULT_EQUIPPED = {
  avatar: "avatar-robot",
  theme: "theme-space",
  title: "title-rookie",
};
