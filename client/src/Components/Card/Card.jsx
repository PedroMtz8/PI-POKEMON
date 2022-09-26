import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"



export default function Card({ name, id, image, types }) {



    return (
        <div className="card_container">
            <div className="card">
                <Link to={`/pokemon/${id}`}>
                    <h2 className="title">{name.toUpperCase()}</h2>
                    <div className="image_container">
                        <img className="image" src={image} alt="Pokemon not found" height="140px" width="160px" />
                    </div>
                    <div className="type_container">
                        <h2 className="types">Types:</h2> {types.map((pokemonT, index) => {

                            let mayus = pokemonT.name[0].toUpperCase()
                            let Name = mayus + pokemonT.name.slice(1)
                            return <h3 key={index} className="type">{Name}</h3>
                        })}
                    </div>


                </Link>
            </div>


        </div>
    )
}