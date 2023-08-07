import { requestingHotels } from "./src/hotels.js";

function getFlagImageUrl(country) {
  const flagp = `./images/${country}-flag.png`;
  return flagp;
}

function getPriceText(price) {
  return "$".repeat(price);
}

const main = document.querySelector(".container-general_cards");

const respuesta = await requestingHotels();
const data = await respuesta.json();
console.log(data);

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

  // CONTAINER-COUNTRY-NAME}
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

  const filterCountries = document.getElementById("filter-countries");
  console.log(filterCountries);
  // const tarjetas = document.querySelector(".container-general_cards");
  // console.log(tarjetas);
  
 
  filterCountries.addEventListener("change", ()=>{
    let valorOption = filterCountries.value;
    console.log(valorOption);
    let optionSelect = filterCountries.options[filterCountries.selectedIndex];
    console.log(filterCountries.selectedIndex);
    
    const filteredData = data.filter(hotel => hotel.country == optionSelect.value);
    // console.log(filteredData);
    console.log(optionSelect.value);
    // const tarjetas = document.querySelector(".container-general_cards");
    // console.log(tarjetas);
  })

   
 