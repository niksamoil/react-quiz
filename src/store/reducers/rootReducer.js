import { combineReducers } from "redux";
import quizReducer from "./quiz";
import createReducer from "./quizCreatorReducer";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer
});