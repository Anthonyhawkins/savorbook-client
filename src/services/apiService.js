import axios from "axios";
const ApiService = {
  init() {
    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.withCredentials = false;
  },
  setHeader(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default ApiService;

function trimEmpty(recipe) {
  //remove empty fields
  recipe.ingredientGroups.forEach(group => {
    let trimedIngredients = [];
    group.ingredients.forEach(ingredeient => {
      if (!ingredeient.name == "") {
        trimedIngredients.push(ingredeient);
      }
    });
    group.ingredients = trimedIngredients;
  });

  //remove original images
  recipe.steps.forEach(step => {
    let trimmedImages = [];
    step.images.forEach(image => {
      const trimmedStep = {
        src: image.src,
        text: image.text
      };
      trimmedImages.push(trimmedStep);
    });
    step.images = trimmedImages;
  });
}

export const ImageService = {
  uploadImage(formData) {
    return axios.post("/images", formData);
  }
};

export const RecipeService = {
  getTags() {
    return axios.get("/publish/recipes/tags");
  },
  getRecipes(page = 0, pageSize = 50, tags = [], name = "") {
    if (tags)
      return axios.get(
        `/publish/recipes?tags=${tags}&page=${page}&page_size=${pageSize}`
      );
    if (name)
      return axios.get(
        `/publish/recipes?name=${name}&page=${page}&page_size=${pageSize}`
      );
    return axios.get(`/publish/recipes?page=${page}&page_size=${pageSize}`);
  },
  getRecipe(id) {
    return axios.get("/publish/recipes/" + id);
  },
  createRecipe(recipe) {
    trimEmpty(recipe);
    console.log(recipe);

    return axios.post("/publish/recipes", { recipe });
  },
  updateRecipe(recipe) {
    trimEmpty(recipe);
    console.log(recipe);
    return axios.put("/publish/recipes/" + recipe.id, { recipe });
  }
};

export const AuthService = {
  createUser({ username, displayName, email, password }) {
    const payload = {
      registration: {
        username,
        displayName,
        email,
        password
      }
    };

    return axios.post("/auth/register", payload);
  },
  login({ email, password }) {
    return axios.post("/auth/login", { login: { email, password } });
  },
  getAccount() {
    return axios.get("/auth/account");
  }
};
