const seatsContainer = document.querySelector('.seats-container');
const selectedMovie = document.querySelector('#movie');
const notOccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const totalNumberOfSeats = document.querySelector('.number-of__seats');
const totalPriceForTickets = document.querySelector('.price-for__tickets');

let ticketPrice = Number(selectedMovie.value);

const saveToLocalStorage = (key, value) => {
   return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
   const seatsFromStorage = JSON.parse(localStorage.getItem(key));
    if(seatsFromStorage !== null) {
        notOccupiedSeats.forEach((notOccupiedSeat, index) => {
            if (seatsFromStorage.indexOf(index) > -1) {
                notOccupiedSeat.classList.add('selected');
            };  
        });
    };
};

const selectSeats = (e) => {
    if(e.target.classList.contains('occupied')) {
        alert('This seat is occupied. Please, choose another one.')
    }
    else if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        const selected = e.target.classList.toggle('selected'); 
        return selected;  
    };
};

const updateSeats = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const  findSeatsIndex = [...selectedSeats].map((selectedSeat) => {
        return [...notOccupiedSeats].indexOf(selectedSeat);
    });

    saveToLocalStorage('seats', findSeatsIndex);
    totalNumberOfSeats.innerHTML = selectedSeats.length;
    totalPriceForTickets.innerHTML = ticketPrice * selectedSeats.length;
};

const pickAMovie = (e) => {
    ticketPrice = Number(e.target.value);
    updateSeats();
}

const chooseSeatForMovie = (e) => {
    selectSeats(e);
    updateSeats();
};

selectedMovie.addEventListener('change', pickAMovie);
seatsContainer.addEventListener('click', chooseSeatForMovie);

getFromLocalStorage('seats');