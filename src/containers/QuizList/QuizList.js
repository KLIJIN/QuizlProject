import React, {Component} from "react";
import s from "./QuizList.module.css"
import {NavLink} from "react-router-dom"
import axios from "../../axios/axios";
import Loader from "../../components/UI/Loader/Loader"


class QuizList extends Component {

    state = {
        quizes: [],
        loader: true
    }

    renderQuizes() {
       return this.state.quizes.map((quiz) => {
          return (
            <li
              key={quiz.id}
            >
              <NavLink to={'/quiz/' + quiz.id}>
                {quiz.name}
              </NavLink>
            </li>
          )
        })
      }


    async componentDidMount() {
        try{
            const response =  await axios.get("quizes.json")
            console.log(response)


            const quizesCopy = []
            Object.keys(response.data).forEach( (key, index) => {
                quizesCopy.push( {
                    id: key,
                    name: `Тест №${index +1}`
                })
            } )

            this.setState({
                quizes: quizesCopy,
                loader: false
            })
        } catch (e){
            console.log(e)
        }
      }

    render () {
      
        return(
            <div className={s.QuizList}>
                <h1> Список тестов </h1>
                {
                    this.state.loader
                    ? <Loader/>
                    :   <ul>
                           {this.renderQuizes()}  {/* функция с круглыми скобками т.к. при рендере она должна автоматически стартовать и отрисовывать список ссылок*/}
                        </ul>
                }

            </div>
        )
    }
}

export default QuizList;