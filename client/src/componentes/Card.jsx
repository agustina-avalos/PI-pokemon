import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import style from '../css/Card.module.css' 


 const Card = ({id ,name, img, types})=>{
    return(
        <div className={style.container}>
        <Link to={"/detail/" + id}>
            <h3 className={style.name}>{name.toUpperCase()}</h3>
             <img src={img} className={style.img} alt= 'https://e7.pngegg.com/pngimages/506/902/png-clipart-pokemon-omega-ruby-and-alpha-sapphire-pokemon-go-poke-ball-pokemon-go-image-file-formats-circle.png' width= '200px' height='250px' />
            {
                types?.map(t =>(
                    <span key={t} className={style.types}> 
                        {t.toUpperCase()}
                    </span>
                ))
            } 
            </Link>
        </div>
        
    )
}



export default Card;