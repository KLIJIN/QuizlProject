import React from "react";
import s from "./button.module.css"


const Button = (props) => {
    const stl = [
        s.Button,
        s[props.type]
    ]
    
    return(
        <button
                onClick = {props.onClick}
                className = {stl.join(" ")}
                disabled={props.disabled}>
            {props.children} {/*контент внутри кнопки */}
        </button>
    )
}

export default Button