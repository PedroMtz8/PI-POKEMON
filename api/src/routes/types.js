const express = require('express');
const type = express.Router();
const { Pokemon, Type } = require('../db.js');
const {getTypes} = require("./functions")
//  GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y
// guardarlos en su propia base de datos y luego ya utilizarlos desde allí
type.get('/', async (req, res) => {
    try {
      const t = await Type.findAll();
      
      //const p = await getTypes();
      res.send(t);
    } catch (e) {
      res.status(404).send({msg:"error"})
    }
});
module.exports = type;