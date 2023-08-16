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
let filteredData = data;
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

function ApllyStyleMessage() {
  const messageContainer = document.getElementById("message-container");
  messageContainer.style.margin = "10px 0 0 15px";
  messageContainer.style.fontSize = "25px";
  messageContainer.style.width = "97%";
  messageContainer.style.backgroundColor = "#808080";
  messageContainer.style.borderRadius = "8px";
  messageContainer.style.textAlign = "center";
  messageContainer.style.color = "white";
}

function showMessage(message) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.textContent = message;
}

let shouldShowMessage = false;
function applyFilters() {
  let tempData = data;

  // Apply country filter
  const selectedCountry = filterCountries.value;
  let optionSelect = filterCountries.options[filterCountries.selectedIndex];
  const textSelected = optionSelect.textContent;
  if (selectedCountry != "all") {
    tempData = tempData.filter((hotel) => hotel.country == textSelected);
  }
  // Apply price filter
  const selectedPrice = filterPrices.value;
  let priceSelect = filterPrices.options[filterPrices.selectedIndex];
  const textPreiceSelected = priceSelect.textContent;
  const changeToNumber = symbolToNumber(textPreiceSelected);
  if (selectedPrice != "All") {
    tempData = tempData.filter((hotel) => hotel.price == changeToNumber);
  }
  // Apply date filter
  if (dateCheckOutSelected) {
    const differenceInMilliseconds = calculateDifferenceDays();
    tempData = tempData.filter((hotel) =>
      isHotelAvailable(hotel, differenceInMilliseconds)
    );
  }
  filteredData = tempData;
  shouldShowMessage = filteredData.length > 0;

  const messageContainer = document.getElementById("message-container");
  if (filteredData.length == 0) {
    messageContainer.textContent = "Sorry we don't have hotels available";
  }
}

ApllyStyleMessage();
loadInformation(data);

// FILTER COUNTRIES
const filterCountries = document.getElementById("filter-countries");
filterCountries.addEventListener("change", () => {
  applyFilters();
  main.innerHTML = "";
  loadInformation(filteredData);
  if (shouldShowMessage) {
    showMessage(
      "¡Welcome to BOOK IT! We show you the hotels available for the country you selected"
    );
  }
  console.log(filteredData);
});

// FILTER PRICES
const filterPrices = document.getElementById("filter-prices");
filterPrices.addEventListener("change", () => {
  applyFilters();
  main.innerHTML = "";
  loadInformation(filteredData);
  if (shouldShowMessage) {
    showMessage(
      "Welcome to BOOK IT! we show you the hotels available for the selected price"
    );
  }
  console.log(filteredData);
});

// FILTER DATE
const dateCheckIn = document.getElementById("checkIn");
const dateCheckOut = document.getElementById("checkOut");
const today = new Date();

function zerodate(dateZero) {
  const converText = "" + dateZero;
  if (converText.length === 1) {
    return "0" + dateZero;
  } else {
    return dateZero;
  }
}

const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const dateCheckInHotels = year + "-" + zerodate(month) + "-" + zerodate(day);
const dateCheckOutHotels =
  year + "-" + zerodate(month) + "-" + zerodate(day + 1);
dateCheckIn.setAttribute("min", dateCheckInHotels);
dateCheckOut.setAttribute("min", dateCheckOutHotels);

dateCheckIn.addEventListener("change", () => {
  const parts = dateCheckIn.value.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const finalDate = year + "-" + zerodate(month) + "-" + zerodate(day + 1);
  dateCheckOut.setAttribute("min", finalDate);
  //-------
  dateCheckOutSelected = false;
  applyFilters();
  main.innerHTML = "";
  loadInformation(filteredData);
});

function isHotelAvailable(hotel, differenceInMilliseconds) {
  const availabilityFrom = hotel.availabilityFrom;
  const availabilityTo = hotel.availabilityTo;
  const availabilityDifference = availabilityTo - availabilityFrom;
  return availabilityDifference >= differenceInMilliseconds;
}

let dateCheckOutSelected = false;
function calculateDifferenceDays() {
  const currentDateIni = new Date();
  currentDateIni.setHours(0, 0, 0, 0);
  const optionCheckInIni = new Date(dateCheckIn.value + " 00:00:00");
  optionCheckInIni.setHours(0, 0, 0, 0);
  const optionCheckIn = optionCheckInIni.getTime();

  if (dateCheckOut.value == "") {
    return;
  }
  const optionCheckOut = new Date(dateCheckOut.value);
  const millisecondsDate = optionCheckOut - optionCheckIn;
  const millisecondsInADay = 24 * 60 * 60 * 1000; // 86,400,000
  return Math.round(millisecondsDate / millisecondsInADay) * millisecondsInADay;
}
dateCheckIn.value = "";
dateCheckOut.value = "";

dateCheckOut.addEventListener("change", () => {
  dateCheckOutSelected = true;
  applyFilters();
  main.innerHTML = "";
  loadInformation(filteredData);
  if (shouldShowMessage) {
    showMessage(
      "¡Welcome to BOOK IT! we show you the hotels available on the selected date"
    );
  }
  console.log(filteredData);
});

// DELETE FILTER BUTTON CLEAR
const resetBtn = document.getElementById("filter");
resetBtn.addEventListener("click", () => {
  filterCountries.selectedIndex = 0;
  filterPrices.selectedIndex = 0;
  dateCheckIn.value = "";
  dateCheckOut.value = "";
  dateCheckOutSelected = false;
  applyFilters();
  main.innerHTML = "";
  loadInformation(filteredData);
  showMessage("");
  console.log(filteredData);
});
