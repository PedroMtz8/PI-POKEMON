import axios from "axios"

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_POKEMONS_DETAILS = "GET_POKEMONS_DETAILS"
export const EMPTY_POKEMONS = "EMPTY_POKEMONS"
export const GET_TYPES = "GET_TYPES"
export const ORDER_POKEMONS = "ORDER_POKEMONS"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const SEARCH_POKEMON = "SEARCH_POKEMON"
export const ORDER_BY_POWER = "ORDER_BY_POWER"
export const POST_POKEMON = "POST_POKEMON"
export const API_OR_CREATED = "API_OR_CREATED"
export const DELETE_POKEMON = "DELETE_POKEMON"
export const SET_PAGE = "SET_PAGE"
export const REFRESH = "REFRESH"
export const EMPTY_DETAIL = "EMPTY_DETAIL"

let api = "http://localhost:3001"


export function getAllPokemons(){
    return function(dispatch){
        return axios.get(`/pokemons`)
                .then(pokemons =>{
                    dispatch({
                        type: GET_ALL_POKEMONS,
                        payload: pokemons.data
                    })
                })
                .catch(error =>{
                    console.log(error)
                })
    }
}


export function getDetails(id){
    return function(dispatch){
        return axios.get(`/pokemons/${id}`)
                .then(pokemons =>{
                    dispatch({
                        type: GET_POKEMONS_DETAILS,
                        payload: pokemons.data
                    })
                })
                .catch(error =>{
                    console.log(error)
                })
    }
}

export function getTypes(){
    return function(dispatch){
        return axios.get(`/types`)
                .then(t =>{
                    dispatch({
                        type: GET_TYPES,
                        payload: t.data
                    })
                })
                .catch(error =>{
                    console.log(error)
                })
    }
}


export function emptyPokemons(){
    return function(dispatch){
        return dispatch(
            {
                type: EMPTY_POKEMONS,
                payload: []
            }
        )
    }
}

export function emptyDetail(){
    return function(dispatch){
        return dispatch(
            {
                type: EMPTY_DETAIL,
                payload: []
            }
        )
    }
}

export function orderPokemons(payload){
    return function(dispatch){
        return dispatch({
            type: ORDER_POKEMONS,
            payload
        })
    }
}

export function filterByType(payload){
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_TYPE,
            payload
        })
    }
}


export function searchPokemon(payload){
    return function(dispatch){
        return dispatch({
            type: SEARCH_POKEMON,
            payload
        })
    }
}

export function orderByPower(payload){
    return function(dispatch){
        return dispatch({
            type: ORDER_BY_POWER,
            payload
        })
    }
}

export function apiOrCreated(payload){
    return function(dispatch){
        return dispatch({
            type: API_OR_CREATED,
            payload
        })
    }
}



export function postPokemon(payload){
    return function(dispatch){
        let newPokemon = axios.post(`/pokemons`, payload)
                dispatch({
                    type: POST_POKEMON,
                    payload
                })

            return newPokemon
    }
}


export function deletePokemon(id){
    return async function(dispatch){
        try{
            const deleted = await axios.delete(`/pokemons/${id}`)
            dispatch({
                type: DELETE_POKEMON,
                payload: deleted
            })
        }
        catch(e){
            console.log(e)
        }
       
               
    }
}


export function setPage(move){
    return {type:SET_PAGE, payload: move}
}

export function refresh(){
    return {type: REFRESH}
}