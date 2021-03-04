document.addEventListener("DOMContentLoaded", () => {

  let addToy = false;
  const toyDataBase = 'http://localhost:3000/toys'
  const toyCollection = document.querySelector('#toy-collection')
  const toyInput = document.querySelector('.add-toy-form')
  toyInput.addEventListener('submit', addNewToy)

  fetch(toyDataBase)
  .then(r => r.json())
  .then(toys => toys.forEach(toy => toyCollection.appendChild(renderToys(toy))))

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
  
  function renderToys(toy) {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const h2 = document.createElement('h2')
    h2.textContent = toy.name
    const img = document.createElement('img')
    img.classList.add('toy-avatar')
    img.src = toy.image
    const p = document.createElement('p')
    p.textContent = toy.likes
    const button = document.createElement('button')
    button.classList.add('like-btn')
    button.textContent = 'Like <3'
    button.setAttribute('id', toy.id)
    button.addEventListener('click', (e) => addNewLikes(e, p))
    cardDiv.append(h2, img, p, button)
    return cardDiv
    //button.addEventListener('click', console.log(e))
  }

  function addNewLikes(e, p) {
    let likeValue = +p.textContent
    let imageID = e.target.id

    fetch(`${toyDataBase}/${imageID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: (likeValue + 1)
      })
    })
    .then(response => response.json())
    .then(() => p.textContent = likeValue + 1)
    .catch((error) => {
      console.log('Error: ', error)
    })
  }

  function addNewToy(e) {
    e.preventDefault()
    console.log(e);
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
    })
    .then(response => response.json())
    .then(newToy => renderToys(newToy))
}  
});
