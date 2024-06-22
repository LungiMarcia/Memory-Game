document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let cardValues = [...letters, ...letters];
  let flippedCards = [];
  let matchedCards = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createBoard() {
    shuffle(cardValues);
    cardValues.forEach((value) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;
      card.textContent = value;
      card.style.color = "transparent";
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (flippedCards.length === 2) return;

    this.style.color = "black";
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("flip");
      card2.classList.add("flip");
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cardValues.length) {
        setTimeout(() => alert("You win!"), 500);
      }
    } else {
      setTimeout(() => {
        card1.style.color = "transparent";
        card2.style.color = "transparent";
        flippedCards = [];
      }, 1000);
    }
  }

  createBoard();
});
