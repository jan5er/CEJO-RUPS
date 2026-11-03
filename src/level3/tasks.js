export const tasksLevel3 = [
  {
    id: "level-3-task-1",
    title: "Task 1: Oblikuj HTML s CSS-om",
    description: "Ustvari dva HTML elementa: naslov z vsebino 3-naslov in odstavek z vsebino 3-opis. Obema dodaj CSS, naslovu nastavi velikost 24 in težo 8, odstavku pa modro barvo, margin 10 in padding 5.",
    theory: "CSS opisuje videz HTML elementov, zato lahko isto vsebino predstaviš na različne načine brez spreminjanja HTML strukture. Lastnosti font-size in font-weight določata velikost in debelino pisave, margin loči element od okolice, padding pa ustvari prostor med vsebino in robom. Pri več elementih mora vsak CSS blok uporabiti pravilen id.",
    requiredBlocks: ["html_element", "css_style", "color_value", "math_number", "text"],
    expectedOutput: ["3-naslov", "3-opis"],
  },
  {
    id: "level-3-task-2",
    title: "Task 2: Razlikuj margin in padding",
    description: "Ustvari tri zaporedne HTML elemente z vsebinami 3-zgoraj, 3-sredina in 3-spodaj. Vsakemu dodaj CSS blok; srednjemu nastavi margin 20 in padding 10.",
    theory: "Margin je prostor zunaj roba elementa in ločuje element od sosednjih elementov, padding pa je prostor znotraj roba in vsebino odmakne od roba. Pri postavitvi kartic, obrazcev in seznamov moraš razmišljati o obeh vrstah odmika. CSS lahko uporabiš samo na izbranem elementu, medtem ko ostali ohranijo svoje privzete lastnosti.",
    requiredBlocks: ["html_element", "css_style", "math_number", "text"],
    expectedOutput: ["3-zgoraj", "3-sredina", "3-spodaj"],
  },
  {
    id: "level-3-task-3",
    title: "Task 3: Uporabi barvo in težo pisave",
    description: "Ustvari naslov 3-opozorilo in odstavek 3-podrobnost. Naslovu nastavi rdečo barvo in težo 8, odstavku pa zeleno barvo in velikost 16.",
    theory: "CSS lastnost color določa barvo besedila, font-weight pa njegovo debelino. Različni elementi lahko dobijo različne sloge, kar uporabniku pomaga ločiti opozorilo od razlage. Barva ne sme biti edini način razumevanja, zato mora besedilo še vedno jasno povedati svoj pomen.",
    requiredBlocks: ["html_element", "css_style", "color_value", "math_number", "text"],
    expectedOutput: ["3-opozorilo", "3-podrobnost"],
  },
  {
    id: "level-3-task-4",
    title: "Task 4: Prilagodi velikost besedila",
    description: "Ustvari HTML naslov 3-glavni in podnaslov 3-podnaslov. Glavnemu nastavi velikost 30 in težo 9, podnaslovu pa velikost 18, margin 5 in padding 3.",
    theory: "font-size določa hierarhijo besedila: večja velikost je primerna za glavne naslove, manjša pa za podnaslove in opombe. Kombinacija velikosti, teže in odmikov ustvari vizualno hierarhijo, ki uporabniku pokaže, kako so informacije povezane.",
    requiredBlocks: ["html_element", "css_style", "math_number", "text"],
    expectedOutput: ["3-glavni", "3-podnaslov"],
  },
];
