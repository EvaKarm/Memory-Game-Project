/*
 * a list that holds all cards
 */

let someArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle"];
let listOfCards = someArray.concat(someArray);

/*
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cards = document.querySelectorAll('.deck li');
const card = document.querySelector('.deck');
let flag = false;
let myTimer;
let count = 0;
let sec=0;
let min=0;
let starIndex = 0;
let starIndexwin = 0;
let listOfOpenCards = [];
let listOfMatchCards = [];
let buttonYes = document.querySelector('.playAgain');
let buttonNo = document.querySelector('.close');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

timeout_id = window.setTimeout(restart(), 0);

document.querySelector(".restart").addEventListener('click', function () {
  restart();
});

function restart () {
  changeCard(cards);
  closeCards(cards);
  stopTimer();
  count = 0;
  starIndex = 0;
  starIndexwin = 0;
  listOfMatchCards = [];
  flag = false;
  clearTimeout(myTimer);
  document.querySelector(".fa-star").style.visibility = 'visible';
  document.querySelector('.moves').innerHTML = count;
}

function changeCard(array) {
  let shuffleListOfCards = shuffle(listOfCards);
  for (i = 0; i < array.length; i++) {
    array[i].firstElementChild.className = shuffleListOfCards[i];
  };
};

function closeCards(array) {
  for (i = 0; i < array.length; i++) {
      array[i].className = "card";
  }
  cards.forEach(e => e.addEventListener('click', clickHandler));
  document.querySelectorAll(".fa-star").forEach( e => e.style.visibility = 'visible');
};

/*
 * set up the event listener for a card, if a card is clicked
 * - display the card's symbol
*/

cards.forEach(e => e.addEventListener('click', clickHandler));

function clickHandler(evt) {
  if(flag === false){
    startTimer();
    flag = true;
  };
  if (listOfOpenCards.length < 2) {
    evt.target.className += " open show";
    evt.target.removeEventListener('click', clickHandler);
    addToOpenList(evt.target);
  };
};

 /*
 *  - add the card to a *list* of "open" cards
*/

function addToOpenList(target) {
  if (listOfOpenCards.length === 0) {
    listOfOpenCards.push(target);
  } else if (listOfOpenCards.length === 1) {
    listOfOpenCards.push(target);
    if (listOfOpenCards.length === 2) {
    checkCardsMatch(listOfOpenCards);
    };
  };
};

/*
 *  check to see if the two cards match, if the cards do match, lock the cards in the open position
 */

function checkCardsMatch(array) {
  let i=array[0];
  let g=array[1];
  if (array.length===2 && array[0].firstElementChild.className === array[1].firstElementChild.className) {
    i.className  += " match";
    g.className += " match";
    listOfMatchCards.push(array[0]);
    array.length=0;
    moveCounter();
    starScore();
    if(listOfMatchCards.length===8){
      show();
    };
  } else {
   checkCardsNoMatch(array);
 };
};

/*
*  if the cards do not match, remove the cards from the list and hide the card's symbol
*/

function checkCardsNoMatch(array) {
  let k=array[0];
  let d=array[1];
  if (array.length===2 && array[0].firstElementChild.className !== array[1].firstElementChild.className) {
    setTimeout(function() {
      k.className = "card";
      k.addEventListener('click', clickHandler);
      d.className = "card";
      d.addEventListener('click', clickHandler);
      array.length=0;
    }, 900);
    moveCounter();
    starScore();
  };
};

 /*
 *   increment the move counter and display it on the page
*/

function moveCounter() {
  count+=1;
  document.querySelector('.moves').innerHTML = count;
};

/*
 *    if all cards have matched, display a message with the final score
 */


function show() {
  document.getElementById('window').style.display = 'block';
  document.getElementById('moveCount').textContent = ('Moves: '+count);
  document.getElementById('time').textContent = ('Time: '+document.querySelector('.timer').innerHTML);
};

buttonYes.addEventListener('click', function () {
  restart();
  document.getElementById('window').style.display = 'none';
});

buttonNo.addEventListener('click', function (evt) {
  document.getElementById('window').style.display = 'none';
});

/*
* timer
*/

function startTimer() {
  if (sec>=60) {
    sec=0;
    min+=1;
  }
  else
  sec+=1;
  document.querySelector('.timer').innerHTML = (min<10?'0'+min:min) + ":" + (sec<10?'0'+sec:sec);
  myTimer = setTimeout(startTimer, 1000);
};

function stopTimer() {
  sec=0;
  min = 0;
  document.querySelector('.timer').innerHTML = '00:00';
};

const elem = document.querySelectorAll("#stars .fa-star");
console.log(starIndex)
const elemwin = document.querySelectorAll("#winstars .fa-star");
function starScore() {
    if (count == 13 || count == 20 || count == 27) {
        elem[starIndex].style.visibility = 'hidden';
        starIndex+=1;
        elemwin[starIndexwin].style.visibility = 'hidden';
        starIndexwin+=1;
    };
};

