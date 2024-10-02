"use strict";

const API_KEY = "da8243ce4ee01e1c13dbd671";
const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const input = document.querySelector("input");
const card = document.querySelector(".card_wrapper");
const spinner = document.querySelector(".spinner_wrapper");
const button = document.querySelector("button"); // Предположим, что у вас есть кнопка для запуска конвертации

card.style.display = "none"; // Скрываем карточку изначально

async function convert() {
  card.style.display = "none"; // Скрываем карточку, если она была видна ранее
  let title = `${input.value} in UZS`;
  let subtitle = "Loading ...";
  
  // Показываем индикатор загрузки
  spinner.style.display = "block";

  try {
    let response = await fetch(URL);
    let data = await response.json();
    
    let total = data.conversion_rates.UZS * parseInt(input.value);

    subtitle = `${input.value} dollars in UZS is ${parseInt(total)} so'm`;

    // Прячем индикатор загрузки и показываем карточку
    spinner.style.display = "none";
    card.style.display = "flex";
    card.innerHTML = `
      <h1>${title}</h1>
      <h3>${subtitle}</h3>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    card.innerHTML = `<h3>Failed to load exchange rate data</h3>`;
    card.style.display = "flex"; // Показываем сообщение об ошибке
  }
}

// Вызов конвертации по клику на кнопку
button.addEventListener("click", convert);
