import axios from "axios";
const ApiClient = {

    init(){
        axios.defaults.baseURL = 'http://localhost:3000'
        axios.defaults.withCredentials = false
    },
    setHeader(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

}

export default ApiClient;

export const RecipeService = {
    getRecipes(){
        return axios.get('/recipes')
    },
    getRecipe(id){
        return axios.get('/recipes/' + id)
    }
}

