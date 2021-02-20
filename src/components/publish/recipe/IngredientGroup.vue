<template>
  <ul class="pl-6 list-disc space-y-2 text-red-500 pb-2 mb-2">
    <li class="flex-row border-b border-gray-200 space-x-6 list-none">
      <input
        type="text"
        name="group-name"
        class="ingredient-sub w-full"
        placeholder="Group Name - 'For the Glaze'"
        v-model="groupName"
        @blur="saveGroup(groupIndex)"
      />
    </li>

    <template
      v-for="ingredient in ingredientGroup.ingredients"
      :key="ingredient.id"
    >
      <IngredientGroupItem
        data-testid="ingredient-group-item"
        v-model:ingredientName="ingredient.name"
        v-model:ingredientQty="ingredient.qty"
        v-model:ingredientUnit="ingredient.unit"
        @blur="adjustIngredients(ingredient)"
        @out-of-focus="saveGroup(groupIndex)"
        @keydown.enter="adjustIngredients(ingredient)"
      />
    </template>
  </ul>
</template>

<script>
import IngredientGroupItem from "@/components/publish/recipe/IngredientGroupItem.vue"

export default {
  name: "IngredientGroup",
  components: {
    IngredientGroupItem
  },
  props: {
    groupIndex: {
      type: [Number],
      required: true
    },
    ingredientGroup: {
      type: [Object],
      required: true
    }
  },
  data() {
    return {
      groupName: this.ingredientGroup.groupName,
      ingredients: this.ingredientGroup.ingredients
    }
  },
  mounted() {
    this.ensureAtLeastOne()
    this.newFieldifFull()
  },
  methods: {
    /**
     * Save this groups data to the recipe's state
     * executed when any field within the group is
     * no longer in focus
     */
    saveGroup(index) {
      const payload = {
        index,
        groupName: this.groupName,
        ingredients: this.ingredients
      }

      this.$store.dispatch("setIngredientGroup", payload)
    },
    /**
     * When the Name field of an ingredient is no longer in focus
     * determine if there should be more input rows added or
     * subtracted.  Offer a new row when the initial 3 rows
     * are filled, and leave at least one new row if no
     * ingredients exist.
     */
    adjustIngredients(ingredient) {
      //remove if empty field and clicked out of
      if (!ingredient.name) {
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1)
      }
      this.newFieldifFull()
      this.ensureAtLeastOne()
    },
    newFieldifFull() {
      // if all ingredients have names, provide new input set
      let allNamed = true
      this.ingredients.forEach(function(ingredient) {
        if (!ingredient.name) allNamed = false
      })
      if (allNamed) this.ingredients.push({ name: "", qty: "", unit: "" })
    },
    ensureAtLeastOne() {
      // if list is zero, ensure there's an input set
      if (!this.ingredients.length) {
        this.ingredients.push({ name: "", qty: "", unit: "" })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.ingredient-sub {
  @apply h-8 focus:outline-none focus:ring text-red-500 pl-3;
}
</style>
