const axios = require("axios")
const { Pokemon, Type } = require("../db")


const getApiInfo = async () => {

    try {
        const pokeApiData = await axios("https://pokeapi.co/api/v2/pokemon")
        const pokeNext = await axios(pokeApiData.data.next)
        const pokeNext2 = await axios(pokeNext.data.next)
        const pokeNext3 = await axios(pokeNext2.data.next)

        let apiResults = [pokeApiData.data.results, pokeNext.data.results, pokeNext2.data.results, pokeNext3.data.results].flat()
        //console.log(apiResults)

        let pokeUrl = apiResults.map(p => axios(p.url))

        let pokeApiUrl = await axios.all(pokeUrl)

        let pokemonData = pokeApiUrl.map(p => {
            let pokemon = p.data

            let objPokemon = {
                id: pokemon.id.toString(),
                name: pokemon.name.toLowerCase(),
                life: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                image: pokemon.sprites.other.dream_world.front_default,
                image2: pokemon.sprites.other["official-artwork"].front_default,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map(t => { return { name: t.type.name } })
            }
            return objPokemon;

        })
        //console.log(pokemonData)
        return pokemonData
    }
    catch (e) {
        console.log({ e: "La funcion api no funciono" })
    }
};


/* async function apiData(){

    let results = [],
    page = 0
    const totalpokemons = 10
    
    while(page < totalpokemons ){
        let pokemons = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${page}0&limit=20`)
        results = results.concat(pokemons.data.results)
        page += 2
    }
    //console.log(results)

    let getUrl = results.map(e => e.url)
    let pokeApiUrl = await axios.all(getUrl)
    
    let info = pokeApiUrl.map(p => p.data)

    console.log(info)

    

    
} 

apiData() */


const getDbData = async () => {
    try {
        const dbData = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"]
            }
        })
        return dbData
    }
    catch (e) {
        console.log({ e: "La funcion dbData no funciono" })
    }
};



const getAllPokemons = async () => {
    try {
        const api = await getApiInfo();
        const dbData = await getDbData();
        const allData = api.concat(dbData)
        return allData
    }
    catch (e) {
        console.log({ e: "Alguna funcion no se pudo ejecutar" })
    }
};



const getTypes = async () => {
    try {
        let type = await axios("https://pokeapi.co/api/v2/type")
        const nameType = type.data.results.map(n => n.name)

        //console.log(nameType)


        nameType.forEach(async t => {
            await Type.findOrCreate({
                where: { name: t },
            });
        });

        const allTypes = await Type.findAll()
        //console.log(allTypes)
        return allTypes

    }
    catch (e) {
        console.log({ e: "La funcion getTypes no funciono" })
    }
};



module.exports = {
    getAllPokemons,
    getTypes
};


