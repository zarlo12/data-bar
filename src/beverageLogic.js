// Catálogo de bebidas disponibles en la barra.
// Solo estas 3 bebidas pueden salir como resultado del quiz.
export const beverages = {
  Whisky: {
    name: "Whisky",
    image: "/assets_base/10 Data Brew.png",
    description:
      "Carácter fuerte y decidido. Valora los datos precisos, la estrategia bien armada y los resultados que se sostienen solos.",
    users: "868.474",
  },
  Tequila: {
    name: "Tequila",
    image: "/assets_base/9 Planters Punch.png",
    description:
      "Social y vibrante. Vive de la conversación, la energía compartida y la conexión directa con la gente.",
    users: "1.063.781",
  },
  Ginebra: {
    name: "Ginebra",
    image: "/assets_base/8 Engagement Tonic.png",
    description:
      "Fresca y creativa. Se mueve por la innovación, el diseño y las experiencias que se sienten auténticas.",
    users: "1.129.985",
  },
};

// Lista de nombres válidos, derivada del catálogo.
// Agregar o quitar una bebida arriba se propaga solo a todo el cálculo.
export const beverageNames = Object.keys(beverages);

// Puntuación por pregunta y opción.
// Cada opción reparte puntos entre las 3 bebidas; ninguna opción queda en ceros.
export const beverageScoring = {
  Q1: {
    a: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Dulce y vibrante
    b: { Whisky: 0, Tequila: 0, Ginebra: 2 }, // Refrescante y ligero
    c: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Intenso y fuerte
    d: { Whisky: 0, Tequila: 1, Ginebra: 1 }, // Exótico y diferente
    e: { Whisky: 1, Tequila: 0, Ginebra: 1 }, // Fresco y artesanal
  },
  Q2: {
    a: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Bailar y disfrutar de la música
    b: { Whisky: 0, Tequila: 0, Ginebra: 2 }, // Relajarme bajo el sol
    c: { Whisky: 0, Tequila: 1, Ginebra: 1 }, // Jugar y hacer deporte
    d: { Whisky: 1, Tequila: 0, Ginebra: 1 }, // Explorar y descubrir
    e: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Brindar en el atardecer
  },
  Q3: {
    a: { Whisky: 0, Tequila: 0, Ginebra: 2 }, // Innovación y tecnología
    b: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Cercanía y conexión humana
    c: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Diversión y entretenimiento
    d: { Whisky: 0, Tequila: 1, Ginebra: 1 }, // Impacto positivo y sostenibilidad
    e: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Autenticidad y sabor real
  },
  Q4: {
    a: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Reach
    b: { Whisky: 0, Tequila: 1, Ginebra: 1 }, // Engagement
    c: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Conversion
    d: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Awareness
    e: { Whisky: 0, Tequila: 0, Ginebra: 2 }, // Conexión emocional auténtica
  },
  Q5: {
    a: { Whisky: 0, Tequila: 1, Ginebra: 1 }, // Creatividad
    b: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Precisión
    c: { Whisky: 2, Tequila: 0, Ginebra: 0 }, // Datos
    d: { Whisky: 0, Tequila: 0, Ginebra: 2 }, // Tecnología
    e: { Whisky: 0, Tequila: 2, Ginebra: 0 }, // Un toque refrescante
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
