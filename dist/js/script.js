let apiObj = {
    apiKey: 'aebea828d86787cf050a2a920275c0ec',
    language: 'en-US',
    // movie: {
    //     popular: 'movie/popular',
    //     now_playing: 'movie/now_playing',
    // },

    now_playing(page){
        return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=${this.language}&page=${page.toString()}`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
    },
    
}

let pageSection = 0;
const pagesPerSection = 8;

$(document).ready(()=>{
    // Get the first page of now_playing
    apiObj.now_playing(1)
        .then(data => {
            getMovies(data.results);
            pagination(data.total_pages, pageSection);
            console.log(data.total_pages);
        })
})

function pagination(totalPages, sectionIndex){
    $('#pageNumbers').empty();

    totalPages = parseInt(totalPages);

    if(totalPages <= pagesPerSection){
        for(i=0; i<totalPages; i++){
            $('#pageNumbers').append(`<button class="pageBtn" value="${i+1}" onclick="pageChange(this)">${i+1}</button>`);
        }
    }else{
        // Get the amount of page section
        const endSection = Math.ceil(totalPages / pagesPerSection)-1;

        // PreSection button
        if(sectionIndex > 0){
            $('#pageNumbers').append(`<button class="pageBtn" id="preSection" onclick="sectionChange(this)"><<</button>`);
        }
        
        // Pages button
        let sectionLength = pagesPerSection;
        let restPages = totalPages%pagesPerSection;

        if(sectionIndex == endSection){
            sectionLength = restPages;
            if(restPages == 0){
                sectionLength = pagesPerSection;
            }
        }

        for(i=0; i<sectionLength; i++){
            const pageValue = sectionIndex*pagesPerSection+i+1;
            $('#pageNumbers').append(`<button class="pageBtn" value="${pageValue}" onclick="pageChange(this)">${pageValue}</button>`);
        }

        // NextSection Button
        if(sectionIndex < endSection){
            $('#pageNumbers').append(`<button class="pageBtn" id="nextSection" onclick="sectionChange(this)">>></button>`);
        }
    }
}

function getMovies(movies){
    $('#now_playing').empty();

    for(i=0; i<movies.length; i++){
        $('#now_playing').append(`<div class="movie" id="${movies[i].id}" onclick="openDetailPage(this)"><img src="https://image.tmdb.org/t/p/original${movies[i].poster_path}"></div>`);
    }
}

function pageChange(e){
    apiObj.now_playing(e.value)
        .then(data => {
            getMovies(data.results)
        })
}

function sectionChange(e){
    $('#now_playing').empty();
    $('#pageNumbers').empty();
    
    if(e.id == 'nextSection'){
        pageSection++;
    }else if(e.id == 'preSection'){
        pageSection--;
    }

    apiObj.now_playing(pageSection*pagesPerSection+1)
        .then(data => {
            getMovies(data.results);
            pagination(data.total_pages, pageSection);
        })
}

// Dark mode
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


// Open movie detail
function openDetailPage(e){
    localStorage.setItem('darkMode', darkModeStatus)
    localStorage.setItem('id', e.id);

    window.open("./detail.html", "_self");
}

// Record status of ticket page
function openTicketPage(){
    localStorage.setItem('fromHomepage', 'true');
    window.open("./seats.html");
}





