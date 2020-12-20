import axios from "../../axios/axios";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from  "./actionTypes"

//экшены для квизов
export default function fetchQuizes () {

    return async dispatch => {
        dispatch (fetchQuizesStart())
        try{
            const response =  await axios.get("quizes.json")
            console.log(response)


            const quizes = []
            Object.keys(response.data).forEach( (key, index) => {
                quizes.push( {
                    id: key,
                    name: `Тест №${index +1}`
                })
            } )

            dispatch (fetchQuizesSuccess( quizes ))
        } catch (e){
            dispatch(fetchQuizesError(e))
        }
    }


}

export function fetchQuizesStart () {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess (quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError (e) {
    return {
        type: FETCH_QUIZES_ERROR,
        quizes: e
    }
}