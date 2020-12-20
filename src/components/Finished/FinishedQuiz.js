import React from "react"
import s from "./FinishedQuiz.module.css"
import Button from "../UI/buton/button"
import {Link} from "react-router-dom"


const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => { //keys превращает объект в массив ключей
      if (props.results[key] === 'success') {
        total++
      }
      return total
    }, 0)
  
    return (
      <div className={ s.FinishedQuiz}>
        <ul>
          { props.quiz.map((quizItem, index) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
               s[props.results[quizItem.id]]
            ]
  
            return (
              <li
                key={index}
              >
                <strong>{index + 1}</strong>.&nbsp;
                {quizItem.question}
                <i className={cls.join(' ')} />
              </li>
            )
  
          }) }
        </ul>
  
        <p>Правильно {successCount} из {props.quiz.length} </p>
  
        <div>
          {/* <button onClick={props.onRetry}>Еще раз</button> */}
            <Button onClick={props.onRetry} type="primary" > Еще раз </Button>
          <Link to="/" >   
            <Button onClick={props.onRetry} type="success" > Перейти в список тестов </Button>
          </Link>
         
        </div>
      </div>
    )
  }
  

export default FinishedQuiz;