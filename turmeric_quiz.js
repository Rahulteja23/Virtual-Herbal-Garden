// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question:
      "What is the active compound in Turmeric known for its anti-inflammatory effects?",
    answers: [
      { text: "Curcumin", correct: true },
      { text: "Withanolides", correct: false },
      { text: "Eugenol", correct: false },
      { text: "Cineole", correct: false },
    ],
  },
  {
    question: "Turmeric is often recommended for individuals experiencing...",
    answers: [
      { text: "Hair loss", correct: false },
      { text: "Arthritis and joint pain", correct: true },
      { text: "Sleep disorders", correct: false },
      { text: "High blood pressure", correct: false },
    ],
  },
  {
    question: "What is the scientific name for Turmeric?",
    answers: [
      { text: "Curcuma longa", correct: true },
      { text: "Withania Somnifera", correct: false },
      { text: "Ocimum Tenuiflorum", correct: false },
      { text: "Cinnamomum verum", correct: false },
    ],
  },
  {
    question:
      "Besides inflammation, what is another major benefit of Turmeric?",
    answers: [
      { text: "It is a powerful antioxidant", correct: true },
      { text: "It helps build muscle", correct: false },
      { text: "It improves vision", correct: false },
      { text: "It whitens teeth", correct: false },
    ],
  },
  {
    question: "How long does Turmeric typically take to grow before harvest?",
    answers: [
      { text: "1-2 months", correct: false },
      { text: "3-5 months", correct: false },
      { text: "7-9 months", correct: true },
      { text: "Over a year", correct: false },
    ],
  },
];
