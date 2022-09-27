// IIFE
let pokemonRepository = (function () {
  // Array of pokemons
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let searchBar = document.querySelector("#pokemon-search");

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  //add button and its class from js
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    listItem.classList.add("list-group-item");

    button.innerText = pokemon.name;
    button.classList.add("button-pokemon", "btn", "btn-light");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    //append newly created button
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // added button eventListener
    button.addEventListener("click", function () {
      showDetails(pokemon);
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
        item.types = details.types[0].type.name;
        item.abilities = details.abilities[0].ability.name;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //showDetails function for eventListener once the button is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //console.log(pokemon);
      showModal(pokemon);
    });
  }

  //modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let contentElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let typesElement = $("<p>" + "Type: " + pokemon.types + "</p>");
    let abilityElement = $("<p>" + "Ability: " + pokemon.abilities + "</p>");

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(contentElement);
    modalBody.append(typesElement);
    modalBody.append(abilityElement);
  }

  searchBar.addEventListener("input", function () {
    let pokemonList = document.querySelectorAll(".button-pokemon");
    let inputValue = searchBar.value.toUpperCase();

    pokemonList.forEach(function (pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(inputValue) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//call loadList function
pokemonRepository.loadList().then(function () {
  // forEach loop function
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
