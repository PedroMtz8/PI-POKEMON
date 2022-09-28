import { EMPTY_POKEMONS, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_POKEMONS_DETAILS, GET_TYPES, ORDER_BY_POWER, ORDER_POKEMONS, SEARCH_POKEMON, POST_POKEMON, API_OR_CREATED, DELETE_POKEMON, SET_PAGE, REFRESH, EMPTY_DETAIL } from "../actions/index.js";



const initialState = {
    originalPokemons: [],
    allPokemons: [],  //guardo todos los pokemones de la api iltro los pokemones de la api
    showPokemons: [], // renderizo 
    pokemonDetail: [],
    currentPage: 1,
    types: []
}



export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                showPokemons: action.payload,
                originalPokemons: action.payload
            }
        
        case GET_POKEMONS_DETAILS:
            return{
                ...state,
                pokemonDetail: action.payload
            }

        case EMPTY_POKEMONS:
            return{
                ...state,
                showPokemons: action.payload,
            }

        case EMPTY_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        
        case ORDER_POKEMONS:
            let abc = [...state.showPokemons]
            let order =  action.payload === "abc" ?
                abc.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                return 0
            })
                : 
                abc.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                return 0
            })
            return {
                ...state,
                showPokemons: order,
            }

            case ORDER_BY_POWER:
                let asc = [...state.showPokemons]
                let dsc = [...state.showPokemons]
                let orderByPower = action.payload === "asc" ?
                    asc.sort((a,b) => {
                    if(a.attack < b.attack) return 1
                    if(a.attack > b.attack) return -1
                    return 0
                })
                    : 
                    dsc.sort((a,b) => {
                    if(a.attack < b.attack) return -1
                    if(a.attack > b.attack) return 1
                    return 0
                })
                return {
                    ...state,
                    showPokemons: orderByPower,
                }

        case FILTER_BY_TYPE:
            let allPoke = [...state.allPokemons]
            let filterType = allPoke.filter(pokeType => pokeType.types.map(t => t.name).includes(action.payload))
            //console.log(filterType)
            let filterPokemons = action.payload === "all" ? allPoke : filterType
            if(!filterPokemons.length) {filterPokemons = [{msg: "There isn't pokemons"}]}
            return {
                ...state,
                showPokemons: filterPokemons
            }
            

        case SEARCH_POKEMON:
            let notFound = [{name: "not found"}]
            /* let pokemonFound = state.allPokemons.filter(p => p.name === action.payload.toLowerCase()) */
            let incomplete = state.allPokemons.filter(p => p.name.includes(action.payload.toLowerCase()))
            return{
                ...state,
                showPokemons: incomplete.length ? incomplete : notFound
            }
            

        case POST_POKEMON:
            return{
                ...state
            }

        case API_OR_CREATED:
            let allSavedPokemons = [...state.allPokemons];
            let filterCreateOrExisting = action.payload === "created" ? allSavedPokemons.filter(p => p.id.length > 20) 
            : 
            action.payload === "api" ?
             allSavedPokemons.filter(p => p.id.length < 6) : allSavedPokemons
             return{
            ...state,
            showPokemons: filterCreateOrExisting
             }

        case DELETE_POKEMON:
            return{
                ...state
            }

        case REFRESH:
            return {
                ...state,
                showPokemons: [...state.originalPokemons]
            }

        case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        default:
            return state
    }
}

