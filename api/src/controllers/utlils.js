const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

// Info from API only
const getPokeApi = async () => {
  try {
    const apiURL = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
    ); // Este get me da un objeto con dos propiedades, name y url
    const totalReq = await apiURL.data.results.map(async (el) => {
      // en esa url yo vuelve a hacer una request y allí tengo todos los datos que necesito
      // console.log(el)
      const PokeURL = (await axios.get(el.url)).data;
      // console.log('SOY AL INFO DE LA API',PokeURL.stats)
      // console.log('SOY AL INFO DE LA API',PokeURL.types)
      return {
        id: PokeURL.id,
        img: PokeURL.sprites.other.dream_world.front_default,
        name: el.name,
        type: PokeURL.types.map(e=> e.type.name),
        hp: PokeURL.stats[0].base_stat,
        attack: PokeURL.stats[1].base_stat,
        defense: PokeURL.stats[2].base_stat,
        speed: PokeURL.stats[5].base_stat,
        height: PokeURL.height,
        weight: PokeURL.weight,
      };
    });
    const MainInfoPoke = await Promise.all(totalReq);
  //   console.log(MainInfoPoke);
    return MainInfoPoke;
    
  } catch (error) {
    console.log(error)
  }
  };

  // Info from DB only
  const getPokeDB = async () => {
    try {
      let dbPoke = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      
      return dbPoke.map((e) => {
        return {
          id: e.id,
          img:e.img,
          name: e.name,
          type: e.types.map(e=> e.name),
          hp:e.hp,
          attack:e.attack,
          defense:e.defense,
          speed:e.speed,
          height:e.height,
          weight:e.weight
        };
      });
      
    } catch (error) {
      console.log(error)
    }
  };
// Info API + DB
  const getPoke= async ()=>{
    try {
      const apiPoke= await getPokeApi();
      const dbPoke= await getPokeDB();
      let allPoke= apiPoke.concat(dbPoke);
      // console.log(typeof(dbPoke[0].id)) //ESTA PARTE SE ME ROMPIÓ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // console.log(typeof(apiPoke[0].id)) //ESTA PARTE SE ME ROMPIÓ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // console.log(allPoke)
      return allPoke
      
    } catch (error) {
      console.log(error)
    }
}
// Save types on DB
const getTypes = async ()=>{
  try {
    
    const typeApi = await axios.get('https://pokeapi.co/api/v2/type')
    const pokeTypes= typeApi.data.results.map(e => e.name)
    pokeTypes.forEach(el=>{
      Type.findOrCreate({
        where:{name:el}
      })
    })
    const allTypes= await Type.findAll()
    // console.log(pokeTypes)
    return allTypes
  } catch (error) {
    console.log(error)
  }
  }

  module.exports = {
    getPokeApi,
    getPokeDB,
    getPoke,
    getTypes
  };