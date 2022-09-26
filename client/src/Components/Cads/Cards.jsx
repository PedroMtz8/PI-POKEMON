import React from "react";
import Card from "../Card/Card";
import "./Cards.css"
import notFound from "../../img/notfound.gif"

export default function Cards({pokemons}){
    return(
        <div className="cards">
            {

        pokemons[0].name === "not found" ? 
        <div className='loading_home'>
                    <img className='loading_image' src={notFound} alt="pokemon" />
                    <p className='loading_text'>Pokemon not found, please try another one</p>
                </div>
                :
                // [{name: "Pikachu", id: 1, image: "http....", image: "dsf"},
                //  {name: "Charmander", id: 2, image: "http....", image: "dsf"},
                //  {},{}]
            pokemons.map(p =>{
                
                    return  <Card 
                            key={p.id}
                            name = {p.name}
                            id = {p.id}
                            image = {p.image}
                            types = {p.types}
                       />
              
            })
            }

        </div>
    )
}