// Your code here
const baseURL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
  showFilms()
  document.getElementById("buy-ticket").addEventListener("click", buyTicket)
  document.getElementById("films").addEventListener("click", deleteFilm)
})

function loadFilm(id){
  fetch(`${baseURL}/${id}`)
  .then(res => res.json())
  .then(film => {
    populateData.call(film)
  })
  .catch(error => console.log('Error: ', error.message))
}

function populateData(){
  document.getElementById("poster").src = this.poster
  document.getElementById("poster").alt = this.title
  document.getElementById("title").textContent = this.title
  document.getElementById("title").dataset.id = this.id
  document.getElementById("runtime").textContent = `${this.runtime} minutes`
  document.getElementById("film-info").textContent = this.description
  document.getElementById("showtime").textContent = this.showtime
  document.getElementById("ticket-num").dataset.capacity = this.capacity
  document.getElementById("ticket-num").dataset.sold = this.tickets_sold
  document.getElementById("ticket-num").textContent = parseInt(this.capacity - this.tickets_sold)
  if (this.capacity - this.tickets_sold === 0){
    document.getElementById("buy-ticket").disabled = true
    document.getElementById("buy-ticket").textContent = "Sold Out"
    document.querySelector(`#films [data-id="${this.id}"]`).classList.add("sold-out")
  }
  else{
    document.getElementById("buy-ticket").disabled = false
    document.getElementById("buy-ticket").textContent = "Buy Ticket"
  }
}

function showFilms(){
  fetch(baseURL)
  .then(res => res.json())
  .then(films => {
    renderMenu.call(films)
    populateData.call(films[0])
  })
  .catch(error => console.log("Error: ", error.message))
}

function renderMenu(){
  const ul = document.getElementById("films")
  ul.innerHTML = ""

  this.map(film => {
    const li = document.createElement("li")
    const span = document.createElement("span")
    if (film.capacity - film.tickets_sold === 0){
      li.classList.add("sold-out")
    }
    span.innerHTML = `  <button class="delete-film" class="mini compact circular icon ui red button">X</button>`
    li.addEventListener("click", () => {
      loadFilm(film.id)
    })
    li.textContent = film.title
    li.dataset.id = film.id
    li.classList.add("film")
    li.appendChild(span)
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

function deleteFilm(e){
  if(e.target.classList.contains("delete-film")){
    fetch(`${baseURL}/${e.target.parentNode.parentNode.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log("Error: ", error.message))
  }
}