var createUserBtn = document.getElementById('create-user-btn');
createUserBtn.addEventListener('click', function(e){
    // Don't submit the form
    e.preventDefault();
    createNewUser();
});

function createNewUser(){
    let formIsComplete = isFormComplete();
    if(formIsComplete){
      let userObject = createUserObject();
      sendCreateNewUserRequest(userObject);
    }
}

let formComplete;
function isFormComplete(){

  formComplete = true;
  // Check for empty fields
  isFieldEmpty('input-fullname');
  isFieldEmpty('input-email');
  isFieldEmpty('input-password');
  isFieldEmpty('input-state');
  isFieldEmpty('input-occupation');

  // Check if valid state and occupation are given
  let occupationName = document.getElementById('input-occupation').value;
  let stateName = document.getElementById('input-state').value;

  if(!validState(stateName)){
    showInvalidInputMessage('input-state-error-message');
    formComplete = false;
  }

  if(!validOccupation(occupationName)){
    showInvalidInputMessage('input-occupation-error-message');
    formComplete = false;
  }

  return formComplete;
}

function isFieldEmpty(elementId){
    let field = document.getElementById(elementId).value;
    let errorMessageId = elementId + '-error-message';
    
    if(field){
      hideInvalidInputMessage(errorMessageId);
    }else{
      showInvalidInputMessage(errorMessageId);
      formComplete = false;
    }
}

function hideInvalidInputMessage(messageContainerId){
  document.getElementById(messageContainerId).classList.add('hidden');
}

function showInvalidInputMessage(messageContainerId){
  document.getElementById(messageContainerId).classList.remove('hidden');
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

function sendCreateNewUserRequest(userObject){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://frontend-take-home.fetchrewards.com/form', true)
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if ( xhr.status == 200 || xhr.status == 201 ) { 
            let data = JSON.parse(xhr.responseText);
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
