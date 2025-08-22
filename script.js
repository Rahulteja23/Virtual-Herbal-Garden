document.addEventListener("DOMContentLoaded", () => {
  // --- CAROUSEL LOGIC ---
  let nextButton = document.getElementById("next");
  let prevButton = document.getElementById("prev");
  let carousel = document.querySelector(".carousel");
  let listHTML = document.querySelector(".carousel .list");
  let seeMoreButtons = document.querySelectorAll(".seeMore");
  let backButton = document.getElementById("back");

  nextButton.onclick = function () {
    showSlider("next");
  };
  prevButton.onclick = function () {
    showSlider("prev");
  };
  let unAcceptClick;
  const showSlider = (type) => {
    nextButton.style.pointerEvents = "none";
    prevButton.style.pointerEvents = "none";

    carousel.classList.remove("next", "prev");
    let items = document.querySelectorAll(".carousel .list .item");
    if (type === "next") {
      listHTML.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      listHTML.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }
    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }, 2000);
  };
  seeMoreButtons.forEach((button) => {
    button.onclick = function () {
      carousel.classList.remove("next", "prev");
      carousel.classList.add("showDetail");
    };
  });
  backButton.onclick = function () {
    carousel.classList.remove("showDetail");
  };

  // --- QUIZ LOGIC ---
  const quizModal = document.getElementById("quiz-modal");
  const closeQuizBtn = document.getElementById("close-quiz");
  const quizButtons = document.querySelectorAll(".quiz-btn");
  const quizTitleElement = document.getElementById("quiz-title");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextQuestionBtn = document.getElementById("next-question-btn");
  const scoreElement = document.getElementById("score");
  const progressBar = document.getElementById("quiz-progress-bar");
  const progressText = document.getElementById("progress-text");

  // Results Screen Elements
  const resultsScreen = document.getElementById("results-screen");
  const quizBody = document.getElementById("quiz-body");
  const quizFooter = document.getElementById("quiz-footer");
  const finalScoreElement = document.getElementById("final-score");
  const totalQuestionsElement = document.getElementById("total-questions");
  const badgeIconElement = document.getElementById("badge-icon");
  const badgeNameElement = document.getElementById("badge-name");
  const restartQuizBtn = document.getElementById("restart-quiz-btn");

  // "Add Info" Button
  const addInfoButtons = document.querySelectorAll(".add-info-btn");

  let currentQuizQuestions = [];
  let currentQuestionIndex;
  let score = 0;
  let currentPlantName = "";

  // --- Quiz Event Listeners ---
  quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plantName = button.closest(".item").querySelector(".topic").innerText;
      loadQuizScript(plantName);
    });
  });

  closeQuizBtn.addEventListener("click", () => {
    quizModal.style.display = "none";
  });

  nextQuestionBtn.addEventListener("click", () => {
    if (nextQuestionBtn.innerText === "Show Results") {
      showResults();
    } else {
      currentQuestionIndex++;
      setNextQuestion();
    }
  });

  restartQuizBtn.addEventListener("click", () =>
    startQuiz(currentPlantName, window.plantQuestions)
  );

  addInfoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const extraInfo = prompt(
        "Do you have additional information to add about this herb?"
      );
      if (extraInfo) {
        alert(
          "Thank you for your contribution! It will be reviewed by our team."
        );
      }
    });
  });

  // --- Quiz Functions ---
  function loadQuizScript(plantName) {
    const scriptSrc = `${plantName.toLowerCase()}_quiz.js`;
    const oldScript = document.getElementById("quiz-script");
    if (oldScript) {
      oldScript.remove();
    }
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.id = "quiz-script";
    script.onload = () => {
      if (window.plantQuestions) {
        startQuiz(plantName, window.plantQuestions);
      } else {
        alert(`Could not load quiz for ${plantName}.`);
      }
    };
    script.onerror = () => {
      alert(`The quiz for ${plantName} is not available yet.`);
    };
    document.head.appendChild(script);
  }

  function startQuiz(plantName, plantQuestions) {
    currentPlantName = plantName;
    const questionsPerQuiz = 5;

    if (!plantQuestions || plantQuestions.length < questionsPerQuiz) {
      alert(`Error: Not enough questions available for ${plantName}.`);
      return;
    }

    currentQuizQuestions = plantQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsPerQuiz);
    score = 0;
    scoreElement.innerText = score;
    currentQuestionIndex = 0;
    quizTitleElement.innerText = `${plantName} Knowledge Challenge!`;

    resultsScreen.classList.add("hide");
    quizBody.classList.remove("hide");
    quizFooter.classList.remove("hide");
    nextQuestionBtn.classList.add("hide");

    quizModal.style.display = "flex";
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(currentQuizQuestions[currentQuestionIndex]);
    updateProgress();
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
      score++;
      scoreElement.innerText = score;
    }

    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct === "true");
      button.disabled = true;
    });

    if (currentQuizQuestions.length > currentQuestionIndex + 1) {
      nextQuestionBtn.innerText = "Next";
    } else {
      nextQuestionBtn.innerText = "Show Results";
    }
    nextQuestionBtn.classList.remove("hide");
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }

  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }

  function resetState() {
    nextQuestionBtn.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function updateProgress() {
    const total = currentQuizQuestions.length;
    const progressPercentage = ((currentQuestionIndex + 1) / total) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.innerText = `Question ${currentQuestionIndex + 1}/${total}`;
  }

  function showResults() {
    quizBody.classList.add("hide");
    quizFooter.classList.add("hide");
    resultsScreen.classList.remove("hide");

    const total = currentQuizQuestions.length;
    finalScoreElement.innerText = score;
    totalQuestionsElement.innerText = total;

    let badgeName, badgeIcon, badgeColor;
    const percentage = (score / total) * 100;

    if (percentage >= 80) {
      badgeName = "Golden Flower";
      badgeIcon = "fas fa-crown";
      badgeColor = "#FFD700";
    } else if (percentage >= 50) {
      badgeName = "Silver Leaf";
      badgeIcon = "fas fa-leaf";
      badgeColor = "#C0C0C0";
    } else {
      badgeName = "Bronze Sprout";
      badgeIcon = "fas fa-seedling";
      badgeColor = "#CD7F32";
    }

    badgeNameElement.innerText = badgeName;
    badgeIconElement.className = badgeIcon;
    badgeIconElement.style.color = badgeColor;
  }

  // --- MAP LOGIC ---
  const mapModal = document.getElementById("map-modal");
  const closeMapBtn = document.getElementById("close-map");
  const mapTitleElement = document.getElementById("map-title");
  const mapButtons = document.querySelectorAll(".map-btn");

  let map;

  const plantLocations = {
    Ashwagandha: [
      { city: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873, desc: "Major hub for Ashwagandha due to arid climate and sandy soil." },
      { city: "Ujjain, Madhya Pradesh", lat: 23.1765, lng: 75.7885, desc: "Key agricultural center for Ashwagandha production." },
      { city: "Ahmedabad, Gujarat", lat: 23.0225, lng: 72.5714, desc: "Supported by strong irrigation systems for Ashwagandha farming." }
    ],
    Tulsi: [
      { city: "Lucknow, Uttar Pradesh", lat: 26.8467, lng: 80.9462, desc: "Known for medicinal herb cultivation, including Tulsi." },
      { city: "Coimbatore, Tamil Nadu", lat: 11.0168, lng: 76.9558, desc: "Favorable climate supports Tulsi growth." },
      { city: "Varanasi, Uttar Pradesh", lat: 25.3176, lng: 82.9739, desc: "Notable for spiritual and medicinal Tulsi cultivation." }
    ],
    Cardamom: [
      { city: "Idukki, Kerala", lat: 9.9189, lng: 77.1025, desc: "Major hub producing ~58.6% of India's cardamom." },
      { city: "Gangtok, Sikkim", lat: 27.3389, lng: 88.6065, desc: "Contributes ~19.8%, known for large cardamom." },
      { city: "Kohima, Nagaland", lat: 25.6586, lng: 94.1053, desc: "Accounts for ~8.4% of India's cardamom production." },
      { city: "Itanagar, Arunachal Pradesh", lat: 27.0844, lng: 93.6053, desc: "Small but notable cardamom cultivation (~5%)." },
      { city: "Hassan, Karnataka", lat: 13.0068, lng: 76.0996, desc: "Contributes ~3.5% to India's cardamom." }
    ],
    Clove: [
      { city: "Kanyakumari, Tamil Nadu", lat: 8.0883, lng: 77.5385, desc: "Dominates with ~52% of India's clove production (65% of Tamil Nadu's 80% share)." },
      { city: "Hassan, Karnataka", lat: 13.0068, lng: 76.0996, desc: "Contributes ~10.8% to India's clove production." },
      { city: "Kozhikode, Kerala", lat: 11.2588, lng: 75.7804, desc: "Accounts for ~5.8% of India's clove production." }
    ],
    Cinnamon: [
      { city: "Shillong, Meghalaya", lat: 25.5788, lng: 91.8933, desc: "Leads with ~70.3% of India's cinnamon production." },
      { city: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639, desc: "Contributes ~24.8% to India's cinnamon production." },
      { city: "Kozhikode, Kerala", lat: 11.2588, lng: 75.7804, desc: "Minor contributor at ~2% of India's cinnamon." }
    ],
    Turmeric: [
      { city: "Erode, Tamil Nadu", lat: 11.3410, lng: 77.7172, desc: "Known as the 'Turmeric City,' produces ~43% of Tamil Nadu's turmeric, a GI product." },
      { city: "Duggirala, Andhra Pradesh", lat: 16.3267, lng: 80.6285, desc: "Major trading hub handling ~10% of India's turmeric." },
      { city: "Sangli, Maharashtra", lat: 16.8524, lng: 74.5815, desc: "Supplies ~70% of Maharashtra's turmeric, a major trading hub." },
      { city: "Jaintia Hills, Meghalaya", lat: 25.4600, lng: 92.3000, desc: "Known for Lakadong turmeric, grown in a village cluster." }
    ]
  };

  mapButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plantName = button.closest(".item").querySelector(".topic").innerText;
      showMap(plantName);
    });
  });

  closeMapBtn.addEventListener("click", () => {
    mapModal.style.display = "none";
    if (map) {
      map.remove();
    }
  });

  function showMap(plantName) {
    mapTitleElement.innerText = `${plantName} Cultivation Locations`;
    mapModal.style.display = "flex";

    map = L.map("map").setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = plantLocations[plantName] || [];
    locations.forEach(location => {
      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(`<b>${location.city}</b><br>${location.desc}`);
    });
  }
});
