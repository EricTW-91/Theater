let darkModeStatus = (localStorage.getItem('darkMode') == 'true');
let movieID = localStorage.getItem('id');

let apiObj = {
    apiKey: 'aebea828d86787cf050a2a920275c0ec',
    language: 'en-US',
    id: movieID,
    movie: {
        detail: `movie/${movieID}`,
        popular: 'movie/popular',
        getVideo: `movie/${movieID}/videos`,
    }
    
}

if(darkModeStatus){
    $('body').addClass('darkMode');
}



$(document).ready(()=>{
    $('section').hide();

    fetchData(apiObj.movie.detail, apiObj.apiKey, apiObj.language, apiObj.id)
            .then(data => {
                $('#title').text(data.title);
                $('figure').append(`<img id="poster" src="https://image.tmdb.org/t/p/original${data.poster_path}">`);
                $('#overview').text(data.overview);
                localStorage.setItem('title', data.title);

                
            })



})

function fetchData(url = '', apiKey = '', lan = ''){

    return fetch(`https://api.themoviedb.org/3/${url}?api_key=${apiKey}&language=${lan}`)
        .then(res => res.json())
        .then(data => {
            return data;
        })
}

function darkMode(){
    $('body').toggleClass('darkMode');
    darkModeStatus = !darkModeStatus;
    localStorage.setItem('darkMode', darkModeStatus);
}

function getTrailer(){
    fetchData(apiObj.movie.getVideo, apiObj.apiKey, apiObj.language)
    .then(data =>{
        console.log(data)
        for(i=0; i<data.results.length; i++)
            if (data.results[i].site == 'YouTube' & (data.results[i].type == 'Trailer' || data.results[i].type == 'Featurette')){

                $('section').show().empty().append(`<iframe id="ytplayer" type="text/html" width="960" height="540" src="https://www.youtube.com/embed/${data.results[0].key}" frameborder="0" autoplay></iframe>`);
            }

        })

}

function closeTrailer(){
    $('section').empty().hide();
}

function openTicketPage(){
    localStorage.setItem('fromHomepage', 'false');
    window.open("./seats.html")
}