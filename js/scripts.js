// IIFE
let pokemonRepository = (function () {
  // Array of pokemons
  let pokemonList = [
    // {
    //   name: "Bulbasaur",
    //   height: 0.7,
    //   types: ["grass", "poisson"],
    // },
    // {
    //   name: "Charmander",
    //   height: 0.6,
    //   types: ["fire", "flying"],
    // },
    // {
    //   name: "Jigglypuff",
    //   height: 0.5,
    //   types: ["psychic", "poison"],
    // },
    // {
    //   name: "Togepi",
    //   height: 0.3,
    //   types: ["fairy", "psychic"],
    // },
  ];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // getAll function

  function getAll() {
    return pokemonList;
  }

  //add(item) function

  function add(item) {
    pokemonList.push(item);
  }

  //add button and its class from js

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-pokemon");
    //append newly created button
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // added button eventListener
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //showDetails function for eventListener once the button is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // fetch pokemon data from API - Load List of pokemons
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // load details of each pokemon

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//call loadList function
pokemonRepository.loadList().then(function () {
  // forEach loop function
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
