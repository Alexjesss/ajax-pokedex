
document.getElementById('run').addEventListener('click',function(){

    async function pokedex(){
        let input = document.getElementById('input').value
        let data = await fetch('https://pokeapi.co/api/v2/pokemon/'+input);
        let poke = await data.json();

        console.log(poke)

        var image = document.createElement("img");
        let paragraph1 = document.createElement("p")
        image.setAttribute("src",poke.sprites.front_default)
        document.getElementById("pokedexscreen").appendChild(paragraph1)
        document.getElementById("pokedexscreen").appendChild(image)

        let paragraph = document.createElement("p");


        var newarray=[]
        for (let i = 0; i < poke.moves.length; i++) {
            if(i<=5) {
                newarray.push(poke.moves[i].move.name)
            }
        }
        paragraph1.innerText="ID: "+poke.id

        document.getElementById("pokedexscreen").appendChild(paragraph)
        paragraph.innerText="moves: "+newarray.join(",  ");

        let evolutionsreq =await fetch('https://pokeapi.co/api/v2/evolution-chain/'+poke.id+'/')
        let evolutions = await evolutionsreq.json()
        console.log(evolutions)

    }
    pokedex();
})
