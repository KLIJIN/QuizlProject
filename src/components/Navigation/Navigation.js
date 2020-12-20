import React from "react";
import s from "./Navigation.module.css"


const MenuToggle = (props) => {
    const stl = [
        s.MenuToggle,
        "fa", 
        
    ]

    if ( props.isOpen) {
        stl.push("fa-times")//крестик
        stl.push(s.open)
    }else{
        stl.push("fa-bars") //бургер
    }

    return(
        <i className={stl.join(' ')} 
        onClick = {props.onToggle}
         />
    )

}

export default MenuToggle;