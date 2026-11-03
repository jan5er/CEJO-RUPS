export const tasksLevel1 = [
  {
    id: "level-1-task-1",
    title: "Naloga 1: Ustvari svoj prvi naslov",
    description:
      "Uporabi blok Naslov in besedilni blok ter na strani prikaži številko 1.",
    theory:
      "HTML značke določajo vlogo vsebine. Značka h1 je glavni naslov strani, besedilo znotraj značke pa je vsebina, ki jo vidi uporabnik. Blok Vsebnik omogoči, da elemente združiš v en del strani.",
    requiredBlocks: ["heading_level1", "text"],
    expectedOutput: ["1"],
  },
  {
    id: "level-1-task-2",
    title: "Naloga 2: Dodaj opis strani",
    description:
      "V vsebnik dodaj naslov z vsebino 1-naslov in blok Preprosto besedilo z vsebino 1-opis.",
    theory:
      "Odstavek je namenjen daljšemu opisu, navodilu ali razlagi pod naslovom. Ločevanje naslova in opisa izboljša berljivost ter uporabnikom hitro pokaže, kaj je najpomembnejše. Vsebnik je uporaben, ko želiš več povezanih elementov obravnavati kot eno skupino.",
    requiredBlocks: ["container_level1", "text_simple_level1", "text"],
    expectedOutput: ["1-naslov", "1-opis"],
  },
  {
    id: "level-1-task-3",
    title: "Naloga 3: Ustvari vnos uporabnika",
    description:
      "Uporabi blok Input in na strani prikaži vnosno polje z besedilom 1-vnos.",
    theory:
      "Vnosno polje (input) zbira podatke uporabnika, na primer ime, e-pošto ali iskalni izraz. Spletna stran te podatke pozneje prebere z JavaScriptom in jih lahko preveri ali pošlje strežniku. Pravilna izbira HTML elementa je prvi korak do uporabnega obrazca.",
    requiredBlocks: ["input_level1", "text"],
    expectedOutput: ["1-vnos"],
  },
];
