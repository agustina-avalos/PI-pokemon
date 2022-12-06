const initialState = {
    pokemons: [],
    copiPoke : [],
    types : [],
    detail : []
}


function rootReducer(state = initialState, action){
    switch(action.type){

        ///todos los get
        case "GET_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
                copiPoke : action.payload
            }
        case "GET_TYPES":
            return{
                ...state,
                types : action.payload
            }

        case "GET_POKEMON_BY_NAME":
            return{
                ...state,
                pokemons: action.payload
            }

        case "GET_POKEMON_BY_ID":
            return{
                ...state,
                detail: action.payload
            }
        
        case 'POST_POKEMON':
            return {
                ...state,
            }

        case "FILTER_BY_TYPES":
            const allpoke = state.copiPoke;
            const filtrados = action.payload ==="all" ? allpoke :
            allpoke.filter(p => p.types?.includes(action.payload))
            return{
               ...state,
               pokemons: filtrados
            }
        case "FILTER_BY_DB":
            const all = state.copiPoke;
            const filter = action.payload === "all" ? all 
            : action.payload === "db" ? all.filter(e => e.createDB) 
            : all.filter(e=>!e.createDB)
            return{
                ...state,
                pokemons: filter
            }

            case "ORDER_BY_NAME":
                const filterSort = action.payload === "all" ? state.pokemons
                 :action.payload === "AtoZ"? state.pokemons.sort((a,b) => a.name.localeCompare(b.name))
                 :state.pokemons.sort((a,b)=> b.name.localeCompare(a.name))
                return{
                    ...state,
                    pokemons: filterSort
                }
            case "ORDER_BY_ATTACK":
                const filterattack = action.payload === "all" ? state.pokemons 
                : action.payload === "less"? state.pokemons.sort((a,b)=> a.attack - b.attack)
                : state.pokemons.sort((a,b)=> b.attack - a.attack)
                return{
                    ...state,
                    pokemons: filterattack
                }
            default:
                return state


    }

}
export default rootReducer;