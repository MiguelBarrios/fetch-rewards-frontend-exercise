var createUserBtn = document.getElementById('create-user-btn');
createUserBtn.addEventListener('click', function(e){
    // Don't submit the form
    e.preventDefault();
    createNewUser();
});

function createNewUser(){
    console.log("created new user");
    let isFormComplete = checkIfFormIsComplete();



}

function checkIfFormIsComplete(){
   let formComplete = true;

  formComplete = validateField('input-fullname') && formComplete;
  formComplete = validateField('input-email') && formComplete;
  formComplete = validateField('input-password') && formComplete;
  formComplete = validateField('input-state') && formComplete;
  formComplete = validateField('input-occupation') && formComplete;
  
  return formComplete;
}

function validateField(elementId){
    let field = document.getElementById(elementId).value;
    let errorMessageId = elementId + '-error-message';
    let valid = false;
    
    if(field.length > 0){
      document.getElementById(errorMessageId).classList.add('hidden');
      valid = true;
    }else{
      document.getElementById(errorMessageId).classList.remove('hidden');
    }

    return valid;
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
