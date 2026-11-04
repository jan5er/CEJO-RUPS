export const tasksLevel3 = [
  {
    id: "level-3-task-1",
    title: "Naloga 1: Oblikuj HTML s CSS-om",
    description:
      "Ustvari dva HTML elementa: naslov z vsebino 3-naslov in odstavek z vsebino 3-opis. Obema dodaj CSS, naslovu nastavi velikost 24 in težo 8, odstavku pa modro barvo, margin 10 in padding 5.",
    theory:
      "CSS opisuje videz HTML elementov, zato lahko isto vsebino predstaviš na različne načine brez spreminjanja HTML strukture. Lastnosti font-size in font-weight določata velikost in debelino pisave, margin loči element od okolice, padding pa ustvari prostor med vsebino in robom. Pri več elementih mora vsak CSS blok uporabiti pravilen id.",
    requiredBlocks: [
      "html_element",
      "css_style",
      "color_value",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="naslov" style="font-size: 24px; font-weight: 800">3-naslov</h1>
<p id="opis" style="color: #1971c2; margin: 10px; padding: 5px">3-opis</p>`,
  },
  {
    id: "level-3-task-2",
    title: "Naloga 2: Razlikuj margin in padding",
    description:
      "Ustvari tri zaporedne HTML elemente z vsebinami 3-zgoraj, 3-sredina in 3-spodaj. Vsakemu dodaj CSS blok; srednjemu nastavi margin 20 in padding 10.",
    theory:
      "Margin je prostor zunaj roba elementa in ločuje element od sosednjih elementov, padding pa je prostor znotraj roba in vsebino odmakne od roba. Pri postavitvi kartic, obrazcev in seznamov moraš razmišljati o obeh vrstah odmika. CSS lahko uporabiš samo na izbranem elementu, medtem ko ostali ohranijo svoje privzete lastnosti.",
    requiredBlocks: ["html_element", "css_style", "math_number", "text"],
    expectedHtml: `
<p id="zgoraj">3-zgoraj</p>
<p id="sredina" style="margin: 20px; padding: 10px">3-sredina</p>
<p id="spodaj">3-spodaj</p>`,
  },
  {
    id: "level-3-task-3",
    title: "Naloga 3: Uporabi barvo in težo pisave",
    description:
      "Ustvari naslov 3-opozorilo in odstavek 3-podrobnost. Naslovu nastavi rdečo barvo in težo 8, odstavku pa zeleno barvo in velikost 16.",
    theory:
      "CSS lastnost color določa barvo besedila, font-weight pa njegovo debelino. Različni elementi lahko dobijo različne sloge, kar uporabniku pomaga ločiti opozorilo od razlage. Barva ne sme biti edini način razumevanja, zato mora besedilo še vedno jasno povedati svoj pomen.",
    requiredBlocks: [
      "html_element",
      "css_style",
      "color_value",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="opozorilo" style="color: #e03131; font-weight: 800">3-opozorilo</h1>
<p id="podrobnost" style="color: #2f9e44; font-size: 16px">3-podrobnost</p>`,
  },
  {
    id: "level-3-task-4",
    title: "Naloga 4: Prilagodi velikost besedila",
    description:
      "Ustvari HTML naslov 3-glavni in podnaslov 3-podnaslov. Glavnemu nastavi velikost 30 in težo 9, podnaslovu pa velikost 18, margin 5 in padding 3.",
    theory:
      "font-size določa hierarhijo besedila: večja velikost je primerna za glavne naslove, manjša pa za podnaslove in opombe. Kombinacija velikosti, teže in odmikov ustvari vizualno hierarhijo, ki uporabniku pokaže, kako so informacije povezane.",
    requiredBlocks: ["html_element", "css_style", "math_number", "text"],
    expectedHtml: `
<h1 id="glavni" style="font-size: 30px; font-weight: 900">3-glavni</h1>
<h2 id="podnaslov" style="font-size: 18px; margin: 5px; padding: 3px">3-podnaslov</h2>`,
  },
];
