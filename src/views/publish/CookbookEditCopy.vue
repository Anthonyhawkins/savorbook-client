<template>
  <div class="flex flex-row h-screen">
    <div class="flex flex-col flex-shrink-0 h-full w-80 bg-white p-2 space-y-2 z-0 shadow-lg">
      <h2 class="font-medium text-rose-500">Recipe Box</h2>

      <input
        type="text"
        class="h-12 outline-none border-b border-rose-500"
        placeholder="search..."
      />

      <div class="flex flex-col border-gray-200 border border-b-2 shadow-sm p-2 rounded">
        <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
        <div class="flex flex-wrap">
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Pasta</div>
          <div class="tag">#Weekday</div>
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Weekday</div>
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Pasta</div>
          <div class="tag">#Weekday</div>
        </div>
      </div>
      <div class="flex flex-col border-gray-100 border shadow-sm p-2">
        <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
        <div class="flex flex-wrap">
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Pasta</div>
        </div>
      </div>
      <div class="flex flex-col border-gray-100 border shadow-sm p-2">
        <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
        <div class="flex flex-wrap">
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Pasta</div>
        </div>
      </div>
      <div class="flex flex-col border-gray-100 border shadow-sm p-2">
        <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
        <div class="flex flex-wrap">
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Pasta</div>
        </div>
      </div>
      <div class="flex flex-col border-gray-100 border shadow-sm p-2">
        <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
        <div class="flex flex-wrap">
          <div class="tag">#Italian</div>
          <div class="tag">#Veg</div>
          <div class="tag">#Quick</div>
          <div class="tag">#Pasta</div>
        </div>
      </div>

      <div
        class="flex flex-col border-gray-100 border rounded-md shadow-sm p-2 hover:shadow-lg"
      >
        Spegheti and Meatballs with roasted red pepper
      </div>

    </div>




<!--     <div class="flex flex-col flex-shrink-0 w-80 bg-red-200">
      CookBook Info
    </div>
    <div class="flex flex-col flex-shrink-0 w-80 bg-red-200">
      Outline
    </div>
    <div class="flex flex-col flex-shrink-0 w-80 bg-red-200">
      Style
    </div> -->
    <div class="flex flex-col w-full bg-blue-gray-500 p-2 space-y-4 overflow-x-scroll">
      <div class="flex">
        <h2 class="font-medium text-white">Sections</h2>
      </div>
      <div class="flex flex-row space-x-5">
        <div class="flex flex-col flex-shrink-0 w-80 h-full shadow-sm p-2 rounded-sm bg-gray-100 space-y-2">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-rose-500">Soups</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-shrink-0 w-80 h-full shadow-sm p-2 rounded-sm bg-gray-100 space-y-2">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-rose-500">Soups</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-shrink-0 w-80 h-full shadow-sm p-2 rounded-sm bg-gray-100 space-y-2">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-rose-500">Soups</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
        </div>   
        <div class="flex flex-col flex-shrink-0 w-80 h-full shadow-sm p-2 rounded-sm bg-gray-100 space-y-2">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-rose-500">Soups</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
        </div>                     
        <div class="flex flex-col flex-shrink-0 w-80 h-full shadow-sm p-2 rounded-sm bg-gray-100 space-y-2">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-rose-500">Soups</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
          <div class="flex flex-col border-gray-100 border shadow-sm p-2 bg-white">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Weekday</div>
              <div class="tag">#Italian</div>
              <div class="tag">#Veg</div>
              <div class="tag">#Quick</div>
              <div class="tag">#Pasta</div>
              <div class="tag">#Weekday</div>
            </div>
          </div>
        </div>


        <div class="flex flex-col flex-shrink-0 w-80 h-80 shadow-sm p-2 rounded-sm bg-amber-400 space-y-2 fixed absolute bottom-10 right-10">
          <div class="flex flex-row justify-between">
            <h2 class="font-medium text-white">Clip Board</h2>
            <div class="text-lg font-bold">...</div>
          </div>
          <div class="flex flex-col shadow-sm p-2 bg-amber-50 rounded">
            <div class="flex">Spegheti and Meatballs with roasted red pepper</div>
            <div class="flex flex-wrap">
            </div>
          </div>
          <div class="flex flex-col shadow-sm p-2 bg-amber-50 rounded">
            <div class="flex">Roasted Butternut Soup</div>
            <div class="flex flex-wrap">
            </div>
          </div>
          <div class="flex flex-col shadow-sm p-2 bg-amber-50 rounded">
            <div class="flex">Beer and Leek Soup</div>
            <div class="flex flex-wrap">
            </div>
          </div>
          <div class="flex flex-col text-white">
            <p>Use the clipboard to hold onto recipes you are considering but don't yet have a place in the cookbook.</p>
          </div>
        </div>
        

        <div class="flex flex-col flex-shrink-0 w-80  h-28 bg-gray-200 p-2 rounded-sm hover:bg-gray-100">
          <h2 class="font-medium text-gray-500">New Section +</h2>
          <p class="text-gray-500">
            Creat sections to organize recipes and guides. Examples are
            Appatizers, Soupes, Salads, etc.
          </p>
        </div>
        <!-- This div is used as a spacer as padding or margin seem not to work on the right edge -->
        <div class="flex flex-col flex-shrink-0 w-5">
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "CookbookEdit"
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply mr-1 mb-1 rounded-sm  px-1  hover:bg-rose-500 hover:text-white text-rose-500 text-sm font-medium cursor-pointer;
}
</style> 