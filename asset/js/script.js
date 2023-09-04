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

const gridEl = document.getElementById("grid");
gridEl.classList.add("dNone");
let clearGrid = false;
//L'utente clicca su un bottone che genererà una griglia di gioco
startGame.addEventListener("click", function () {
  /*  gridEl.style.display = "block"; */
  if (!clearGrid) {
    genereteElement(gridEl, squareNumber);
    clearGrid = true;
  }
  if (gridEl.classList.contains("dNone")) {
    gridEl.classList.remove("dNone");
    gridEl.classList.add("d-flex");
  } else {
    gridEl.classList.add("dNone");
    gridEl.classList.remove("d-flex");
  }
});

//funzione per creare elementi

const squareNumber = 100;
function genereteElement(element, number) {
  /* creiamo le bombe */
  const arrayBombs = [];
  while (arrayBombs.length < 16) {
    const numberBomb = Math.floor(Math.random() * 100) + 1;
    console.log(numberBomb);
    if (!arrayBombs.includes(numberBomb)) {
      arrayBombs.push(numberBomb);
    }
  }
  console.log(arrayBombs);

  for (let i = 0; i < number; i++) {
    //creato il quadratini e il testo(che parte con un display non, perche si vedra solo al click del quadrato)
    const square = document.createElement("div");
    const squareText = document.createElement("p");
    /* squareText.append(arrayBombs[i]); */

    squareText.classList.add("dNone");
    square.append(squareText);
    square.classList.add("square");
    element.append(square);

    //cambiare il nome delle celle e il colore
    square.addEventListener("click", function () {
      changeColorText(square, squareText);
      if (arrayBombs.includes(i + 1)) {
        square.style.backgroundColor = "red";
        squareText.innerHTML = "💣";
      }
    });
  }
}

//funzione per cambiare gli elementi
function changeColorText(color, text) {
  color.classList.toggle("bgColor");
  text.classList.toggle("dNone");
}
