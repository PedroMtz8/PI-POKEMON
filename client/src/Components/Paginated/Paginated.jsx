import React from "react";
import "./Paginated.css"


export default function Paginated({ pokemonsPerPage, pokemonsNumber, paginate, prev, next }){
 
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(pokemonsNumber / pokemonsPerPage); i++){
    pageNumbers.push(i)
  }

  

  //console.log(pageNumbers.length)
  



  return (
    <div className="container_paginado">
      <div className="botones">
      <button className="siguiente" onClick={() => prev()}  >Anterior</button>
      {
        pageNumbers.map((n) => {
          return  <button className="button_paginate" key={n} onClick={(() => paginate(n))}>{n}</button>
        })

      }
      <button className="siguiente"  onClick={() => next()}  >Siguiente</button>

      </div>
    </div>
  );
};

