export function setupTabs() {
  const homeLink = document.querySelector('[data-tab="home"]');
  const converterTab = document.querySelector('[data-tab="converter"]');
  const flashcardsLink = document.querySelector('[data-tab="flashcards"]');

  const homeSection = document.getElementById("home");
  const converterSection = document.getElementById("converter");
  const flashcardsSection = document.getElementById("flashcards");

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();

    // 要件どおり：
    // 単位セクションに hidden を追加
    // 暗記カードセクションに hidden を追加
    // ホームセクションから hidden を削除
    converterSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  converterLink.addEventListener("click", (event) => {
    event.preventDefault();
    homeSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });

  flashcardsLink.addEventListener("click", (event) => {
    event.preventDefault();
    homeSection.classList.add("hidden");
    converterSection.classList.add("hidden");
    flashcardsSection.classList.remove("hidden");
  });
}
