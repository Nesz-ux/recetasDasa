export const Categoria = [
  {
    value: "granola",
    description: "Granola",
  },
  {
    value: "cereal",
    description: "Cereal",
  },
  {
    value: "barra_crujiente",
    description: "Barra Crujiente",
  },
  {
    value: "barra_kid",
    description: "Barra Kid",
  },
  {
    value: "otra_categoria",
    description: "Otras Categorias",
  },
];

export const Receta = [
  {
    value: "original",
    description: "Original",
  },
  {
    value: "chocolate",
    description: "Chocolate",
  },
  {
    value: "ligera",
    description: "Ligera",
  },
  {
    value: "vainilla",
    description: "Vainilla",
  },
  {
    value: "maple",
    description: "Maple",
  },
];

export const Presentacion = [
  {
    value: "autoservicio",
    description: "Autoservicio",
  },
  {
    value: "costco",
    description: "Costco",
  },
  {
    value: "degustacion",
    description: "Degustación",
  },
];

export const Idioma = [
  {
    value: "espanol",
    description: "Español",
  },
  {
    value: "ingles",
    description: "Ingles",
  },
];

export const RecetasPorCategoria: Record<string, { value: string; description: string }[]> = {
  granola: [
    { value: "original", description: "Original" },
    { value: "ligera", description: "Ligera" },
    { value: "chocolate", description: "Chocolate" },
    { value: "vainilla", description: "Vainilla" },
    { value: "maple", description: "Maple" },
  ],
  barra_crujiente: [
    { value: "original", description: "Original" },
    { value: "ligera", description: "Ligera" },
    { value: "chocolate", description: "Chocolate" },
  ],
  cereal: [
    { value: "arandanos", description: "Arándanos" },
    { value: "quinoa", description: "Quinoa" },
    { value: "chocolate", description: "Chocolate" },
    { value: "maple", description: "Maple" },
  ],
  barra_kid: [
    { value: "chispas", description: "Chispas de Chocolate" },
  ],
  otra_categoria: [
    { value: "especial", description: "Especial" },
  ],
};