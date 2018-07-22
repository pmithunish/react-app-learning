import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";

import { combineReducers, createStore } from "redux";

export const ACTION = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER"
};

export const FILTERS = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const CONSTANTS = {
  FIRST_INDEX: 0,
  NEXT_INDEX: index => index + 1,
  DEFAULT_COMPLETED: false
};

const todo = (state = {}, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO: {
      const { id, todo } = action;
      return {
        id: id,
        todo: todo,
        completed: CONSTANTS.DEFAULT_COMPLETED
      };
    }
    case ACTION.TOGGLE_TODO: {
      if (state.id !== action.index) {
        return state;
      }
      return Object.assign({}, state, { completed: !state.completed });
    }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  console.log(action.type, state);
  switch (action.type) {
    case ACTION.ADD_TODO: {
      return [...state, todo({}, action)];
    }
    case ACTION.REMOVE_TODO: {
      const { index } = action;
      const firstIndex = CONSTANTS.FIRST_INDEX;
      const nextIndex = CONSTANTS.NEXT_INDEX(index);
      return [...state.slice(firstIndex, index), ...state.slice(nextIndex)];
    }
    case ACTION.TOGGLE_TODO: {
      return state.map(todoObj => todo(todoObj, action));
    }
    default:
      return state;
  }
};

const visibilityFilter = (state = FILTERS.SHOW_ALL, action) => {
  switch (action.type) {
    case ACTION.SET_VISIBILITY_FILTER: {
      return action.filter;
    }
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

const store = createStore(todoApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
