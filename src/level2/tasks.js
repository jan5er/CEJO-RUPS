export const tasksLevel2 = [
  {
    id: "level-2-task-1",
    title: "Naloga 1: Ustvari HTML element",
    description:
      "Uporabi novi blok HTML, izberi značko p in vanjo vstavi besedilo 2.",
    theory:
      "HTML element je sestavljen iz značke in vsebine. Značka p predstavlja odstavek, atribut id pa elementu dodeli enolično ime, po katerem ga lahko pozneje poiščeš in oblikuješ s CSS-om ali JavaScriptom.",
    requiredBlocks: ["html_element", "text"],
    expectedHtml: `<p id="element">2</p>`,
  },
  {
    id: "level-2-task-2",
    title: "Naloga 2: Izberi pravo značko",
    description: "Z blokom HTML ustvari značko h2 z vsebino 2-naslov.",
    theory:
      "Naslovne značke h1–h6 predstavljajo hierarhijo vsebine. h1 je najpomembnejši naslov, h2 pa podnaslov njegovega dela. Hierarhična struktura pomaga bralcem, iskalnikom in pripomočkom za dostopnost razumeti zgradbo strani.",
    requiredBlocks: ["html_element", "text"],
    expectedHtml: `<h2 id="element">2-naslov</h2>`,
  },
  {
    id: "level-2-task-3",
    title: "Naloga 3: Uporabi kratko poudarjeno vsebino",
    description: "Ustvari element small z vsebino 2-podrobnost.",
    theory:
      "Značka small označuje manj pomembno spremno vsebino, kot so opombe, pravne informacije ali dodatne podrobnosti. Element ni samo vizualno manjši; pravilna semantična značka pove tudi pomen vsebine brskalniku in tehnologijam za pomoč uporabnikom.",
    requiredBlocks: ["html_element", "text"],
    expectedHtml: `<small id="element">2-podrobnost</small>`,
  },
];
