import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quizReducer from "./quiz";
import createReducer from "./quizCreatorReducer";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
});