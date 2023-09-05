BASE_API_URL = "http://numbersapi.com/";
numberFactsUl = document.getElementById("rand-num-fact");
favoriteNumFactsUl = document.getElementById("my-fav-num");

// Get multiple numbers facts and show on page
function listFacts(fact, list) {
  li = document.createElement("li");
  li.innerText = fact;
  list.append(li);
}

//  Get one number fact
axios
  .get(`${BASE_API_URL}42?json`)
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => console.log("REJECTED!!", err));

// Get facts about multiple numbers and list
axios
  .get(`${BASE_API_URL}46,68,47,96`)
  .then((resp) => {
    values = Object.values(resp.data);
    for (fact of values) {
      listFacts(fact, numberFactsUl);
    }
  })
  .catch((err) => console.log("REJECTED!!", err));

// Get multiple facts about one number and list
numberFacts = [];
axios
  .get(`${BASE_API_URL}55?json`)
  .then((resp) => {
    numberFacts.push(resp.data.text);
    console.log(numberFacts);
    return axios.get(`${BASE_API_URL}55?json`);
  })
  .then((resp) => {
    numberFacts.push(resp.data.text);
    return axios.get(`${BASE_API_URL}55?json`);
  })
  .then((resp) => {
    numberFacts.push(resp.data.text);
    return axios.get(`${BASE_API_URL}55?json`);
  })
  .then((resp) => {
    numberFacts.push(resp.data.text);

    for (fact of numberFacts) {
      listFacts(fact, favoriteNumFactsUl);
    }
  })
  .catch((err) => console.log("REJECTED!!", err));
