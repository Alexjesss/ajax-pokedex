

let image = document.createElement("img");
let idParagraph = document.createElement("p");
let movesParagraph= document.createElement("p");
let evolvedfromParagraph= document.createElement("p");
let nameParagraph = document.createElement("p");
let evolutionparagraph=document.createElement("p");

document.getElementById("screen").appendChild(image)
document.getElementById("screen").appendChild(nameParagraph)
document.getElementById("screen").appendChild(idParagraph)
document.getElementById("screen").appendChild(movesParagraph)
document.getElementById("screen").appendChild(evolvedfromParagraph)
document.getElementById("screen").appendChild(evolutionparagraph)
for (let i = 0; i <document.querySelectorAll('button').length ; i++) {


document.querySelectorAll('button')[i].addEventListener('click',function(){




    let input = document.getElementById('input').value
    async function pokedex() {

        let data = await fetch('https://pokeapi.co/api/v2/pokemon/' + input);
        let pokemon = await data.json();

        image.setAttribute("src", pokemon.sprites.front_default)
        image.setAttribute("id", "sprites")



        var newarray = []
        for (let j = 0; j < pokemon.moves.length; j++) {
            if (j <= 5) {
                newarray.push(pokemon.moves[j].move.name)
            }
        }

        nameParagraph.innerText = pokemon.name.charAt();
        idParagraph.innerText = "ID: " + pokemon.id
        movesParagraph.innerText = "moves: " + newarray.join(",  ");

        async function evolvedfrom() {
            let speciesurl = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon.id)
            let speciesdata = await speciesurl.json()

            if (speciesdata.evolves_from_species === null) {
                evolvedfromParagraph.innerText = "no prior evoluation"
            } else {
                evolvedfromParagraph.innerText = "evolved from: " + speciesdata.evolves_from_species.name
            }
            let evolutionchain = await fetch(speciesdata.evolution_chain.url)
            let evolutiondata = await evolutionchain.json();


            //maybe remove this, this part of the code is to get all the possible evoluations of a given pokémon. doesn't work with variations
            let lastevoluation = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + evolutiondata.chain.evolves_to[0].species.name)
            let lastspecie = await lastevoluation.json()
            let firstspecie = lastspecie.evolves_from_species.name

            let firstEvoluation = evolutiondata.chain.evolves_to[0].species.name

            if (evolutiondata.chain.evolves_to[0].evolves_to[0] !== undefined) {
                let secondEvoluation = evolutiondata.chain.evolves_to[0].evolves_to[0].species.name
                evolutionparagraph.innerText = firstspecie + "," + firstEvoluation + "," + secondEvoluation
            } else {
                evolutionparagraph.innerText = firstspecie + "," + firstEvoluation
            }
        }
       await evolvedfrom();
    }

    if(document.querySelectorAll('button')[i]===document.getElementById('next')){

    }


    if(document.querySelectorAll('button')[i]===document.getElementById('run')){
        pokedex();

    }



})

}