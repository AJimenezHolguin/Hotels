import {requestingHotels} from "./hotels.js";

const buttonConsulta = document.getElementById("filter");
const main = document.querySelector(".container-general_cards");

buttonConsulta.addEventListener("click", async ()=> {
    const respuesta = await requestingHotels();
    const data = await respuesta.json();
    console.log(data);

    

    data.forEach((hotel) => {
        const cardHotel = document.createElement("div");
    cardHotel.className = "card"
    main.appendChild(cardHotel);

    const imagenHotel = document.createElement("img");
    imagenHotel.setAttribute("src", hotel.photo);
    imagenHotel.setAttribute("alt",hotel.name);
    cardHotel.appendChild(imagenHotel);

    const nombreHotel = document.createElement("h2");
    nombreHotel.innerText = hotel.name;
    nombreHotel.className = "hotel-name";
    cardHotel.appendChild(nombreHotel);
    })

});