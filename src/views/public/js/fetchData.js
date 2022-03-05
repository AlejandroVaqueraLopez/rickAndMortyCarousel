//this function does a fetch request to the api
let fetchData = (url) => {
  return new Promise((resolve,rejected) => {

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    xhttp.onreadystatechange = (event) => {
      if(xhttp.readyState === 4){
        if(xhttp.status === 200){
          resolve(JSON.parse(xhttp.responseText));
        }else{
          let error = new Error(`Error en ${url}`);
          reject(error);
        }
      }
    }
    xhttp.send();

  })
}

export default fetchData;
