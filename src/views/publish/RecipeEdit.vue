<template>
    <div class="flex flex-col"> 
        <form @submit.prevent>
            <div class="flex flex-row h-12 bg-white m-2">        
                <TitleBar v-model="recipe.name"/>
                <ToolBar @save-recipe="saveRecipe()"/>
            </div>
            <div class="flex flex-row justify-end mx-2 mb-2">
                <div class="flex flex-col bg-white w-2/3 p-5">

                    <label for="description" class="this-label">Photo</label>
                    <MainPhoto/>
                    <label for="description" class="this-label">Description</label>
                    <DescriptionBox v-model="recipe.description"/>
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
                            <TextStep
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
                            <TipStep
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

import TitleBar from "@/components/publish/TitleBar.vue";
import ToolBar from "@/components/publish/ToolBar.vue";
import MainPhoto from "@/components/publish/MainPhoto.vue"
import DescriptionBox from "@/components/publish/DescriptionBox.vue";

import IngredientsToolBar from "@/components/publish/IngredientsToolBar.vue";
import IngredientGroup from "@/components/publish/IngredientGroup.vue";
import StepTemplates from "@/components/publish/StepTemplates.vue";

import StepHint from "@/components/publish/steps/StepHint.vue";
import TextStep from "@/components/publish/steps/TextStep.vue";
import TipStep from "@/components/publish/steps/TipStep.vue";

export default {
    components: {
        TitleBar,
        ToolBar,
        DescriptionBox,
        IngredientsToolBar,
        IngredientGroup,
        StepTemplates,
        MainPhoto,
        StepHint,
        TextStep,
        TipStep

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
            next();
        }

        

    },
    computed: {
        actionType(){
            if (this.$route.name === "RecipeEdit") {
                return "update"
            }
            return "create"
        },
        ...mapGetters(["recipe"])

    },
    methods: {
        saveRecipe () {
            console.log(this.actionType)
            this.$store.dispatch('createRecipe', this.actionType)
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