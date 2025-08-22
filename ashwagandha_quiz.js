// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question: "What is the scientific name for Ashwagandha?",
    answers: [
      { text: "Withania Somnifera", correct: true },
      { text: "Curcuma Longa", correct: false },
      { text: "Ocimum Tenuiflorum", correct: false },
      { text: "Syzygium Aromaticum", correct: false },
    ],
  },
  {
    question: "Ashwagandha is best known for its ability to...",
    answers: [
      { text: "Aid digestion", correct: false },
      { text: "Help the body manage stress", correct: true },
      { text: "Freshen breath", correct: false },
      { text: "Control blood sugar", correct: false },
    ],
  },
  {
    question: "Which active compound is found in Ashwagandha?",
    answers: [
      { text: "Eugenol", correct: false },
      { text: "Curcumin", correct: false },
      { text: "Withanolides", correct: true },
      { text: "Cineole", correct: false },
    ],
  },
  {
    question: "What type of herb is Ashwagandha?",
    answers: [
      { text: "A culinary herb", correct: false },
      { text: "A stimulant herb", correct: false },
      { text: "An adaptogenic herb", correct: true },
      { text: "A diuretic herb", correct: false },
    ],
  },
  {
    question: "For how long has Ashwagandha been used in Ayurvedic medicine?",
    answers: [
      { text: "Over 3,000 years", correct: true },
      { text: "About 500 years", correct: false },
      { text: "Less than 100 years", correct: false },
      { text: "Around 1,000 years", correct: false },
    ],
  },
];
