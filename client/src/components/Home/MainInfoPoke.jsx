import React from "react";
export  function MainInfoPoke ({img,name,type}){
    return(
        <div>
            <img src={img} alt="Img not found" />
            <h3>{name}</h3>
            {type.map(e=><div>{e}</div>)}
        </div>
    )
}