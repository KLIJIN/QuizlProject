import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from  "../actions/actionTypes"
//этот редьюсер отвечает за тесты, лист и квиз.  
const initialState = {
    quizes: [],
    loading: false,
    error: null
  }
  
   function quizReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_QUIZES_START:
        return {
          ...state, loading: true
        }
      case FETCH_QUIZES_SUCCESS:
        return {
          ...state, loading: false, quizes: action.quizes
        }
      case FETCH_QUIZES_ERROR:
        return {
          ...state, loading: false, error: action.error
        }
      default:
        return state
    }
  }

  export default quizReducer;