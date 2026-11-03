export const tasksLevel4 = [
  {
    id: "level-4-task-1",
    title: "Task 1: Odloči se z if stavkom",
    description: "Nastavi spremenljivko rezultat na 4 in spremenljivko sporocilo na 4-uspeh. Z if preveri, ali je rezultat enak 4, nato z vrednostjo sporocilo ustvari HTML element in ga oblikuj s CSS velikostjo 20.",
    theory: "Spremenljivka shrani podatek, ki ga lahko uporabiš v več delih programa. If preveri pogoj in omogoči, da se vsebina prikaže samo pri pravilnem rezultatu. V resnični aplikaciji se na enak način prikaže uspeh, opozorilo ali napaka glede na podatke uporabnika; CSS pa rezultat vizualno poudari.",
    requiredBlocks: ["variable_set", "variable_get", "if_statement", "logic_compare", "html_element", "css_style", "math_number", "text"],
    expectedOutput: ["4-uspeh"],
  },
  {
    id: "level-4-task-2",
    title: "Task 2: Uporabi spremenljivko večkrat",
    description: "Nastavi spremenljivko naslov na 4-naslov in spremenljivko opis na 4-opis. Z njima ustvari dva HTML elementa in oba oblikuj: naslov naj bo velikosti 26, opis pa velikosti 14 z margin 8.",
    theory: "Spremenljivke preprečijo ponavljanje vrednosti in ločijo podatke od načina prikaza. Program lahko zato spremeni vsebino, ne da bi spreminjal strukturo elementov. To je osnova za predloge, kjer ista koda prikazuje različne uporabnike, izdelke ali sporočila.",
    requiredBlocks: ["variable_set", "variable_get", "html_element", "css_style", "math_number", "text"],
    expectedOutput: ["4-naslov", "4-opis"],
  },
  {
    id: "level-4-task-3",
    title: "Task 3: Preveri večjo vrednost",
    description: "Nastavi stevilo na 4 in prag na 3. Z if primerjaj obe spremenljivki; če je stevilo večje od praga, prikaži 4-vecje in mu z CSS nastavi zeleno barvo.",
    theory: "Primerjava večje od omogoča odločanje glede na prag, na primer pri točkah, starosti ali količini. Ker sta tudi prag in rezultat spremenljivki, lahko program deluje z različnimi podatki. Pogoj določi vsebino, CSS pa uporabniku pomaga hitro prepoznati pozitiven rezultat.",
    requiredBlocks: ["variable_set", "variable_get", "if_statement", "logic_compare", "html_element", "css_style", "color_value", "text"],
    expectedOutput: ["4-vecje"],
  },
  {
    id: "level-4-task-4",
    title: "Task 4: Ustvari različen rezultat",
    description: "Nastavi spremenljivko prijavljen na true in spremenljivko dobrodoslica na 4-prijava. Z if preveri logično vrednost, prikaži dobrodošlico ter jo oblikuj z velikostjo 22 in modro barvo.",
    theory: "Logična vrednost ima samo true ali false in je primerna za stanja, kot so prijava uporabnika, vklop funkcije ali veljavnost obrazca. If na podlagi tega stanja nadzoruje prikaz. Takšna ločitev podatka, odločitve in videza je temelj interaktivnih spletnih strani.",
    requiredBlocks: ["variable_set", "variable_get", "if_statement", "logic_boolean", "html_element", "css_style", "color_value", "math_number", "text"],
    expectedOutput: ["4-prijava"],
  },
];
