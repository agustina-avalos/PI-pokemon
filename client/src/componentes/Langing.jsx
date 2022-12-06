import React from "react";
import { Link } from "react-router-dom";
import style from "../css/Landing.module.css"


export default function LandingPage(){
    return(
        <div className={style.padre}>
            <div className={style.cont_titulo}>
                <h2 className={style.titulo}>Welcom Pokemon App</h2>
            </div>

            <div className={style.cont_btn}>
                <Link to="/home">
                    <button className={style.btn_landing}>Get in</button>
                </Link>
            </div>
            
        </div>
    )
}

