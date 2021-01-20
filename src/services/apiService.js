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

function trimEmpty (recipe) {
  recipe.ingredientGroups.forEach(group => {
    let trimedIngredients = []
    group.ingredients.forEach(ingredeient => {
      if (!ingredeient.name == "") {
        trimedIngredients.push(ingredeient)
      }
    })
    group.ingredients = trimedIngredients
  });
}

export const ImageService = {
  uploadImage(formData){
    return axios.post('/images', formData)
  }
}

export const RecipeService = {
    getRecipes(){
        return axios.get('/publish/recipes')
    },
    getRecipe(id){    
        return axios.get('/publish/recipes/' + id)
    },
    createRecipe(recipe){      
      trimEmpty(recipe)
      console.log(recipe)
      return axios.post('/publish/recipes', recipe)
    },
    updateRecipe(recipe){
        trimEmpty(recipe)
        return axios.put('/publish/recipes/' + recipe.id, recipe)
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
