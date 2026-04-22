function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeQuestions(payload) {
  const rawQuestions = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.questions)
      ? payload.questions
      : null;

  if (!rawQuestions || rawQuestions.length === 0) {
    throw new Error("Nenhuma questão válida foi encontrada.");
  }

  return rawQuestions.map((question, index) => {
    if (
      !question ||
      typeof question.question !== "string" ||
      !Array.isArray(question.options) ||
      question.options.length < 2 ||
      typeof question.correct !== "number"
    ) {
      throw new Error(`A questão ${index + 1} está malformada.`);
    }

    return {
      question: question.question,
      options: question.options.map((option) => String(option)),
      correct: question.correct,
      explanation: question.explanation ? String(question.explanation) : "",
    };
  });
}

function renderQuestionCard(item, index) {
  return `
    <section class="quiz-card" data-question-index="${index}">
      <h2 class="quiz-question">${index + 1}. ${escapeHtml(item.question)}</h2>
      ${item.options
        .map(
          (option, optionIndex) => `
            <label class="quiz-option">
              <input type="radio" name="q${index}" value="${optionIndex}">
              <span>${escapeHtml(option)}</span>
            </label>
          `
        )
        .join("")}
    </section>
  `;
}

function evaluateQuiz(root, questions) {
  const result = root.querySelector("[data-quiz-result]");
  let score = 0;

  const feedback = questions.map((item, index) => {
    const selected = root.querySelector(`input[name="q${index}"]:checked`);
    const card = root.querySelector(`[data-question-index="${index}"]`);
    const selectedValue = selected ? Number(selected.value) : null;
    const isCorrect = selectedValue === item.correct;

    if (card) {
      card.classList.remove("is-correct", "is-incorrect", "is-unanswered");

      if (selectedValue === null) {
        card.classList.add("is-unanswered");
      } else {
        card.classList.add(isCorrect ? "is-correct" : "is-incorrect");
      }
    }

    if (isCorrect) {
      score += 1;
    }

    const explanation = item.explanation
      ? escapeHtml(item.explanation)
      : "Revise a questão e compare sua leitura com a alternativa correta.";

    return `
      <div class="quiz-feedback-item">
        <strong>Questão ${index + 1}:</strong>
        ${explanation}
      </div>
    `;
  });

  if (result) {
    result.innerHTML = `
      <p><strong>Acertos:</strong> ${score} de ${questions.length}</p>
      <div class="quiz-feedback">${feedback.join("")}</div>
    `;
  }
}

function renderQuiz(root, questions) {
  const state = root.querySelector("[data-quiz-state]");
  const list = root.querySelector("[data-quiz-list]");
  const actions = root.querySelector("[data-quiz-actions]");
  const submit = root.querySelector("[data-quiz-submit]");
  const result = root.querySelector("[data-quiz-result]");

  if (!list || !actions || !submit) {
    return;
  }

  list.innerHTML = questions.map(renderQuestionCard).join("");
  list.hidden = false;
  actions.hidden = false;

  if (state) {
    state.hidden = true;
    state.textContent = "";
  }

  if (result) {
    result.innerHTML = "";
  }

  submit.addEventListener("click", () => evaluateQuiz(root, questions));
}

async function bootQuiz(root) {
  const state = root.querySelector("[data-quiz-state]");
  const source = root.dataset.quizSource;

  if (!source) {
    if (state) {
      state.classList.add("is-error");
      state.textContent = "Nenhum arquivo de questões foi informado para esta coleção.";
    }
    return;
  }

  try {
    const response = await fetch(source, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao carregar o arquivo (${response.status}).`);
    }

    const payload = await response.json();
    const questions = normalizeQuestions(payload);
    renderQuiz(root, questions);
  } catch (error) {
    if (state) {
      state.classList.add("is-error");
      state.textContent = `Nao foi possivel carregar esta lista agora. ${error.message}`;
    }
  }
}

document.querySelectorAll("[data-quiz-root]").forEach((root) => {
  bootQuiz(root);
});
