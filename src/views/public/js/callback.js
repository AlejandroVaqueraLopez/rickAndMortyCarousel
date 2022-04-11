//modules
import fetchData from "./fetchData.js";
import createTemplate from "./template.js";

//constants
const apiUrl = "https://rickandmortyapi.com/api/character/";

//local lets
let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let templateContainer = document.getElementById("template-container");
let btnAuthor = document.getElementById("btn-author");

//global vars
var count = 1;
var maxNum = 0;
var toggle = false;

//initialization of author button
function setBtnAuthor(value){
  if(value == true){
    btnAuthor.style.backgroundImage = "url(public/images/cross-icon.png)";
  }else{
    btnAuthor.style.backgroundImage = "url(public/images/info-icon.png)";
  }
}
function setImage(url){
  let characterImage = document.getElementById("characterImage");
  characterImage.style.backgroundImage = `url(${url})`;
}
function setFirstSeen(data){
  let characterFirstSeen = document.getElementById("char-first-seen");
  characterFirstSeen.innerHTML = data;
}

//inizialization of first page
fetchData(apiUrl)
  .then((data) => {
    maxNum = data.info.count;
    return fetchData(`${apiUrl}${data.results[0].id}`);//enter the character 1
  })
  .then((data) => {
    //we create and assign the exported template 
    let result = createTemplate(data.name,data.status,data.species,data.location.name);
    templateContainer.innerHTML = result;
    //here we set the image in the template, because of asynchronism trouble
    setImage(data.image);
    setBtnAuthor(toggle);//set the cross or the info icon
    //enter the episode object
    return fetchData(`${data.episode[0]}`);
  })
  .then((data) => {
    setFirstSeen(data.name)
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
  toggle = false;
  count = counterIncrement(maxNum);
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      //we create and assign the exported template 
      let result = createTemplate(data.name,data.status,data.species,data.location.name);
      templateContainer.innerHTML = result;
      //here we set the image in the template, because of asynchronism trouble
      setImage(data.image);
      setBtnAuthor(toggle);//set the cross or the info icon
      //enter the episode object
      return fetchData(`${data.episode[0]}`);
    })
    .then((data) => {
      setFirstSeen(data.name)
    })
    .catch((error) => console.log(error))
});

//increment function
btnPrev.addEventListener("click",() => {
  toggle = false;
  count = counterDecrement();
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      //we create and assign the exported template 
      let result = createTemplate(data.name,data.status,data.species,data.location.name);
      templateContainer.innerHTML = result;
      //here we set the image in the template, because of asynchronism trouble
      setImage(data.image);
      setBtnAuthor(toggle);//set the cross or the info icon
      //enter the episode object
      return fetchData(`${data.episode[0]}`);
    })
    .then((data) => {
      setFirstSeen(data.name)
    })
    .catch((error) => console.log(error))
});

//Author info function
btnAuthor.addEventListener("click",()=>{
  toggle = !toggle;//true at first try 
  if(toggle == true){
    setBtnAuthor(toggle);//set the cross or the info icon
    //we create and assign the exported template 
    let result = createTemplate("Alejandro Vaquera L&oacutepez","Alive (author)","Human, I think...","Always in my nerd-room");
    templateContainer.innerHTML = result;
    //here we set the image in the template, because of asynchronism trouble
    setImage("public/images/myPhoto.jpg");
    setFirstSeen("Coding in his room, you know like always...");
  }else if(toggle == false){
    setBtnAuthor(toggle);//set the cross or the info icon
    fetchData(apiUrl)
      .then((data) => {
        return fetchData(`${apiUrl}${count}`);
      })
      .then((data) => {
        //we create and assign the exported template 
        let result = createTemplate(data.name,data.status,data.species,data.location.name);
        templateContainer.innerHTML = result;
        //here we set the image in the template, because of asynchronism trouble
        setImage(data.image);
        //enter the episode object
        return fetchData(`${data.episode[0]}`);
      })
      .then((data) => {
        setFirstSeen(data.name)
      })
      .catch((error) => console.log(error))
  }
})