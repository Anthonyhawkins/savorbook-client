<template>
  <div class="flex flex-row">
    <div class="container mx-auto md:px-4">
      <div
        class="grid grid-flow-row grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 p-4"
      >
        <router-link :to="{ name: 'RecipeList' }">
          <div class="publish-card">
            <div class="flex justify-center">
              <svg
                class="text-rose-500 h-16 w-16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div class="publish-card-label">
              Recipes
            </div>
            <div class="publish-card-text">
              Recipes are the building blocks of a cookbook. Create a recipe and
              include it within a cookbook.
            </div>
          </div>
        </router-link>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-yellow-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Guides
          </div>
          <div class="publish-card-text">
            Write a guide or explain a technique, and include it within a
            cookbook.
          </div>
        </div>

        <router-link :to="{ name: 'CookbookList' }">
          <div class="publish-card">
            <div class="flex justify-center">
              <svg
                class="text-teal-500 h-16 w-16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div class="publish-card-label">
              Cookbooks
            </div>
            <div class="publish-card-text">
              A cookbook is a collection of recipes and which can tell a culinary
              story or share a common theme.
            </div>
          </div>
        </router-link>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-violet-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Author Profile
          </div>
          <div class="publish-card-text">
            Manage Author Profile
          </div>
        </div>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-cyan-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Analyze
          </div>
          <div class="publish-card-text">
            See how your cookbooks and recipes are performing with readers.
          </div>
        </div>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-amber-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Contributors
          </div>
          <div class="publish-card-text">
            Control who can view and edit cookbooks and recipes.
          </div>
        </div>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-light-blue-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Feedback
          </div>
          <div class="publish-card-text">
            View feedback from readers and answer questions.
          </div>
        </div>

        <div class="publish-card-inactive">
          <div class="flex justify-center">
            <svg
              class="text-lime-500 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="publish-card-label">
            Pricing
          </div>
          <div class="publish-card-text">
            Mange Pricing for Cookbooks and content.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.publish-card {
  @apply bg-white p-4 m-1 shadow rounded-md flex flex-col justify-start hover:shadow-lg text-cool-gray-500;
}

.publish-card-inactive {
  @apply bg-gray-200 p-4 m-1 rounded-md flex flex-col justify-start text-cool-gray-500;
}

.publish-card-label {
  @apply flex justify-center uppercase font-medium text-2xl;
}

.publish-card-text {
  @apply flex justify-center text-center h-24 mt-4;
}
</style>
