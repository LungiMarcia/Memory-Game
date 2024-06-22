document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let cardValues = [...letters, ...letters];
  let flippedCards = [];
  let matchedCards = 0;

  // Shuffle the array using Fisher-Yates shuffle algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Create the game board with shuffled cards
  function createBoard() {
    shuffle(cardValues);
    cardValues.forEach((value) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;

      const front = document.createElement("div");
      front.classList.add("front");
      front.textContent = value;

      const back = document.createElement("div");
      back.classList.add("back");
      back.textContent = "?";

      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  // Flip the card to reveal its value
  function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add("flip");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  // Check if the flipped cards match
  function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cardValues.length) {
        setTimeout(() => alert("You win!"), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    }
  }

  createBoard();
});
