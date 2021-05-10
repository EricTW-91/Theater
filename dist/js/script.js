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

let pageSection = 0;


$(document).ready(()=>{
    // Get popular movies
    fetchData(apiObj.movie.now_playing, apiObj.apiKey, apiObj.language, '', '1')
        .then(data => {
            // Append movie divs
            for(i=0; i<data.results.length; i++){
                $('#now_playing').append(`<div class="movie" id="${data.results[i].id}" onclick="openDetailPage(this)"><img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}"></div>`);
            }


            // Show pages button
            // $('#pageNumbers').append(`<button class="pageBtn" onclick="pageChange()"></button>`);
            let pageLength;

            if(data.total_pages>9){
                pageLength = 9;
            }else{
                pageLength = data.total_pages;
            }
            for(i=0; i<pageLength; i++){
                $('#pageNumbers').append(`<button class="pageBtn" value="${i+1}" onclick="pageChange(this)">${i+1}</button>`);
            }
            $('#pageNumbers').append(`<button class="pageBtn" id="addTenPages" onclick="pageNumChange(this)">>></button>`);
        })
})


let darkModeStatus = false;
darkModeStatus = (localStorage.getItem('darkMode') == 'true');

if(darkModeStatus){
    $('body').addClass('darkMode');
}

function darkMode(){
    $('body').toggleClass('darkMode');
    darkModeStatus = !darkModeStatus;
    localStorage.setItem('darkMode', darkModeStatus);
}



function openDetailPage(e){
    localStorage.setItem('darkMode', darkModeStatus)
    localStorage.setItem('id', e.id);

    window.open("./detail.html", "_self");
}

function pageChange(e){
    fetchData(apiObj.movie.now_playing, apiObj.apiKey, apiObj.language, '', e.value)
        .then(data => {
            $('#now_playing').empty();
            for(i=0; i<data.results.length; i++){
                $('#now_playing').append(`<div class="movie" id="${data.results[i].id}" onclick="openDetailPage(this)"><img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}"></div>`);
            }
        })
}

function pageNumChange(e){
    $('#pageNumbers').empty();
    
    if(e.id == 'addTenPages'){
        pageSection++;
    }else if(e.id == 'subTenPages'){
        pageSection--;
    }
    // console.log(e.id);

    let page = pageSection*10;
    if(pageSection == 0){
        page = 1;
    }

    fetchData(apiObj.movie.now_playing, apiObj.apiKey, apiObj.language, '', page.toString())
        .then(data => {
            console.log((pageSection)*10);
            $('#now_playing').empty();
            for(i=0; i<data.results.length; i++){
                $('#now_playing').append(`<div class="movie" id="${data.results[i].id}" onclick="openDetailPage(this)"><img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}"></div>`);
            }


            if(pageSection != 0){
                $('#pageNumbers').append(`<button class="pageBtn" id="subTenPages" onclick="pageNumChange(this)"><<</button>`);
            }

            let pageLength;
            if(pageSection < Math.floor(data.total_pages/10)){
                pageLength = 9;
            }else if(pageSection == Math.floor(data.total_pages/10)){
                pageLength = data.total_pages % 10;
            }

            if(pageSection != 0){

                $('#pageNumbers').append(`<button class="pageBtn" value="${pageSection * 10}" onclick="pageChange(this)">${pageSection * 10}</button>`);
            }
            for(i=0; i<pageLength; i++){
                $('#pageNumbers').append(`<button class="pageBtn" value="${pageSection * 10 + i + 1}" onclick="pageChange(this)">${pageSection * 10 + i + 1}</button>`);
            }

            if(pageSection != Math.floor(data.total_pages/10)){
                $('#pageNumbers').append(`<button class="pageBtn" id="addTenPages" onclick="pageNumChange(this)">>></button>`);
            }
        })



        // console.log(pageSection);
}

function openTicketPage(){
    localStorage.setItem('fromHomepage', 'true');
    window.open("./seats.html");
}





