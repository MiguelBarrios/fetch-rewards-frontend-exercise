var createUserBtn = document.getElementById('create-user-btn');
createUserBtn.addEventListener('click', function(e){
    // Don't submit the form
    e.preventDefault();
    createNewUser();
});

function createNewUser(){
    console.log("created new user");
    let validForm = checkIfFormIsComplete();
    if(validForm){
      let userObject = createUserObject();
      console.log(userObject)
      sendCreateNewUserRequest(userObject);
    }
    else{
      console.log("Invalid form");
    }
}

function checkIfFormIsComplete(){
   let formComplete = true;

  // Check for empty fields
  formComplete = validateField('input-fullname') && formComplete;
  formComplete = validateField('input-email') && formComplete;
  formComplete = validateField('input-password') && formComplete;
  formComplete = validateField('input-state') && formComplete;
  formComplete = validateField('input-occupation') && formComplete;

  // Check if valid state and occupation are given
  let occupationName = document.getElementById('input-occupation').value;
  let stateName = document.getElementById('input-state').value;

  if(!validState(stateName)){
    document.getElementById('input-state-error-message').classList.remove('hidden');
  }

  if(!validOccupation(occupationName)){
    document.getElementById('input-occupation-error-message').classList.remove('hidden');
  }



  
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

function createUserObject(){
  let name = document.getElementById('input-fullname').value;
  let email = document.getElementById('input-email').value;
  let password = document.getElementById('input-password').value;
  let occupation = document.getElementById('input-occupation').value;
  let stateName = document.getElementById('input-state').value;
  let state = getState(stateName);

  let userObj = {
    name: name,
    email: email,
    password: password,
    occupation: occupation,
    state: state
  }

  return userObj;
}

function validState(state){
  return state;
}

function validOccupation(){

}



function sendCreateNewUserRequest(userObject){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://frontend-take-home.fetchrewards.com/form', true)
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if ( xhr.status == 200 || xhr.status == 201 ) { 
            let data = JSON.parse(xhr.responseText);
            console.log("Success: user created");
            $('#myModal').modal('show');
            document.getElementById('user-fullname').textContent = data.name;
            document.getElementById('user-id').textContent = 'user id: ' + data.id;
          }
          else {
            console.error("POST request failed.");
            console.error(xhr.status + ': ' + xhr.responseText);
          }
        }
    };
      
    let userObjectJson = JSON.stringify(userObject);   
    xhr.send(userObjectJson);
}
