const gameContainer = document.getElementById("game");

const COLORS = [
  "springgreen",
  "springgreen",
  "skyblue",
  "skyblue",
  "lightseagreen",
  "lightseagreen",
  "greenyellow",
  "greenyellow",
  "green",
  "green",
  "cyan",
  "cyan"
];

let colorOne = '';
let colorTwo = '';
let tileOne = '';
let tileTwo = '';
console.log(colorOne === colorTwo);
const guessCount = document.getElementById("guess-count");
const leastGuesses = document.getElementById("least-guesses");
let count = 0;
// for end game condition
let correctGuesses = 0;
let bestScore = null;
leastGuesses.innerHTML = bestScore;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const divFeat = document.createElement("div");

    newDiv.appendChild(divFeat);

    // git divFeat a class
    divFeat.classList.add("shine");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(e) {

  // do not flip more than two cards
  if (colorOne && colorTwo) {
    return;
  }

  // you can use event.target to see which element was clicked
  const color = e.target.className;
  const order = e.target.parentElement.children;
  // let tilesFlipped = e.target.parentElement.children("flipped");
  // const flippedCount = tilesFlipped;
  console.log("order: ", order)
  console.log("doc classList: ", document.classList)
  console.log("you just clicked", e.target);
  console.log(e);
  console.log(color);


  const currentTile = e.target;
  const match = colorOne === colorTwo;
  // console.log("At the top match = colorOne === colorTwo returns: " + colorOne + " === " + colorTwo + " = " + match);
  currentTile.style.backgroundColor = e.target.className;

  // first tile
  if  (colorOne === '') {
    // must choose a card that is not already flipped
    if (e.target.classList.contains("flipped")) {
      return;
    }
    colorOne = color;
    tileOne = e.target;
    tileOne.classList.add("flipped");
    console.log(tileOne.classList);
    console.log('click one: ', colorOne);
  }

  // second tile
  else {
    if (e.target.classList.contains("flipped")) {
      return;
    }
    colorTwo = color;
    tileTwo = e.target;
    tileTwo.classList.add("flipped");
    console.log(tileTwo.classList);
    console.log('click two: ', colorTwo)
    const match = colorOne === colorTwo;
    console.log(match);
    console.log('tileOne and tileTwo are: ' + tileOne + ' and ' + tileTwo);
    count = count + 1;
    guessCount.innerHTML = count;
    leastGuesses.innerHTML = count;

    // console.log("At the bottom match = colorOne === colorTwo returns: " + colorOne + " === " + colorTwo + " = " + match);


    if  (colorOne !== colorTwo) {
      // if colors don't match
      console.log('not a match')
      function flipBack() {
        tileOne.style.backgroundColor = 'whitesmoke';
        tileTwo.style.backgroundColor = 'whitesmoke';
        tileOne.classList.remove('flipped');
        tileTwo.classList.remove('flipped');
        colorOne = '';
        colorTwo = '';
      } 
      setTimeout(flipBack, 1000);
    
    }
    else {
      // if colors match
      console.log('they match!')
      colorOne = '';
      colorTwo = '';
      correctGuesses += 2;
      console.log("correct guesses:", correctGuesses);
      // if(#game div)

      

      if (correctGuesses === COLORS.length) {
      // setTimeout(function() {
      //   alert("you won!")
      //   }, 10);
        const reset = document.querySelectorAll('.flipped');
        reset.classList.remove('flipped');
        shuffle(COLORS);
        if(!bestScore || count < bestScore) {
          bestScore = count;
        };
        
        // if(count < localStorage.getItem(memoryBestScore)){
        //   localStorage.setItem("memoryBestScore", count)
        // }
      // localStorage.setItem("memoryBestScore", count)
      }
    }

  }


}

// when the DOM loads
createDivsForColors(shuffledColors);
