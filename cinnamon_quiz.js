// This file is loaded dynamically.
// It creates a global variable 'plantQuestions' that the main script.js file can use.

window.plantQuestions = [
  {
    question: "The active compound Cinnamaldehyde is found in which spice?",
    answers: [
      { text: "Cinnamon", correct: true },
      { text: "Cardamom", correct: false },
      { text: "Clove", correct: false },
      { text: "Turmeric", correct: false },
    ],
  },
  {
    question: "Cinnamon is particularly noted for its ability to help...",
    answers: [
      { text: "Control blood sugar levels", correct: true },
      { text: "Improve eyesight", correct: false },
      { text: "Increase height", correct: false },
      { text: "Strengthen bones", correct: false },
    ],
  },
  {
    question: "Which soil type is best for growing Cinnamon?",
    answers: [
      { text: "Heavy clay", correct: false },
      { text: "Sandy loam", correct: true },
      { text: "Rich loamy soil", correct: false },
      { text: "Well-drained loamy", correct: false },
    ],
  },
  {
    question:
      "What is the scientific name for the most common type of Cinnamon?",
    answers: [
      { text: "Syzygium aromaticum", correct: false },
      { text: "Cinnamomum verum", correct: true },
      { text: "Withania Somnifera", correct: false },
      { text: "Curcuma longa", correct: false },
    ],
  },
  {
    question: "Large doses of Cinnamon should be avoided by people with...",
    answers: [
      { text: "Heart problems", correct: false },
      { text: "Kidney problems", correct: false },
      { text: "Liver problems", correct: true },
      { text: "Lung problems", correct: false },
    ],
  },
];
