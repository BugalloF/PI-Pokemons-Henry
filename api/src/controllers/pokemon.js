const { getPoke } = require("./utlils");
const { Pokemon, Type } = require("../db.js");

const getAllPoke = async (req, res) => {
  try {
    const { name } = req.query;
    let totalPoke = await getPoke();
    // console.log(totalPoke)
    // console.log('QUERY', name)

    if (name) {
      let pokeByName = await totalPoke.filter((e) => {
        return e.name.toLowerCase() === name.toLowerCase();
        // console.log('ESTOS SON LOS UNDEFINED',e.name, name)
      });
      // console.log(pokeByName)
      pokeByName.length
        ? res.status(200).json(pokeByName)
        : res.status(404).send(`Pokemon "${name}" not found`);
    } else {
      res.status(200).json(totalPoke);
    }
  } catch (error) {
    res.status(400).send(error);
    // console.log(error);
  }
};

const getOnePoke = async (req, res) => {
  const { id } = req.params;
  // console.log('SOY EL ID :' ,id)
  try {
    let Poketotals = await getPoke();
    // console.log(Poketotals)
    if (id) {
      let pokeId = await Poketotals.filter((e) => e.id == id);
      pokeId.length
        ? res.status(200).json(pokeId)
        : res.send("No se encontró un pokémon con ese ID.");
    }
  } catch (error) {
    console.log(error);
  }
};

const postPoke = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, type, img } =
      req.body;
    // el tipo no se lo agrego aca porque va enlazado con la table type
    // console.log(type)
    let pokeCreate = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    });
    let typeDB = await Type.findAll({
      where: { name: type },
    });
    pokeCreate.addType(typeDB);

    res.status(200).send(`Has creado el pokémon ${name}`);
  } catch (error) {
    console.log(error);
    res.status(404).send("Cannot create the pokemon.");
  }
};

module.exports = {
  getAllPoke,
  getOnePoke,
  postPoke,
};
