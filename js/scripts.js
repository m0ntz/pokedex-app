// Array of pokemons
let pokemonRepository = function () {
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
};

// show each pokemon with its height

pokemonList.forEach(function (pokemon) {
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
