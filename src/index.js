let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyDataBase = 'http://localhost:3000/toys'
  const getToys = (url) => {
    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(toys => toys.forEach(toy => renderToys(toy)))
  }
  

  getToys();
  

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toy) {
  console.log(toy)
  const toyCollection = document.querySelector('#toy-collection')
  const cardDiv = document.createElement('div')
  cardDiv.innerHTML = 
  `<div class="card"><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} </p><button class="like-btn">Like <</button></div>`
  toyCollection.appendChild(cardDiv)
}