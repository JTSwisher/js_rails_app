document.addEventListener("DOMContentLoaded", () => {
    createSession();
    searchGifEvent();
    createMessage();
})

function createSession() {
    let form = document.getElementById("login-form");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let inputs = document.getElementsByClassName('session-text');
        let username = inputs[0].value;
        let password = inputs[1].value;
      
        let formData = {
            username: username,
            password: password,
          };
      
          let configObj = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          };
      
          fetch("http://localhost:3000/users", configObj);
    })

    // hwo do we validate user being logged in on JS side
// ? use state of user object after fetch to change to true to render rest of site? 
//
}

function createMessage() {
  let form = document.getElementById("twilio-form");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let inputs = document.getElementsByClassName('message-text');
        let number = inputs[0].value;
        let message = inputs[1].value;
          
        let formData = {
            number: number,
            message: message,
          };
      
          let configObj = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          };
      
          fetch("http://localhost:3000/messages", configObj);
    })
}

//class Gifs {

  //constructor(url) {
  //  this.url = url
  //}
  
  function searchGifEvent(){
    let form = document.getElementById('search-form');

    form.addEventListener('submit', function(event){
      event.preventDefault();
      let input = document.getElementsByClassName('gif-text')
      getGifs(input[0].value);
    })
  }

  function getGifs(param) {
    if (param) {
       value = `https://api.giphy.com/v1/gifs/search?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&q=${param}&limit=50&offset=0&rating=G&lang=en`;
    } else {
       value = "https://api.giphy.com/v1/gifs/trending?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&limit=25&offset=0&rating=G&lang=en";
    }
    
    fetch(value)
    .then(function(response) {
      return response.json();
    }).then(function(json){
      displayGifs(json);
    })

  }

  function displayGifs(json) {
    let gifContainer =  document.getElementById('gif-results')

    json["data"].forEach(element => {
      let img = document.createElement('img');
      img.src = element["images"]["fixed_height_small"]["url"]
      gifContainer.appendChild(img);
    });

  }

  // fetch function returns gifs either based on user input or trending if no user input given
  // need to add event listeners to each gif before being added to dom
  // need to wrap each gif in a class to add styling later on
  // need to create objects for each GIF being created
  // need to clear list of gif search is hit again

//}

