import React from 'react'
import { Link ,useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getPokeDetail} from "../actions"
import style from "../css/Detail.module.css"


const Detail =()=>{
    const poke = useSelector((state)=> state.detail)
    console.log(poke)
    const dispatch = useDispatch();
    const navi = useNavigate();
    const {id} = useParams()
   

    useEffect(()=>{
        dispatch(getPokeDetail(id))
    },[dispatch,id])


  
    return(
        <div  className={style.padre}>
            {
                poke.length > 0? 
                <div className={style.detail}>
                    <h1>{poke[0].name.toUpperCase()}</h1>
                    <img  className={style.pokeimg} src={poke[0].img} alt="" />

                    <h2>Stats :</h2>

                    <div className={style.progressContainer}>
                        <h3>Hp:</h3> <progress className={style.life} max="200" value={poke[0].life}></progress><p>{poke[0].life}</p>
                    </div>

                    <div className={style.progressContainer}>
                        <h3>Attack</h3> <progress className={style.attack} max="200" value={poke[0].attack}></progress><p>{poke[0].attack}</p>
                    </div>

                    <div className={style.progressContainer}>
                       <div> <h3>Defense</h3></div> <progress className={style.defense} max="200" value={poke[0].deffense}></progress><p>{poke[0].deffense}</p>
                    </div>

                    <div className={style.progressContainer}>
                        <h3>Height</h3> <progress className={style.height} max="200" value={poke[0].height}></progress><p>{poke[0].height} cms</p>
                    </div>
                    <div className={style.progressContainer}>
                        <h3>Weight</h3> <progress className={style.weight} max="200" value={poke[0].weight}></progress><p>{poke[0].weight} kgs</p>
                    </div>

                   <div className={style.typesdetail}>
                        <div className={style.typesdetail}>Types : </div>
                        {
                         poke[0].types?.map(t =>(
                            <span key={t} className={style.typesD}> 
                                 {t.toUpperCase() + "     "}
                            </span>
                        ))
                        }   
                   </div>

                </div> : null
            }
        </div>
    )

}



export default Detail;