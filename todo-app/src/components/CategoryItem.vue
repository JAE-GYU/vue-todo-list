<template>
  <li
    class="nav-categories__item" 
    :class="{'selected' : currentCategory.id ===  categoryId}"
    @click="handleClick">
    <span>{{ categoryName }}</span>
    <i v-if="removable" @click="deleteCategory($event, categoryId)" class="remove-icon material-icons">remove_circle_outline</i>
  </li>
</template>

<script>
export default {
    props: {
        currentCategory: {
            required: true,
            type: Object
        },
        categoryId: {
            required: true,
            type: [Number, String]
        },
        categoryName: {
            required: true,
            type: String
        },
        removable: {
            required: false,
            type: Boolean,
            default: true,
        }
    },
    methods: {
        handleClick(ev) {
            this.$emit('click', ev);
        },
        deleteCategory(ev, categoryId) {
            this.$emit('delete-category', categoryId);
        }
    } 
}
</script>

<style scoped>
.nav-categories__item {
    list-style: none;
    height: 36px;    
    padding: 0 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

.remove-icon {
    font-size: 14px;
    vertical-align: middle;
    color: #717171;
    margin-left: auto;
    display: none;
    cursor: pointer;
}

.nav-categories__item span {
    line-height: 1.2;    
    color: #717171;
    text-decoration: none;  
    transition: background .2s;    
    cursor: pointer;
}

.nav-categories__item:hover span {
    color: #101010;
}

.nav-categories__item:hover .remove-icon {
    color: #101010;
    display: block;
}

.nav-categories__item.selected {
    background: #edf2f7;    
}

.nav-categories__item.selected span {
    color: #101010;
}
</style>