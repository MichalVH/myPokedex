const app = {

    init: function () {
         console.log("myPokedexApp : application loading successfully");
         // Set the interval to call the function making the API call every hour || (1000 ms * 3600 = 1 hour) ||
        // nIntervId = setInterval(app.fetchCityName, 1000*3600);
        // Make the first API call 
        app.createPokemonList();
    },

    createPokemonList: function () {

        const pokemonList = []; 

        pokemonList.push("florizarre", "tortank", "dracaufeu")
        // console.log(pokemonList);

        app.fetchAllPokemonData(pokemonList);

    },

    fetchAllPokemonData: async function (pokemonList) {

        for(let i = 0; i < pokemonList.length; i++) {

            let pokemonName = pokemonList[i];
            // console.log(pokemonName);

            const url = `https://tyradex.app/api/v1/pokemon/${pokemonName}`

            try {
                const response = await fetch(`${url}`);
                const pokemonData = await response.json();
                // console.log(pokemonData.name.fr);
                app.showAllPokemonData(pokemonData);
            } catch (error) {
                console.error("Erreur rencontrée lors de la récupération des données : " + error);
            }

        }
        
    },

    showAllPokemonData (pokemonData) {
        console.log(pokemonData);

        const pokemonList = document.getElementById('pokemon-list');
        
        let listItem = document.createElement('li');
        listItem.classList.add('pokemon-single');
        listItem.textContent = pokemonData.name.fr;
        pokemonList.append(listItem);

    },

    // addWeatherDataToDOM: function (weatherData) {
    //     const weatherContainer = document.getElementById('weather-container');

    //     // Set the img's src & add the weather icon to DOM
    //     let iconValue = weatherData.weather[0].icon;
    //     const weatherIcon = weatherContainer.querySelector("#weather-icon");
    //     weatherIcon.src = `https://openweathermap.org/img/wn/${iconValue}@2x.png`;

    //     // Add the temperature to DOM
    //     weatherContainer.querySelector("#temperature").textContent = Math.round(weatherData.main.temp) + "°C";

    //     // Add the weather description to DOM
    //     weatherContainer.querySelector("#description").textContent = weatherData.weather[0].description;

    //     // Add the city name to DOM
    //     weatherContainer.querySelector("#localisation").textContent = weatherData.name + ", " + weatherData.sys.country;

    //     // Add the feelslike temperature to DOM
    //      weatherContainer.querySelector("#feelslike").textContent = Math.round(weatherData.main.feels_like) + "°C";

    //     // Add the humidity level to DOM
    //      weatherContainer.querySelector("#humidity").textContent = weatherData.main.humidity + "%";
    // }
};

document.addEventListener('DOMContentLoaded', app.init);