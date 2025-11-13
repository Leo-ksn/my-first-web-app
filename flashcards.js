// get flashcards list
async function fetchFlashcards() {
  try {
    const response = await fetch("/api/flashcards");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// 暗記カードを追加するデータをサーバーに送る関数を作成してください

export async function setupFlashcards() {
  const flashcardsList = document.getElementById("flashcards-list");
  function toggleMeaning(id) {
    const meaningElement = document.querySelector(`[data-meaning="${id}"]`);

    if (meaningElement.classList.contains("hidden")) {
      meaningElement.classList.remove("hidden");
    } else {
      meaningElement.classList.add("hidden");
    }
  }

  async function readFlashcards() {
    const wordList = await fetchFlashcards();
    renderFlashcards(wordList);
  }

  async function renderFlashcards(wordList) {
    flashcardsList.innerHTML = "";
    wordList.forEach((word) => {
      const flashcard = `
      <div class="flashcard">
        <div class="flashcard-content">
          <p class="flashcard-title">${word.word}</p>
          <div class="flashcard-icons">
            <button data-toggle="${word.id}" class="flashcard-meaning">
              <span class="ri-eye-line"></span>
            </button>
          </div>
        </div>
        <div data-meaning="${word.id}" class="hidden">
          <p class="flashcard-toggle">${word.meaning}</p>
        </div>
      </div>
      `;
      flashcardsList.innerHTML += flashcard;
    });
  }

  await readFlashcards();

  flashcardsList.addEventListener("click", (event) => {
    const btn = event.target.closest(".flashcard-meaning");
    if (btn) {
      const id = btn.getAttribute("data-toggle");
      toggleMeaning(id);
    } else {
      return;
    }
  });
  const addBtn = document.querySelector(".add-word");
  const modal = document.getElementById("word-modal");
  const form = document.getElementById("word-form");
  const cancelBtn = document.querySelector(".cancel-word");
  if (!addBtn || !modal || !form || !cancelBtn) return;

  // --- 表示/非表示 ---
  const showModal = () => {
    modal.classList.remove("hidden");
    document.getElementById("word-input")?.focus();
  };

  const hideModal = () => {
    modal.classList.add("hidden");
    form.reset();
  };

  // --- イベント登録 ---
  addBtn.addEventListener("click", showModal);
  cancelBtn.addEventListener("click", hideModal);

  // 背景（モーダル自体）をクリックしたら閉じる
  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });

  // --- サーバー保存（POST） ---
  async function createFlashcardData(wordData) {
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wordData),
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log("Failed to create flashcard:", err);
      return [];
    }
  }

  // --- Save ボタン（フォーム submit） ---
  async function save(event) {
    event.preventDefault(); // ページ遷移させない

    const wordVal = document.getElementById("word-input")?.value.trim() ?? "";
    const meaningVal =
      document.getElementById("meaning-input")?.value.trim() ?? "";

    // 新しい暗記カードデータ作成
    const newCard = {
      id: Date.now(),
      word: wordVal,
      meaning: meaningVal,
    };

    // サーバーに保存
    await createFlashcardData(newCard);

    // 最新データを再取得して表示
    await readFlashcards();

    // モーダルを閉じる（フォーム初期化もここで実行）
    hideModal();
  }

  // --- イベント登録 ---

  form.addEventListener("submit", save);
}
