import axios from 'axios'

export default {
  getRecipes() {
    // move this somewhere 
    const apiClient = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log("When Am I called")
    return apiClient.get('/recipes')
  }
}