import { categories, points, questions } from "./data.js";

window.startGame = startGame;
window.toggleFullscreen = toggleFullscreen;
window.restartGame = restartGame;
window.changeScore = changeScore;
window.selectAnsweringTeam = selectAnsweringTeam;
window.clearAnsweringTeam = clearAnsweringTeam;
window.scoreQuestion = scoreQuestion;
window.showAnswer = showAnswer;
window.exitQuestion = exitQuestion;

/* =====================================================
   LOCAL STORAGE
===================================================== */

const STORAGE_KEY = "svoja-igra";

/* =====================================================
   СОСТОЯНИЕ ИГРЫ
===================================================== */

let teamNames = ["", ""];

let scores = [0, 0];

let usedQuestions = new Set();

let currentQuestion = null;

let selectedAnsweringTeam = null;

/* =====================================================
   СОХРАНИТЬ ИГРУ
===================================================== */

function saveGame() {

  const gameData = {
    teamNames: teamNames,
    scores: scores,

    usedQuestions:
      Array.from(usedQuestions),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(gameData),
  );
}

/* =====================================================
   ЗАГРУЗИТЬ ИГРУ
===================================================== */

function loadGame() {

  const savedGame =
    localStorage.getItem(STORAGE_KEY);

  if (!savedGame) {
    return false;
  }

  try {

    const data =
      JSON.parse(savedGame);

    /* -------------------------
       Названия команд
    ------------------------- */

    if (
      Array.isArray(data.teamNames) &&
      data.teamNames.length === 2
    ) {

      teamNames = [
        data.teamNames[0] || "",
        data.teamNames[1] || "",
      ];
    }

    /* -------------------------
       Очки
    ------------------------- */

    if (
      Array.isArray(data.scores) &&
      data.scores.length === 2
    ) {

      scores = [
        Number(data.scores[0]) || 0,
        Number(data.scores[1]) || 0,
      ];
    }

    /* -------------------------
       Использованные вопросы
    ------------------------- */

    if (
      Array.isArray(data.usedQuestions)
    ) {

      usedQuestions =
        new Set(
          data.usedQuestions,
        );
    }

    return true;

  } catch (error) {

    console.error(
      "Ошибка загрузки игры:",
      error,
    );

    localStorage.removeItem(
      STORAGE_KEY,
    );

    return false;
  }
}

/* =====================================================
   START GAME
===================================================== */

function startGame() {

  const team1Input =
    document.getElementById(
      "team1Input",
    );

  const team2Input =
    document.getElementById(
      "team2Input",
    );

  const team1 =
    team1Input.value.trim();

  const team2 =
    team2Input.value.trim();

  /*
     Названия команд
  */

  teamNames = [
    team1,
    team2,
  ];

  /*
     Начинаем новую игру
  */

  scores = [0, 0];

  usedQuestions.clear();

  currentQuestion = null;

  selectedAnsweringTeam = null;

  /*
     Сохраняем новую игру.
     Старый localStorage НЕ очищаем.
  */

  saveGame();

  updateTeamNames();

  updateScores();

  updateQuestionTeamNames();

  buildBoard();

  showScreen("gameScreen");
}

/* =====================================================
   ОБНОВИТЬ НАЗВАНИЯ КОМАНД
===================================================== */

function updateTeamNames() {

  const team1Name =
    document.getElementById(
      "team1Name",
    );

  const team2Name =
    document.getElementById(
      "team2Name",
    );

  /*
     Обновляем названия команд
     на игровом экране
  */

  if (team1Name) {
    team1Name.textContent =
      teamNames[0];
  }

  if (team2Name) {
    team2Name.textContent =
      teamNames[1];
  }

  /*
     Заполняем поля ввода
  */

  const team1Input =
    document.getElementById(
      "team1Input",
    );

  const team2Input =
    document.getElementById(
      "team2Input",
    );

  if (team1Input) {
    team1Input.value =
      teamNames[0];
  }

  if (team2Input) {
    team2Input.value =
      teamNames[1];
  }
}

/* =====================================================
   ПОСТРОЕНИЕ ДОСКИ
===================================================== */

function buildBoard() {

  const board =
    document.getElementById(
      "board",
    );

  board.innerHTML = "";

  /*
     Заголовки категорий
  */

  categories.forEach(
    (category) => {

      const div =
        document.createElement(
          "div",
        );

      div.className =
        "category";

      div.textContent =
        category;

      board.appendChild(div);
    },
  );

  /*
     Вопросы
  */

  for (
    let row = 0;
    row < 10;
    row++
  ) {

    for (
      let category = 0;
      category < 5;
      category++
    ) {

      const question =
        questions.find(
          (q) =>
            q.category === category &&
            q.value === points[row],
        );

      const button =
        document.createElement(
          "button",
        );

      button.className =
        "cell";

      button.textContent =
        points[row];

      /*
         Если вопрос не найден
      */

      if (!question) {

        button.disabled = true;

        button.classList.add(
          "used",
        );

        board.appendChild(
          button,
        );

        continue;
      }

      const id =
        questionId(question);

      /*
         ПРОВЕРЯЕМ:
         был ли вопрос уже отвечен
      */

      if (
        usedQuestions.has(id)
      ) {

        button.classList.add(
          "used",
        );

        button.disabled = true;

      } else {

        button.onclick =
          function () {
            openQuestion(
              question,
            );
          };
      }

      board.appendChild(
        button,
      );
    }
  }
}

/* =====================================================
   ID ВОПРОСА
===================================================== */

function questionId(question) {

  return `${question.category}-${question.value}`;
}

/* =====================================================
   ОТКРЫТЬ ВОПРОС
===================================================== */

function openQuestion(question) {

  currentQuestion =
    question;

  /*
     Сразу отмечаем вопрос
     как использованный.
  */

  usedQuestions.add(
    questionId(question),
  );

  /*
     Сразу сохраняем.

     Поэтому даже если открыть вопрос
     и обновить страницу — он останется
     использованным.
  */

  saveGame();

  selectedAnsweringTeam =
    null;

  renderQuestion();

  showScreen(
    "questionScreen",
  );
}

/* =====================================================
   ОТОБРАЗИТЬ ВОПРОС
===================================================== */

function renderQuestion() {

  if (!currentQuestion) {
    return;
  }

  const q =
    currentQuestion;

  document.getElementById(
    "questionCategory",
  ).textContent =
    categories[q.category];

  document.getElementById(
    "questionPoints",
  ).textContent =
    q.value;

  document.getElementById(
    "questionNumber",
  ).textContent =
    `Вопрос за ${q.value} баллов`;

  document.getElementById(
    "questionText",
  ).textContent =
    q.text;

  document.getElementById(
    "answerText",
  ).textContent =
    q.answer;

  /*
     Ответ скрыт
  */

  document
    .getElementById(
      "answerBox",
    )
    .classList.add(
      "hidden",
    );

  document
    .getElementById(
      "showAnswerBtn",
    )
    .classList.remove(
      "hidden",
    );

  /*
     Стоимость вопроса
  */

  document
    .querySelectorAll(
      ".currentPoints",
    )
    .forEach(
      (element) => {

        element.textContent =
          q.value;
      },
    );

  updateQuestionTeamNames();

  clearAnsweringTeam();

  renderMedia();
}

/* =====================================================
   КАРТИНКА
===================================================== */

function renderMedia() {

  const container =
    document.getElementById(
      "mediaContainer",
    );

  container.innerHTML = "";

  if (!currentQuestion) {
    return;
  }

  if (
    currentQuestion.type !==
    "image"
  ) {
    return;
  }

  const image =
    document.createElement(
      "img",
    );

  image.className =
    "question-image";

  image.src =
    currentQuestion.image;

  image.alt =
    "Картинка к вопросу";

  image.onerror =
    function () {

      container.innerHTML = "";

      const placeholder =
        document.createElement(
          "div",
        );

      placeholder.className =
        "image-placeholder";

      placeholder.innerHTML = `
        <div style="font-size:42px;">
          🖼️
        </div>

        <strong>
          Картинка пока не добавлена
        </strong>

        <div>
          Добавьте файл:<br>
          ${currentQuestion.image}
        </div>
      `;

      container.appendChild(
        placeholder,
      );
    };

  container.appendChild(
    image,
  );
}

/* =====================================================
   ПОКАЗАТЬ ОТВЕТ
===================================================== */

function showAnswer() {

  document
    .getElementById(
      "answerBox",
    )
    .classList.remove(
      "hidden",
    );

  document
    .getElementById(
      "showAnswerBtn",
    )
    .classList.add(
      "hidden",
    );
}

/* =====================================================
   ВЫБОР КОМАНДЫ
===================================================== */

function selectAnsweringTeam(team) {

  selectedAnsweringTeam =
    team;

  document
    .getElementById(
      "answerTeam1Btn",
    )
    .classList.toggle(
      "selected",
      team === 1,
    );

  document
    .getElementById(
      "answerTeam2Btn",
    )
    .classList.toggle(
      "selected",
      team === 2,
    );

  document
    .getElementById(
      "scoreCard1",
    )
    .classList.toggle(
      "active",
      team === 1,
    );

  document
    .getElementById(
      "scoreCard2",
    )
    .classList.toggle(
      "active",
      team === 2,
    );
}

/* =====================================================
   СБРОС КОМАНДЫ
===================================================== */

function clearAnsweringTeam() {

  selectedAnsweringTeam =
    null;

  document
    .getElementById(
      "answerTeam1Btn",
    )
    .classList.remove(
      "selected",
    );

  document
    .getElementById(
      "answerTeam2Btn",
    )
    .classList.remove(
      "selected",
    );

  document
    .getElementById(
      "scoreCard1",
    )
    .classList.remove(
      "active",
    );

  document
    .getElementById(
      "scoreCard2",
    )
    .classList.remove(
      "active",
    );
}

/* =====================================================
   НАЧИСЛЕНИЕ / СНЯТИЕ
===================================================== */

function scoreQuestion(
  team,
  direction,
) {

  if (!currentQuestion) {
    return;
  }

  const amount =
    currentQuestion.value *
    direction;

  /*
     Меняем очки
  */

  scores[team - 1] +=
    amount;

  /*
     Сохраняем:
     - команды
     - очки
     - использованные вопросы
  */

  saveGame();

  updateScores();

  /*
     ПЛЮС
     → возвращаемся на доску
  */

  if (direction === 1) {

    currentQuestion =
      null;

    selectedAnsweringTeam =
      null;

    buildBoard();

    /*
       Все вопросы отвечены
    */

    if (
      usedQuestions.size >=
      questions.length
    ) {

      showFinalScreen();

    } else {

      showScreen(
        "gameScreen",
      );
    }

    return;
  }

  /*
     МИНУС
     → остаёмся на вопросе
  */
}

/* =====================================================
   РУЧНОЕ ИЗМЕНЕНИЕ ОЧКОВ
===================================================== */

function changeScore(
  team,
  amount,
) {

  scores[team - 1] +=
    amount;

  saveGame();

  updateScores();
}

/* =====================================================
   ОБНОВЛЕНИЕ ОЧКОВ
===================================================== */

function updateScores() {

  const score1 =
    document.getElementById(
      "score1",
    );

  const score2 =
    document.getElementById(
      "score2",
    );

  const finalScore1 =
    document.getElementById(
      "finalScore1",
    );

  const finalScore2 =
    document.getElementById(
      "finalScore2",
    );

  if (score1) {
    score1.textContent =
      scores[0];
  }

  if (score2) {
    score2.textContent =
      scores[1];
  }

  if (finalScore1) {
    finalScore1.textContent =
      scores[0];
  }

  if (finalScore2) {
    finalScore2.textContent =
      scores[1];
  }
}

/* =====================================================
   НАЗВАНИЯ КОМАНД НА ЭКРАНЕ ВОПРОСА
===================================================== */

function updateQuestionTeamNames() {

  document.getElementById(
    "answerTeam1Btn",
  ).textContent =
    `${teamNames[0]} отвечает`;

  document.getElementById(
    "answerTeam2Btn",
  ).textContent =
    `${teamNames[1]} отвечает`;

  document.getElementById(
    "plusTeam1",
  ).textContent =
    `${teamNames[0]} `;

  document.getElementById(
    "minusTeam1",
  ).textContent =
    `${teamNames[0]} `;

  document.getElementById(
    "plusTeam2",
  ).textContent =
    `${teamNames[1]} `;

  document.getElementById(
    "minusTeam2",
  ).textContent =
    `${teamNames[1]} `;
}

/* =====================================================
   ВЫЙТИ ИЗ ВОПРОСА
===================================================== */

function exitQuestion() {

  currentQuestion =
    null;

  selectedAnsweringTeam =
    null;

  /*
     Вопрос уже был добавлен
     в usedQuestions при открытии.

     Поэтому он останется использованным.
  */

  buildBoard();

  if (
    usedQuestions.size >=
    questions.length
  ) {

    showFinalScreen();

  } else {

    showScreen(
      "gameScreen",
    );
  }
}

/* =====================================================
   ФИНАЛ
===================================================== */

function showFinalScreen() {

  let winner;

  if (
    scores[0] > scores[1]
  ) {

    winner =
      `🏆 Победила команда «${teamNames[0]}»!`;

  } else if (
    scores[1] > scores[0]
  ) {

    winner =
      `🏆 Победила команда «${teamNames[1]}»!`;

  } else {

    winner =
      "🤝 Ничья!";
  }

  document.getElementById(
    "winnerText",
  ).textContent =
    winner;

  document.getElementById(
    "finalTeam1",
  ).textContent =
    teamNames[0];

  document.getElementById(
    "finalTeam2",
  ).textContent =
    teamNames[1];

  updateScores();

  showScreen(
    "finalScreen",
  );
}

/* =====================================================
   ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
===================================================== */

function showScreen(
  screenId,
) {

  document
    .querySelectorAll(
      ".screen",
    )
    .forEach(
      (screen) => {

        screen.classList.add(
          "hidden",
        );
      },
    );

  const screen =
    document.getElementById(
      screenId,
    );

  if (screen) {

    screen.classList.remove(
      "hidden",
    );
  }
}

/* =====================================================
   FULLSCREEN
===================================================== */

function toggleFullscreen() {

  if (
    !document.fullscreenElement
  ) {

    document.documentElement
      .requestFullscreen()
      .catch(() => {});

  } else {

    document
      .exitFullscreen()
      .catch(() => {});
  }
}

/* =====================================================
   НОВАЯ ИГРА
===================================================== */

function restartGame() {

  const confirmed =
    confirm(
      "Начать новую игру? Текущий результат и использованные вопросы будут сброшены.",
    );

  if (!confirmed) {
    return;
  }

  // Полностью очищаем данные игры
  localStorage.removeItem(STORAGE_KEY);

  // Сбрасываем состояние
  teamNames = ["", ""];
  scores = [0, 0];
  usedQuestions.clear();
  currentQuestion = null;
  selectedAnsweringTeam = null;

  // Очищаем поля ввода
  document.getElementById("team1Input").value = "";
  document.getElementById("team2Input").value = "";

  updateTeamNames();
  updateScores();
  updateQuestionTeamNames();

  showScreen("startScreen");
}
/* =====================================================
   ПРОБЕЛ — ПОКАЗАТЬ ОТВЕТ
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.code !==
      "Space"
    ) {
      return;
    }

    const questionScreen =
      document.getElementById(
        "questionScreen",
      );

    if (
      questionScreen &&
      !questionScreen.classList.contains(
        "hidden",
      )
    ) {

      event.preventDefault();

      showAnswer();
    }
  },
);

/* =====================================================
   ИНИЦИАЛИЗАЦИЯ
===================================================== */

function initGame() {

  /*
     Загружаем:
     - команды
     - очки
     - использованные вопросы
  */

  const hasSavedGame =
    loadGame();

  /*
     Обновляем интерфейс
  */

  updateTeamNames();

  updateScores();

  updateQuestionTeamNames();

  /*
     Текущий вопрос НЕ восстанавливаем.
     Если обновили страницу во время вопроса,
     возвращаемся на игровое поле.
  */

  currentQuestion =
    null;

  selectedAnsweringTeam =
    null;

  /*
     Если сохранение есть —
     открываем игровое поле.
  */

  if (hasSavedGame) {

    buildBoard();

    showScreen(
      "gameScreen",
    );

    return;
  }

  /*
     Первый запуск
  */

  showScreen(
    "startScreen",
  );
}

/* =====================================================
   ЗАПУСК
===================================================== */

initGame();