const myGifsTitle = document.getElementById('my-gifs')
const gifContainer =  document.getElementById('gif-results')
const cardDeck = document.createElement('div');
cardDeck.className = 'row row-cols-1 row-cols-md-5';
gifContainer.appendChild(cardDeck)


class Gif {

    constructor(id=null, url, user_id) {
        this.id =  id,
        this.url =  url,
        this.user_id = user_id
    }

    renderGif() {
        let gifObject = this;
        let img = document.createElement('img');
        img.src = this.url
        img.className = "gif ";
        
        let cardCol = document.createElement('div');
        cardCol.className = "col mb-4"
        let card = document.createElement('div');
        card.className = "card h-80"

        let actionButton = document.createElement('span')
        actionButton.className = "material-icons md-48 md-light"
        actionButton.style.cursor = "pointer"

        let messageButton = document.createElement('span')
        messageButton.className = "material-icons md-48 md-light message-btn"
        messageButton.innerText = "textsms"
        messageButton.style.cursor = "pointer"

        if (this.id) {
            actionButton.innerText = "remove_circle"

            actionButton.addEventListener('click', function(){
                Gif.deleteGifEvent(gifObject);
            })
        } else {
            actionButton.innerText = "add_circle"

            actionButton.addEventListener('click', function(){
                Gif.saveGifEvent(gifObject);
            })
        }

        messageButton.addEventListener('click', function(){
            Gif.messageEvent(gifObject)
        })

        let cardBody = document.createElement('div')
        cardBody.className = "card-body"
    
        cardDeck.appendChild(cardCol)
        cardCol.appendChild(card)
        card.appendChild(img)
        card.appendChild(cardBody)
        cardBody.appendChild(actionButton)
        cardBody.appendChild(messageButton)
    }


    static messageEvent(gif) {
        let gifValue = document.getElementById('message-gif')
        $('#messageModal')
        .on('show.bs.modal', function() {
          gifValue.value = gif.url
        }).modal('show');
    }

    static saveGifEvent(gif) {
        let formData = {
          gif_url: gif.url,
          user_id: gif.user_id
        };
      
        let configObj = {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
      
        fetch(`http://localhost:3000/users/${gif.user_id}/gifs`, configObj)
        .then(function(){
          alert("GIF saved successfully!")
        }) 
    }
      
    static deleteGifEvent(gif) {
        let configObj = {
            method: "DELETE", 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
        };
        
        fetch(`http://localhost:3000/users/${gif.user_id}/gifs/${gif.id}`, configObj)
        .then(function(){
            Gif.getUserGifs(gif.user_id)
        })
        .then(function(){
            alert("GIF deleted successfully!")
        }) 
    }

    static getUserGifs(user_id) {
        Gif.clearGifResults()
        myGifsTitle.style.display = ""
        
        fetch(`http://localhost:3000/users/${user_id}/gifs`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json){
            json.forEach(element => {
                let newGif = new Gif(element.id, element.url, element.user_id)
                newGif.renderGif()
            })
        })
    
    }

    static clearGifResults() {
        cardDeck.innerHTML = ""
    }
}