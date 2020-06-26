import axios from 'axios';

const http =  axios.create({
    baseURL: "http://localhost:8083",
})
export default http
