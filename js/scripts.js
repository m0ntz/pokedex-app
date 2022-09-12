// IIFE
let pokemonRepository = (function () {
  // Array of pokemons
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poisson"],
    },
    {
      name: "Charmander",
      height: 0.6,
      types: ["fire", "flying"],
    },
    {
      name: "Jigglypuff",
      height: 0.5,
      types: ["psychic", "poison"],
    },
    {
      name: "Togepi",
      height: 0.3,
      types: ["fairy", "psychic"],
    },
  ];

  // getAll function

  function getAll() {
    return pokemonList;
  }

  //add(item) function

  function add(item) {
    pokemonList.push(item);
  }

  //add button and its class

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-pokemon");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

// forEach loop function

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
