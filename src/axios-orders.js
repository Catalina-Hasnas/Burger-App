import axios from 'axios'

const instance = axios.create({
    baseURL: "https://burger-app-e2b8d.firebaseio.com/"
});

export default instance;