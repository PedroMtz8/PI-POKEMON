import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css"
import { useDispatch, useSelector } from 'react-redux';
import { orderPokemons, filterByType, searchPokemon, orderByPower, apiOrCreated, setPage, refresh } from '../../redux/actions';
import pokeball from "../../img/pokeball.png"


//import {connect} from 'react-redux'

export default function Nav({ setOrder, types}) {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.allPokemons)
    
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState([...filter])

    //este onChange hace referencia al search
    function onChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault();
        
        if(search.length !== 0) {
            dispatch(searchPokemon(search)) 
            dispatch(setPage(1))
        }   
        
    }

    function handleOrderAbc(e){
        e.preventDefault();
        dispatch(orderPokemons(e.target.value));
        dispatch(setPage(1));
        setOrder(e.target.value);
    }

    function handleTypes(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        dispatch(setPage(1));
        setOrder(e.target.value);
    }

    function handleOrderPower(e){
        e.preventDefault();
        dispatch(orderByPower(e.target.value));
        dispatch(setPage(1))
        setOrder(e.target.value);
    }

    function handleApiOrCreated(e){
        e.preventDefault()
        dispatch(apiOrCreated(e.target.value))
        dispatch(setPage(1))
        setOrder(e.target.value)
    }


    function onRefresh(){
        dispatch(refresh())
        dispatch(setPage(1))
        setFilters([])
    }
    /* let types = getTypes()*/

    //console.log(types) 

    return (
           <header className="header" id="header">
            <nav className="nav container">
                <Link to="/" className="title_home">       
                     <h3 className='home_title'><img className='pokeball' src={pokeball} alt="" /> POKEMON</h3>
                </Link>
                <form onSubmit={onSubmit}>
                    <input className='text' type="text" onChange={onChange} value={search} placeholder="Buscar" />
                    <input className='submit' type="submit" value="Search"/>
                </form>
                <div className="nav__menu" id="nav-menu">
                    <ul className="list">
                    <input className='refresh' type="button" onClick={onRefresh} value="Refresh" />
                    <select className="selects"  onChange={e => handleApiOrCreated(e)}>
                            <option className="options " value="all" >All Pokemons</option>
                            <option className="options " value="api" >Default Data</option>
                            <option className="options " value="created" >Created</option>
                        </select>
                        <select className="selects" defaultValue={'DEFAULT'} onChange={e => handleOrderAbc(e)}>
                            <option className="options " value="DEFAULT" disabled  >Order by initial</option>
                            <option className="options " value="abc" >A-Z</option>
                            <option className="options " value="zyx" >Z-A</option>
                        </select>
                        <select className="selects" onChange={e => handleTypes(e)}>
                            <option className="options" value="all">Type Filter</option>
                            {
                                types.map((t, index) => {

                                    let mayus = t.name[0].toUpperCase()
                                    let Name = mayus + t.name.slice(1)
                                    return <option className="options" value={t.name} key={index} >{Name}</option>
                                })
                             
                            }
                            
                        </select>
                        <select className="selects" defaultValue={'DEFAULT'} onChange={e => handleOrderPower(e)}>
                            <option className="options" key={filters}  value="DEFAULT" disabled>Strength Order</option>
                            <option className="options" value="asc">Powerfull First</option>
                            <option className="options" value="desc">Weak First</option>
                        </select>
                        <div className="options">
                            <Link to="/pokemons/create" className="button nav__button">Create Pokemon</Link>
                        </div>
                    </ul>
                    
                </div>

               {/*  <!-- Toggle button  -->
 */}
                

            </nav>
        </header>
    )
}