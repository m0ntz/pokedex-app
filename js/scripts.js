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

  return {
    getAll: getAll,
    add: add,
  };
})();

// show each pokemon with its height
// forEach loop

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 0.6) {
    document.write(
      "<li>" +
        pokemon.name +
        " " +
        "(height: " +
        pokemon.height +
        ")" +
        " - Wow, that's big!" +
        "</li>"
    );
  } else {
    document.write(
      "<li>" + pokemon.name + " " + "(height: " + pokemon.height + ")" + "</li>"
    );
  }
});
