
let states = [];
let occupations = []

loadOccupationAndStateData();
function loadOccupationAndStateData(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://frontend-take-home.fetchrewards.com/form');

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status == 200){
                let data = JSON.parse(xhr.responseText);
                states = data.states;
                let stateNames = states.map(states => states.name);
                occupations = data.occupations;
                autocomplete(document.getElementById("input-occupation"), occupations);
                autocomplete(document.getElementById("input-state"), stateNames);
            }
            else{
                console.log(xhr.status + " : " +xhr.responseText);
            }
        }
    }
    xhr.send();
}

function getState(stateName){
    return states.find(state => state.name === stateName);
}
  
function validState(stateName){
    return states.find(state => state.name === stateName);
}
  
function validOccupation(occupationName){
    return occupations.find(occupation => occupation === occupationName);
}