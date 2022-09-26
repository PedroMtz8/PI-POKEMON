const { Router } = require('express');
const {getAllPokemons} = require("./functions")
const { Pokemon, Type } = require('../db.js');
const pokemon = Router();


pokemon.get("/", async (req, res) =>{
    try{
        const {name} = req.query
        let pokemons = await getAllPokemons()

        if(name){
            const pokemonsFilterByName = pokemons.filter(r => r.name.toLowerCase() === name.toLocaleLowerCase())

            pokemonsFilterByName.length ? res.status(200).send(pokemonsFilterByName) : res.status(400).send(
                {msg: "We not found any pokemon with that name, please try another one"}
            )

        }else return res.status(200).send(pokemons)

    }
    catch(e){
        console.log(e)
    }
})



pokemon.get("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const pokemons = await getAllPokemons()

        if(id){
            const pokemonById = pokemons.filter(p => p.id === id)

            pokemonById.length ? res.status(200).send(pokemonById) : res.send({msg: "Error, doesn't exist, should enter a valid ID"})
        }else{
            res.send({msg: "Should enter a valid ID"})
        }


    }
    catch(e){
        res.status(404).send({msg: "Should enter a valid ID"})
    }
})



pokemon.post('/', async (req, res) => {
  try {
      const {name, life, attack, defense, speed, height, weight, types, image} = req.body;
      // corroboramos que esten todos los datos
      if (!name || !life || !attack || !defense || !speed || !height || !weight || !types) {
        return res.status(400).json({
          msg: `There is a missing value`
        })
      }
      // corroboramos que no se cargo antes un pokemon con el mismo nombre
      const exists = await Pokemon.findOne({ where: { name: name } })
      if (exists) return res.json({ msg: "This pokemon already exists!" });

      

      const newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
      });

      let TypeDb = await Type.findAll({
        where: {name: types}
      })

      
      

      newPokemon.addType(TypeDb)
      
      return res.status(200).json({ msg: "Pokemon created successfully!!" });
    } catch (e) { console.log(e); }
  });


  // -----  ruta para borrar un pokemon creado ----- //
pokemon.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      /* await Pokemon.destroy({where: {id: id}}) */
      const pokeDelete = await Pokemon.findOne({where: {id: id}});
      if (pokeDelete) {
        await pokeDelete.destroy();
        return res.status(200).json("Pokemon deleted correctly");
      }
    } catch (e) { console.log(e); }
  });


module.exports = pokemon