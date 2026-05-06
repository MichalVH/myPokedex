const app = {
     init: function () {
         console.log("myPokedexApp : application loading successfully");
         // Set the interval to call the function making the API call every hour || (1000 ms * 3600 = 1 hour) ||
        // nIntervId = setInterval(app.fetchCityName, 1000*3600);
        // Make the first API call 
        app.fetchPokemonNameList();
    },

    fetchPokemonNameList: async function () {
        // const APIKEY = '0be0093e777d8e6ef27c75eb852f2943';

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${APIKEY}&units=metric&lang=fr`;
        const url = "https://pokeapi.co/api/v2/pokemon?limit=9/"

        try {
            const response = await fetch(`${url}`);
            const pokemonNameList = await response.json();
            console.log(pokemonNameList);

            app.fetchPokemonData(pokemonNameList);
            
        } catch (error) {
            console.error("Erreur rencontrée lors de la récupération des données : " + error);
          }
    },

    fetchPokemonData: async function (pokemonNameList) {
        const pokemonName = pokemonNameList.results[0].name;
        console.log(pokemonName);
        
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

        try {
            const response = await fetch(`${url}`);
            const pokemonData = await response.json();
            console.log(pokemonData)

         } catch (error) {
             console.error("Erreur rencontrée lors de la récupération des données : " + error);
           }
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