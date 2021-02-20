<template>
  <div class="mx-auto lg:w-4/5 max-w-screen-lg text-gray-600 my-3">
    <div
      class="flex flex-row p-2 bg-gray-50 mb-2 shadow rounded-lg justify-center space-x-3"
    >
      <router-link :to="{ name: 'RecipeEdit', params: { id: recipe.id } }">
        <div
          class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </router-link>
    </div>

    <div
      class="flex flex-col bg-gray-50 lg:flex-row h-full pt-4 shadow rounded-lg"
    >
      <div class="flex flex-col lg:w-2/6 px-10">
        <h2 class="text-xl uppercase mb-4 ml-12">Ingredients</h2>
        <h3 v-if="hasDependencies" class="font-medium ml-12 mb-2">Requires</h3>
        <div class="mb-4">
          <template
            v-for="dependentRecipe in recipe.dependentRecipes"
            :key="dependentRecipe.id"
          >
            <router-link
              :to="{ name: 'RecipeShow', params: { id: dependentRecipe.id } }"
            >
              <div
                data-testid="dependent-recipe"
                @click="navigate"
                class="flex flex-col text-sm rounded-md shadow-sm bg-rose-500 text-white hover:bg-rose-600 font-serif px-3 py-1 mb-1 ml-12 justify-between"
              >
                <div class="flex justify-center">
                  <span class="font-medium w-3 text-right">{{
                    dependentRecipe.qty
                  }}</span>
                  <span v-if="dependentRecipe.qty > 1" class="mx-2"
                    >batches of</span
                  >
                  <span v-else class="mx-2 mr-6">batch of</span>
                </div>

                <div class="flex justify-center">
                  <span class="text-center font-medium">{{
                    dependentRecipe.name
                  }}</span>
                </div>
              </div>
            </router-link>
          </template>
        </div>

        <template v-for="group in recipe.ingredientGroups" :key="group">
          <h3 data-testid="ingredient-group-name" class="ml-12 font-medium">
            {{ group.groupName }}
          </h3>
          <ul class="font-serif mb-3">
            <li
              data-testid="ingredient"
              class="mt-2 step-focus"
              tabindex="0"
              v-for="item in group.ingredients"
              :key="item"
            >
              <div class="flex flex-row">
                <div class=" flex w-12  pr-2">
                  <p class="block w-full text-right">{{ item.qty }}</p>
                </div>
                <div class="flex">{{ item.unit }} {{ item.name }}</div>
              </div>
            </li>
          </ul>
        </template>
      </div>
      <div class="flex flex-col lg:w-4/6 px-10 lg:pr-10 pb-4">
        <div class="flex font-medium text-sm mb-2">
          <p data-testid="recipe-prep-servings">
            Cooking Time {{ recipe.prepTime }} | {{ recipe.servings }} Servings
          </p>
        </div>

        <h1
          data-testid="recipe-title"
          class="text-rose-500 uppercase font-medium text-2xl mb-2"
        >
          {{ recipe.name }}
        </h1>
        <div class="flex flex-row flex-wrap justify-right mb-4">
          <div
            data-testid="recipe-tag"
            class="tag"
            v-for="tag in recipe.tags"
            :key="tag"
          >
            #{{ tag }}
          </div>
        </div>
        <img
          data-testid="recipe-photo"
          class="rounded-sm shadow-md"
          :src="recipeImage"
          alt=""
        />

        <p
          data-testid="recipe-description"
          class="my-4 has-dropcap text-justify"
        >
          {{ recipe.description }}
        </p>
        <h1 class="text-rose-500 text-xl mb-4">Steps</h1>

        <template v-for="(step, index) in recipe.steps" :key="step">
          <div class="relative">
            <template v-if="step.type === 'text'">
              <div
                data-testid="text-steps"
                :tabindex="index"
                class="step-focus"
              >
                <div class="step-number step w-10">
                  <p class="text-right">{{ stepMap[step.id] }}</p>
                </div>
                <p class="mb-3 text-justify">{{ step.text }}</p>
              </div>
            </template>

            <p
              v-if="step.type === 'tipText'"
              data-testid="tip-step"
              :tabindex="index"
              class="tip-pane"
            >
              {{ step.text }}
            </p>

            <template v-if="step.type === 'imageLeft'">
              <div
                :tabindex="index"
                data-testid="image-left"
                class="flex step-focus my-12"
              >
                <img
                  class="object-contain w-1/2 float-left rounded-sm shadow-md  mr-3"
                  :src="genImageLink(step.images[0].src)"
                  alt=""
                />
                <p
                  v-if="step.images[0].text"
                  class="py-3 border-b border-t border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                >
                  {{ step.images[0].text }}
                </p>
              </div>
            </template>

            <template v-if="step.type === 'imageRight'">
              <div
                :tabindex="index"
                data-testid="image-right"
                class="flex step-focus my-12 justify-end"
              >
                <p
                  v-if="step.images[0].text"
                  class="py-3 border-b border-t border-rose-500 text-right font-medium text-xs text-rose-500  place-self-center"
                >
                  {{ step.images[0].text }}
                </p>
                <img
                  class="object-contain w-1/2 float-right rounded-sm shadow-md ml-3"
                  :src="genImageLink(step.images[0].src)"
                  alt=""
                />
              </div>
            </template>

            <template v-if="step.type === 'imageDouble'">
              <div
                :tabindex="index"
                data-testid="image-double"
                class="flex flex-row space-x-2 step-focus   my-12"
              >
                <div class="flex flex-col w-1/2">
                  <img
                    class="object-contain rounded-sm shadow-md mb-1"
                    :src="genImageLink(step.images[0].src)"
                    alt=""
                  />
                  <p
                    v-if="step.images[0].text"
                    class="h-full w-full py-3 border-b border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                  >
                    {{ step.images[0].text }}
                  </p>
                </div>
                <div class="flex flex-col w-1/2">
                  <img
                    class="object-contain rounded-sm shadow-md mb-1"
                    :src="genImageLink(step.images[1].src)"
                    alt=""
                  />
                  <p
                    v-if="step.images[1].text"
                    class="h-full w-full py-3 border-b border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                  >
                    {{ step.images[1].text }}
                  </p>
                </div>
              </div>
            </template>

            <template v-if="step.type === 'imageTriple'">
              <div
                :tabindex="index"
                data-testid="image-triple"
                class="flex flex-row space-x-2 step-focus   my-12"
              >
                <div class="flex flex-col w-1/3">
                  <img
                    class="object-contain rounded-sm shadow-md mb-1"
                    :src="genImageLink(step.images[0].src)"
                    alt=""
                  />
                  <p
                    v-if="step.images[0].text"
                    class="h-full w-full py-3 border-b border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                  >
                    {{ step.images[0].text }}
                  </p>
                </div>
                <div class="flex flex-col w-1/3">
                  <img
                    class="object-contain rounded-sm shadow-md mb-1"
                    :src="genImageLink(step.images[1].src)"
                    alt=""
                  />
                  <p
                    v-if="step.images[1].text"
                    class="h-full w-full py-3 border-b border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                  >
                    {{ step.images[1].text }}
                  </p>
                </div>
                <div class="flex flex-col w-1/3">
                  <img
                    class="object-contain rounded-sm shadow-md mb-1"
                    :src="genImageLink(step.images[2].src)"
                    alt=""
                  />
                  <p
                    v-if="step.images[2].text"
                    class="h-full w-full py-3 border-b border-rose-500 font-medium text-xs text-rose-500 place-self-center"
                  >
                    {{ step.images[2].text }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </template>

        <template
          v-for="parentRecipe in recipe.parentRecipes"
          :key="parentRecipe.id"
        >
          <router-link
            :to="{ name: 'RecipeShow', params: { id: parentRecipe.id } }"
          >
            <div
              @click="navigate"
              class="flex flex-col text-sm rounded-md bg-gray-50 text-gray-400 hover:bg-rose-300 hover:text-white font-serif px-3 py-1 mb-1 justify-between"
            >
              <div class="flex justify-center">
                <p>
                  Required to make:
                  <span class="text-center font-bold">{{
                    parentRecipe.name
                  }}</span>
                </p>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { StorageBaseURL, StorageFolder } from "@/services/cloudStorage.js"
import { mapGetters } from "vuex"
import store from "@/store"
export default {
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch("getRecipe", to.params.id)]).then(() => {
      next()
    })
  },
  beforeRouteUpdate(to, from, next) {
    Promise.all([store.dispatch("getRecipe", to.params.id)]).then(() => {
      next()
    })
  },
  methods: {
    genImageLink(src) {
      if (src) {
        return "https://" + StorageBaseURL + StorageFolder + src
      }
      return ""
    }
  },
  computed: {
    ...mapGetters(["recipe"]),
    recipeImage() {
      return this.genImageLink(this.recipe.image)
    },
    stepMap() {
      let stepMap = {}
      let stepNum = 1
      this.recipe.steps.forEach(step => {
        if (step.type === "text") {
          stepMap[step.id] = stepNum
          stepNum++
        }
      })
      return stepMap
    },
    hasDependencies() {
      if (this.recipe.dependentRecipes.length > 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="postcss" scoped>
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  float: left;
  font-size: 6rem;
  line-height: 0.65;
  margin: 0.1em 0.1em 0.2em 0;
  @apply text-rose-500;
}

.step {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  float: left;
  font-size: 1.5rem;
  line-height: 0.95;
  margin: 0.2em 0.2em 0.2em 0;
  @apply text-rose-500;
}

.step-focus:focus {
  @apply bg-rose-100 border-0 outline-none;
}

.tip-pane {
  @apply step-focus my-6  py-2 border-b-2 border-t-2 border-rose-500 font-medium;
}

.step-number {
  position: absolute;
  top: 0px;
  left: -50px;
}

.tag {
  @apply mr-1 mb-1 rounded-sm  px-1 text-rose-500 text-sm font-medium;
}
</style>
