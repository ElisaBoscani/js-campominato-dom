/* 

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
Attenzione: **nella stessa cella può essere posizionata al massimo una bomba,
perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati -
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri
consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

//elementi del DOM
const startGame = document.querySelector("button");
const scoreBox = document.getElementById("scoreBox");
const score = document.getElementById("score");
/* const difficulty = document.getElementById("difficulty").value; */
const arrayBombs = [];
const arrayButtons = document.getElementsByClassName("square");
const gridEl = document.getElementById("grid");
gridEl.classList.add("dNone");

const select = document.getElementById("difficulty");
let total = 0;
let squareNumber = 100;
select.addEventListener("change", function (e) {
  selecLevel(e);
});

//L'utente clicca su un bottone che genererà una griglia di gioco
startGame.addEventListener("click", function () {
  gridEl.innerHTML = "";

  //creiamo le difficolta
  genereteElement(gridEl, squareNumber);
  randomBombs(squareNumber);

  //l'apparire e scomparire della griglia
  if (
    gridEl.classList.contains("dNone") ||
    scoreBox.classList.contains("dNone")
  ) {
    gridEl.classList.remove("dNone");
    gridEl.classList.add("d-flex");
    scoreBox.classList.remove("dNone");
  } else {
    gridEl.classList.add("dNone");
    gridEl.classList.remove("d-flex");
    scoreBox.classList.add("dNone");
  }

  /* creiamo le bombe */
  function randomBombs(numb) {
    while (arrayBombs.length < 16) {
      const numberBomb = Math.floor(Math.random() * numb) + 1;

      if (!arrayBombs.includes(numberBomb)) {
        arrayBombs.push(numberBomb);
      }
    }
  }
  for (let i = 0; i < arrayButtons.length; i++) {
    const button = arrayButtons[i];
    button.disabled = false;
  }
  console.log(arrayBombs);
});

//livelli di difficoltà
function selecLevel(e) {
  if (e.target.value === "easy") {
    squareNumber = 100;
  } else if (e.target.value === "medium") {
    squareNumber = 81;
  } else if (e.target.value === "hard") {
    squareNumber = 49;
  }
}

//funzione per creare elementi

function genereteElement(element, number) {
  //creato il quadratini e il testo(che parte con un display non, perche si vedra solo al click del quadrato)
  console.log("number", number);
  console.log("element", element);
  for (let i = 0; i < number; i++) {
    const square = document.createElement("button");
    const squareText = document.createElement("p");

    squareText.classList.add("dNone");
    square.append(squareText);
    square.classList.add("square");
    element.append(square);
    if (number === 81) {
      square.style.width = "calc(100% / 9)";
    } else if (number === 49) {
      square.style.width = "calc(100% / 7)";
    } else {
      square.style.width = "calc(100% / 10)";
    }

    //cambiare il nome delle celle e il colore

    square.addEventListener("click", function () {
      changeColorText(square, squareText);
      //gameover e punteggio
      if (arrayBombs.includes(i + 1)) {
        square.classList.add("bgRed");
        squareText.innerHTML = "💣";
        endGame();

        for (let i = 0; i < arrayButtons.length; i++) {
          const button = arrayButtons[i];
          button.disabled = true;
        }

        arrayBombs.splice(0, arrayBombs.length);
      } else {
        for (let i = 0; i < arrayButtons.length; i++) {
          const button = arrayButtons[i];
          if (button.className === "square bgColor") {
            button.disabled = true;
          }
        }
        total++;
        score.innerHTML = total;
        console.log(total);
      }
    });

    startGame.addEventListener("click", function () {
      squareText.innerHTML = "";
      square.classList.remove("bgRed");
      square.classList.add("bgBlue");
    });
  }
}

//funzione per cambiare gli elementi
function changeColorText(color, text) {
  color.classList.toggle("bgColor");
  color.classList.remove("bgBlue");
  text.classList.toggle("dNone");
}
//fine del gioco
function endGame() {
  const endGameText = document.createElement("h1");

  endGameText.classList.add("endgame");
  document.body.appendChild(endGameText);
  endGameText.innerHTML = "Game over";
  startGame.addEventListener("click", function () {
    endGameText.innerHTML = "";
  });
}
