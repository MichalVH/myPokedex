const app = {

    init: function () {

        console.log("myPokedexApp : application chargée avec succès");
        console.log("myPokedexApp : Bienvenue Michen");

        // appel la fonction permettant de générer la liste des pokémons souhaités 
        app.createPokemonList();
    },

    createPokemonList: function () {

        const pokemonList = []; 

        pokemonList.push("carchacrok", "oratoria", "exagide", "corvaillus", "pondralugon", "paragruel", "ectoplasma", "hippodocus", "miascarade", "mimiqui", "scalpereur", "dracolosse", "kangourex", "lockpin", "trioxhydre", "floreclat", "floette", "dracaufeu", "cizayox", "pyrax", "farfurex", "goupelin", "motisma", "noctali", "leviator", "lucario", "staross", "melodelfe", "meganium", "florizarre", "amphinobi", "malvalame", "predasterie", "lanssorien", "cleopsytra", "tortank", "flamigator", "sorcilence", "bekipan", "nymphali", "ampibidou", "tyranocif", "azumarill", "roigada", "empiflor", "excavarenne", "scovilain", "mammochon", "minotaupe", "momartik", "ronflex", "metamorph", "hachecateur", "airmure", "superdofin", "clamiral", "muplodocus", "gardevoir", "arcanin", "milobellus", "tarenbulle", "majaspic", "zoroark", "feunard", "farfaduvet", "blindepique", "felinferno", "pingoleon", "scarhino", "branette", "ferdeter", "flagadoss", )
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

        // création d'une div.pokemon-informations qui affichera les infos d'un seul pokemon
        let pokemonInfos = document.createElement('div');
        pokemonInfos.classList.add('pokemon-informations');

        // ajout de l'icone du pokemon à la div
        let pokemonIcon = document.createElement('img');
        pokemonIcon.classList.add('pokemon-icon');
        pokemonIcon.src = pokemonData.sprites.regular;
        pokemonInfos.append(pokemonIcon);

        // ajout du nom du pokemon à la div
        let pokemonName = document.createElement('h3');
        pokemonName.classList.add('pokemon-name');
        pokemonName.textContent = pokemonData.name.fr;
        pokemonInfos.append(pokemonName);

        // ajout d'une div pokemon-types avec les types du pokemon à la div pokemon-single
        let pokemonTypes = document.createElement('div');
        pokemonTypes.classList.add('pokemon-types');

        // boucle qui récupére le ou les deux types du pokemon ainsi que leurs icones et qui créée les éléments html nécessaires 
        for (let i=0; i < pokemonData.types.length; i++) {

            // récupération du nom et de l'image et stockage dans variables
            let pokemonTypeName = pokemonData.types[i].name;
            let pokemonTypeIcon = pokemonData.types[i].image;

            // création d'une div pour ajouter nom et logo du type 
            let pokemonTypeItem = document.createElement('div');
            pokemonTypeItem.classList.add('type-single');

            // création de img avec logo du type et ajout à la div.type-single
            let pokemonTypeItemIcon = document.createElement('img');
            pokemonTypeItemIcon.classList.add('pokemon-type_img');
            pokemonTypeItemIcon.src = pokemonTypeIcon;
            pokemonTypeItem.append(pokemonTypeItemIcon);

            // création du span avec nom du type et ajout à la div.type-single
            let pokemonTypeItemName = document.createElement('span');
            pokemonTypeItemName.classList.add('pokemon-type_name');
            pokemonTypeItemName.textContent = pokemonTypeName;
            pokemonTypeItem.append(pokemonTypeItemName);

            // ajout de la div.type-single 
            pokemonTypes.append(pokemonTypeItem)
            
        } 
        
        // et je les ajoute aux div.pokemon-informations
        pokemonInfos.append(pokemonTypes);

        // finalement j'ajoute la div.pokemon-info à la div.pokemon-single
        sectionItem.append(pokemonInfos);

        // je créé la division contenant les statistiques des pokemons
        let pokemonStats = document.createElement('div');
        pokemonStats.classList.add('pokemon-stats');

        // je créé les elements HTML necessaires pour chaque stat du pokémon 

        // HP
        let pokemonHP = document.createElement('span');
        pokemonHP.classList.add('pokemon-stat_hp');

        if (pokemonData.stats.hp > 99) {
            pokemonHP.classList.add('green');
        } else {
            pokemonHP.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonHP.classList.add('red');
        }

        pokemonHP.textContent = `HP : ${pokemonData.stats.hp}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonHP);

        // Attaque
        let pokemonAttack = document.createElement('span');
        pokemonAttack.classList.add('pokemon-stat_attack');

        if (pokemonData.stats.atk > 99) {
            pokemonAttack.classList.add('green');
        } else {
            pokemonAttack.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonAttack.classList.add('red');
        }

        pokemonAttack.textContent = `Attaque : ${pokemonData.stats.atk}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonAttack);

        // Defense
        let pokemonDefense = document.createElement('span');
        pokemonDefense.classList.add('pokemon-stat_defense');

        if (pokemonData.stats.def > 99) {
            pokemonDefense.classList.add('green');
        } else {
            pokemonDefense.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonDefense.classList.add('red');
        }

        pokemonDefense.textContent = `Defense : ${pokemonData.stats.def}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonDefense);
        
        // Spéciale Attaque
        let pokemonSpeAttack = document.createElement('span');
        pokemonSpeAttack.classList.add('pokemon-stat_spe_attack');

        if (pokemonData.stats.spe_atk > 99) {
            pokemonSpeAttack.classList.add('green');
        } else {
            pokemonSpeAttack.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonSpeAttack.classList.add('red');
        }

        pokemonSpeAttack.textContent = `Attaque Spéciale : ${pokemonData.stats.spe_atk}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonSpeAttack);

        // Spéciale Defense
        let pokemonSpeDefense = document.createElement('span');
        pokemonSpeDefense.classList.add('pokemon-stat_spe_defense');

        if (pokemonData.stats.spe_def > 99) {
            pokemonSpeDefense.classList.add('green');
        } else {
            pokemonSpeDefense.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonSpeDefense.classList.add('red');
        }

        pokemonSpeDefense.textContent = `Défense Spéciale : ${pokemonData.stats.spe_def}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonSpeDefense);

        // Speed
        let pokemonSpeed = document.createElement('span');
        pokemonSpeed.classList.add('pokemon-stat_vitesse');

        if (pokemonData.stats.vit > 99) {
            pokemonSpeed.classList.add('green');
        } else {
            pokemonSpeed.classList.add('orange');
        }

        if (pokemonData.stats.hp < 51) {
            pokemonSpeed.classList.add('red');
        }

        pokemonSpeed.textContent = `Vitesse : ${pokemonData.stats.vit}`;
        // ajout du span à la div.pokemon-stats
        pokemonStats.append(pokemonSpeed);

        // ajout de pokemon stats dans pokemon-single
        sectionItem.append(pokemonStats);

    },

};

document.addEventListener('DOMContentLoaded', app.init);