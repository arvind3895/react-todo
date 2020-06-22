export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const EDIT_USER = "EDIT_USER";
export const EDIT_TODO_POPUP = "DIT_TODO_POPUP";
export const EDIT_USER_POPUP = "EDIT_USER_POPUP";
export const TOOGLE_LOGIN = "TOOGLE_LOGIN";

export function addTodo(task) {
  return { type: ADD_TODO, task };
}

export function removeTodo(index) {
  return { type: REMOVE_TODO, index };
}

export function editTodo(task, index) {
  return {
    type: EDIT_TODO,
    task,
    index,
  };
}
export function editPopUpVisible(value, index) {
  return {
    type: EDIT_TODO_POPUP,
    value,
    index,
  };
}

export function addUser(user) {
  return { type: ADD_USER, user };
}

export function removeUser(index) {
  return { type: REMOVE_USER, index };
}

export function editUser(user, index) {
  return {
    type: EDIT_USER,
    user,
    index,
  };
}
export function editUserPopUpVisible(value, index) {
  return {
    type: EDIT_USER_POPUP,
    value,
    index,
  };
}

export function toggleLogin() {
  return {
    type: TOOGLE_LOGIN,
  };
}
