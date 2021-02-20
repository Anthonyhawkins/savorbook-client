const recipes = {
  data: {
    success: true,
    message: "",
    data: [
      {
        id: 1,
        name: "Recipe One",
        image: "",
        description: "This is Recipe One",
        prepTime: "30 minutes",
        servings: "5-6",
        tags: ["cookies", "cream", "tomatoes"],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 4,
        name: "Roasted Peppers Stir Fry with Alfrado Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0182.jpg",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        prepTime: "",
        servings: "",
        tags: ["30min", "baking", "cooking", "deserts", "french", "picklining"],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 5,
        name: "Baked Potatoes Stew",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0220.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "",
        servings: "",
        tags: [
          "asain",
          "deserts",
          "glutenfree",
          "italian",
          "lowfat",
          "paleo",
          "quick",
          "spicey",
          "vegeterian"
        ],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 6,
        name: "Baked Tuna Rice with Alfrado Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0203.jpg",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        prepTime: "",
        servings: "",
        tags: [],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 7,
        name: "Buffalo Meatballs Pasta with Alfrado Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0222.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "",
        servings: "",
        tags: [
          "30min",
          "french",
          "indian",
          "paleo",
          "quick",
          "soup",
          "vegeterian"
        ],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 9,
        name: "Poached Leeks with Soy Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0201.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "",
        servings: "",
        tags: [],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 3,
        name: "Broiled Green Beans Pizza with Tomato Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0225.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "30min",
        servings: "5-6",
        tags: ["soup"],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 8,
        name: "Basic Potatoes with Alfrado Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0219.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "",
        servings: "",
        tags: [
          "cheap",
          "glutenfree",
          "italian",
          "lowfat",
          "mexican",
          "picklining",
          "slowcooker",
          "soup"
        ],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 10,
        name: "Fresh Leeks Stew with Soy Sauce",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0176.jpg",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        prepTime: "",
        servings: "",
        tags: [],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      },
      {
        id: 11,
        name: "Baked Tuna Stir Fry",
        image: "2b3704d5-c557-4969-863f-66744fbca5bc-r-0199.jpg",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
        prepTime: "",
        servings: "",
        tags: [
          "asain",
          "cooking",
          "glutenfree",
          "indian",
          "lowfat",
          "stew",
          "vegeterian"
        ],
        parentRecipes: [],
        dependentRecipes: [],
        ingredientGroups: [],
        steps: []
      }
    ],
    errors: null
  }
}

export default recipes
