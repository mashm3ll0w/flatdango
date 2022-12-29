// Your code here
const baseURL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
  loadFilm()
  showFilms()
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
  document.getElementById("ticket-num").textContent = parseInt(film.capacity - film.tickets_sold)
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
    li.textContent = film.title
    li.dataset.id = film.id
    li.classList.add("film")
    ul.appendChild(li)
  })
}