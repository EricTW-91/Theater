// let movies = ['The Dark Knight', 'The Lord Of Rings', 'Harry Potter', "Schindler's List", 'Fight Club'];
let movies = {
    M00: {
        Title: 'The Dark Knight',
        OccupiedArray: new Array(60)
    },
    M01: {
        Title: 'The Lord Of Rings',
        OccupiedArray: new Array(60)

    },
    M02: {
        Title: 'Harry Potter',
        OccupiedArray: new Array(60)

    },
    M03: {
        Title: "Schindler's List",
        OccupiedArray: new Array(60)

    },
    M04: {
        Title: 'Fight Club',
        OccupiedArray: new Array(60)

    }
}

localStorage.setItem('movieTitles', JSON.stringify(movies));
console.log(JSON.parse(localStorage.getItem("movieTitles"))[0]);



let seatCount = 0;
let ticketPrice = 12;

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