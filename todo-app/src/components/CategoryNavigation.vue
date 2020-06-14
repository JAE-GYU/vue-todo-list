<template>
  <nav id="nav-categories">            
        <div class="nav-categories__label">카테고리</div>
        <div class="nav-categories__wrap">
            <ul class="nav-categories__list" v-if="currentCategory">                
                <category-item                    
                    :currentCategory="currentCategory"
                    :categoryId="allTodo.id"
                    :categoryName="allTodo.name"
                    :removable="false"
                    @click="setCurrentCategory($event, allTodo)">
                </category-item>
                <category-item
                    v-for="item in categoryList"
                    :key="item.key"
                    :currentCategory="currentCategory"
                    :categoryId="item.id"
                    :categoryName="item.name"
                    @delete-category="deleteCategory"
                    @click="setCurrentCategory($event, item)">
                </category-item>
            </ul>
            <div class="nav-categories__add">                        
                <input @keyup.enter="onClickAddBtn" autocomplete="off" v-model="newCategoryName" id="category-add" name="categroy-add" type="text" placeholder="새 카테고리 추가">                
                <i class="prefix material-icons">add</i>                    
                <button @click="onClickAddBtn" v-show="showAddBtn" class="suffix nav-categories__add-btn">추가</button>
            </div>            
        </div>                
    </nav>
</template>

<script>
import CategoryItem from '@/components/CategoryItem';
import { addCategory, getCategories, deleteCategory } from '@/api/api';

export default {
    props: {
        currentCategory: {
            type: Object
        }
    },
    components: {
        CategoryItem
    },
    data() {
        return {
            newCategoryName: '',
            allTodo: {
                id: 'all',
                name: '모든 항목'
            },
            categoryList: []
        }
    },
    beforeMount() {        
        getCategories()
        .then(res => {
            this.categoryList = res.data;            
        })

        this.setCurrentCategory(undefined, this.allTodo)        
    },
    computed:{        
        showAddBtn() {
            return this.newCategoryName.length > 0;
        }
    },
    methods: {
        setCurrentCategory(ev, item) {
            this.$emit('set-category', item);            
        },
        onClickAddBtn() {           
            const addData = {                
                name: this.newCategoryName
            }

            addCategory(addData)
            .then((res) => {
                this.categoryList.push(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            
            this.newCategoryName = '';            
        },
        deleteCategory(id) {
            deleteCategory(id)
            .then(() => {
                if(this.currentCategory.id === id) {
                    this.setCurrentCategory(undefined, this.allTodo)
                }
                this.categoryList = this.categoryList.filter(x => x.id != id);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
/* category list */
#nav-categories {
    flex-basis: 260px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #efefef;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.nav-categories__label {
    font-size: 12px;
    color: #bcbcbc;
    padding: 8px;
}

.nav-categories__wrap {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.nav-categories__list {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.nav-categories__add {
    margin: 4px 0;    
    display: flex;
    flex-direction: row-reverse;
    position: relative;
}

#category-add {
    width: 100%;
    max-width: 100%;
    height: 36px;
    padding: 8px 32px 8px 32px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;    
    outline: none;
    color: #616161;
    flex: 1;    
    transition: background .2s;
    line-height: 1.3;    
}

#category-add::placeholder {
    color: #4a5ea3;
}

#category-add:focus {
    background: #edf2f7;
}

.nav-categories__add .prefix {
    padding: 0 8px;    
    transition: background .2s;    
    color: #4a5ea3;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

#category-add:focus::placeholder,
#category-add:focus ~ .prefix,
#category-add:active .prefix {
    color: #616161;    
}

.nav-categories__add-btn {
    width: 34px;
    height: 34px;    
    border-radius: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    padding: 4px;
    transform: translateY(-50%);
    background: none;
    border: none;
    outline: none;
    transition: background.2s;
    cursor: pointer;
    font-size: 12px;
    color: #4a5ea3
}

#category-add:focus ~ .nav-categories__add-btn,
#category-add:active .nav-categories__add-btn {
    background-color: #e2e8f0;        
}

.nav-categories__add-btn i {
    color: #4a5ea3;
    font-size: 18px;    
    box-sizing: border-box;
    vertical-align: -2px;
}
</style>