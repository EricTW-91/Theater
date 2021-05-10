const movieID = localStorage.getItem('id');
const movieTitle = localStorage.getItem('title');
const fromHomepage = localStorage.getItem('fromHomepage');
let seatCount = 0;
let ticketPrice = 12;

$(document).ready(()=>{
    if(fromHomepage == "true"){
        $('.movieContainer').append(`<h2>Hello!!</h2>`);
    }else{
        $('.movieContainer').append(`<h2>${movieTitle}</h2>`);
    }
})

function seatSelected(e){
    let seatID = document.getElementById(e.id);
    let seatClass = e.className;
    if(seatID.classList.contains('selected')){
        seatID.classList.remove('selected');
        seatCount--;
    }else if(!seatID.classList.contains('selected')){
        seatID.classList.add('selected');
        seatCount++;
    }

    const countID = document.getElementById('seatCount');
    countID.innerHTML = seatCount;
    const totalID = document.getElementById('total');
    totalID.innerHTML = seatCount*ticketPrice;
}

if(darkModeStatus){
    $('body').addClass('darkMode');
}

function darkMode(){
    $('body').toggleClass('darkMode');
    darkModeStatus = !darkModeStatus;
    localStorage.setItem('darkMode', darkModeStatus);
}