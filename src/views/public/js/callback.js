//modules
import fetchData from "./fetchData.js";
//constants
const apiUrl = "https://rickandmortyapi.com/api/character/";
//local lets
let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let characterImage = document.getElementById("characterImage");
let characterName = document.getElementById("char-name");
let characterStatus = document.getElementById("char-status");
let characterSpecies = document.getElementById("char-species");
let characterLocation = document.getElementById("char-location");
let characterFirstSeen = document.getElementById("char-first-seen");
let btnAuthor = document.getElementById("btn-author");
//global vars
var count = 1;
var maxNum = 0;
var toggle = false;
//initialization of author button
btnAuthor.style.backgroundImage = "url(public/images/info-icon.png)";
//inizialization of first page
fetchData(apiUrl)
  .then((data) => {
    maxNum = data.info.count;
    return fetchData(`${apiUrl}${data.results[0].id}`);//enter the character 1
  })
  .then((data) => {
    characterImage.style.backgroundImage = `url(${data.image})`;
    characterName.innerHTML = data.name;
    characterStatus.innerHTML = data.status;
    characterSpecies.innerHTML = data.species;
    characterLocation.innerHTML = data.location.name;
    return fetchData(`${data.episode[0]}`);
  })
  .then((data) => {
    characterFirstSeen.innerHTML = data.name;
  })
  .catch((error) => console.log(error))

//counter increment & decrement functions
let counterIncrement = (maxNum) => {
  if(count < maxNum) {
    return ++count
  }else{
    return count
  }
}
let counterDecrement = _ => {
  if(count > 1) {
    return --count
  }else{
    return count
  }
}

//buttons mechanism
//decrement function
btnNext.addEventListener("click",() => {
  count = counterIncrement(maxNum);
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      characterImage.style.backgroundImage = `url(${data.image})`;
      characterName.innerHTML = data.name;
      characterStatus.innerHTML = data.status;
      characterSpecies.innerHTML = data.species;
      characterLocation.innerHTML = data.location.name;
      return fetchData(`${data.episode[0]}`)//.com/api/episode/1
    })
    .then((data) => {
      characterFirstSeen.innerHTML = data.name;//name of episode
    })
    .catch((error) => console.log(error))
});
//increment function
btnPrev.addEventListener("click",() => {
  count = counterDecrement();
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      characterImage.style.backgroundImage = `url(${data.image})`;
      characterName.innerHTML = data.name;
      characterStatus.innerHTML = data.status;
      characterSpecies.innerHTML = data.species;
      characterLocation.innerHTML = data.location.name;
      return fetchData(`${data.episode[0]}`)//.com/api/episode/1
    })
    .then((data) => {
      characterFirstSeen.innerHTML = data.name;//name of episode
    })
    .catch((error) => console.log(error))
});

//Author info function
btnAuthor.addEventListener("click",()=>{
  toggle = !toggle;
  if(toggle == true){
    btnAuthor.style.backgroundImage = "url(public/images/cross-icon.png)";
    characterImage.style.backgroundImage = "url(public/images/myPhoto.jpg)";
    characterName.innerHTML = "Alejandro Vaquera L&oacutepez";
    characterStatus.innerHTML = "Alive (author)";
    characterSpecies.innerHTML = "Human, I think...";
    characterLocation.innerHTML = "Always in my nerd-room";
    characterFirstSeen.innerHTML = "Coding in his room, you know like always..."
  }else if(toggle == false){
    btnAuthor.style.backgroundImage = "url(public/images/info-icon.png)";
    fetchData(apiUrl)
      .then((data) => {
        return fetchData(`${apiUrl}${count}`);
      })
      .then((data) => {
        characterImage.style.backgroundImage = `url(${data.image})`;
        characterName.innerHTML = data.name;
        characterStatus.innerHTML = data.status;
        characterSpecies.innerHTML = data.species;
        characterLocation.innerHTML = data.location.name;
        return fetchData(`${data.episode[0]}`)//.com/api/episode/1
      })
      .then((data) => {
        characterFirstSeen.innerHTML = data.name;//name of episode
      })
      .catch((error) => console.log(error))
  }
})

