import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getTypes, setPage } from '../../redux/actions';
import Nav from '../Nav/Nav';
import loading2 from "../../img/loading_home.gif"
import Cards from '../Cads/Cards';
import Paginated from '../Paginated/Paginated';
import notFound from "../../img/notfound.gif"
import "./Home.css"


export default function Home() {
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.showPokemons)
    const currentPage = useSelector((state) => state.currentPage)

    const allTypes = useSelector((state) => state.types)

    useEffect(() => {

        dispatch(getTypes())
        if (allPokemons.length === 0) return dispatch(getAllPokemons())
        /* setCurrentPage(currentPage) */
        //dispatch(getDetails())
        //console.log(getAllPokemons())
    }, [dispatch, allPokemons.length])
    //console.log(allPokemons)

    const [order, setOrder] = useState("")
    /* const [currentPage, setCurrentPage] = useState(1) */


    const indexOfLast = currentPage * 12
    const indexOfFirst = indexOfLast - 12
    const currentPokemons = allPokemons.slice(
        indexOfFirst, indexOfLast
    )

    //console.log(indexOfLast)
    //console.log(indexOfFirst)

    const prev = () => {
        if (currentPage > 1) return dispatch(setPage(currentPage - 1)) /* setCurrentPage( currentPage-1) */
    }

    let totalPaginas = Math.ceil(allPokemons.length / 12)
    //console.log(paginas)

    const next = () => {
        if (currentPage !== totalPaginas) return dispatch(setPage(currentPage + 1)) /* setCurrentPage( currentPage + 1) */
    }

    // const siguiente = () => setCurrentPage(currentPage+1)

    const paginate = (pageNumber) => dispatch(setPage(pageNumber))

    //console.log(allTypes)

    return (
        <div className='background-home'>
            <div className='pokemons'>
                <Nav
                    setOrder={setOrder}
                    types={allTypes}
                    order={order}
                />
            </div>
            <div className="pag-container">

                <Paginated
                    pokemonsPerPage={12}
                    pokemonsNumber={allPokemons.length}
                    paginate={paginate}
                    prev={prev}
                    next={next}
                />
            </div>

            {

                allPokemons.length ?
                    allPokemons[0].msg === "There isn't pokemons" ?
                        <div className='loading_home'>
                            <img className='loading_image' src={notFound} alt="pokemon" />
                            <p className='loading_text'>Pokemon not found, please try another one</p>
                        </div>
                        :
                        <div className='body_cards'>
                            <div>
                                <Cards pokemons={currentPokemons} />
                            </div>
                        </div>
                    :
                    <div className='loading_home'>
                        <p className='loading_text'>Loading...</p>
                        <img className='loading_image' src={loading2} alt="pokemon" />
                    </div>





            }

            <div className="pag-container2">
                {/* <button className="siguiente" onClick={() => anterior(currentPage)}  >Anterior</button> */}
                <Paginated
                    pokemonsPerPage={12}
                    pokemonsNumber={allPokemons.length}
                    paginate={paginate}
                    prev={prev}
                    next={next}
                />
            </div>

        </div>
    )
}