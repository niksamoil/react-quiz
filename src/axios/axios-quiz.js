import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-a81c4-default-rtdb.firebaseio.com'
});