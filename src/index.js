// Your code here
const baseURL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
  loadFilm()
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