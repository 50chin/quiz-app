export const categories = [
  "🎬 Кино",
  "🎞️ Фильмы по эмодзи",
  "⚽ Спорт",
  "😂 Мемы",
  "🍔 Еда и напитки",
];

export const points = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const questions = [
  /* =====================================================
   🎬 КИНО
===================================================== */
  {
    category: 0,
    value: 100,
    type: "text",
    text: "Как зовут главного героя фильма «Один дома»?",
    answer: "Кевин",
  },
  {
    category: 0,
    value: 200,
    type: "image",
    text: "Из какого фильма этот кадр?",
    image: "./src/images/kino_200.webp",
    answer: "Джанго освобождённый",
  },
  {
    category: 0,
    value: 300,
    type: "text",
    text: "Как называется школа волшебства, в которой учился Гарри Поттер?",
    answer: "Хогвартс",
  },
  {
    category: 0,
    value: 400,
    type: "image",
    text: "Угадайте фильм по картинке",
    image: "./src/images/kino_400.webp",
    answer: "Достучаться до небес",
  },
  {
    category: 0,
    value: 500,
    type: "text",
    text: "За какой фильм Леонардо ДиКаприо получил «Оскар?",
    answer: "«Выживший»",
  },

  {
    category: 0,
    value: 600,
    type: "image",
    text: "Угадайте фильм по этому кадру",
    image: "./src/images/kino_600.webp",
    answer: "Иллюзия обмана",
  },
  {
    category: 0,
    value: 700,
    type: "text",
    text: "Как называется вымышленный город, в котором живёт Бэтмен?",
    answer: "Готэм",
  },
  {
    category: 0,
    value: 800,
    type: "image",
    text: "Угадайте фильм по кадру",
    image: "./src/images/kino_800.webp",
    answer: "Облачный атлас",
  },
  {
    category: 0,
    value: 900,
    type: "text",
    text: "Как называется фильм Кристофера Нолана, где действие связано с инверсией?",
    answer: "«Довод»",
  },
  {
    category: 0,
    value: 1000,
    type: "image",
    text: "Угадайте фильм по кадру",
    image: "./src/images/kino_1000.webp",
    answer: "12 обезьян",
  },

 /* =====================================================
   🎬 ФИЛЬМЫ ПО ЭМОДЗИ
===================================================== */

{
    category: 1,
    value: 100,
    type: "text",
    text: "🏠👦🎄",
    answer: "Один дома"
},

{
    category: 1,
    value: 200,
    type: "text",
    text: "🦁👑🌅",
    answer: "Король Лев"
},

{
    category: 1,
    value: 300,
    type: "text",
    text: "🚢💔🧊",
    answer: "Титаник"
},

{
    category: 1,
    value: 400,
    type: "text",
    text: "🧙‍♂️⚡🏰🪄",
    answer: "Гарри Поттер"
},

{
    category: 1,
    value: 500,
    type: "text",
    text: "💊🔴🔵",
    answer: "Матрица"
},

{
    category: 1,
    value: 600,
    type: "text",
    text: "🐀👨‍🍳🍝",
    answer: "Рататуй"
},

{
    category: 1,
    value: 700,
    type: "text",
    text: "🏴‍☠️⛵💀",
    answer: "Пираты Карибского моря"
},

{
    category: 1,
    value: 800,
    type: "text",
    text: "🏹🔥👧",
    answer: "Голодные игры"
},

{
    category: 1,
    value: 900,
    type: "text",
    text: "🧑‍🚀🌌🕳️⏳",
    answer: "Интерстеллар"
},

{
    category: 1,
    value: 1000,
    type: "text",
    text: "👨‍🔬🦕🏝️🚙",
    answer: "Парк Юрского периода"
},
  /* =====================================================
   ⚽ СПОРТ
===================================================== */

  {
    category: 2,
    value: 100,
    type: "text",
    text: "В каком виде спорта выступает Леброн Джеймс?",
    answer: "Баскетбол",
  },
  {
    category: 2,
    value: 200,
    type: "text",
    text: "Сколько олимпийских колец изображено на флаге Олимпийских игр?",
    answer: "5",
  },
  {
    category: 2,
    value: 300,
    type: "text",
    text: "Какой спортсмен известен под прозвищем «Король футбола»?",
    answer: "Пеле",
  },
  {
    category: 2,
    value: 400,
    type: "text",
    text: "В каком виде спорта используется термин «брейк-пойнт»?",
    answer: "Теннис",
  },

  {
    category: 2,
    value: 500,
    type: "text",
    text: "В каком виде спорта разыгрывается Кубок Стэнли?",
    answer: "Хоккей",
  },
  {
    category: 2,
    value: 600,
    type: "text",
    text: "Какой спортсмен стал известен благодаря множеству мировых рекордов в спринте?",
    answer: "Усэйн Болт",
  },

  {
    category: 2,
    value: 700,
    type: "text",
    text: "Как называется максимальный результат одной партии в боулинге?",
    answer: "300 очков",
  },

  {
    category: 2,
    value: 800,
    type: "text",
    text: "В каком виде спорта используется термин «иппон»?",
    answer: "Дзюдо",
  },

  {
    category: 2,
    value: 900,
    type: "text",
    text: "Как называется победа в шахматах, когда королю объявлен мат?",
    answer: "Мат",
  },
  {
    category: 2,
    value: 1000,
    type: "text",
    text: "Как называется престижная велосипедная многодневная гонка по Франции?",
    answer: "Тур де Франс",
  },

  /* =====================================================
   😂 МЕМЫ
===================================================== */

{
    category: 3,
    value: 100,
    type: "image",
    image: "./src/images/memes/1.webp",
    text: "Нельзя просто так взять и…",
    answer: "Властелин колец"
},

{
    category: 3,
    value: 200,
    type: "image",
    image: "./src/images/memes/2.webp",
    text: "Макконахи нервно курит",
    answer: "Настоящий детектив"
},

{
    category: 3,
    value: 300,
    type: "image",
    image: "./src/images/memes/3.webp",
    text: "Когда нужно сообщить, насколько вам безумно холодно",
    answer: "Сияние"
},

{
    category: 3,
    value: 400,
    type: "image",
    image: "./src/images/memes/4.webp",
    text: "Когда вы всерьёз растеряны или на самом деле потерялись",
    answer: "Криминальное чтиво"
},

{
    category: 3,
    value: 500,
    type: "image",
    image: "./src/images/memes/5.webp",
    text: "Когда приложил руку к лицу",
    answer: "Звездный путь"
},

{
    category: 3,
    value: 600,
    type: "image",
    image: "./src/images/memes/6.webp",
    text: "Сцена с удивлённым Джоуи",
    answer: "Друзья"
},

{
    category: 3,
    value: 700,
    type: "image",
    image: "./src/images/memes/7.webp",
    text: "Когда вас кто-то и вправду достал, но вы не теряете бодрости духа",
    answer: "Американский психопат"
},

{
    category: 3,
    value: 800,
    type: "image",
    image: "./src/images/memes/8.webp",
    text: "Когда что-то напряжённо считаешь",
    answer: "Мальчишник в Вегасе"
},

{
    category: 3,
    value: 900,
    type: "image",
    image: "./src/images/memes/9.webp",
    text: "Да ладно?",
    answer: "Поцелуй вампира"
},

{
    category: 3,
    value: 1000,
    type: "image",
    image: "./src/images/memes/10.webp",
    text: "Куда едем?",
    answer: "Ведьмина гора"
},

  /* =====================================================
   🍔 Еда и напитки
===================================================== */

 {
    category: 4,
    value: 100,
    type: "text",
    text: "Какой орех используют для приготовления марципана?",
    answer: "Миндаль"
},

{
    category: 4,
    value: 200,
    type: "text",
    text: "Как называется японское блюдо из сырой рыбы, нарезанной тонкими ломтиками?",
    answer: "Сашими"
},

{
    category: 4,
    value: 300,
    type: "text",
    text: "Какой алкогольный напиток является основой классического мохито?",
    answer: "Ром"
},

{
    category: 4,
    value: 400,
    type: "text",
    text: "Как называется итальянский десерт из маскарпоне, кофе и печенья савоярди?",
    answer: "Тирамису"
},

{
    category: 4,
    value: 500,
    type: "text",
    text: "Из какого фрукта традиционно готовят гуакамоле?",
    answer: "Авокадо"
},

{
    category: 4,
    value: 600,
    type: "text",
    text: "Как называется французское блюдо из улиток, обычно приготовленных с чесночным маслом?",
    answer: "Эскарго"
},

{
    category: 4,
    value: 700,
    type: "text",
    text: "Какой продукт получают из винограда путём ферментации?",
    answer: "Вино"
},

{
    category: 4,
    value: 800,
    type: "text",
    text: "Какой овощ ботанически является фруктом?",
    answer: "Помидор"
},

{
    category: 4,
    value: 900,
    type: "text",
    text: "Как называется японский алкогольный напиток, приготовленный из ферментированного риса?",
    answer: "Саке"
},

{
    category: 4,
    value: 1000,
    type: "text",
    text: "Как называется специя, которую получают из высушенных рылец цветка крокуса",
    answer: "Шафран"
},
];
