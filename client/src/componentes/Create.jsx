import React , {useEffect,useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {getTypes,PostPokemon} from "../actions"
import style from "../css/Create.module.css"



const Create = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = useSelector(state => state.types);
    const [errors, setErrors] = useState({})

    const [input, SetInput] = useState({
        name: "",
        life:"",
        attack:"",
        deffense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        types:[]
    })

    useEffect(()=>{
        dispatch(getTypes());
    },[dispatch])

    function handleChange(e){
        SetInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

  
    console.log(input.name)
    const handleSelect=(e)=>{
        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value ]
        }))
     
            SetInput({
                ...input,
                types:[...input.types, e.target.value ]
            })
        

    }

     const handleDelete=(e)=>{
        setErrors(validate({
            ...input,
            types: input.types.filter(type => type !== e),
        }))
        SetInput({
            ...input,
            types: input.types.filter(type => type !== e),
        })


    }
 

    function validate(input) {
        let errors = {}
        if(input.name===""){
            errors.name= "Obligatory field name"
        }
        if(input.life <=0 || input.life>=201){
            errors.life= "Obligatory field from 1 to 200"
        }
        if(input.attack<=0 || input.attack>=201){
            errors.attack= "required field from 1 to 200"
        }
        if(input.types.length === 0 || input.types.length >= 3){
            errors.types= "max 2 types"
            
        }
        return errors
    }

    const HandleSubmit=(e)=>{
        e.preventDefault();
        dispatch(PostPokemon(input));
        alert("pokeamigo creado con exito");
        SetInput({
        name: "",
        life:"",
        attack:"",
        deffense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        types:[]
        })
        navigate("/home")
    }
    

    return(
        <div className={style.padre}>

        <h1 className={style.title}>CREATE YOUR POKEMON! !</h1>

        <form onSubmit={HandleSubmit}  className={style.padreForm}  >

            <div className={style.formhijo}>
               <label>Pokemon Name: </label>
               <input  type="text" value={input.name} name= "name" onChange={(e)=>handleChange(e)} autoComplete={"off"} />
               <span className={style.spanCreate}>{errors.name && (<p className='error'>{errors.name}</p>)}</span>
            </div>

            <div className={style.formhijo}>
               <label>HP: </label>
               <input  type="number" value={input.life} name="life" placeholder='Hp'max="200" min="0" onChange={handleChange} />
               <progress max="200" value={input.life}></progress>
               <span className={style.spanCreate}>{errors.life && (<p className='error'>{errors.life}</p>)}</span>
            </div>

            <div className={style.formhijo}>
               <label>Attack :</label>
               <input  type="number" value={input.attack} name="attack" placeholder='attack'max="200" min="0" onChange={handleChange} />
               <progress max="200" value={input.attack}></progress>
               <span className={style.spanCreate}>{errors.attack && (<p className='error'>{errors.attack}</p>)}</span>

            </div>


            <div className={style.formhijo}>
               <label>Deffense: </label>
               <input  type="number" value={input.deffense} name="deffense" placeholder='deffense'max="200" min="0" onChange={handleChange} />
               <progress max="200" value={input.deffense}></progress>
            </div> 


             <div className={style.formhijo}>
               <label>Speed: </label>
               <input  type="number" value={input.speed} name="speed" placeholder='speed'max="200" min="0"  onChange={handleChange}/>
               <progress max="200" value={input.speed}></progress>
            </div> 

             <div className={style.formhijo}>
               <label>Height: </label>
               <input  type="number" value={input.height} name="height" placeholder='height'max="300" min="0" onChange={handleChange} />
               <progress max="300" value={input.height}></progress>
            </div> 

             <div className={style.formhijo}>
               <label>Weight: </label>
               <input  type="number" value={input.weight} name="weight" placeholder='weight'max="200" min="0" onChange={handleChange} />
               <progress max="200" value={input.weight}></progress>
            </div> 



            <div className={style.formhijo}>
                <label>Types</label>
                <select onChange={handleSelect}>
                <option value="">Select Types</option>
                {
                    type.map(e=>(
                        <option value={e.name} name="types" key={e.name}>{e.name}</option>
                    ))
                }
                </select>
                <span className={style.span_types}>{errors.types && (<p className='error'>{errors.types}</p>)}</span>

              
            </div>


            <div className={style.cont_types}>
                <ul>
                    <li>
                        {input.types.map(e=>
                            <div>
                                 <div>
                                    {e} 
                                    <button key={e} className={style.deletetypes} onClick={()=>handleDelete(e)}>x</button>
                                </div>
                            </div>
                            )
                        }

                       </li> 
                </ul>
            
            </div>


 
            <div className={style.formhijo}>
               <label>Pokemon Image: </label>
               <input  type="text" value={input.img} name="img" placeholder="Link" onChange={handleChange} />
               <img className={style.img_detail} src={input.img} alt=" " />
            </div> 
           
        
        
         
            <button type='submit' className={style.create_btn} disabled={errors.name || errors.life || errors.attack || errors.types  || input.name === ''? true : false }>create</button>
        </form>
        </div>
    )


}


export default Create