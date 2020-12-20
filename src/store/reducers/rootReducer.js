import {combineReducers} from "redux"
import quizReducer from "./quiz"

export default combineReducers ({
    quiz: quizReducer                //  reducer1, reducer2  и т.п. 

})