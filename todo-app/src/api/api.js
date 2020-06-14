import axios from 'axios';

// categories
export function addCategory(data) {
    return axios.post('/categories', data);
}

export function getCategories() {
    return axios.get('/categories');
}

export function deleteCategory(id) {
    return axios.delete(`/categories/${id}`);
}

// todo
export function addTodo(data) {
    return axios.post('/todo', data);
}

export function getTodoList(param) {    
    return axios.get('/todo?_sort=id&_order=desc', param);
}

export function updateTodo(data) {    
    return axios.put(`/todo/${data.id}`, data);
}

export function deleteTodo(id) {
    return axios.delete(`/todo/${id}`);
}