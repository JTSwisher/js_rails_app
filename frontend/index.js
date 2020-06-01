document.addEventListener("DOMContentLoaded", () => {
    createSession();
    searchGifEvent();
    createMessage();
    endSession();

    let currentUser;

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
      
          fetch("http://localhost:3000/users", configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            currentUser = new User(object.id, object.username, true)
            userStateDisplayChange(currentUser);
          })
    })
}

function userStateDisplayChange(currentUser) {
  let landingPage = document.getElementById('landing-page')
  currentUser.state ? landingPage.style.display="none" : landingPage.style.display="";
}

function endSession() {
  let input = document.getElementById('logout')
  input.addEventListener('click', function() {
    currentUser.state = false
    userStateDisplayChange(currentUser)
  })
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
          event.target.reset();
    })
}


  
  function searchGifEvent(){
    let form = document.getElementById('search-form');

    form.addEventListener('submit', function(event){
      event.preventDefault();
      let input = document.getElementsByClassName('gif-text')
      getGifs(input[0].value);
      event.target.reset();
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
      img.addEventListener('click', gifEvent)
      img.className = "gif";

      gifContainer.appendChild(img);
    });

  }




  function gifEvent() {
    alert("Hello")
  }

  // fetch function returns gifs either based on user input or trending if no user input given
  
  // need to create objects for each GIF being created
  // need to clear list of gif search is hit again

class User {
 
  constructor(id, username, state) {
    this.id = id;
    this.username = username;
    this.state = state
  }

}
  

  class Gif {

    //constructor(url) {
    //  this.url = url
    //}
  
  }

})