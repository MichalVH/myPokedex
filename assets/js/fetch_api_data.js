const app = {

    init: function () {

        console.log("myPokedexApp : application chargée avec succès");
        console.log("myPokedexApp : Bienvenue Michen");

        // appel la fonction permettant de générer la liste des pokémons souhaités 
        app.createPokemonList();
    },

    createPokemonList: function () {

        const pokemonList = []; 

        pokemonList.push("carchacrok", "oratoria", "exagide", "corvaillus", "pondralugon", "paragruel", "ectoplasma", "hippodocus", "miascarade", "mimiqui", "scalpereur", "dracolosse", "kangourex", "lockpin", "trioxhydre", "floreclat", "floette", "dracaufeu", "cizayox", "pyrax", "farfurex", "goupelin", "motisma", "noctali", "leviator", "lucario", "staross", "melodelfe", "meganium", "florizarre", "amphinobi", "malvalame", "predasterie", "lanssorien", "cleopsytra", "tortank", "flamigator", "sorcilence", "bekipan", "nymphali", "ampibidou", "tyranocif", "azumarill", "roigada", "empiflor", "excavarenne", "scovilain", "mammochon", "minotaupe", "momartik", "ronflex", "metamorph", "hachecateur", "airmure", "superdofin", "clamiral", "tyranocif", "muplodocus", "gardevoir", "arcanin", "milobellus", "tarenbulle", "majaspic", "zoroark", "feunard", "farfaduvet", "blindepique", "felinferno", "pingoleon", "scarhino", "branette", "ferdeter", "flagadoss", )
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

        // selection de la section affichant tous les pokemons
        const pokemonList = document.getElementById('pokemon-list');

        // creation et ajout de la div affichant 1 seul pokemon
        let sectionItem = document.createElement('div');
        sectionItem.classList.add('pokemon-single');
        pokemonList.append(sectionItem);

        // ajout de l'icone du pokemon à la div
        let pokemonIcon = document.createElement('img');
        pokemonIcon.classList.add('pokemon-icon');
        pokemonIcon.src = pokemonData.sprites.regular;
        sectionItem.append(pokemonIcon);

        // ajout du nom du pokemon à la div
        let pokemonName = document.createElement('h3');
        pokemonName.classList.add('pokemon-name');
        pokemonName.textContent = pokemonData.name.fr;
        sectionItem.append(pokemonName);

    },

};

document.addEventListener('DOMContentLoaded', app.init);