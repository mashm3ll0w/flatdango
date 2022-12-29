// Your code here
const baseURL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
  showFilms()
  loadFilm()
  document.getElementById("buy-ticket").addEventListener("click", buyTicket)
})

function loadFilm(id = 1){
  fetch(`${baseURL}/${id}`)
  .then(res => res.json())
  .then(film => {
    populateData(film)
  })
  .catch(error => console.log('Error: ', error.message))
}

function populateData(film){
  document.getElementById("poster").src = film.poster
  document.getElementById("poster").alt = film.title
  document.getElementById("title").textContent = film.title
  document.getElementById("title").dataset.id = film.id
  document.getElementById("runtime").textContent = `${film.runtime} minutes`
  document.getElementById("film-info").textContent = film.description
  document.getElementById("showtime").textContent = film.showtime
  document.getElementById("ticket-num").dataset.capacity = film.capacity
  document.getElementById("ticket-num").dataset.sold = film.tickets_sold
  document.getElementById("ticket-num").textContent = parseInt(film.capacity - film.tickets_sold)
  if (film.capacity - film.tickets_sold === 0){
    document.getElementById("buy-ticket").disabled = true
    document.getElementById("buy-ticket").textContent = "Sold Out"
    document.querySelector(`#films [data-id="${film.id}"]`).classList.add("sold-out")
  }
  else{
    document.getElementById("buy-ticket").disabled = false
    document.getElementById("buy-ticket").textContent = "Buy Ticket"
  }
}

function showFilms(){
  fetch(baseURL)
  .then(res => res.json())
  .then(films => renderMenu(films))
  .catch(error => console.log("Error: ", error.message))
}

function renderMenu(films){
  const ul = document.getElementById("films")
  ul.innerHTML = ""

  films.map(film => {
    const li = document.createElement("li")
    if (film.capacity - film.tickets_sold === 0){
      li.classList.add("sold-out")
    }

    li.addEventListener("click", () => {
      loadFilm(film.id)
    })
    li.textContent = film.title
    li.dataset.id = film.id
    li.classList.add("film")
    ul.appendChild(li)
  })
}

function buyTicket(){
  let ticketsContainer = document.getElementById("ticket-num")
  const capacity = parseInt(ticketsContainer.dataset.capacity)
  let ticketsSold = parseInt(ticketsContainer.dataset.sold)
  const filmID = document.getElementById("title").dataset.id
  fetch(`${baseURL}/${filmID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      tickets_sold: ticketsSold + 1
    })
  })
  .then(res => res.json())
  .then(film => loadFilm(film.id))
  .catch(error => console.log("Error: ", error.message))
}