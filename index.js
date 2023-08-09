import { requestingHotels } from "./src/hotels.js";

function getFlagImageUrl(country) {
  const flagp = `./images/${country}-flag.png`;
  return flagp;
}
// CHANGE TEXT TO SYMBOL
function getPriceText(price) {
  return "$".repeat(price);
}
// CHANGE SYMBOL TO TEXT
function symbolToNumber(text) {
  return text.split("$").length - 1;
}

const main = document.querySelector(".container-general_cards");

const respuesta = await requestingHotels();
const data = await respuesta.json();
console.log(data);

function loadInformation(data) {
  data.forEach((hotel) => {
    const cardHotel = document.createElement("div");
    cardHotel.className = "card";
    main.appendChild(cardHotel);
    // IMAGES CARDS
    const imagenHotel = document.createElement("img");
    imagenHotel.setAttribute("src", hotel.photo);
    imagenHotel.setAttribute("alt", hotel.name);
    cardHotel.appendChild(imagenHotel);
    imagenHotel.className = "images";
    // TITLE
    const nombreHotel = document.createElement("h2");
    nombreHotel.innerText = hotel.name;
    nombreHotel.className = "hotel-name";
    cardHotel.appendChild(nombreHotel);

    const imgFlag = document.createElement("img");
    imgFlag.src = getFlagImageUrl(hotel.country);
    imgFlag.alt = `flag of ${hotel.country}`;
    imgFlag.classList.add("img-flag");
    cardHotel.appendChild(imgFlag);

    // CONTAINER-COUNTRY-NAME
    const hotelCountry = document.createElement("div");
    hotelCountry.className = "hotel-country";
    hotelCountry.innerText = hotel.country;
    cardHotel.appendChild(hotelCountry);
    //CONTAINER-NUMBERS
    const hotelNumbers = document.createElement("div");
    hotelNumbers.className = "hotel-numbers";
    cardHotel.appendChild(hotelNumbers);
    //PARAGRAPH ROOMS
    const hotelrooms = document.createElement("p");
    hotelrooms.className = "hotel-rooms";
    hotelrooms.innerText = `${hotel.rooms} rooms -`;
    hotelNumbers.appendChild(hotelrooms);
    //PARAGRAPH PRICES
    const priceSimbol = document.createElement("p");
    priceSimbol.textContent = getPriceText(hotel.price);
    priceSimbol.classList.add("paragraph-priceSimbol");
    hotelNumbers.appendChild(priceSimbol);

    //BUTTON BOOK IT
    const buttonBook = document.createElement("button");
    buttonBook.className = "button-book";
    buttonBook.innerText = "Book it!";
    cardHotel.appendChild(buttonBook);
  });
}

loadInformation(data);
// FILTER COUNTRIES
const filterCountries = document.getElementById("filter-countries");
console.log(filterCountries);
filterCountries.addEventListener("change", () => {
  let valorOption = filterCountries.value;
  console.log(valorOption);
  let optionSelect = filterCountries.options[filterCountries.selectedIndex];
  console.log(optionSelect);
  const textSelected = optionSelect.textContent;
  console.log(textSelected);
  let filteredData = data;
  if (valorOption != "all") {
    filteredData = data.filter((hotel) => hotel.country == textSelected);
    console.log(filteredData);
  }
  main.innerHTML = "";
  loadInformation(filteredData);
});
// FILTER DATE

// FILTER PRICES
const filterPrices = document.getElementById("filter-prices");
console.log(filterPrices);
filterPrices.addEventListener("change", () => {
  let priceOptions = filterPrices.value;
  console.log(priceOptions);
  let priceSelect = filterPrices.options[filterPrices.selectedIndex];
  console.log(priceSelect);
  const textPreiceSelected = priceSelect.textContent;
  console.log(textPreiceSelected);
  const changeToNumber = symbolToNumber(textPreiceSelected);
  console.log(changeToNumber);
  let filteredPriceData = data;
  console.log(filteredPriceData);
  if (priceOptions != "All") {
    filteredPriceData = data.filter((hotel) => hotel.price == changeToNumber);
    console.log(filteredPriceData);
  }
  main.innerHTML = "";
  loadInformation(filteredPriceData);
});
// DELETE FILTER BUTTON CLEAR
const resetBtn = document.getElementById("filter");
console.log(resetBtn);
resetBtn.addEventListener("click", () => {
  // Restablecer el valor seleccionado del select a su opción predeterminada
  filterCountries.selectedIndex = 0;
  // Mostrar todos los hoteles nuevamente
  main.innerHTML = "";
  loadInformation(data);
});
