import axios from "axios";
const ApiService = {

    init(){
        axios.defaults.baseURL = 'http://localhost:3000'
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
    createUser(credentials){
        return axios.post('/users', credentials)
    },
    login(credentials){
        return axios.post('/login', credentials)
    }
}
