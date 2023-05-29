const LOSE_MESSAGE = "You lose!";
const WIN_MESSAGE = "You win!";
const DRAW_MESSAGE = "Draw!";

const playerHandDisplay = document.querySelector(".player-cards");

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
  if (points === 22 && rank.length === 2) {
    points = 21;
  } else if (points < 21 && rank.length >= 6) {
    points = 21;
  }
  return points;
}

function playerTurn(deck, hand) {
  console.log(`Your hand is ${hand.join(", ")}\n(${pointsFor(hand)} points)`);

  if (pointsFor(hand) === 21) {
    return false;
  }

  if (pointsFor(hand) > 21) {
    console.log(LOSE_MESSAGE);
    return false;
  }

  //Accept the choice from the player
  const action = window.prompt('What do you want to do? ("hit" or "stick")');

  switch (action) {
    case "hit": {
      // Draw a card
      const card = deck.shift();
      console.log("Hitting");
      console.log("You draw " + card);
      hand.push(card);
      // It's still the player's turn
      return true;
    }
    case "stick": {
      // End the player's turn
      return false;
    }
    default: {
      // Unknown action
      break;
    }
  }
}

function dealersTurn(deck, hand) {
  console.log(
    `Dealers hand is ${hand.join(", ")}\n(${pointsFor(hand)} points)`
  );

  while (pointsFor(hand) < 17) {
    const card = deck.shift();
    console.log("Dealer draws " + card);
    hand.push(card);
    return true;
  }
  if (pointsFor(hand) > 21) {
    console.log(WIN_MESSAGE);
  }
  return false;
}

function displayCard(playerHand, cardParentDiv) {
  while (cardParentDiv.hasChildNodes()) {
    cardParentDiv.removeChild(cardParentDiv.firstChild);
  }
  playerHand.forEach((card) => {
    const cardDisplay = document.createElement("img");
    cardDisplay.src = `https://deckofcardsapi.com/static/img/${card}.png`;
    cardParentDiv.appendChild(cardDisplay);
  });
}

function play() {
  const shuffledDeck = shuffleDeck(createDeck());
  const playerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
  const playerCardsRank = playerHand.map((item) => {
    return item.slice(0, 1);
  });

  console.log(playerCardsRank);

  displayCard(playerHand, playerHandDisplay);

  /*
  const playerCardOne = document.createElement("img");
  const playerCardTwo = document.createElement("img");
  playerCardOne.src = `https://deckofcardsapi.com/static/img/${playerHand[0]}.png`;
  playerCardTwo.src = `https://deckofcardsapi.com/static/img/${playerHand[1]}.png`;
  playerCardsDisplay.appendChild(playerCardOne);
  playerCardsDisplay.appendChild(playerCardTwo);
  */

  let isPlayerTurn = true;
  let isDealerTurn = true;

  while (isPlayerTurn) {
    isPlayerTurn = playerTurn(shuffledDeck, playerHand);
    displayCard(playerHand, playerHandDisplay);
  }

  const dealerHand = [shuffledDeck.shift(), shuffledDeck.shift()];

  if (pointsFor(playerHand) <= 21 && playerCardsRank !== ["A", "A"]) {
    while (isDealerTurn) {
      isDealerTurn = dealersTurn(shuffledDeck, dealerHand);
    }
  }

  if (pointsFor(playerHand) <= 21 && pointsFor(dealerHand) <= 21) {
    if (pointsFor(playerHand) > pointsFor(dealerHand)) {
      console.log(WIN_MESSAGE);
    } else if (pointsFor(playerHand) < pointsFor(dealerHand)) {
      console.log(LOSE_MESSAGE);
    } else {
      console.log(DRAW_MESSAGE);
    }
  }
}

play();
