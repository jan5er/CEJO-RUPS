export const tasksLevel1 = [
  {
    id: "level-1-task-1",
    title: "Naloga 1: Ustvari svoj prvi naslov",
    description:
      "Uporabi blok Naslov in besedilni blok ter na strani prikaži številko 1.",
    theory:
      "HTML značke določajo vlogo vsebine. Značka h1 je glavni naslov strani, besedilo znotraj značke pa je vsebina, ki jo vidi uporabnik. Blok Vsebnik omogoči, da elemente združiš v en del strani.",
    checks: [
      { type: "exists", selector: "h1" },
      { type: "text", selector: "h1", match: "exact", value: "1" },
    ],
    expectedHtml: `<h1>1</h1>`,
  },
  {
    id: "level-1-task-2",
    title: "Naloga 2: Dodaj opis strani",
    description:
      "V vsebnik dodaj naslov z vsebino 1-naslov in blok Preprosto besedilo z vsebino 1-opis.",
    theory:
      "Odstavek je namenjen daljšemu opisu, navodilu ali razlagi pod naslovom. Ločevanje naslova in opisa izboljša berljivost ter uporabnikom hitro pokaže, kaj je najpomembnejše. Vsebnik je uporaben, ko želiš več povezanih elementov obravnavati kot eno skupino.",
    checks: [
      {
        type: "within",
        selector: "div",
        checks: [
          { type: "text", selector: "h1", match: "exact", value: "1-naslov" },
          { type: "text", selector: "p", match: "exact", value: "1-opis" },
        ],
      },
    ],
    expectedHtml: `
<div style="width: fit-content; margin-left: auto; margin-right: auto">
  <h1>1-naslov</h1>
  <p>1-opis</p>
</div>`,
  },
  {
    id: "level-1-task-3",
    title: "Naloga 3: Ustvari vnos uporabnika",
    description:
      "Uporabi blok Input in na strani prikaži vnosno polje z besedilom 1-vnos.",
    theory:
      "Vnosno polje (input) zbira podatke uporabnika, na primer ime, e-pošto ali iskalni izraz. Spletna stran te podatke pozneje prebere z JavaScriptom in jih lahko preveri ali pošlje strežniku. Pravilna izbira HTML elementa je prvi korak do uporabnega obrazca.",
    checks: [
      { type: "exists", selector: "label" },
      { type: "text", selector: "label", match: "exact", value: "1-vnos" },
      { type: "exists", selector: "input" },
    ],
    expectedHtml: `
<label>1-vnos</label>
<input type="text" style="border: 1px solid">`,
  },
];
