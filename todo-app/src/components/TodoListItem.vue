<template>
    <div class="todo-item">
        <div class="todo-checkbox">
            <input
                class="todo-checkbox__input"
                :id="`todo-check${todoId}`"
                type="checkbox"
                v-model="isChecked"                         
            />
            <label class="todo-checkbox__label" :for="`todo-check${todoId}`">
                <span class="todo-checkbox__inner">
                <i class="material-icons">check</i>
                </span>                              
            </label>                            
        </div>       
        <span 
            v-show="!isEdit" 
            class="todo-item__title"
            :style="titleStyle">{{ title }}</span>
        <input 
            class="todo-item__title" 
            v-model="editVal"
            v-show="isEdit"
            @keyup.enter="saveEdit"
            :style="titleStyle">
        <div class="todo-item-btn__wrap">
            <button v-show="!isEdit" @click="editTodo" class="todo-item-btn edit">편집</button>
            <button v-show="isEdit" @click="saveEdit" class="todo-item-btn edit">저장</button>
            <button @click="deleteTodo" class="todo-item-btn remove">삭제</button>
        </div>       
    </div>
</template>

<script>
export default {
    props: {
        todoId: {
            required: true,
            type: Number,
        },
        title: {
            required: true,
            type: String
        },
        complete: {
            required: false,
            type: String
        }
    },
    data() {
        return {
            isEdit: false,
            editVal: '',
        }
    },
    computed: {   
        isChecked: {
            get() {
                return this.complete;
            },
            set() {
                this.$emit('set-checked', {id: this.todoId, value: !this.isChecked});  
            }            
        },
        titleStyle() {
            return {'text-decoration': this.isChecked ? 'line-through' : 'none'}
        }  
    },
    methods: {
        editTodo() {
            this.isEdit = true;
            this.editVal = this.title;
        },
        saveEdit() {
            this.isEdit = false;
            this.$emit('update-todo', {id: this.todoId, value: this.editVal});  
        },
        deleteTodo() {
            this.$emit('delete-todo', this.todoId);
        }
    }
}
</script>

<style scoped>
/* todo items */
.todo-item {
    width: 100%;
    height: 52px; 
    padding: 8px 12px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 2px 12px rgba(0,0,0,.04);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.todo-item__title {
    color: #212121;
    font-size: 14px;
    margin-left: 12px;        
    flex: 1;
    margin-right: 12px;
    padding: 8px 0;
}

input.todo-item__title {
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #ccc;
}

/* custom checkbox */
.todo-checkbox__input {
    display: none;
}  

.todo-checkbox__label {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    margin-left: 4px;
}

.todo-checkbox__input:checked ~ .todo-checkbox__label .todo-checkbox__inner {
    background: #4a5ea3;
    border-color: #4a5ea3;
    color: #fff;
}

.todo-checkbox__input:checked ~ .todo-checkbox__label .todo-checkbox__inner i {
    opacity: 1;    
}
  
.todo-checkbox__inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #757575;
    border-radius: 3px;
    box-sizing: border-box;
    
    position: relative;  
}

.todo-checkbox__inner i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 13px;      
    vertical-align: top;
    pointer-events: none;
    opacity: 0;
    user-select: none;
    transition: opacity .2s;
    color: #fff;
}

.todo-item-btn__wrap {
    margin-left: auto;
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

.todo-item-btn + .todo-item-btn {
    margin-left: 8px;
}

.todo-item-btn:hover {
    text-decoration: underline;
}

.todo-item-btn.remove {
    color: #ff7b5d;
}
</style>