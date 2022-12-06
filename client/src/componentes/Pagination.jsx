import React from "react";
import { useState } from "react";
import style from "../css/Paginado.module.css"

const Pagination = ({pokemonPerPage, allPoke, pagination, currentPage,setCurrentPage})=>{
    const Pagenumber = []
    const [input, setInput] = useState(currentPage);
    const max = allPoke/pokemonPerPage

    for(let i=1; i<=Math.ceil(max); i++){
        Pagenumber.push(i);
    }

    const NextPage = ()=>{
        setCurrentPage(currentPage +1);
        setInput(input -1 )
    }

    const PrevPage = ()=>{
        setCurrentPage(currentPage - 1);
        setInput(input - 1)
    }
    return(
            <nav className={style.padre}>
                <ul className={style.contenedor}>
                    <button onClick={PrevPage} disabled={currentPage === 1 || currentPage < 1} className={style.prev}> {'<'} </button>
                    
                    {
                        Pagenumber && Pagenumber.map(num => (
                            <li   className={style.paginado} key={num}  onClick={ ()=> pagination(num) }>
                                <span>{num}</span>
                            </li>
                        ))
                    }

                    <button className={style.next} onClick={NextPage} disabled={currentPage === Math.ceil(max) || currentPage >Math.ceil(max) }> {'>'} </button>

                </ul>
            </nav>
        
    )
}




export default Pagination