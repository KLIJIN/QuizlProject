
import axios from "axios";

//определяем базовый урл
export default axios.create({
    baseURL: "https://react-quiz-2d091-default-rtdb.firebaseio.com/"
})