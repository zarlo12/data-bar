// Datos para el cálculo de bebidas basado en las respuestas
export const beverageScoring = {
  Q1: {
    a: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    b: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    c: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 1,
    },
    d: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 1,
    },
    e: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
  },
  Q2: {
    a: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    b: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    c: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    d: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 1,
    },
    e: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
  },
  Q3: {
    a: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 1,
    },
    b: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    c: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    d: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 1,
    },
    e: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
  },
  Q4: {
    a: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    b: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    c: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    d: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 0,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
    e: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
  },
  Q5: {
    a: {
      "Affinity Spritz": 0,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 1,
    },
    b: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
    c: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
    d: {
      "Affinity Spritz": 0,
      "Conversion Mule": 1,
      "Engagement Tonic": 0,
      "Data Brew": 1,
      "Planters Punch": 0,
    },
    e: {
      "Affinity Spritz": 1,
      "Conversion Mule": 0,
      "Engagement Tonic": 1,
      "Data Brew": 0,
      "Planters Punch": 0,
    },
  },
};

// Preguntas del quiz
export const questions = [
  {
    id: "Q1",
    text: "¿Qué sabor define mejor tu estilo?",
    options: [
      { id: "a", text: "Dulce y vibrante 🍓" },
      { id: "b", text: "Refrescante y ligero 🍋" },
      { id: "c", text: "Intenso y fuerte 🍸" },
      { id: "d", text: "Exótico y diferente 🌺" },
      { id: "e", text: "Fresco y artesanal 🍺" },
    ],
  },
  {
    id: "Q2",
    text: "¿Cuál es tu plan favorito en la playa?",
    options: [
      { id: "a", text: "Bailar y disfrutar de la música 🎶" },
      { id: "b", text: "Relajarme bajo el sol ☀️" },
      { id: "c", text: "Jugar y hacer deporte ⚽" },
      { id: "d", text: "Explorar y descubrir nuevas experiencias 🌊" },
      { id: "e", text: "Brindar con una buena cerveza 🍻" },
    ],
  },
  {
    id: "Q3",
    text: "¿Qué valor te inspira más en una marca?",
    options: [
      { id: "a", text: "Innovación y tecnología 🤖" },
      { id: "b", text: "Cercanía y conexión humana 🤝" },
      { id: "c", text: "Diversión y entretenimiento 🎉" },
      { id: "d", text: "Impacto positivo y sostenibilidad 🌱" },
      { id: "e", text: "Autenticidad y sabor real 🍺" },
    ],
  },
  {
    id: "Q4",
    text: "¿Qué resultado buscas en tu campaña ideal?",
    options: [
      { id: "a", text: "Alcanzar a muchas personas (Reach) 🌍" },
      { id: "b", text: "Generar interacción y conversación (Engagement) 💬" },
      { id: "c", text: "Lograr conversiones y ventas (Conversion) 💳" },
      { id: "d", text: "Construir recordación de marca (Awareness) ⭐" },
      { id: "e", text: "Generar conexión emocional auténtica 🍻" },
    ],
  },
  {
    id: "Q5",
    text: "¿Qué ingrediente no puede faltar en tu mezcla ideal?",
    options: [
      { id: "a", text: "Creatividad 🎨" },
      { id: "b", text: "Precisión 🎯" },
      { id: "c", text: "Datos 📊" },
      { id: "d", text: "Tecnología 🧠" },
      { id: "e", text: "Un toque refrescante 🍹" },
    ],
  },
];

// Información de las bebidas
export const beverages = {
  "Affinity Spritz": {
    name: "Affinity Spritz",
    image: "/assets_base/7 Affinity Spritz.png",
    description:
      "Notas ácidas y directas, creadas para segmentar y llegar justo al público indicado.",
  },
  "Conversion Mule": {
    name: "Conversion Mule",
    image: "/assets_base/6 Conversion Mule.png",
    description:
      "Una mezcla potente que transforma cada interacción en resultados medibles.",
  },
  "Engagement Tonic": {
    name: "Engagement Tonic",
    image: "/assets_base/8 Engagement Tonic.png",
    description:
      "Burbujeante y constante, diseñado para mantener viva la conversación con tus audiencias.",
  },
  "Data Brew": {
    name: "Data Brew",
    image: "/assets_base/10 Data Brew.png",
    description:
      "Cerveza artesanal que mezcla precisión y frescura. Fría como los datos, potente como los resultados.",
  },
  "Planters Punch": {
    name: "Planters Punch",
    image: "/assets_base/9 Planters Punch.png",
    description:
      "Un golpe de sabor futurista que anticipa las tendencias y prepara la mezcla ideal.",
  },
};

// Función para calcular la bebida ganadora
export function calculateBeverage(answers) {
  const scores = {
    "Affinity Spritz": 0,
    "Conversion Mule": 0,
    "Engagement Tonic": 0,
    "Data Brew": 0,
    "Planters Punch": 0,
  };

  // Calcular puntuaciones basadas en las respuestas
  Object.keys(answers).forEach((questionId) => {
    const answer = answers[questionId];
    const questionScores = beverageScoring[questionId][answer];

    Object.keys(questionScores).forEach((beverage) => {
      scores[beverage] += questionScores[beverage];
    });
  });

  // Encontrar la bebida con mayor puntuación
  let maxScore = 0;
  let winningBeverage = "";

  Object.keys(scores).forEach((beverage) => {
    if (scores[beverage] > maxScore) {
      maxScore = scores[beverage];
      winningBeverage = beverage;
    }
  });

  return {
    beverage: winningBeverage,
    score: maxScore,
    allScores: scores,
  };
}
