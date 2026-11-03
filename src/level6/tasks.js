export const tasksLevel6 = [
  {
    id: "level-6-task-1",
    title: "Naloga 1: Ponovi dejanje z zanko",
    description:
      "Nastavi spremenljivko ponovitve na 3 in jo uporabi v zanki. V zanki ustvari naslov 6-naslov in odstavek 6-vrstica, nato ju oblikuj s CSS blokoma.",
    theory:
      "Zanka ponovi skupino ukazov določeno število krat, zato lahko iz ene predloge ustvariš več zapisov. Spremenljivka omogoči, da število ponovitev spremeniš na enem mestu. V praksi se enak pristop uporablja za kartice izdelkov, uporabnike ali vrstice tabele.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "repeat_loop",
      "html_element",
      "css_style",
      "math_number",
      "text",
    ],
    expectedOutput: [
      "6-naslov",
      "6-vrstica",
      "6-naslov",
      "6-vrstica",
      "6-naslov",
      "6-vrstica",
    ],
  },
  {
    id: "level-6-task-2",
    title: "Naloga 2: Ustvari dve ponovitvi",
    description:
      "Nastavi ponovitve na 2. V zanki uporabi switch s tremi case možnostmi in za vsako ponovitev prikaži 6-izbira.",
    theory:
      "Kombinacija zanke in switcha loči ponavljanje od izbire: zanka določi, kolikokrat se postopek izvede, switch pa določi, katera veja velja. Takšna kombinacija je pogosta pri obdelavi več podatkov, kjer ima vsak zapis svojo vrsto ali status.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "repeat_loop",
      "switch_statement",
      "html_element",
      "text",
    ],
    expectedOutput: ["6-izbira", "6-izbira"],
  },
  {
    id: "level-6-task-3",
    title: "Naloga 3: Ponovi skupino ukazov",
    description:
      "Nastavi ponovitve na 4. V zanki ustvari element 6-skupina, nato še element 6-podatek in oba oblikuj s CSS.",
    theory:
      "V zanko lahko vstaviš več ukazov, ki se izvedejo skupaj pri vsaki ponovitvi. Tako pri vsakem izdelku ustvariš naslov, ceno in gumb iz iste predloge. Pomembno je, da so vsi ukazi v telesu zanke, sicer se del strani ustvari samo enkrat.",
    requiredBlocks: [
      "repeat_loop",
      "html_element",
      "css_style",
      "math_number",
      "text",
    ],
    expectedOutput: [
      "6-skupina",
      "6-podatek",
      "6-skupina",
      "6-podatek",
      "6-skupina",
      "6-podatek",
      "6-skupina",
      "6-podatek",
    ],
  },
  {
    id: "level-6-task-4",
    title: "Naloga 4: Uporabi zanko za seznam",
    description:
      "Nastavi ponovitve na 5. V zanki ustvari naslov 6-seznam in ga obarvaj modro. V zanko dodaj tudi switch blok z default vejo, ki prikaže 6-status.",
    theory:
      "Programi pogosto obdelujejo sezname podatkov, katerih dolžine vnaprej ne poznamo. Zanka obdela vsak zapis, switch pa lahko glede na status izbere različna sporočila. CSS nato loči pomembne dele prikaza; skupaj dobiš osnovo za seznam izdelkov ali rezultatov.",
    requiredBlocks: [
      "repeat_loop",
      "switch_statement",
      "html_element",
      "css_style",
      "color_value",
      "math_number",
      "text",
    ],
    expectedOutput: [
      "6-seznam",
      "6-status",
      "6-seznam",
      "6-status",
      "6-seznam",
      "6-status",
      "6-seznam",
      "6-status",
      "6-seznam",
      "6-status",
    ],
  },
];
