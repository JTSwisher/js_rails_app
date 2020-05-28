document.addEventListener("DOMContentLoaded", () => {
    createSession();

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
}