
document.addEventListener("DOMContentLoaded", () => {
    createSession();
    searchGifEvent();
    createMessage();
    endSession();
    liveSession();
  
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
    let cardDeck = document.createElement('div');
    cardDeck.className = 'row row-cols-1 row-cols-md-4';
    gifContainer.appendChild(cardDeck)

    json["data"].forEach(element => {
      let img = document.createElement('img');
      img.src = element["images"]["fixed_height"]["url"]
      img.addEventListener('click', gifEvent)
      img.className = "gif ";
      
      let cardCol = document.createElement('div');
      cardCol.className = "col mb-4"
      let card = document.createElement('div');
      card.className = "card h-100"

      let saveButton = document.createElement('button')
      let messageButton = document.createElement('button')

      saveButton.className = "btn btn-primary card-button"
      messageButton.className = "btn btn-primary card-button"

      saveButton.innerText = "Save"
      messageButton.innerText = "Send SMS"

      saveButton.type = "button"
      messageButton.type = "button"

      saveButton.addEventListener('click', function(){
        saveEvent(img);
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


  function saveEvent(img) {
    console.log(img.src)
  }

  function messageEvent(img) {
    console.log(img.src)
  }

  function gifEvent() {
    alert("Hello")
  }

  // fetch function returns gifs either based on user input or trending if no user input given
  
  // need to create objects for each GIF being created
  // need to clear list of gif search is hit again

  class Gif {
    constructor(url) {
      this.url = url
    }
  }

})