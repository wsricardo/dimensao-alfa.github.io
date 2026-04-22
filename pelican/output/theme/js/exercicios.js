const quizData = [
  {
    question: "Se lim x→0 sen(x)/x = 1, qual ideia esse resultado reforça?",
    options: [
      "Que seno e identidade são sempre a mesma função.",
      "Que o comportamento local pode ser estudado por aproximação.",
      "Que toda função trigonométrica é linear perto da origem.",
    ],
    correct: 1,
    explanation:
      "O limite mostra que, muito perto de zero, a razão entre sen(x) e x se aproxima de 1. Isso é uma leitura local de comportamento.",
  },
  {
    question: "Em álgebra linear, o que as colunas de uma matriz representam geometricamente?",
    options: [
      "As imagens dos vetores da base canônica pela transformação.",
      "Os autovalores principais da transformação.",
      "Os pontos fixos do sistema linear.",
    ],
    correct: 0,
    explanation:
      "Cada coluna registra para onde vai um vetor da base canônica. Essa é uma das formas mais úteis de interpretar uma matriz.",
  },
  {
    question: "Na probabilidade condicional, o denominador muda porque:",
    options: [
      "A condição altera o espaço de casos ainda possíveis.",
      "Toda probabilidade condicional precisa ser menor que a original.",
      "Os eventos deixam de ser mensuráveis.",
    ],
    correct: 0,
    explanation:
      "Com uma nova condição, passamos a contar apenas os cenários compatíveis com essa informação. O universo relevante foi reduzido.",
  },
];

const quiz = document.getElementById("quiz");
const btn = document.getElementById("submit-btn");
const result = document.getElementById("result");

if (quiz && btn && result) {
  quiz.innerHTML = quizData
    .map(
      (item, index) => `
        <section class="quiz-card" data-question-index="${index}">
          <h2 class="quiz-question">${index + 1}. ${item.question}</h2>
          ${item.options
            .map(
              (option, optionIndex) => `
                <label class="quiz-option">
                  <input type="radio" name="q${index}" value="${optionIndex}">
                  <span>${option}</span>
                </label>
              `
            )
            .join("")}
        </section>
      `
    )
    .join("");

  btn.addEventListener("click", () => {
    let score = 0;

    const feedback = quizData.map((item, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      const card = document.querySelector(`[data-question-index="${index}"]`);
      const selectedValue = selected ? Number(selected.value) : null;
      const isCorrect = selectedValue === item.correct;

      if (card) {
        card.classList.remove("is-correct", "is-incorrect");
        card.classList.add(isCorrect ? "is-correct" : "is-incorrect");
      }

      if (isCorrect) {
        score += 1;
      }

      return `
        <div class="quiz-feedback-item">
          <strong>Questão ${index + 1}:</strong>
          ${item.explanation}
        </div>
      `;
    });

    result.innerHTML = `
      <p><strong>Acertos:</strong> ${score} de ${quizData.length}</p>
      <div class="quiz-feedback">${feedback.join("")}</div>
    `;
  });
}
