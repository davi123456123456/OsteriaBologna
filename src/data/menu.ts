// Menù (brief §8.2): testi del cliente, nessun prezzo.
export type Dish = { slug: string; nome: string; descrizione: string; pairing?: string }; // pairing = slug vino
export type MenuCategory = { slug: string; titolo: string; sottotitolo?: string; pairingCategoria?: string; piatti: Dish[] };

export const menu: MenuCategory[] = [
  { slug: "antipasti", titolo: "Antipasti", piatti: [
    { slug: "tagliere-della-trattoria", nome: "Tagliere della Trattoria",
      descrizione: "Salumi artigianali stagionati, crostini caldi e giardiniera di verdure dell'orto.",
      pairing: "pignoletto-spumante-brut" },
    { slug: "gnocco-fritto-caldo", nome: "Gnocco Fritto Caldo",
      descrizione: "Con mortadella IGP e scaglie di Parmigiano Reggiano 24 mesi.",
      pairing: "lambrusco-di-sorbara-le-radici" },
    { slug: "tortino-di-verdure", nome: "Tortino di Verdure di Stagione",
      descrizione: "Su fonduta cremosa di Parmigiano Reggiano, con gocce di aceto balsamico." },
  ]},
  { slug: "primi", titolo: "Primi", sottotitolo: "Pasta fresca",
    pairingCategoria: "pignoletto-classico-vigna-tassinaia", // "Ideale con i primi di pasta fresca"
    piatti: [
    { slug: "tagliatelle-al-ragu", nome: "Tagliatelle al Ragù Tradizionale",
      descrizione: "Sfoglia tirata a mattarello, condita con ragù di carne a cottura lenta." },
    { slug: "tortellini-in-brodo", nome: "Tortellini in Brodo di Cappone",
      descrizione: "Piccoli capolavori ripieni di carne, serviti nel loro brodo limpido e saporito.",
      pairing: "lambrusco-di-sorbara-le-radici" },
    { slug: "garganelli-salsiccia-porcini", nome: "Garganelli con Salsiccia e Funghi Porcini",
      descrizione: "Pasta corta rigata saltata con salsiccia fresca, porcini e un pizzico di prezzemolo." },
    { slug: "passatelli-asciutti", nome: "Passatelli Asciutti",
      descrizione: "Con speck croccante, noci tostate e pomodorini confit." },
  ]},
  { slug: "secondi", titolo: "Secondi", sottotitolo: "Carne e altro", piatti: [
    { slug: "cotoletta-alla-bolognese", nome: "Cotoletta alla Bolognese",
      descrizione: "Lombata di vitello fritta nello strutto, glassata al brodo, con prosciutto crudo e Parmigiano fuso.",
      pairing: "valpolicella-ripasso-superiore" },
    { slug: "tagliata-di-scottona", nome: "Tagliata di Manzo Scottona",
      descrizione: "Con scaglie di Grana Padano, rucola fresca e riduzione di aceto balsamico di Modena.",
      pairing: "brunello-di-montalcino" },
    { slug: "guancia-brasata-al-sangiovese", nome: "Guancia di Manzo Brasata al Sangiovese",
      descrizione: "Cotta a lungo nel vino rosso fino a diventare tenerissima, servita con il suo fondo.",
      pairing: "barolo-bussia" },
    { slug: "grigliata-mista", nome: "Grigliata Mista della Trattoria",
      descrizione: "Costine di maiale, salsiccia artigianale e pollo alla brace.",
      pairing: "brunello-di-montalcino" },
  ]},
  { slug: "contorni", titolo: "Contorni", piatti: [
    { slug: "patate-al-forno", nome: "Patate al Forno Rosmarinate",
      descrizione: "Dorate e croccanti fuori, morbide dentro." },
    { slug: "verdure-grigliate", nome: "Verdure Grigliate di Stagione",
      descrizione: "Zucchine, melanzane e peperoni con olio extravergine d'oliva e basilico." },
    { slug: "insalata-mista", nome: "Insalata Mista dell'Orto",
      descrizione: "Lattuga croccante, carote julienne e pomodorini." },
  ]},
  { slug: "dolci", titolo: "Dolci", sottotitolo: "Fatti in casa", piatti: [
    { slug: "zuppa-inglese", nome: "Zuppa Inglese",
      descrizione: "Pan di Spagna inzuppato nell'Alchermes, crema pasticcera e cioccolato fondente.",
      pairing: "albana-passito-dondona" },
    { slug: "torta-di-riso", nome: "Torta di Riso Tradizionale",
      descrizione: "Il dolce tipico bolognese con riso, latte, mandorle e un tocco di liquore.",
      pairing: "albana-passito-dondona" },
    { slug: "panna-cotta", nome: "Panna Cotta",
      descrizione: "Con caramello salato o coulis di frutti di bosco freschi." },
    { slug: "tiramisu", nome: "Tiramisù Classico",
      descrizione: "Savoiardi, caffè espresso, mascarpone e cacao amaro." },
  ]},
];

export const allDishes = menu.flatMap((c) => c.piatti);
export const dishBySlug = (slug: string) => allDishes.find((d) => d.slug === slug);
