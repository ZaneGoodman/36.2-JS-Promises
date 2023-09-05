API_BASE_URL = "https://deckofcardsapi.com/api/";

// Get the value of a new card from a new deck
axios
  .get(`${API_BASE_URL}deck/new/shuffle/?deck_count=1`)
  .then((resp) => {
    console.log(resp);
    return axios.get(`${API_BASE_URL}deck/${resp.data.deck_id}/draw/?count=1`);
  })
  .then((resp) => {
    console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
  })
  .catch((err) => console.log("REJECTED!!", err));

//  Get two cards from a newly shuffled deck
let cards = [];
axios
  .get(`${API_BASE_URL}deck/new/shuffle/?deck_count=1`)
  .then((resp) => {
    console.log(resp);
    return axios.get(`${API_BASE_URL}deck/${resp.data.deck_id}/draw/?count=1`);
  })
  .then((resp) => {
    cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
    return axios.get(`${API_BASE_URL}deck/${resp.data.deck_id}/draw/?count=1`);
  })
  .then((resp) => {
    cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
    console.log(cards);
  })
  .catch((err) => console.log("REJECTED!!", err));

// Call API for a new deck and give user the ability to click through all the cards in the deck
let cardArea = document.getElementById("card-div");
let btn = document.querySelector("button");
let deck_id = null;

axios.get(`${API_BASE_URL}deck/new/shuffle/?deck_count=1`).then((resp) => {
  deck_id = resp.data.deck_id;
});

btn.addEventListener("click", function () {
  axios.get(`${API_BASE_URL}deck/${deck_id}/draw/?count=1`).then((resp) => {
    let cardImg = document.createElement("img");
    cardImg.src = resp.data.cards[0].image;
    cardArea.append(cardImg);
    console.log(resp);
    if (resp.data.remaining === 0) {
      alert("Thats all the cards!");
    }
  });
});
