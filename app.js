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

shuffleDeck(createDeck());
