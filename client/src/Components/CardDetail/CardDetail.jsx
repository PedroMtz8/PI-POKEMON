import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {  deletePokemon, setPage, getDetails, emptyDetail, emptyPokemons, getAllPokemons } from '../../redux/actions';
import "./CardDetail.css"
import attack from "../../img/attack.png"
import life from "../../img/life.png"
import defense from "../../img/defense.png"
import speed from "../../img/speed.png"
import height from "../../img/height.png"
import weight from "../../img/weight.png"
import loading from "../../img/loading_details.gif"


export default function CardDetail() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const pokemonId = useParams();
    let id = pokemonId.id

    const detail = useSelector(state => state.pokemonDetail)
    const allPokemons = useSelector(state => state.showPokemons)
    //console.log(detail)

    /* let poke = useSelector(state => state.showPokemons)
   
    let detail = poke.filter(p => p.id === id */

    const [confirmBox, setConfirmbox] = useState(false);


    useEffect(() => {
        dispatch(emptyDetail())
        if (allPokemons.length === 0) return dispatch(getAllPokemons())
        dispatch(getDetails(id))

    }, [dispatch, allPokemons.length, id]);

    function handleDelete() {
        setConfirmbox(true)
    }

    function denyDelete() {
        setConfirmbox(false)
    }

    function acceptDelete() {
        dispatch(deletePokemon(id))
        setConfirmbox(false)
        dispatch(emptyPokemons())
        navigate("/home")
        dispatch(setPage(1))
    }

    return (
        <div className="background_detail">
            <div className='container_detail'>
                <div className='container_button'>
                    <button onClick={() => navigate("/home")}>Home</button>
                </div>
                <div >
                    {
                        detail.length === 0 ?
                            <div className='loading_text2'>
                                <p>Loading...</p>
                                <img className='loading_image' src={loading} alt="" />
                            </div>

                            :
                            <div className="card_container">
                                <div className='title_detail'>
                                    <h1>{detail[0].name.toUpperCase()}</h1>
                                </div>
                                <div>
                                    <img className="image" src={detail[0].image} alt="Pokemon not found" height="140px" width="160px" />
                                </div>
                                <div className='card'>
                                    <p><img className='icon' src={life} alt="Not found" /> Life: {detail[0].life}</p>
                                    <p><img className='icon' src={attack} alt="Not found" /> Attack: {detail[0].attack}</p>
                                    <p><img className='icon' src={defense} alt="Not found" /> Defense: {detail[0].defense}</p>
                                    <p><img className='icon' src={speed} alt="Not found" /> Speed: {detail[0].speed}</p>
                                    <p><img className='icon' src={height} alt="Not found" /> Height: {                 
                                        detail[0].created ? (detail[0].height / 100) + " m" : detail[0].height                  
                                    }</p>
                                    <p><img className='icon' src={weight} alt="Not found" /> Weight: {
                                        detail[0].created ? detail[0].weight + " kg" : detail[0].weight 
                                    }</p>


                                    <div className="type_container_detail">
                                        <h2 className="types_detail">Types:</h2> {detail[0].types.map((pokemonT, i) => {
                                            let mayus = pokemonT.name[0].toUpperCase()
                                            let Name = mayus + pokemonT.name.slice(1)
                                            return <h3 className="type_detail" key={i}>{Name}</h3>
                                        })}

                                    </div>
                                </div>
                                {
                                    detail[0].created ?
                                        <div className='bottoms_update_delete' >
                                                 <button className='delete' onClick={e => handleDelete()}>Delete</button>
                                                 <Link to={`/pokemon/update/${id}`} ><button className='update' >Update</button></Link> 
                                        </div>
                                        :
                                        null
                                }
                            </div>


                    }
                </div>
            </div>

            {confirmBox && <div className='confirmationBox'>
                <h2 className='message' >{`Are you sure you want to delete ${detail[0].name.toUpperCase()} ?`}</h2>
                <div>
                    <button className='confirmBtn denied' onClick={denyDelete}>NO</button>
                    <button className='confirmBtn confirmed' onClick={acceptDelete}>YES</button>
                </div>
            </div>}

        </div>
    )
};