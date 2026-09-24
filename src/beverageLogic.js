// Catálogo de bebidas disponibles en la barra.
// Solo estas 3 bebidas pueden salir como resultado del quiz.
//
// La clave (whisky / tequila / ginebra) es interna y no se muestra en pantalla:
// es la que usa la tabla de puntajes. Para cambiarle el nombre a una bebida
// basta con editar su "name" aquí; no hay que tocar nada más.
export const beverages = {
  whisky: {
    name: "Whisky Analítico", // base: whisky
    image: "/assets_base/10 Data Brew.png",
    description:
      "Carácter fuerte y decidido. Valora los datos precisos, la estrategia bien armada y los resultados que se sostienen solos.",
    users: "868.474",
  },
  tequila: {
    name: "Insight Margarito", // base: tequila
    image: "/assets_base/9 Planters Punch.png",
    description:
      "Social y vibrante. Vive de la conversación, la energía compartida y la conexión directa con la gente.",
    users: "1.063.781",
  },
  ginebra: {
    name: "Ginebra Byte", // base: ginebra
    image: "/assets_base/8 Engagement Tonic.png",
    description:
      "Fresca y creativa. Se mueve por la innovación, el diseño y las experiencias que se sienten auténticas.",
    users: "1.129.985",
  },
};

// Claves válidas, derivadas del catálogo.
// Agregar o quitar una bebida arriba se propaga solo a todo el cálculo.
export const beverageNames = Object.keys(beverages);

// Puntuación por pregunta y opción.
// Cada opción reparte puntos entre las 3 bebidas; ninguna opción queda en ceros.
export const beverageScoring = {
  Q1: {
    a: { whisky: 0, tequila: 2, ginebra: 0 }, // Dulce y vibrante
    b: { whisky: 0, tequila: 0, ginebra: 2 }, // Refrescante y ligero
    c: { whisky: 2, tequila: 0, ginebra: 0 }, // Intenso y fuerte
    d: { whisky: 0, tequila: 1, ginebra: 1 }, // Exótico y diferente
    e: { whisky: 1, tequila: 0, ginebra: 1 }, // Fresco y artesanal
  },
  Q2: {
    a: { whisky: 0, tequila: 2, ginebra: 0 }, // Bailar y disfrutar de la música
    b: { whisky: 0, tequila: 0, ginebra: 2 }, // Relajarme bajo el sol
    c: { whisky: 0, tequila: 1, ginebra: 1 }, // Jugar y hacer deporte
    d: { whisky: 1, tequila: 0, ginebra: 1 }, // Explorar y descubrir
    e: { whisky: 2, tequila: 0, ginebra: 0 }, // Brindar en el atardecer
  },
  Q3: {
    a: { whisky: 0, tequila: 0, ginebra: 2 }, // Innovación y tecnología
    b: { whisky: 0, tequila: 2, ginebra: 0 }, // Cercanía y conexión humana
    c: { whisky: 0, tequila: 2, ginebra: 0 }, // Diversión y entretenimiento
    d: { whisky: 0, tequila: 1, ginebra: 1 }, // Impacto positivo y sostenibilidad
    e: { whisky: 2, tequila: 0, ginebra: 0 }, // Autenticidad y sabor real
  },
  Q4: {
    a: { whisky: 0, tequila: 2, ginebra: 0 }, // Reach
    b: { whisky: 0, tequila: 1, ginebra: 1 }, // Engagement
    c: { whisky: 2, tequila: 0, ginebra: 0 }, // Conversion
    d: { whisky: 2, tequila: 0, ginebra: 0 }, // Awareness
    e: { whisky: 0, tequila: 0, ginebra: 2 }, // Conexión emocional auténtica
  },
  Q5: {
    a: { whisky: 0, tequila: 1, ginebra: 1 }, // Creatividad
    b: { whisky: 2, tequila: 0, ginebra: 0 }, // Precisión
    c: { whisky: 2, tequila: 0, ginebra: 0 }, // Datos
    d: { whisky: 0, tequila: 0, ginebra: 2 }, // Tecnología
    e: { whisky: 0, tequila: 2, ginebra: 0 }, // Un toque refrescante
  },
};

// Preguntas del quiz
export const questions = [
  {
    id: "Q1",
    text: "¿Qué sabor define mejor tu estilo?",
    options: [
      { id: "a", text: "Dulce y vibrante" },
      { id: "b", text: "Refrescante y ligero" },
      { id: "c", text: "Intenso y fuerte" },
      { id: "d", text: "Exótico y diferente" },
      { id: "e", text: "Fresco y artesanal" },
    ],
  },
  {
    id: "Q2",
    text: "¿Cuál es tu plan favorito en la playa?",
    options: [
      { id: "a", text: "Bailar y disfrutar de la música" },
      { id: "b", text: "Relajarme bajo el sol " },
      { id: "c", text: "Jugar y hacer deporte" },
      { id: "d", text: "Explorar y descubrir nuevas experiencias" },
      {
        id: "e",
        text: "Brindar con una buena cerveza mientras cae el atardecer",
      },
    ],
  },
  {
    id: "Q3",
    text: "¿Qué valor te inspira más en una marca?",
    options: [
      { id: "a", text: "Innovación y tecnología" },
      { id: "b", text: "Cercanía y conexión humana" },
      { id: "c", text: "Diversión y entretenimiento" },
      { id: "d", text: "Impacto positivo y sostenibilidad" },
      { id: "e", text: "Autenticidad y sabor real" },
    ],
  },
  {
    id: "Q4",
    text: "¿Qué resultado buscas en tu campaña ideal?",
    options: [
      { id: "a", text: "Alcanzar a muchas personas (Reach)" },
      { id: "b", text: "Generar interacción y conversación (Engagement)" },
      { id: "c", text: "Lograr conversiones y ventas (Conversion)" },
      { id: "d", text: "Construir recordación de marca (Awareness)" },
      { id: "e", text: "Generar conexión emocional auténtica" },
    ],
  },
  {
    id: "Q5",
    text: "¿Qué ingrediente no puede faltar en tu mezcla ideal?",
    options: [
      { id: "a", text: "Creatividad" },
      { id: "b", text: "Precisión" },
      { id: "c", text: "Datos" },
      { id: "d", text: "Tecnología" },
      { id: "e", text: "Un toque refrescante" },
    ],
  },
];

// Desempate estable: a partir de las mismas respuestas siempre sale la misma
// bebida, así que recargar la pantalla de resultado no cambia lo que ya se vio.
// Al mismo tiempo reparte los empates entre las bebidas en lugar de darle
// siempre la ventaja a la primera de la lista.
function breakTie(tiedBeverages, answers) {
  const seed = Object.keys(answers)
    .sort()
    .map((questionId) => `${questionId}:${answers[questionId]}`)
    .join("|");

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return tiedBeverages[hash % tiedBeverages.length];
}

// Función para calcular la bebida ganadora
export function calculateBeverage(answers = {}) {
  const scores = {};
  beverageNames.forEach((beverage) => {
    scores[beverage] = 0;
  });

  // Calcular puntuaciones basadas en las respuestas
  Object.keys(answers).forEach((questionId) => {
    const questionScores = beverageScoring[questionId]?.[answers[questionId]];
    if (!questionScores) return; // respuesta desconocida: se ignora

    beverageNames.forEach((beverage) => {
      scores[beverage] += questionScores[beverage] || 0;
    });
  });

  // Encontrar la puntuación más alta y todas las bebidas que la alcanzan
  const maxScore = Math.max(...beverageNames.map((b) => scores[b]));
  const leaders = beverageNames.filter((b) => scores[b] === maxScore);

  // Siempre se devuelve una bebida válida, incluso sin respuestas
  const winningBeverage =
    leaders.length === 1 ? leaders[0] : breakTie(leaders, answers);

  return {
    beverage: winningBeverage,
    score: maxScore,
    allScores: scores,
  };
}
