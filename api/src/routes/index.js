const { Router } = require('express');
const axios = require("axios");
const {Pokemon, Type} = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const Apiget = async() =>{
    try{
        const apiurl1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const apiurl2 = await axios.get(apiurl1.data.next);
        const apiurl3 = await axios.get(apiurl2.data.next);
        const allpoke = apiurl1.data.results.concat(apiurl2.data.results).concat(apiurl3.data.results);

        const apiInfo = await Promise.all(
            allpoke.map(async e =>{
                    const p = await axios.get(e.url)
                    return{
                        id: p.data.id,
                        name: p.data.name,
                        life: p.data.stats[0].base_stat,
                        attack: p.data.stats[1].base_stat,
                        deffense: p.data.stats[2].base_stat,
                        speed: p.data.stats[5].base_stat,
                        height: p.data.height * 10, //a cm
                        weight: p.data.weight / 10, // a kg
                        img: p.data.sprites.other.home.front_default,
                        types: p.data.types.map(t => t.type.name)
                    }
            })
        );
      
        return apiInfo;

    }catch(e){
        console.log(e);
    }
}



const DBget = async() =>{
    try{
        const dbpoke = await Pokemon.findAll({
            include:{
                model:Type,
                attributes:["name"],
                through : {attributes:[]}
            }
        })

        const pokeJson = await dbpoke.map(e=>{
            return{
                id: e.id,
                name: e.name,
                life: e.life,
                attack: e.attack,
                deffense: e.deffense,
                speed: e.speed,
                height: e.height,
                weight: e.weight,
                img: e.img,
                types: e.types.map((el) => el.name),
                createDB: e.createDB,
            }
        })
       
        return pokeJson;
    }catch(err){
        console.log(err)
    }
}


const getallInfo = async()=>{
    const api = await Apiget();
    const db = await DBget();
    const all = api.concat(db);
    return all;
}


router.get('/pokemons', async(req,res)=>{
    const {name} = req.query;
    const todos = await getallInfo();
    try{
        ///si no pasamos nombre por query
        if(!name){
            res.status(200).send(todos)

        }else{
            const pokename = todos.filter(e => e.name.toLowerCase() === name.toLowerCase());
            if(pokename){
                res.status(200).send(pokename)
            }else{
                res.status(404).send("no se encontro el Pokemon")
            }
        }
    }catch(err){
        console.log(err)
    }
   
})

router.get("/pokemons/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        const allpoke = await getallInfo();
        if(id){
            const pokeid = await allpoke.filter(e=> e.id == id);
            if(pokeid.length){
                res.status(200).send(pokeid);
            }else{
                res.status(404).send("id not found")
            }
        }
    }catch(err){
        console.log(err)
    }
})



router.get("/types", async(req,res)=>{
    try{
        const apitypes = await axios.get("https://pokeapi.co/api/v2/type");
        const arrtypes = await apitypes.data.results;
        arrtypes.forEach(types => {
            Type.findOrCreate({
                where: { name: types.name }
            })
        });

        const allTypes = await Type.findAll();
        res.send(allTypes);

    }catch(err){
        console.log(err)
    }

})

router.post("/pokemons", async(req,res)=>{
    const {name, life, attack, deffense, speed, height, weight, img, createDB, types} = req.body;
    try{
        //creo primero al pokemon
        let newpoke = await Pokemon.create({
            name, life, attack, deffense, speed, height, weight, img, createDB 
        })

        //luego busco las types que pase por body en la base de datos y las guardo en la variable
        let typedb = await Type.findAll({
            where: { name: types }
        })

        //aqui agregro las types a el pokemon
        newpoke.addType(typedb);
        res.send(newpoke)

    }catch(err){
        console.log(err)
    }
})



module.exports = router;
