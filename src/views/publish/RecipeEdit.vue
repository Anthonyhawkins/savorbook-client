<template>
    <div class="flex flex-col"> 
        <form @submit.prevent>
            <div class="flex flex-row h-12 bg-white m-2">        
                <RecipeTitleBar v-model="recipe.name"/>
                <RecipeToolBar @save-recipe="saveRecipe()"/>
            </div>
            <div class="flex flex-row justify-end mx-2 mb-2">
                <div class="flex flex-col bg-white w-2/3 p-5">

                    <label for="description" class="this-label">Photo</label>
                    <RecipePhoto/>
                    <label for="description" class="this-label">Description</label>
                    <RecipeDescription v-model="recipe.description"/>
                    <IngredientsToolBar/>

                    <div class="flex flex-col">
                        <template
                        v-for="(group, index) in recipe.ingredientGroups" 
                        :key="group.id" 
                        >
                            <IngredientGroup
                            :groupIndex="index" 
                            :ingredientGroup="group"
                            />
                        </template>
                    </div>

                    <div 
                    class="flex flex-col"
                    >
                        <label for="description" class="this-label">Steps</label>

                        <template 
                        v-for="(step, index) in recipe.steps"
                        >
                            <StepText
                            v-if="step.type === 'text'"
                            :stepIndex="index"
                            :content="step.content"
                             :key="index + step.content.text"
                            draggable="true"
                            @dragstart="pickupStep($event, index)"
                            @dragover.prevent
                            @dragenter.prevent
                            @drop="moveStep($event, index)"
                            />
                            <StepTip
                            v-if="step.type === 'tipText'"
                            :stepIndex="index"
                            :content="step.content"
                            :key="index + step.content.text"
                            draggable="true"
                            @dragstart="pickupStep($event, index)"
                            @dragover.prevent
                            @dragenter.prevent
                            @drop="moveStep($event, index)"
                            />
                        </template>
                        <StepHint/> 
                    </div>
                </div>
                <StepTemplates/>
            </div>
        </form>
    </div>
</template>

<script>
import store from "@/store"
import { mapGetters } from "vuex";
import { RecipeService } from "@/services/apiService.js"

import RecipeTitleBar from "@/components/publish/recipe/RecipeTitleBar.vue";
import RecipeToolBar from "@/components/publish/recipe/RecipeToolBar.vue";
import RecipePhoto from "@/components/publish/recipe/RecipePhoto.vue"
import RecipeDescription from "@/components/publish/recipe/RecipeDescription.vue";

import IngredientsToolBar from "@/components/publish/recipe/IngredientsToolBar.vue";
import IngredientGroup from "@/components/publish/recipe/IngredientGroup.vue";

import StepTemplates from "@/components/publish/recipe/StepTemplates.vue";
import StepHint from "@/components/publish/recipe/steps/StepHint.vue";
import StepText from "@/components/publish/recipe/steps/StepText.vue";
import StepTip from "@/components/publish/recipe/steps/StepTip.vue";

export default {
    components: {
        RecipeTitleBar,
        RecipeToolBar,
        RecipeDescription,
        IngredientsToolBar,
        IngredientGroup,
        StepTemplates,
        RecipePhoto,
        StepHint,
        StepText,
        StepTip

    },
    beforeRouteEnter(to, from, next) {
        console.log(to.name)
        if (to.name === 'RecipeEdit') {
            Promise.all([
                store.dispatch('getRecipe', to.params.id)
            ]).then(() => {
                next();
            });
        } else {
            store.dispatch('resetRecipe')
            next();
        }

        

    },
    computed: {
        ...mapGetters(["recipe"]),
        actionType(){
            if (this.$route.name === "RecipeEdit") {
                return "update"
            }
            return "create"
        },


    },
    methods: {
        saveRecipe () {
            console.log(this.actionType)
            if (this.actionType === "create") {
                RecipeService.createRecipe(this.recipe)
            } else {
                RecipeService.updateRecipe(this.recipe)
            }
        },
        pickupStep(e, index){
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'
            e.dataTransfer.setData('from-step-index', index)
        },
        moveStep(e, toStepIndex){
            const fromStepIndex = e.dataTransfer.getData('from-step-index')
            this.$store.dispatch('moveStep', {
                fromStepIndex,
                toStepIndex
                })
        }
    } 
}
</script>

<style lang="postcss" scoped>

.this-label {
    @apply font-medium text-red-500 mb-2 mt-5;
}


</style>