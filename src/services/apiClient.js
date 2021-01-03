import axios from "axios";

const apiClient = {

    init(){
        axios.defaults.baseURL = 'http://localhost:3000'
        axios.defaults.withCredentials = false
    },
    setHeader(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${
            userData.accessToken
          }`
    }

}

export default apiClient;