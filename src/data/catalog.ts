export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  title: string;
  items: Product[];
  subcategories?: { title: string; items: Product[] }[];
}

export const catalogData: Category[] = [
  {
    title: 'Utensílios',
    items: [
      { id: 'u1', name: 'Fita Micropore (Branca)', price: 4.99 },
      { id: 'u2', name: 'Pads em Gel Nuvem (pacote com 10 unidades)', price: 4.00 },
      { id: 'u3', name: 'Escovinha (50 unidades)', price: 7.50 },
      { id: 'u4', name: 'Anel Batoque Flor (50 unidades)', price: 15.00 },
    ],
  },
  {
    title: 'Removedores',
    items: [
      { id: 'r1', name: 'Removedor em Gel Funmix 5g', price: 19.99 },
    ],
  },
  {
    title: 'Shampoos',
    items: [
      { id: 's1', name: 'Shampoo Control Skin Lashes Co Acqua Foam 50ml', price: 55.00 },
      { id: 's2', name: 'Shampoo Nagaraku 100ml', price: 45.00 },
    ],
  },
  {
    title: 'Pinças',
    items: [
      { id: 'p1', name: 'Pinça Bella Moça Preta (Curva)', price: 10.00 },
      { id: 'p2', name: 'Pinça Bella Moça Preta Ponta Dourada (Golfinho)', price: 19.90 },
      { id: 'p3', name: 'Pinça Bella Moça Preta Ponta Dourada (Curva)', price: 19.90 },
      { id: 'p4', name: 'Pinça Bella Moça Preta Ponta Dourada (Reta)', price: 19.90 },
    ],
  },
  {
    title: 'Colas',
    items: [
      { id: 'c1', name: 'Cola Adesivo Queen Bad Pink 3ml', price: 63.00 },
      { id: 'c2', name: 'Cola Adesivo One Cherry Lash 3ml', price: 63.00 },
      { id: 'c3', name: 'Cola Adesivo Aurora Cherry 3ml', price: 63.00 },
      { id: 'c4', name: 'Cola Adesivo Transparente Diamond Master Elite 3ml', price: 63.00 },
    ],
  },
  {
    title: 'Cílios',
    items: [],
    subcategories: [
      {
        title: 'Nagaraku',
        items: [
          { id: 'ci_n1', name: 'Cílios Brasileiro YY Nagaraku Marrom (Curvatura D • 0.07 • Mix 8–14 mm)', price: 40.00 },
        ],
      },
      {
        title: 'Lukatmé',
        items: [
          { id: 'ci_l1', name: 'Cílios YY Brasileiro U Lukatmé (Curvatura D • 0.07 • Mix 8–15 mm)', price: 45.00 },
        ],
      },
      {
        title: 'Decemars',
        items: [
          { id: 'ci_d1', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 8 mm)', price: 29.90 },
          { id: 'ci_d2', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 9 mm)', price: 29.90 },
          { id: 'ci_d3', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 10 mm)', price: 29.90 },
          { id: 'ci_d4', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 11 mm)', price: 29.90 },
          { id: 'ci_d5', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 12 mm)', price: 29.90 },
          { id: 'ci_d6', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 13 mm)', price: 29.90 },
          { id: 'ci_d7', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • 14 mm)', price: 29.90 },
          { id: 'ci_d8', name: 'Cílios YY Brasileiro Decemars (Curvatura D • 0.07 • Mix 8–14 mm)', price: 29.90 },
          { id: 'ci_d9', name: 'Cílios 4DW Decemars (Curvatura D • 0.07 • Mix 8–14 mm)', price: 45.00 },
        ],
      },
      {
        title: 'Bella Moça',
        items: [
          { id: 'ci_b1', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 8 mm)', price: 28.00 },
          { id: 'ci_b2', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 9 mm)', price: 28.00 },
          { id: 'ci_b3', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 10 mm)', price: 28.00 },
          { id: 'ci_b4', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 11 mm)', price: 28.00 },
          { id: 'ci_b5', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 12 mm)', price: 28.00 },
          { id: 'ci_b6', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 13 mm)', price: 28.00 },
          { id: 'ci_b7', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • 14 mm)', price: 28.00 },
          { id: 'ci_b8', name: 'Cílios Brasileiro YY Bella Moça (Curvatura D • 0.07 • Mix 8–14 mm)', price: 28.00 },
          { id: 'ci_b9', name: 'Cílios 5DW Bella Moça (Curvatura D • 0.07 • Mix 8–14 mm)', price: 41.00 },
        ],
      },
      {
        title: 'Fadvan',
        items: [
          { id: 'ci_f1', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 8 mm)', price: 29.00 },
          { id: 'ci_f2', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 9 mm)', price: 29.00 },
          { id: 'ci_f3', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 12 mm)', price: 29.00 },
          { id: 'ci_f4', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 13 mm)', price: 29.00 },
          { id: 'ci_f5', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 14 mm)', price: 29.00 },
          { id: 'ci_f6', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • 15 mm)', price: 29.00 },
          { id: 'ci_f7', name: 'Cílios YY Brasileiro Fadvan (Curvatura D • 0.07 • Mix 8–14 mm)', price: 29.00 },
          { id: 'ci_f8', name: 'Cílios 3DW Curvatura M Fadvan (Curvatura M • 0.07 • Mix 8–14 mm)', price: 35.00 },
        ],
      },
    ],
  },
];
