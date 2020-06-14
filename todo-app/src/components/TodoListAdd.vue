<template>
    <div class="add-todo">                        
        <input @keyup.enter="addTodo" v-model="newTodoTitle" type="text" id="new-todo" placeholder="할 일 추가">                        
        <button @click="addTodo" v-show="showAddBtn" class="todo-item-btn">추가</button>
        <i class="add-icon material-icons">add</i>                        
    </div>
</template>

<script>
export default {
    computed: {
        showAddBtn() {
            return this.newTodoTitle.length > 0;
        }
    },
    data() {
        return {
            newTodoTitle: ''
        }
    },
    methods: {
        addTodo() {                       
            this.$emit('add-todo', this.newTodoTitle);
            this.newTodoTitle = '';
        }
    }
}
</script>

<style scoped>
#new-todo {
    border: none;
    height: 36px;
    outline: none;
    width: 100%;
    padding-left: 12px;    
    order: 2;
}

#new-todo::placeholder {
    color: #4a5ea3;
    transition: color .2s;
}

.add-todo  {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 52px; 
    padding: 8px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 2px 12px rgba(0,0,0,.04);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.add-icon {
    font-size: 20px !important;
    margin-left: 4px;  
    color: #4a5ea3;
    transition: color .2s;
    order: 3;
}

#new-todo:active::placeholder,
#new-todo:focus::placeholder,
#new-todo:focus ~ .add-icon,
#new-todo:active ~ .add-icon {
    color: #212121;
}

.todo-item-btn {
    width: 32px;
    height: 32px;       
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background .2s;
    outline: none;
    order: 1;
    color: #4a5ea3;
    background: none;
    word-break: keep-all;
    padding: 0;
}

.todo-item-btn:hover {
    text-decoration: underline;
}
</style>