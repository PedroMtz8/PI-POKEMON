import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { emptyPokemons, getTypes, updatePokemon, getAllPokemons, getDetails } from '../../redux/actions';



export default function Update() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTypes = useSelector(state => state.types)
    const allPokemons = useSelector(state => state.showPokemons)
    const pokemonId = useParams();
    let id = pokemonId.id

    
    const filter = allPokemons.filter(p => p.id === id)


    const typesPoke = filter[0].types.map(p => p.name)
    /* console.log(id) */

    useEffect(() => {
        dispatch(getTypes())
        if (allPokemons.length === 0) return dispatch(getAllPokemons())
        dispatch(getDetails(id))
    }, [dispatch, allPokemons.length])

    const [types, setTypes] = useState(typesPoke)

    const [input, setInput] = useState({
        name: filter[0].name,
        life: filter[0].life,
        attack: filter[0].attack,
        defense: filter[0].defense,
        speed: filter[0].speed,
        height: filter[0].height,
        weight: filter[0].weight,
        types: [],
        image: filter[0].image
    })

    const [validName, setValidName] = useState(true);
    const [nameExist, setNameExist] = useState(true);
    const [validHeight, setValidHeight] = useState(true);
    const [validWeight, setValidWeight] = useState(true);
    const [maxChar, setMaxChar] = useState(true)
    const [minH, setMinH] = useState(true)
    const [minW, setMinW] = useState(true)


    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    function handleTypes(e) {
        e.preventDefault();

        let originalTypes;
        if (types.includes(e.target.value)) {
            let find = types.filter(t => t !== e.target.value)
            originalTypes = find
            return setTypes([...originalTypes])

        }
        if (types.length === 3) {
            types.pop()
        }
        setTypes([...types, e.target.value])

    }



    function onSubmit(e) {
        validate()
        e.preventDefault()
        if (!input.name || input.name.trim() === "" ) return alert("Can't create a Pokemon without a name")
        if (!types.length) return alert("Choose at least one type")
        if(input.name.length > 15) return alert("You can't add more than 15 characters")
        const differentsPokeName = allPokemons.filter(p => p.name !== filter[0].name)
        const nameExist = differentsPokeName.map(p => p.name).includes(input.name.toLowerCase())
        if (nameExist) return alert("This pokemon already exists, you have to choose other name")
        if (!input.height || !input.weight) return alert("You have to add all the requirments")
        if(input.weight < 1 || input.height < 1) return alert("Just positive values")
        if(input.weight.length > 3 || input.height.length > 3) return alert("The Height or Weight is out of range, just 3 numbers")
        

        input.types = types
        dispatch(updatePokemon(input, id))
        setTimeout(alert("Pokemon updated succesfully"), 2000)
        dispatch(emptyPokemons())
        setInput({
            name: "",
            life: 75,
            attack: 75,
            defense: 75,
            speed: 75,
            height: "",
            weight: "",
            types: [],
            image: ""
        })
        navigate("/home")
    }
    //console.log(types)

    function validate() {
        /*  let errors = {}; */
        const differentsPokeName = allPokemons.filter(p => p.name !== filter[0].name)
        const nameExist = differentsPokeName.map(p => p.name).includes(input.name.toLowerCase())

        if (!input.name || typeof input.name !== "string" || input.name.trim() === "") setValidName(false)
        else setValidName(true)
        if(input.name.length > 15) setMaxChar(false)
        else setMaxChar(true)
        if (nameExist) setNameExist(false)
        else setNameExist(true)
        if(input.height < 1) setMinH(false)
        else setMinH(true)
        if(input.weight < 1) setMinW(false)
        else setMinW(true)
        if (!input.height) setValidHeight(false)
        else setValidHeight(true)
        if (!input.weight ) setValidWeight(false)
        else setValidWeight(true)
        
    }


    return (
        <div className='background_create'>
            <div className='title_submit'>
                    <button className='buttom_home' onClick={e => navigate(-1)}>Back</button>
               
                <div className='send'>
                    <h2 className='create'>Editing Your Pokemon</h2>
                </div>
                <button className='button_create' type='submit' onClick={e => onSubmit(e)}>Send</button>
            </div>
            <div className='createPokemon'>

                <form className='conteiner_form' onSubmit={e => onSubmit(e)}>
                    <div className='form'>
                        <label className='name'>Name</label>
                        <input className='input_text' type="text" id='7' name="name" value={input.name} placeholder='Enter your pokemon Name'
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            onKeyUp={e => validate()}
                            onBlur={e => validate()}
                        />
                        <span>{!nameExist && "This pokemon already exist"}{!validName && "You need to add a name"}{!maxChar && "Can't add more than 15 characters"}</span>
                        <label className='range_label'>Life: {input.life} </label>
                        <input name="life" value={parseInt(input.life)} className='range_input' type="range" min="0" max="150"
                            onChange={(e) => {
                                handleChange(e)
                            }} />
                        <label className='range_label'>Attack: {input.attack} </label>
                        <input name="attack" value={parseInt(input.attack)} className='range_input' type="range" min="0" max="150"
                            onChange={(e) => {
                                handleChange(e)
                            }} />
                        <label className='range_label'>Defense: {input.defense} </label>
                        <input name="defense" value={parseInt(input.defense)} className='range_input' type="range" min="0" max="150"
                            onChange={(e) => {
                                handleChange(e)
                            }} />
                        <label className='range_label'>Speed: {input.speed}</label>
                        <input name="speed" value={parseInt(input.speed)} className='range_input' type="range" min="0" max="150"
                            onChange={(e) => {
                                handleChange(e)
                            }} />
                        <label className='range_label'>Height</label>
                        <input className='input_text' name="height"  value={input.height} type="number" min="1" placeholder='Height in centimeters'
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            onKeyUp={e => validate()}
                            onBlur={e => validate()}
                            
                        />
                        <span>{!validHeight && "You need to add Height"}</span>
                        <span>{!minH && "Just positive values"}</span>
                        <label className='range_label'>Weight</label>
                        <input className='input_text' name="weight" min="1" value={input.weight} type="number" placeholder='Weight in kg'
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            onKeyUp={e => validate()}
                            onBlur={e => validate()}
                            
                        />
                        <span>{!validWeight && "You need to add Weight"}</span>
                        <span>{!minW && "Just positive values"}</span>
                        <label className='name'>Image</label>
                        <input className='input_text' name="image" value={input.image} type="text" placeholder='Add an image link'
                            onChange={(e) => {
                                handleChange(e)
                            }} />
                        <div className='img'>
                            <img className='image_input' src={input.image.length ? input.image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10099.png"} alt="Not Found" />

                        </div>
                    </div>

                    <div className='all_types' >
                        {
                            allTypes.map(t => {
                                return <input className={types.includes(t.name) ? 'type_buttom' : "press"} type="button" key={t.id} value={t.name} onClick={e => handleTypes(e)} />
                            })
                        }

                    </div>

                </form>

            </div>
        </div>
    )
}