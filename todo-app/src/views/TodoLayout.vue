<template>
  <div id="layout-container">
    <layout-header></layout-header>
    <div class="flex-container layout-base">
      <category-navigation :current-category="currentCategory" @set-category="setCurrentCategory"></category-navigation>
      <todo-list :current-category="currentCategory"></todo-list>      
    </div>
  </div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader';
import CategoryNavigation from '@/components/CategoryNavigation';
import TodoList from '@/components/TodoList';

export default {
  components: {
    LayoutHeader,
    CategoryNavigation,
    TodoList
  },
  data() {
    return {
      currentCategory: null,
    }
  },
  methods: {
    setCurrentCategory(e) {
      this.currentCategory = e;
    }
  }
}
</script>

<style scoped>
#layout-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.layout-base {
    height: calc(100% - 50px);
}
</style>