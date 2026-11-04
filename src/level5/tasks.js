export const tasksLevel5 = [
  {
    id: "level-5-task-1",
    title: "Naloga 1: Izberi možnost s switch stavkom",
    description:
      "Nastavi izbira na 5-prva. Uporabi switch z vsemi tremi case možnostmi in default vejo. V prvem case ustvari naslov 5-naslov ter odstavek 5-prva; oba oblikuj s CSS, naslovu nastavi velikost 24.",
    theory:
      "Switch primerja eno vrednost z več znanimi možnostmi, case pa določi, katera veja se izvede. Vsaka veja lahko vsebuje več ukazov, zato lahko iz ene izbire sestaviš celoten prikaz. Default obravnava nepričakovane vrednosti, break pa prepreči nenameren prehod v naslednjo vejo.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "switch_statement",
      "html_element",
      "css_style",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="naslov" style="font-size: 24px">5-naslov</h1>
<p id="prva">5-prva</p>`,
  },
  {
    id: "level-5-task-2",
    title: "Naloga 2: Uporabi drugi case",
    description:
      "Nastavi izbira na 5-druga. V drugi case veji ustvari elementa 5-drugi in 5-podrobnost, nato prvega obarvaj z rdečim CSS blokom in drugega odmakni s padding 6.",
    theory:
      "Več case vej omogoči različne uporabniške poti, na primer različne tipe menija ali načine prikaza. Switch določi logiko izbire, HTML ustvari vsebino, CSS pa jo oblikuje. Tako se podatkovna odločitev, struktura in videz združijo v uporaben program.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "switch_statement",
      "html_element",
      "css_style",
      "color_value",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="drugi" style="color: #e03131">5-drugi</h1>
<p id="podrobnost" style="padding: 6px">5-podrobnost</p>`,
  },
  {
    id: "level-5-task-3",
    title: "Naloga 3: Obravnavaj neznano možnost",
    description:
      "Nastavi izbira na 5-neznano, ki se ne ujema z nobenim case. V default veji ustvari naslov 5-privzeto in opis 5-neznana-izbira ter ju oblikuj z velikostjo 18 in rumeno barvo.",
    theory:
      "Default je rezervna veja za vhod, ki ga program ne pozna. To je pomembno pri podatkih iz obrazcev, URL-jev ali zunanjih storitev, ker vhod ni vedno tak, kot ga pričakujemo. Namesto tihe napake uporabniku pokažemo razumljivo privzeto sporočilo.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "switch_statement",
      "html_element",
      "css_style",
      "color_value",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="privzeto" style="font-size: 18px; color: #f08c00">5-privzeto</h1>
<p id="opis" style="font-size: 18px; color: #f08c00">5-neznana-izbira</p>`,
  },
  {
    id: "level-5-task-4",
    title: "Naloga 4: Izberi med tremi možnostmi",
    description:
      "Nastavi izbira na 5-tretja. V tretji case veji ustvari elemente 5-tretji in 5-zakljucek, prvega oblikuj z velikostjo 20 in težo 7, drugega pa z margin 12.",
    theory:
      "Switch je pregleden, kadar eno vrednost primerjamo z več stalnimi možnostmi. V primerjavi z dolgim zaporedjem if stavkov jasno pokaže dovoljene izbire. Ko veja vsebuje več elementov in CSS pravil, vadiš sestavo manjše funkcionalnosti, podobno kot pri pravem meniju.",
    requiredBlocks: [
      "variable_set",
      "variable_get",
      "switch_statement",
      "html_element",
      "css_style",
      "math_number",
      "text",
    ],
    expectedHtml: `
<h1 id="tretji" style="font-size: 20px; font-weight: 700">5-tretji</h1>
<p id="zakljucek" style="margin: 12px">5-zakljucek</p>`,
  },
];
