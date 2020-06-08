document.addEventListener("DOMContentLoaded", () => {
    createSession();
    searchGifEvent();
    createMessage();
    endSession();
    liveSession();

    const myGifsBtn = document.getElementById('user-gifs').addEventListener('click', getUserGifs)

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
            if (response.status >= 400) (
              console.log(response.errors)
            )
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
    if (sessionStorage.getItem("user") ) {
      landingPage.style.display="none";
      nav.style.display=""
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

  function messageEvent(img) {
    let gifValue = document.getElementById('message-gif')
    $('#exampleModal')
    .on('show.bs.modal', function() {
      gifValue.value = img.src
    }).modal('show');
  }
// MESSAGES  

// GIFS
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
    myGifsTitle.style.display = "none"

    if (param) {
       value = `https://api.giphy.com/v1/gifs/search?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&q=${param}&limit=75&offset=0&rating=G&lang=en`;
    } else {
       value = "https://api.giphy.com/v1/gifs/trending?api_key=e0AvkN0goRu200cWCCOSRaAHS1x5I3Y6&limit=75&offset=0&rating=G&lang=en";
    }
    fetch(value)
    .then(function(response) {
      return response.json();
    }).then(function(json){
      let collection = json["data"].map(element => {
        return element = new Gif(null, element["images"]["fixed_height"]["url"], null)
      })
    displayGifs(collection);
    })
  }

  function getUserGifs() {
    myGifsTitle.style.display = ""
    let configObj = {
      method: "get", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    };

    fetch(`http://localhost:3000/users/${sessionStorage.id}/gifs`, configObj)
    .then(function(response) {
      return response.json();
    }).then(function(json){
      let collection = json.map(element => {
        return element = new Gif(element["id"], element["url"], element["user_id"])
      })
    displayGifs(collection);
    })
  }

  function displayGifs(collection) {
    let gifContainer =  document.getElementById('gif-results')
    gifContainer.innerHTML = ""
    
    let cardDeck = document.createElement('div');
    cardDeck.className = 'row row-cols-1 row-cols-md-4';
    gifContainer.appendChild(cardDeck)

    collection.forEach(element => {
      let img = document.createElement('img');
      img.src = element["url"]
      img.className = "gif ";
      
      let cardCol = document.createElement('div');
      cardCol.className = "col mb-4"
      let card = document.createElement('div');
      card.className = "card h-100"

      let saveButton = document.createElement('button')
      let messageButton = document.createElement('button')

      saveButton.className = "btn btn-light card-button"
      messageButton.className = "btn btn-light card-button"

      saveButton.innerText = "save"
      messageButton.innerText = "send sms"

      saveButton.type = "button"
      messageButton.type = "button"

      //abstract save/delete button into function to determine label
      saveButton.addEventListener('click', function(){
        saveGifEvent(img);
      })
      messageButton.addEventListener('click', function(){
        messageEvent(img);
      })
      
      let cardBody = document.createElement('div')
      cardBody.className = "card-body"
    
      cardDeck.appendChild(cardCol)
      cardCol.appendChild(card)
      card.appendChild(img)
      card.appendChild(cardBody)
      cardBody.appendChild(saveButton)
      cardBody.appendChild(messageButton)
      
    });
  }


  function saveGifEvent(img) {
    let formData = {
      gif_url: img.src,
      user_id: sessionStorage.id
    };

    let configObj = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/gifs", configObj);
   // .then(function(){
   //   getUserGifs()
   // }) commenting in takes user to their gif index page after saving new gif to their account. 
  }

 
  class Gif {
    constructor(id = null, url, user_id = null) {
      this.id = id,
      this.url = url,
      this.user_id = user_id

    }
  }

 // GIFS 

})