// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question: "What is the active compound in Clove that provides pain relief?",
    answers: [
      { text: "Curcumin", correct: false },
      { text: "Eugenol", correct: true },
      { text: "Cineole", correct: false },
      { text: "Withanolides", correct: false },
    ],
  },
  {
    question: "Clove is traditionally used for relieving pain from...",
    answers: [
      { text: "Headaches", correct: false },
      { text: "Stomach aches", correct: false },
      { text: "Toothaches", correct: true },
      { text: "Muscle soreness", correct: false },
    ],
  },
  {
    question: "What is the scientific name for Clove?",
    answers: [
      { text: "Cinnamomum verum", correct: false },
      { text: "Syzygium aromaticum", correct: true },
      { text: "Withania Somnifera", correct: false },
      { text: "Curcuma longa", correct: false },
    ],
  },
  {
    question: "Besides pain relief, what is another benefit of Clove?",
    answers: [
      { text: "Improving eyesight", correct: false },
      { text: "Fighting microbial infections", correct: true },
      { text: "Strengthening bones", correct: false },
      { text: "Increasing alertness", correct: false },
    ],
  },
  {
    question:
      "How long does it typically take for a Clove tree to have its first harvest?",
    answers: [
      { text: "1-2 years", correct: false },
      { text: "3-4 years", correct: false },
      { text: "6-8 years", correct: true },
      { text: "10+ years", correct: false },
    ],
  },
];
