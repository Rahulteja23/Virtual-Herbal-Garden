// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question: "Tulsi is also commonly known as...",
    answers: [
      { text: "Holy Basil", correct: true },
      { text: "Queen of Spices", correct: false },
      { text: "Sweet Root", correct: false },
      { text: "Indian Ginseng", correct: false },
    ],
  },
  {
    question: "Which health area does Tulsi primarily support?",
    answers: [
      { text: "Bone strength", correct: false },
      { text: "Eye vision", correct: false },
      { text: "Respiratory health and immunity", correct: true },
      { text: "Muscle growth", correct: false },
    ],
  },
  {
    question: "The active compound Eugenol is prominent in which herb?",
    answers: [
      { text: "Turmeric", correct: false },
      { text: "Tulsi", correct: true },
      { text: "Cinnamon", correct: false },
      { text: "Ashwagandha", correct: false },
    ],
  },
  {
    question: "In Ayurveda, Tulsi is known as the...",
    answers: [
      { text: '"King of Herbs"', correct: false },
      { text: '"Golden Spice"', correct: false },
      { text: '"Queen of Herbs"', correct: true },
      { text: '"Miracle Root"', correct: false },
    ],
  },
  {
    question: "What is a common reason to avoid Tulsi?",
    answers: [
      { text: "If you have high blood pressure", correct: false },
      { text: "If you are on blood-thinning medication", correct: true },
      { text: "If you have a nut allergy", correct: false },
      { text: "If you are lactose intolerant", correct: false },
    ],
  },
];
