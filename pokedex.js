

let image = document.createElement("img");
let idParagraph = document.createElement("p");
let movesParagraph= document.createElement("p");
let evolvedfromParagraph= document.createElement("p");
let nameParagraph = document.createElement("p");

document.getElementById('run').addEventListener('click',function(){


    async function pokedex(){
        let input = document.getElementById('input').value
        let data = await fetch('https://pokeapi.co/api/v2/pokemon/'+input);
        let pokemon = await data.json();

        image.setAttribute("src",pokemon.sprites.front_default)
        

        document.getElementById("pokedexscreen").appendChild(image)
        document.getElementById("pokedexscreen").appendChild(nameParagraph)
        document.getElementById("pokedexscreen").appendChild(idParagraph)
        document.getElementById("pokedexscreen").appendChild(movesParagraph)
        document.getElementById("pokedexscreen").appendChild(evolvedfromParagraph)



        var newarray=[]
        for (let i = 0; i < pokemon.moves.length; i++) {
            if(i<=5) {
                newarray.push(pokemon.moves[i].move.name)
            }
        }

        nameParagraph.innerText=pokemon.name;
        idParagraph.innerText="ID: "+pokemon.id
        movesParagraph.innerText="moves: "+newarray.join(",  ");



        let speciesurl = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemon.id)
        let speciesdata= await speciesurl.json()



        if(speciesdata.evolves_from_species===null){
            evolvedfromParagraph.innerText="no prior evoluation"
        }else {
            evolvedfromParagraph.innerText = "evolved from: " + speciesdata.evolves_from_species.name
        }




        let evolutionchain=await fetch(speciesdata.evolution_chain.url)
        let evolutiondata = await evolutionchain.json();

        console.log(evolutiondata.chain.evolves_to[0])


    }
    pokedex();
})
