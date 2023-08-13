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
filterCountries.addEventListener("change", () => {
  let valorOption = filterCountries.value;
  let optionSelect = filterCountries.options[filterCountries.selectedIndex];
  const textSelected = optionSelect.textContent;
  let filteredData = data;
  if (valorOption != "all") {
    filteredData = data.filter((hotel) => hotel.country == textSelected);
  }
  main.innerHTML = "";
  loadInformation(filteredData);
});

// FILTER PRICES
const filterPrices = document.getElementById("filter-prices");
filterPrices.addEventListener("change", () => {
  let priceOptions = filterPrices.value;
  let priceSelect = filterPrices.options[filterPrices.selectedIndex];
  const textPreiceSelected = priceSelect.textContent;
  const changeToNumber = symbolToNumber(textPreiceSelected);
  let filteredPriceData = data;
  if (priceOptions != "All") {
    filteredPriceData = data.filter((hotel) => hotel.price == changeToNumber);
  }
  main.innerHTML = "";
  loadInformation(filteredPriceData);
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
});
function isHotelAvailable(hotel, resultCheckIn, differenceInMilliseconds) {
  return (
  resultCheckIn >= hotel.availabilityFrom &&
    differenceInMilliseconds <= hotel.availabilityTo
  )   
}
let dateCheckOutSelected = false;
function calculateDifferenceDays() {
  const currentDateIni = new Date();
  currentDateIni.setHours(0, 0, 0, 0);
  const currentDateMilliseconds = currentDateIni.getTime();
  const optionCheckInIni = new Date(dateCheckIn.value + " 00:00:00");
  optionCheckInIni.setHours(0, 0, 0, 0);
  const optionCheckIn = optionCheckInIni.getTime();
  if (!dateCheckOutSelected) {
    return;
  }
  const optionCheckOut = new Date(dateCheckOut.value);
  const resultCheckIn = optionCheckIn - currentDateMilliseconds;
  const millisecondsDate = optionCheckOut - optionCheckIn;
  const millisecondsInADay = 24 * 60 * 60 * 1000; // 86,400,000
  const differenceInMilliseconds =
    Math.round(millisecondsDate / millisecondsInADay) * millisecondsInADay;
  const hotelesDisponibles = data.filter((hotel) => {
    return isHotelAvailable(hotel, resultCheckIn, differenceInMilliseconds);
  });
  console.log(hotelesDisponibles);
  main.innerHTML = "";
  loadInformation(hotelesDisponibles);
}
dateCheckIn.value = "";
dateCheckOut.value = "";
dateCheckIn.addEventListener("change", calculateDifferenceDays);
dateCheckOut.addEventListener("change", function () {
  dateCheckOutSelected = true;
  calculateDifferenceDays();
});

// DELETE FILTER BUTTON CLEAR
const resetBtn = document.getElementById("filter");
resetBtn.addEventListener("click", () => {
  filterCountries.selectedIndex = 0;
  dateCheckIn.value = "";
  dateCheckOut.value = "";
  dateCheckOutSelected = false;
  calculateDifferenceDays();
  main.innerHTML = "";
  loadInformation(data);
});
