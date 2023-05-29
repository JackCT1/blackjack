const LOSE_MESSAGE = "You lose!";
const WIN_MESSAGE = "You win!";
const DRAW_MESSAGE = "Draw!";

const playerHandDisplay = document.querySelector(".player-cards");
const dealerHandDisplay = document.querySelector(".dealer-cards");
const hitButton = document.getElementById("hit-btn");
const stickButton = document.getElementById("stick-btn");

const rankToPoints = {
  A: 11,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  1: 10,
  J: 10,
  Q: 10,
  K: 10,
};

function createDeck() {
  const cards = [];
  const suits = ["S", "D", "C", "H"];
  const rank = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < rank.length; j++) {
      cards.push(rank[j] + suits[i]);
    }
  }
  return cards;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let card = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = card;
  }
  console.log(deck);
  return deck;
}

function pointsFor(cards) {
  const rank = cards.map((card) => {
    return card.slice(0, 1);
  });
  let points = 0;
  rank.forEach((item) => {
    points += rankToPoints[item];
  });
  if (rank.includes("A") && points - 10 < 21) {
    points = points - 10;
  }
  if (points === 22 && rank.length === 2) {
    points = 21;
  } else if (points < 21 && rank.length >= 6) {
    points = 21;
  }
  return points;
}

function displayCard(hand, cardParentDiv) {
  while (cardParentDiv.hasChildNodes()) {
    cardParentDiv.removeChild(cardParentDiv.firstChild);
  }
  hand.forEach((card) => {
    console.log(card);
    if (card[0] === "1") {
      card = card.substr(1);
    }
    const cardDisplay = document.createElement("img");
    cardDisplay.src = `https://deckofcardsapi.com/static/img/${card}.png`;
    cardParentDiv.appendChild(cardDisplay);
  });
}

const shuffledDeck = shuffleDeck(createDeck());
const playerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
displayCard(playerHand, playerHandDisplay);

hitButton.addEventListener("click", function () {
  const card = shuffledDeck.shift();
  playerHand.push(card);
  displayCard(playerHand, playerHandDisplay);

  if (pointsFor(playerHand) > 21) {
    alert("You have gone over 21! You lose!");
  }
});

stickButton.addEventListener("click", function () {
  const dealerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
  displayCard(dealerHand, dealerHandDisplay);
  while (pointsFor(dealerHand) < 17) {
    const card = shuffledDeck.shift();
    dealerHand.push(card);
    displayCard(dealerHand, dealerHandDisplay);
  }
  if (pointsFor(dealerHand) > 21) {
    console.log(WIN_MESSAGE);
    alert(WIN_MESSAGE);
  }
  if (pointsFor(playerHand) <= 21 && pointsFor(dealerHand) <= 21) {
    if (pointsFor(playerHand) > pointsFor(dealerHand)) {
      console.log(WIN_MESSAGE);
      alert(WIN_MESSAGE);
    } else if (pointsFor(playerHand) < pointsFor(dealerHand)) {
      console.log(LOSE_MESSAGE);
      alert(LOSE_MESSAGE);
    } else {
      console.log(DRAW_MESSAGE);
      alert(DRAW_MESSAGE);
    }
  }
});
