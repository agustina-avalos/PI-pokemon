import axios from "axios"


export function getAllPoke(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
    }
}

export const getPokeByName= (name)=>{
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons?name=" + name);
        return dispatch({
            type:"GET_POKEMON_BY_NAME",
            payload: json.data
        })
    }

}

export const getPokeDetail= (id)=>{
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons/"+ id);
        return dispatch({
            type: "GET_POKEMON_BY_ID",
            payload:json.data,
        })
    }
}

export const getTypes = () =>{
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type:"GET_TYPES",
            payload:json.data
        })
    }
}


export const PostPokemon =(payload)=>{
    return async function(dispatch){
        let response = await axios.post("http://localhost:3001/pokemons", payload);
        return response;
    }

}


/* export const filterByTypes = (payload) =>{
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}
 */
export const filterByTypes = (payload) =>{
    return async function(dispatch){
        let filtrados = await axios.get("http://localhost:3001/pokemon/bytypes/" + payload);
        return dispatch({
            type: "FILTER_BY_TYPES",
            payload: filtrados.data
        })
    }
}


export const filterByPokeDB = (payload) =>{
    return{
        type: "FILTER_BY_DB",
        payload
    }
}

export const OrderByName = (payload)=>{
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export const OrderByAttack=(payload)=>{
    return{
        type:"ORDER_BY_ATTACK",
        payload
    }
}

export const clean =(payload)=>{
    return{
        type:"CLEAN_POKEMON",
        payload
    }
}