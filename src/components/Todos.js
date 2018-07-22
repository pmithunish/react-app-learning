import React from "react";
import { ACTION, FILTERS } from "./../index";
import { connect } from "react-redux";

const applyFilters = ({ todos, visibilityFilter }) => {
  switch (visibilityFilter) {
    case FILTERS.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case FILTERS.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

// action creators (=> toggleTodo): are nice way to document complex applications
const toggleTodo = ({ id: index }) => {
  return {
    type: ACTION.TOGGLE_TODO,
    index
  };
};

const Todos = ({ todos, onClickHandler }) => {
  return (
    <div>
      <h1>todos</h1>
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            onClickHandler={() => onClickHandler(todo)}
          />
        ))}
      </ul>
    </div>
  );
};

const Todo = ({ onClickHandler, completed, todo }) => {
  return (
    <li
      onClick={onClickHandler}
      style={{
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "yellowgreen" : "blue"
      }}
    >
      {todo}
    </li>
  );
};

const mapStateToProps = state => {
  return {
    todos: applyFilters(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickHandler: todo => dispatch(toggleTodo(todo))
  };
};

const VisibleTodosList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default VisibleTodosList;
