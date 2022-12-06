import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPoke, getTypes,filterByTypes,filterByPokeDB,OrderByName,OrderByAttack} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import style from "../css/Home.module.css"
import Pagination from "./Pagination";
import SearchBar from "./Searchbar";


export default function Home (){
    const dispatch = useDispatch();
    const allPoke = useSelector((state)=> state.pokemons);
    const types = useSelector(state => state.types);

     /* estados para el paginado */
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;
    const indexOfLastPokemon = currentPage*pokemonPerPage; //indice del ult poke Por pagina
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; // indice del primer poke por pagina
    const currenPokemon = allPoke.slice(indexOfFirstPokemon, indexOfLastPokemon) //pokemon por pagina actual
    const [order, setOrder] = useState(''); //para que se pagine cuando ordeno y/o filtro

    //funcion para que se actualice el paginado
    const pagination= (pagenumber)=>{
        setCurrentPage(pagenumber);
    }

    //trae el estado cada vez que se monta el componente
    useEffect(()=>{
        dispatch(getAllPoke())
        dispatch(getTypes())
    },[dispatch])

    const handleClick= (e) =>{
        e.preventDefault();
        dispatch(getAllPoke())
        setCurrentPage(1)
    }

    const HandlefilterByTypes= (e)=>{
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    }

    const handleFilterCreate= (e)=>{
        e.preventDefault();
        dispatch(filterByPokeDB(e.target.value));
        setCurrentPage(1);
    }
    
    const handleFilterName= (e)=>{
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilter = (e)=>{
        e.preventDefault();
        dispatch(OrderByAttack(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value);
       
    }

    return(
        <div>
           
         
           

            <nav className={style.navbar}>
                <div className={style.cont_create}> 
                    <Link to="/pokemon">
                        <button className={style.btn_create}>Create your Pokemon!</button>
                    </Link>
                </div>
                <div className={style.cont_titulo}>
                    <h1 className={style.titulo}>App Pokemon Agus</h1>
                </div>
               <div className={style.cont_search}>
                <SearchBar/>
                </div>
            </nav>



            <div className={style.cont_filtros}>
                {/* filtrado por types */}
                <select onChange={e => HandlefilterByTypes(e)} className={style.filtro} >
                    <option value="all">Types</option>
                    <option value="all">All types</option>
                    {
                        types?.map(e=>(
                            <option key={e.name} value={e.name}>{e.name} </option>
                        ))
                    }
                </select>

                {/* filtrado por base de datos o api */}
                <select onChange={e => handleFilterCreate(e)} className={style.filtro}>
                    <option value="">Origin</option>
                    <option value="all">All</option>
                    <option value="db">Created</option>
                    <option value="api">Api</option>
                </select>

                {/* Orden alfabetico */}
                <select  onChange={ e => handleFilterName(e)}  className={style.filtro}>
                    <option value="all">Alphabetically</option>
                    <option value="AtoZ">A - Z</option>
                    <option value="ZtoA">Z - A</option>
                </select>

                {/* ordenamiento por ataque */}
                <select  onChange={e => handleFilter(e)} className={style.filtro} >
                    <option value="all">Attack</option>
                    <option value="more">+ Attack</option>
                    <option value="less">- Attack</option>
                </select>

                {/* refrescar pokemon */}
                <button onClick={e => handleClick(e)} className={style.filtro}>
                    Refresh All
                </button>
            </div>

            <div className={style.Card}>
                {
                    currenPokemon.map(e =>{
                        return (
                        <div>
                                <Card  id={e.id} name={e.name} img={e.img} types = {e.types}   />
                        </div>  
                        )
                    })
                } 
            </div>


            <div>
                <Pagination  pokemonPerPage={pokemonPerPage} allPoke={allPoke.length} pagination={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>


        </div>
    )

}
