import React, {Component} from "react";
import s from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/Finished/FinishedQuiz"
import axios from "../../axios/axios";
import Loader from "../../components/UI/Loader/Loader"


class Quiz extends Component {

    state = {
        results: { },     
        isFinished: false,
        activeQuestion: 0,
        answerState: null, 
        loading: true,
        quiz: [
            // {
            // id: 1,
            // question: "Какой город считается родиной джаза?",
            // rightAnswerId: 3,
            // answers: [
            //     {text: "Чикаго",        id: 1}, 
            //     {text: "Нью-Йорк",      id: 2}, 
            //     {text: "Новый Орлеан",  id: 3}, 
            //     {text: "Сан-Франциско", id: 4}    ]
            // },
            // {
            //     id: 2,
            //     question: "Что журнал «Тайм» однажды признал «Человеком года»?",
            //     rightAnswerId: 2,
            //     answers: [
            //         {text: "Телефон",             id: 1}, 
            //         {text: "Компьютер",           id: 2}, 
            //         {text: "Телевизор",           id: 3}, 
            //         {text: "Космический корабль", id: 4}    ]
            //     },
            //     {
            //         id: 3,
            //         question: "Как зовут поросёнка из мультфильма?",
            //         rightAnswerId: 1,
            //         answers: [
            //             {text: "Фунтик",             id: 1}, 
            //             {text: "Фантик",             id: 2}, 
            //             {text: "Франтик",            id: 3}, 
            //             {text: "Килограммчик",       id: 4}    ]
            //         },
            //         {
            //             id: 4,
            //             question: "Где круглый год продолжительность дня и ночи одинаковая?",
            //             rightAnswerId: 4,
            //             answers: [
            //                 {text: "Северный полюс",        id: 1}, 
            //                 {text: "Южный полюс",           id: 2}, 
            //                 {text: "На нулевом меридиане",  id: 3}, 
            //                 {text: "На экваторе",           id: 4}    ]
            //             }
        ]
    }

    onAnswerClickHandler = answerId => {
            // console.log('Answer Id: ', answerId)

            if (this.state.answerState) {
                const key = Object.keys(this.state.answerState)[0]
                if (this.state.answerState[key] === "succes"){
                    return
                }
            }

            const question = this.state.quiz[this.state.activeQuestion]
            const results  = this.state.results

            if (question.rightAnswerId === answerId  ) {     //если ответ правильный
                if(!results[question.id]) {
                    results[question.id] = "success"
                }


                this.setState({
                    answerState: { [answerId]: "success"},
                    results: results
                })
                const timeout = window.setTimeout (()=>{
                    if (this.isQuizFinished()) {
                        
                        this.setState({ isFinished: true })

                        // alert("Finish")
                        this.setState( (prevState) =>{
                            return{
                                activeQuestion: 0,
                                answerState: null
                            }
                        } )

                    } else {

                        this.setState( (prevState) =>{
                            return{
                                activeQuestion: prevState.activeQuestion + 1,
                                answerState: null
                            }
                        } )
                    }
                    window.clearTimeout(timeout)
                }, 400)
                
            } else {    //если ответ неправильный
                results[question.id] = "error"
                this.setState({  answerState: { [answerId]: "error"},
                                     results: results
                              }) 
            }
    } 

    isQuizFinished () {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState( (prevState) =>{
            return{
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        } )
    }
   
    async componentDidMount() {
        try {
          const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
          //get("https://react-quiz-2d091-default-rtdb.firebaseio.com/quizes.json")
          const quiz = response.data
    
          this.setState({
            quiz: quiz,
            loading: false
          })
        } catch (e) {
          console.log(e)
        }
      }
 
    render() {
        console.log("[Quiz] Quiz ID = ", this.props.match.params.id)
        return(
            <div className={s.Quiz}>
                <div className={s.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                  
                  {
                      this.state.loading
                      ? <Loader/>
                      :    this.state.isFinished
                      ?   <FinishedQuiz  
                            results={this.state.results}
                            quiz ={this.state.quiz}
                            onRetry = {this.retryHandler}
                          />
                        :   <ActiveQuiz question = {this.state.quiz[this.state.activeQuestion].question}
                                        answers  = {this.state.quiz[this.state.activeQuestion].answers}
                                        onAnswerClick={this.onAnswerClickHandler}
                                        quizLength ={this.state.quiz.length}
                                        answerNumber ={this.state.activeQuestion + 1}
                                        state = {this.state.answerState}
                            />
                  }
                    


                </div>
            </div>
        )
        
    }
}

export default Quiz;