
let states = [];
let occupations = []

function loadOccupationAndStateData(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://frontend-take-home.fetchrewards.com/form');

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                let data = JSON.parse(xhr.responseText);
                states = data.states;
                occupations = data.occupations;
            }
            else{
                console.log(xhr.status + " : " +xhr.responseText);
            }
        }
    }
    xhr.send();
}

function createNewUser(){

}

function sendCreateNewUserRequest(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://frontend-take-home.fetchrewards.com/form', true)
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if ( xhr.status == 200 || xhr.status == 201 ) { 
            let data = JSON.parse(xhr.responseText);
            console.log("Success")
            console.log(data);
          }
          else {
            console.error("POST request failed.");
            console.error(xhr.status + ': ' + xhr.responseText);
          }
        }
    };
      
    let userObject = {
        "name": "Jimmathy A Smith",
        "email": "jim@gmail.com",
        "password": "password",
        "occupation": "Head of Shrubbery",
        "state": {
            name: 'Alabama', 
            abbreviation: 'AL'
        }
    };
      
    let userObjectJson = JSON.stringify(userObject); 
      
    xhr.send(userObjectJson);
}
