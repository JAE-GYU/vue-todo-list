<template>
  <section id="todo-list__container">
    <div class="todo-list__title" v-if="currentCategory">{{ currentCategory.name }}</div>
    <div class="todo-list__wrap">
        <todo-list-add @add-todo="addTodoData"></todo-list-add>
        <todo-list-item 
            v-for="item in todoList" 
            :key="item.id"
            :todoId="item.id"
            :title="item.title"
            :complete="item.complete"
            @set-checked="setChecked"
            @update-todo="updateTodoData"
            @delete-todo="deleteTodoData">
        </todo-list-item>                         
    </div>
</section>
</template>

<script>
import { addTodo, getTodoList, updateTodo, deleteTodo } from '@/api/api';
import Utils from '@/utils/utils';

import TodoListAdd from '@/components/TodoListAdd';
import TodoListItem from '@/components/TodoListItem';

export default {
    props: {
        currentCategory: {
            type: Object
        }
    },
    components: {
        TodoListItem,
        TodoListAdd
    },
    watch: {
        'currentCategory.id'() {                        
            const param = !this.currentCategory || this.currentCategory.id === 'all' ? {}
            : {params: {categoryId: this.currentCategory.id}}
            getTodoList(param)
            .then(res => {
                this.todoList = res.data;
            })
        }
    },
    data() {
        return {
            todoList: [],
        }
    },
    methods: {
        addTodoData(todoTitle) {
            const newData = {
                categoryId: this.currentCategory.id,
                title: todoTitle,
                complete: ''
            }

            addTodo(newData)
            .then(res => {
                this.todoList = [
                    {...res.data},
                    ...this.todoList
                ]
            })
        },
        setChecked(data) {
            const findItem = this.todoList.find(x => x.id === data.id);
            const completeDate = data.value ? Utils.getFormattedNow() : '';
            const updateData = {
                ...findItem,
                complete: completeDate
            };

            updateTodo(updateData)
            .then(() => {
                findItem.complete = completeDate;
            })
        },
        updateTodoData(data) {
            const findItem = this.todoList.find(x => x.id === data.id);
            const updateData = {
                ...findItem,
                title: data.value
            };
            console.log(updateData)
            updateTodo(updateData)
            .then(() => {
                findItem.title = data.value;
            }).catch(err => {
                console.log(err);
            })
        },
        deleteTodoData(id) {
            deleteTodo(id)
            .then(() => {                
                this.todoList = this.todoList.filter(x => x.id != id);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
/* todo list */
#todo-list__container {
    flex: 1;
    padding: 0 16px;
    background: #f7fafc;
    overflow: auto;
}

.todo-list__title {
    font-size: 24px;
    color: 101010;
    margin: 16px 0;
}
</style>