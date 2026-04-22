function normalizeLibraryText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function tokenizeQuery(value) {
  return normalizeLibraryText(value)
    .split(/\s+/)
    .filter(Boolean);
}

function readLibraryFilters(root) {
  return {
    query: root.querySelector("[data-library-query]"),
    topic: root.querySelector("[data-library-topic]"),
    type: root.querySelector("[data-library-type]"),
    level: root.querySelector("[data-library-level]"),
    language: root.querySelector("[data-library-language]"),
    clear: root.querySelector("[data-library-clear]"),
    count: root.querySelector("[data-library-count]"),
    grid: root.querySelector("[data-library-grid]"),
    empty: root.querySelector("[data-library-empty]"),
  };
}

function scoreLibraryCard(card, tokens) {
  if (tokens.length === 0) {
    return Number(card.dataset.featured || 0);
  }

  const title = normalizeLibraryText(card.dataset.title);
  const summary = normalizeLibraryText(card.dataset.summary);
  const topic = normalizeLibraryText(card.dataset.topic);
  const type = normalizeLibraryText(card.dataset.type);
  const level = normalizeLibraryText(card.dataset.level);
  const authors = normalizeLibraryText(card.dataset.authors);
  const tags = normalizeLibraryText(card.dataset.tags);
  const search = normalizeLibraryText(card.dataset.search);

  let score = 0;

  for (const token of tokens) {
    if (title.includes(token)) score += 18;
    if (topic.includes(token) || type.includes(token) || level.includes(token)) score += 10;
    if (authors.includes(token) || tags.includes(token)) score += 8;
    if (summary.includes(token)) score += 5;
    if (search.includes(token)) score += 2;
  }

  return score;
}

function readParams(filters) {
  const params = new URLSearchParams(window.location.search);

  if (filters.query && params.has("q")) filters.query.value = params.get("q");
  if (filters.topic && params.has("topic")) filters.topic.value = params.get("topic");
  if (filters.type && params.has("type")) filters.type.value = params.get("type");
  if (filters.level && params.has("level")) filters.level.value = params.get("level");
  if (filters.language && params.has("language")) filters.language.value = params.get("language");
}

function writeParams(filters) {
  const params = new URLSearchParams();

  const entries = [
    ["q", filters.query?.value],
    ["topic", filters.topic?.value],
    ["type", filters.type?.value],
    ["level", filters.level?.value],
    ["language", filters.language?.value],
  ];

  for (const [key, value] of entries) {
    if (value) params.set(key, value);
  }

  const nextUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.replaceState({}, "", nextUrl);
}

function applyLibraryFilters(root, filters, cards) {
  const queryTokens = tokenizeQuery(filters.query?.value || "");
  const selectedTopic = normalizeLibraryText(filters.topic?.value || "");
  const selectedType = normalizeLibraryText(filters.type?.value || "");
  const selectedLevel = normalizeLibraryText(filters.level?.value || "");
  const selectedLanguage = normalizeLibraryText(filters.language?.value || "");

  const matches = [];

  cards.forEach((card) => {
    const cardTopic = normalizeLibraryText(card.dataset.topic);
    const cardType = normalizeLibraryText(card.dataset.type);
    const cardLevel = normalizeLibraryText(card.dataset.level);
    const cardLanguage = normalizeLibraryText(card.dataset.language);

    const matchesTopic = !selectedTopic || cardTopic === selectedTopic;
    const matchesType = !selectedType || cardType === selectedType;
    const matchesLevel = !selectedLevel || cardLevel === selectedLevel;
    const matchesLanguage = !selectedLanguage || cardLanguage === selectedLanguage;

    const score = scoreLibraryCard(card, queryTokens);
    const matchesQuery = queryTokens.length === 0 || score > 0;

    if (matchesTopic && matchesType && matchesLevel && matchesLanguage && matchesQuery) {
      matches.push({ card, score });
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });

  matches
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return Number(left.card.dataset.order || 0) - Number(right.card.dataset.order || 0);
    })
    .forEach(({ card }) => {
      filters.grid?.appendChild(card);
    });

  if (filters.count) {
    filters.count.textContent =
      matches.length === 1
        ? "1 material encontrado."
        : `${matches.length} materiais encontrados.`;
  }

  if (filters.empty) {
    filters.empty.hidden = matches.length !== 0;
  }

  writeParams(filters);
}

document.querySelectorAll("[data-library-root]").forEach((root) => {
  const filters = readLibraryFilters(root);
  const cards = Array.from(root.querySelectorAll("[data-library-card]"));

  if (!cards.length) return;

  readParams(filters);
  applyLibraryFilters(root, filters, cards);

  [filters.query, filters.topic, filters.type, filters.level, filters.language]
    .filter(Boolean)
    .forEach((control) => {
      control.addEventListener("input", () => applyLibraryFilters(root, filters, cards));
      control.addEventListener("change", () => applyLibraryFilters(root, filters, cards));
    });

  if (filters.clear) {
    filters.clear.addEventListener("click", () => {
      if (filters.query) filters.query.value = "";
      if (filters.topic) filters.topic.value = "";
      if (filters.type) filters.type.value = "";
      if (filters.level) filters.level.value = "";
      if (filters.language) filters.language.value = "";

      applyLibraryFilters(root, filters, cards);
    });
  }
});
