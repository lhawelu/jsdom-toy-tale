let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyDataBase = 'http://localhost:3000/toys'
  const getToys = (url) => {
    fetch(url)
    .then(r => r.json())
    .then(toys => toys.forEach(toy => renderToys(toy)))
  }

  //const createToys = (url) =>
  

  getToys(toyDataBase);
  

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
  
  const toyInput = document.querySelector('.submit')
  toyInput.addEventListener("click", (e) => {
    e.preventDefault();
    const textInput = document.querySelector('[name = "name"]')
    const imageInput = document.querySelector('[name = "image"]')
    fetch(toyDataBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: textInput.value,
        image: imageInput.value,
        likes: 0
      })
      .then(response => response.json())
      .then(newToy => console.log(newToy))
  } )
});

function renderToys(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')
  cardDiv.innerHTML = 
  `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} </p><button class="like-btn">Like <</button>`
  toyCollection.appendChild(cardDiv)
}