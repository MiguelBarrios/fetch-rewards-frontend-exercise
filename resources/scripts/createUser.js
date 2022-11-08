
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
