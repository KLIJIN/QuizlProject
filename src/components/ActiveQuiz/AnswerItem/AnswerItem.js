import React from "react";
import s from "./AnswerItem.module.css"

const AnswerItem = props => {
    const stl = [s.AnswerItem]
  //  console.log("AnswerItem777", props)
    if (props.state) {
        stl.push(s[props.state])
    }


    return (
        <li  className={stl.join(" ")}
            //onClick = {props.onAnswerClick(props.answer.id)} //тут функция сразу вызывается 4 раза
            onClick = { ()=> props.onAnswerClick(props.answer.id)}
            >
                 {props.answer.text}
        </li>
    )
}

export default AnswerItem;