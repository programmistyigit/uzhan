import { configureStore } from "@reduxjs/toolkit";
import currentQuiz from "./currentQuiz";
import auth from "./auth";
import loading from "./loading";
import allusers from "./allusers";
import quizCategory from "./quizCategory";

const store = configureStore({
    reducer:{
        currentQuiz,
        auth,
        loading,
        allusers,
        quizCategory
    }
})


export default store