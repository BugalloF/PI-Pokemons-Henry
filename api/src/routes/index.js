const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const { Pokemon, Type } = require("../db.js");
const getPokeApi = async () => {
  // esta ruta es sólo para la principal osea solo neceisto img, nombre y tipo
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
// getPokeApi()
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
  // getPokeDB()
const getPoke= async ()=>{
    const apiPoke= await getPokeApi();
    const dbPoke= await getPokeDB();
    let allPoke= apiPoke.concat(dbPoke); //ESTA PARTE SE ME ROMPIÓ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // console.log(allPoke)
    return allPoke
}
// getPoke()

router.get("/pokemons", async (req, res) => {
    try {
      const {name} = req.query;
      let totalPoke = await getPoke();
      // console.log(totalPoke)
    // console.log('QUERY', name)

      if (name) {
        let pokeByName = await totalPoke.filter((e) =>{

            return e.name.toLowerCase().includes(name.toLowerCase())
            // console.log('ESTOS SON LOS UNDEFINED',e.name, name)
        }
        );
        // console.log(pokeByName)
        pokeByName.length
          ?
            res.status(200).json(pokeByName)
          : res
              .status(404)
              .send(
                `Pokemon "${name}" created succesfully`
              );
      } else {
        res.status(200).json(totalPoke);
      }
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  });

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
  // getTypes()
  router.get('/types', async (req,res)=>{
    try {
      sendTypes= await getTypes()
      res.status(200).json(sendTypes)
    } catch (error) {
      res.status(404).send('Type not found')
      console.log(error)
    }
  })
  router.get('/pokemons/:id', async (req,res)=>{
    const{id} = req.params
    console.log('SOY EL ID :' ,id)
    let Poketotals= await getPoke()
    console.log(Poketotals)
    try {
      if(id){
        let pokeId = await Poketotals.filter(e=>e.id == id)
        pokeId.length ?
        res.status(200).json(pokeId): 
        res.send('No se encontró un pokémon con ese ID.')
      } 
      
    } catch (error) {
     console.log(error) 
    }
  }) 
  router.post('/pokemons',async(req,res)=>{
    const {name,hp,attack,defense,speed,height,weight,type,img} = req.body
    // el tipo no se lo agrego aca porque va enlazado con la table type

    try {
      let pokeCreate= await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img 
      })
      let typeDB= await Type.findAll({
        where:{name:type}
      })
      pokeCreate.addType(typeDB)
      
      res.status(200).send(`Has creado el pokémon ${name}`)
    } catch (error) {
      // console.log(error)
      res.status(404).send('Cannot create the pokemon.')
    }
  })


module.exports = router;
