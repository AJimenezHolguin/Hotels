import { requestingHotels } from "./hotels.js";

// function getFlagImageUrl(country){
//     const hotelCountry = `./images/${country}-flag.png`;
//     return hotelCountry;
// }

// const buttonConsulta = document.getElementById("filter");
const main = document.querySelector(".container-general_cards");

// buttonConsulta.addEventListener("click", async ()=> {
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
  // CONTAINER-COUNTRY
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
  hotelrooms.innerText = `${hotel.rooms} rooms`;
  hotelNumbers.appendChild(hotelrooms);
  //PARAGRAPH PRICES
  const hotelPrices = document.createElement("p");
  hotelPrices.className = "hotel-prices";
  hotelPrices.innerText = `- ${hotel.price}`;
  hotelNumbers.appendChild(hotelPrices);
});
// });
