import axios from "axios";
const ApiService = {

    init(){
        axios.defaults.baseURL = 'http://localhost:3000/api'
        axios.defaults.withCredentials = false
    },
    setHeader(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

}

export default ApiService;

export const RecipeService = {
    getRecipes(){
        return axios.get('/recipes')
    },
    getRecipe(id){    
        return axios.get('/recipes/' + id)
    },
    createRecipe(recipe){
        return axios.post('/recipes', recipe)
    },
    updateRecipe(recipe){
        return axios.put('/recipes/' + recipe.id, recipe)
    }
}

export const AuthService = {
    createUser({username, displayName, email, password}){
        return axios.post('/auth/register', {username, displayName, email, password})
    },
    login({email, password}){
        return axios.post('/auth/login', {email, password})
    },
    getAccount(){
      return axios.get('/auth/account')
    }
}
