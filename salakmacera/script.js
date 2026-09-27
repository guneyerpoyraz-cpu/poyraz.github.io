const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}
document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

/* SALAK MACERA */
const story = document.getElementById("story");
const choices = document.getElementById("choices");
const restartStory = document.getElementById("restartStory");

const scenes = {
  start: {
    text: "Buzdolabını açıyorsun. İçeride sadece bir yoğurt ve gizemli bir patates var. Patates sana bakıyor gibi. Ne yapıyorsun?",
    choices: [
      ["Patatesi sorgula 🥔", "potato"],
      ["Yoğurdu alıp kaç 🥛", "yogurt"],
      ["Buzdolabını kapatıp hiçbir şey olmamış gibi davran 😭", "close"]
    ]
  },
  potato: {
    text: "Patates bir anda konuşuyor: “Sonunda geldin.” Sen: “...” Patates: “Çabuk karar ver.”",
    choices: [
      ["“Sen neden konuşuyorsun?”", "ending1"],
      ["Patatesi ciddiye al ve görevi kabul et", "ending2"]
    ]
  },
  yogurt: {
    text: "Yoğurdu aldığın anda evin kapısı çalıyor. Kapının arkasından bir ses: “YOĞURDU VER.”",
    choices: [
      ["Yoğurdu savun 🛡️", "ending3"],
      ["Yoğurdu ver ve hayatına devam et", "ending4"]
    ]
  },
  close: {
    text: "Buzdolabını kapattın. 3 saniye sonra tekrar açtın. Patates artık yok. Ekranda “SALAK MACERA TAMAMLANDI” yazıyor.",
    choices: [
      ["Tekrar dene", "start"]
    ]
  },
  ending1: {
    text: "Patates: “Ben de bilmiyorum.” İkiniz 10 saniye boyunca sessizce birbirinize baktınız. Son. 🤝",
    choices: [["Baştan oyna", "start"]]
  },
  ending2: {
    text: "Patates seni seçti. Görevin: marketten 3 paket cips almak. Kahramanlık bazen böyledir. 🫡",
    choices: [["Baştan oyna", "start"]]
  },
  ending3: {
    text: "Yoğurdu korudun. Kapıdaki kişi kaçtı. Mahalle seni yoğurt kahramanı ilan etti. 🥛🏆",
    choices: [["Baştan oyna", "start"]]
  },
  ending4: {
    text: "Yoğurdu verdin. Kapıdaki kişi teşekkür etti ve gitti. İçeride kalan patates sana baktı: “Korkak.” 😭",
    choices: [["Baştan oyna", "start"]]
  }
};

function renderScene(id) {
  const scene = scenes[id];
  story.textContent = scene.text;
  choices.innerHTML = "";
  scene.choices.forEach(([label, next]) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = label;
    btn.onclick = () => renderScene(next);
    choices.appendChild(btn);
  });
}
renderScene("start");

/* MATEMATİK */
const levels = {
  easy: [
    ["5 + 3 = ?", ["6","7","8","9"], "8"],
    ["10 - 4 = ?", ["4","5","6","7"], "6"],
    ["2 × 5 = ?", ["7","8","10","12"], "10"],
    ["12 ÷ 3 = ?", ["3","4","5","6"], "4"],
    ["7 + 6 = ?", ["12","13","14","15"], "13"]
  ],
  medium: [
    ["15 × 4 = ?", ["50","60","70","80"], "60"],
    ["72 ÷ 8 = ?", ["7","8","9","10"], "9"],
    ["25 + 37 = ?", ["52","62","72","82"], "62"],
    ["100 - 46 = ?", ["44","54","64","74"], "54"],
    ["9 × 7 = ?", ["56","63","72","81"], "63"]
  ],
  zort: [
    ["18 × 7 = ?", ["116","126","136","146"], "126"],
    ["144 ÷ 12 = ?", ["10","11","12","13"], "12"],
    ["35 + 48 - 19 = ?", ["54","64","74","84"], "64"],
    ["13 × 6 + 8 = ?", ["76","78","86","88"], "86"],
    ["200 ÷ 5 + 17 = ?", ["47","57","67","77"], "57"]
  ]
};

let currentQuestions = [];
let current = 0;
let score = 0;
let levelName = "";

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");
const scoreEl = document.getElementById("score");

document.querySelectorAll(".level").forEach(btn => {
  btn.onclick = () => startQuiz(btn.dataset.level);
});

function startQuiz(level) {
  levelName = level;
  currentQuestions = levels[level];
  current = 0;
  score = 0;
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[current];
  questionNumber.textContent = `Soru ${current + 1}/${currentQuestions.length}`;
  scoreEl.textContent = `Skor: ${score}`;
  question.textContent = q[0];
  answers.innerHTML = "";

  q[1].forEach(answer => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    btn.onclick = () => answerQuestion(btn, answer, q[2]);
    answers.appendChild(btn);
  });
}

function answerQuestion(button, answer, correct) {
  document.querySelectorAll(".answer").forEach(b => b.disabled = true);
  if (answer === correct) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".answer").forEach(b => {
      if (b.textContent === correct) b.classList.add("correct");
    });
  }
  scoreEl.textContent = `Skor: ${score}`;
  setTimeout(() => {
    current++;
    if (current < currentQuestions.length) showQuestion();
    else finishQuiz();
  }, 750);
}

function finishQuiz() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  const total = currentQuestions.length;
  let message = score === total ? "MÜKEMMEL! 🔥" :
                score >= 3 ? "Fena değil 😎" :
                score >= 1 ? "Biraz daha çalış 😭" :
                "MATEMATİK SENİ ZORTLADI 💀";

  result.innerHTML = `
    <h2>${message}</h2>
    <p><strong>${total} sorudan ${score} doğru</strong> yaptın.</p>
    <button class="primary" onclick="startQuiz('${levelName}')">🔄 Tekrar Dene</button>
  `;
}
