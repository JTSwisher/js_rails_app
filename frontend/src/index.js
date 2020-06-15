document.addEventListener("DOMContentLoaded", () => {
  createSession();
  searchGifEvent();
  createMessage();
  endSession();
  liveSession();
 

  const myGifsBtn = document.getElementById('user-gifs').addEventListener('click', function(){
    Gif.getUserGifs(sessionStorage.id)
  })

  const myGifsTitle = document.getElementById('my-gifs')
  myGifsTitle.style.display = "none"


  // USER SESSIONS  
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
            if (object.errors) {
              alert(object.errors)
            } else {
              sessionStorage.setItem('id', object.id)
              sessionStorage.setItem('user', object.username)
              liveSession();
            }
            
          })
        event.target.reset();
      })
  }

  function liveSession() {
    let landingPage = document.getElementById('landing-page');
    let nav = document.getElementById('nav');
    let userIdentification = document.getElementById('user-name')
    if (sessionStorage.getItem("user") ) {
      landingPage.style.display="none";
      nav.style.display=""
      userIdentification.innerText = `Hello, ${sessionStorage.user}`
    } else {
      landingPage.style.display="";
      nav.style.display="none"
    }
  }

  function endSession() {
    let input = document.getElementById('logout')
    input.addEventListener('click', function() {
      sessionStorage.clear()
      liveSession();
    })
  }
  // USER SESSIONS  

  // MESSAGES
  function createMessage() {
    let form = document.getElementById("twilio-form");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let inputs = document.getElementsByClassName('message-text');
        let number = inputs[0].value;
        let message = inputs[1].value;
        let gif = inputs[2].value;  

        let formData = {
            number: number,
            message: message,
            gif: gif
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
  // MESSAGES  

  // GIFS
  function searchGifEvent(){
    let form = document.getElementById('search-form');
    form.addEventListener('submit', function(event){
      event.preventDefault();
      let input = document.getElementsByClassName('gif-text')
      Gif.clearGifResults()
      getGifs(input[0].value);
      event.target.reset();
    })
  }

  function getGifs(param) {
    myGifsTitle.style.display = "none"

    if (param) {
      value = `https://api.giphy.com/v1/gifs/search?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&q=${param}&limit=75&offset=0&rating=G&lang=en`;
    } else {
      value = "https://api.giphy.com/v1/gifs/trending?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&limit=75&offset=0&rating=G&lang=en";
    }

    fetch(value)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      json["data"].forEach(element => {
        let newGif = new Gif(null, element["images"]["fixed_height"]["url"], sessionStorage.id)
        newGif.renderGif()
      })
    })
  }

})