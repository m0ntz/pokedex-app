// IIFE
let pokemonRepository = (function () {
  // Array of pokemons
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    let modalContainer = document.querySelector("#modal-container");

    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + pokemon.height;

    let typesElement = document.createElement("p");
    typesElement.innerText = "Type: " + pokemon.types;

    let abilityElement = document.createElement("p");
    abilityElement.innerText = "Ability: " + pokemon.abilities;

    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(typesElement);
    modal.appendChild(abilityElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    //create new class to modalContainer
    modalContainer.classList.add("is-visible");

    // Hide Modal when clicking outside the modal
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // Hide modal when pressing the ESC key
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
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
