import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  ADD_USER,
  REMOVE_USER,
  EDIT_USER,
  EDIT_TODO_POPUP,
  EDIT_USER_POPUP,
  TOOGLE_LOGIN,
} from "./action";
let initialState = {
  todos: [],
  users: [],
};
const serialize = sessionStorage.getItem("store");
if (serialize) {
  initialState = JSON.parse(serialize);
}
const todo = (state = initialState, action) => {
  let task, user;
  switch (action.type) {
    case TOOGLE_LOGIN:
      if (!state.login) {
        return { login: true };
      } else {
        return Object.assign({}, state, {
          login: !state.login,
        });
      }
    case REMOVE_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          ...state.todos.slice(action.index + 1),
        ],
      });
    case EDIT_TODO:
      task = { ...action.task };
      task.lastDate = action.task.lastDate.format("DD/MM/YYYY");
      task.visible = false;
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          { ...state.todos[action.index], ...task },
          ...state.todos.slice(action.index + 1),
        ],
      });
    case EDIT_TODO_POPUP:
      task = state.todos[action.index];
      task.visible = action.value;
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          task,
          ...state.todos.slice(action.index + 1),
        ],
      });
    case ADD_TODO:
      let todo = { ...action.task };
      todo.lastDate = action.task.lastDate.format("DD/MM/YYYY");
      todo.visible = false;
      todo.dateAdded = new Date().toLocaleString();
      if (state.todos) {
        return Object.assign({}, state, {
          todos: [...state.todos, todo],
        });
      } else {
        return Object.assign({}, state, {
          todos: [todo],
        });
      }
    case REMOVE_USER:
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, action.index),
          ...state.users.splice(action.index + 1),
        ],
      });
    case EDIT_USER:
      user = { ...action.user };
      user.visible = false;
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, action.index),
          user,
          ...state.users.slice(action.index + 1),
        ],
      });
    case EDIT_USER_POPUP:
      user = state.users[action.index];
      user.visible = action.value;
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, action.index),
          user,
          ...state.users.slice(action.index + 1),
        ],
      });
    case ADD_USER:
      if (state.users) {
        return Object.assign({}, state, {
          users: [...state.users, action.user],
        });
      } else {
        return Object.assign({}, state, {
          users: [action.user],
        });
      }
    default:
      return state;
  }
};

export default todo;
