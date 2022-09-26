import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { emptyPokemons, getTypes, postPokemon, getAllPokemons } from '../../redux/actions';
import "./Create.css"



export default function Create() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTypes = useSelector(state => state.types)
    const allPokemons = useSelector(state => state.showPokemons)

    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const [types, setTypes] = useState([])

    const [input, setInput] = useState({
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

    const [validName, setValidName] = useState(true);
    const [nameExist, setNameExist] = useState(true);
    const [validHeight, setValidHeight] = useState(true);
    const [validWeight, setValidWeight] = useState(true);


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
        if (!input.name) return alert("Can't create a Pokemon without a name")
        if (!types.length) return alert("Choose at least one type")
        let nameExist = allPokemons.map(p => p.name).includes(input.name.toLowerCase())
        if (nameExist) return alert("This pokemon already exists, you have to choose other name")
        if (!input.height || !input.weight) return alert("You have to add all the requirments")
        if (!input.image) input.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10099.png"

        input.types = types
        dispatch(postPokemon(input))
        setTimeout(alert("Pokemon created succesfully"), 2000)
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
        let nameExist = allPokemons.map(p => p.name).includes(input.name.toLowerCase())

        if (!input.name || typeof input.name !== "string") setValidName(false)
        else setValidName(true)
        if (nameExist) setNameExist(false)
        else setNameExist(true)
        if (!input.height) setValidHeight(false)
        else setValidHeight(true)
        if (!input.weight) setValidWeight(false)
        else setValidWeight(true)
    }

    return (
        <div className='background_create'>
            <div className='title_submit'>
                <Link to="/home">
                    <button className='buttom_home'>Back To Home</button>
                </Link>
                <div className='send'>
                    <h2 className='create'>Creating Your Pokemon</h2>
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
                        <span>{!nameExist && "This pokemon already exist"}{!validName && "You need to add a name"}</span>
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
                        <input className='input_text' name="height" value={input.height} type="number" min="1" placeholder='Height in meters'
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            onKeyUp={e => validate()}
                            onBlur={e => validate()}
                        />
                        <span>{!validHeight && "You need to add Height"}</span>
                        <label className='range_label'>Weight</label>
                        <input className='input_text' name="weight" value={input.weight} type="number" placeholder='Weight in meters'
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            onKeyUp={e => validate()}
                            onBlur={e => validate()}
                        />
                        <span>{!validWeight && "You need to add Weight"}</span>
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