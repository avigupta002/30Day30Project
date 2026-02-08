const quizData = [
  {
    question: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
    correct: 0
  },
  {
    question: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "Yuri Gagarin"],
    correct: 1
  },
  {
    question: "What does “HTML” stand for?",
    options: [
      "HighText Machine Language",
      "HyperText Markup Language",
      "Hyper Tool Multi Language",
      "Home Tool Markup Language"
    ],
    correct: 1
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/* */", "<!-- -->"],
    correct: 1
  },
  {
    question: "Which company developed the Windows operating system?",
    options: ["Apple", "IBM", "Microsoft", "Google"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resultEl = document.getElementById("result");
const statusEl = document.getElementById("status");
const stepsEl = document.getElementById("steps");
const progress = document.createElement("div");

quizData.forEach((_, index) => {
  const step = document.createElement("div");
  step.classList.add("step");
  if (index === 0) step.classList.add("active");
  step.textContent = index + 1;
  stepsEl.appendChild(step);
});

const steps = document.querySelectorAll(".step");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
    optionsEl.appendChild(label);
  });

  statusEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  updateSteps();
}

function updateSteps() {
  steps.forEach((s, i) => {
    s.classList.remove("active");
    if (i <= currentQuestion) s.classList.add("active");
  });

  const actives = document.querySelectorAll(".active");
  document.querySelector(".progress").style.width =
    ((actives.length - 1) / (steps.length - 1)) * 100 + "%";

  prevBtn.disabled = currentQuestion === 0;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name='option']:checked");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (parseInt(selected.value) === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.style.display = "block";
  resultEl.textContent = `You scored ${score} out of ${quizData.length}`;
  steps.forEach(s => s.classList.add("active"));
}

loadQuestion();
