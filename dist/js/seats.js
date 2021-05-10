const movieID = localStorage.getItem('id');
const movieTitle = localStorage.getItem('title');
const fromHomepage = localStorage.getItem('fromHomepage');
let seatCount = 0;
let ticketPrice = 12;

$(document).ready(()=>{
    if(fromHomepage == "true"){
        $('.movieContainer').append(`<label for="movies">Select a movie: </label><select name="movies" id="movies"></select>`);
        fetchData(apiObj.movie.now_playing, apiObj.apiKey, apiObj.language, '', '1')
        .then(data => {
                    for(i=0; i<10; i++){
                        $('#movies').append(`<option value="${i}">${data.results[i].title}</option>`)

                    }
                })
    }else{
        $('.movieContainer').append(`<h2>${movieTitle}</h2>`);
    }
})

let apiObj = {
    apiKey: 'aebea828d86787cf050a2a920275c0ec',
    language: 'en-US',
    movie: {
        popular: 'movie/popular',
        now_playing: 'movie/now_playing',
    }
    
}

function fetchData(url = '', apiKey = '', lan = '', movie_id ='', page){

    return fetch(`https://api.themoviedb.org/3/${url}?api_key=${apiKey}&language=${lan}&page=${page}`)
        .then(res => res.json())
        .then(data => {
            return data;
        })
}

function seatSelected(e){
    let seatID = document.getElementById(e.id);
    let seatClass = e.className;
    if(seatID.classList.contains('selected')){
        seatID.classList.remove('selected');
        seatCount--;
    }else if(!seatID.classList.contains('selected') && !seatID.classList.contains('occupied')){
        seatID.classList.add('selected');
        seatCount++;
    }

    $('#seatCount').text(seatCount);
    $('#total').text(seatCount*ticketPrice);
}

if(darkModeStatus){
    $('body').addClass('darkMode');
}

function darkMode(){
    $('body').toggleClass('darkMode');
    darkModeStatus = !darkModeStatus;
    localStorage.setItem('darkMode', darkModeStatus);
}