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

// show each pokemon with its height
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.6) {
    document.write(
      "<li>" +
        pokemonList[i].name +
        " " +
        "(height: " +
        pokemonList[i].height +
        ")" +
        " - Wow, that's big!" +
        "</li>"
    );
  } else {
    document.write(
      "<li>" +
        pokemonList[i].name +
        " " +
        "(height: " +
        pokemonList[i].height +
        ")" +
        "</li>"
    );
  }
}
