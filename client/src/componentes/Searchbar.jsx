import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getPokeByName} from "../actions"
import style from "../css/Searchbar.module.css"


const SearchBar = ()=> {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    const handleInput= (e)=>{
        e.preventDefault();
        setName(e.target.value)

    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(getPokeByName(name.toLowerCase()))
        setName(" ")
    }


    return(
        <div className={style.cont_search}  >
            <input type="text" placeholder="pokemon name" className={style.input}  value={name} onChange={e=> handleInput(e)}/>
            
            <button type="button"  onClick={e => handleSubmit(e)}>
                <img src="https://dibujando.net/files/fs/p/i/2020/294/Lupa_icono_450980.gif"  className={style.lupa} />
            </button>
        </div>
    )

}


export default SearchBar