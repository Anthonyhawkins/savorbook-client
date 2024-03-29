import axios from "axios"
const ApiService = {
  init() {
    axios.defaults.baseURL = "http://localhost:3000/api"
    axios.defaults.withCredentials = false
  },
  setHeader(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}

export default ApiService

function trimEmpty(recipe) {
  //remove empty fields
  recipe.ingredientGroups.forEach(group => {
    let trimedIngredients = []
    group.ingredients.forEach(ingredeient => {
      if (!ingredeient.name == "") {
        trimedIngredients.push(ingredeient)
      }
    })
    group.ingredients = trimedIngredients
  })

  //remove original images
  recipe.steps.forEach(step => {
    let trimmedImages = []
    step.images.forEach(image => {
      const trimmedStep = {
        src: image.src,
        text: image.text
      }
      trimmedImages.push(trimmedStep)
    })
    step.images = trimmedImages
  })
}

/**
 * IMAGES
 */
export const ImageService = {
  uploadImage(formData) {
    return axios.post("/images", formData)
  }
}

/**
 * COOKBOOKS
 */
export const CookbookService = {
  getCookbook(id) {
    return axios.get("/publish/cookbooks/" + id)
  },
  getCookbooks(page = 0, pageSize = 50, tags = [], name = "") {
    if (tags.length > 0)
      return axios.get(
        `/publish/cookbooks?tags=${tags}&page=${page}&page_size=${pageSize}`
      )
    if (name)
      return axios.get(
        `/publish/cookbooks?name=${name}&page=${page}&page_size=${pageSize}`
      )
    return axios.get(`/publish/cookbooks?page=${page}&page_size=${pageSize}`)
  },
  CreateCookbook(title) {
    // eslint-disable-next-line prettier/prettier
    return axios.post("/publish/cookbooks", { cookbook: {title} })
  },
  UpdateCookbook(cookbook) {
    let cookbookCopy = JSON.parse(JSON.stringify(cookbook))
    console.log(cookbookCopy)
    cookbookCopy.sections.forEach(section => {
      let recipeIds = []
      section.recipes.forEach(recipe => {
        recipeIds.push(recipe.id)
      })
      section.recipes = recipeIds
    })

    // eslint-disable-next-line prettier/prettier
    return axios.put("/publish/cookbooks/" + cookbookCopy.id, { cookbook: cookbookCopy })
  },
  getSectionRecipes(sectionID) {
    return axios.get("/publish/sections/" + sectionID + "/recipes")
  }
}

/**
 * RECIPES
 */
export const RecipeService = {
  getTags() {
    return axios.get("/publish/recipes/tags")
  },
  //TODO - rework this function to make better use of destructuing.
  getRecipes(page = 0, pageSize = 50, tags = [], name = "") {
    if (tags.length > 0)
      return axios.get(
        `/publish/recipes?tags=${tags}&page=${page}&page_size=${pageSize}`
      )
    if (name)
      return axios.get(
        `/publish/recipes?name=${name}&page=${page}&page_size=${pageSize}`
      )
    return axios.get(`/publish/recipes?page=${page}&page_size=${pageSize}`)
  },
  getRecipe(id) {
    return axios.get("/publish/recipes/" + id)
  },
  createRecipe(recipe) {
    trimEmpty(recipe)
    return axios.post("/publish/recipes", { recipe })
  },
  updateRecipe(recipe) {
    trimEmpty(recipe)
    return axios.put("/publish/recipes/" + recipe.id, { recipe })
  }
}

/**
 * AUTHENTICATION
 */
export const AuthService = {
  createUser({ username, displayName, email, password }) {
    const payload = {
      registration: {
        username,
        displayName,
        email,
        password
      }
    }

    return axios.post("/auth/register", payload)
  },
  updateUser({ username, displayName, email, password }) {
    const payload = {
      user: {
        username,
        displayName,
        email,
        password
      }
    }
    return axios.put("/auth/account", payload)
  },
  updatePassword(password) {
    const payload = {
      password: { password }
    }
    console.log(payload)
    return axios.put("/auth/account/password", payload)
  },
  login({ email, password }) {
    return axios.post("/auth/login", { login: { email, password } })
  },
  getAccount() {
    return axios.get("/auth/account")
  }
}
