import React, {Component} from "react";
import s from "./QuizList.module.css"
import {NavLink} from "react-router-dom"
//import axios from "../../axios/axios";
import Loader from "../../components/UI/Loader/Loader"
import {connect} from "react-redux"
import fetchQuizes from "../../store/actions/quiz"


class QuizList extends Component {

  renderQuizes() {  //функция рендерит список тестов.
       return this.props.quizes.map((quiz) => {
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


     componentDidMount() {
       this.props.fetchQuizes()
        // try{
        //     const response =  await axios.get("quizes.json")
        //     console.log(response)


        //     const quizesCopy = []
        //     Object.keys(response.data).forEach( (key, index) => {
        //         quizesCopy.push( {
        //             id: key,
        //             name: `Тест №${index +1}`
        //         })
        //     } )

        //     this.setState({
        //         quizes: quizesCopy,
        //         loader: false
        //     })
        // } catch (e){
        //     console.log(e)
        // }
      }

    render () {
      console.log("QuizList__render", this.props)
        return(
            <div className={s.QuizList}>
                <h1> Список тестов </h1>
                {
                    this.props.loader && this.props.quizes !== 0
                    ? <Loader/>
                    :   <ul>
                           {this.renderQuizes()}  {/* функция с круглыми скобками т.к. при рендере она должна автоматически стартовать и отрисовывать список ссылок*/}
                        </ul>
                }

            </div>
        )
    }
}


function mapStateToProps(state) {
  console.log("QuizList__mapStateToProps", state)
  return {
    quizes: state.quiz.quizes,
    loader: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}
export default connect (mapStateToProps, mapDispatchToProps) (QuizList);