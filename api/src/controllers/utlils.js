const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

// Info from API only
const getPokeApi = async () => {
    const apiURL = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
    ); // Este get me da un objeto con dos propiedades, name y url
    const totalReq = await apiURL.data.results.map(async (el) => {
      // en esa url yo vuelve a hacer una request y allí tengo todos los datos que necesito
      const PokeURL = (await axios.get(el.url)).data;
      // console.log('SOY AL INFO DE LA API',PokeURL.stats)
      // console.log('SOY AL INFO DE LA API',PokeURL)
      return {
        img: PokeURL.sprites.other.dream_world.front_default,
        name: el.name,
        id: el.id,
        type: PokeURL.types[0].type.name,
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
  };

  // Info from DB only
  const getPokeDB = async () => {
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
        img:e.img,
        name: e.name,
        id: e.id,
        type: e.type,
        hp:e.hp,
        attack:e.attack,
        defense:e.defense,
        speed:e.speed,
        height:e.height,
        weight:e.weight
      };
    });
  };
// Info API + DB
  const getPoke= async ()=>{
    const apiPoke= await getPokeApi();
    const dbPoke= await getPokeDB();
    let allPoke= apiPoke.concat(dbPoke); //ESTA PARTE SE ME ROMPIÓ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // console.log(allPoke)
    return allPoke
}
// Save types on DB
const getTypes = async ()=>{
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
  }

  module.exports = {
    getPokeApi,
    getPokeDB,
    getPoke,
    getTypes
  };