// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question: "Cardamom is often referred to as the...",
    answers: [
      { text: "King of Herbs", correct: false },
      { text: "Queen of Spices", correct: true },
      { text: "Golden Spice", correct: false },
      { text: "Sacred Leaf", correct: false },
    ],
  },
  {
    question: "What is a primary medicinal use for Cardamom?",
    answers: [
      { text: "Supporting digestive health", correct: true },
      { text: "Reducing stress", correct: false },
      { text: "Improving sleep", correct: false },
      { text: "Building muscle", correct: false },
    ],
  },
  {
    question: "Which active compound is found in Cardamom?",
    answers: [
      { text: "Curcumin", correct: false },
      { text: "Withanolides", correct: false },
      { text: "Cinnamaldehyde", correct: false },
      { text: "Cineole", correct: true },
    ],
  },
  {
    question: "What kind of flavor profile does Cardamom have?",
    answers: [
      { text: "Spicy and hot", correct: false },
      { text: "Sweet and slightly citrusy", correct: true },
      { text: "Bitter and earthy", correct: false },
      { text: "Salty and savory", correct: false },
    ],
  },
  {
    question: "People with which condition should typically avoid Cardamom?",
    answers: [
      { text: "High cholesterol", correct: false },
      { text: "Diabetes", correct: false },
      { text: "Gallstones", correct: true },
      { text: "Asthma", correct: false },
    ],
  },
];
