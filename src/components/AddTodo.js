import React from "react";
import { connect } from "react-redux";
import { ACTION } from "./../index";

const CONSTANTS = {
  TODO_ID: 0,
  TODO_PLACEHOLDER: "Add your todo...",
  TODO_INPUT_RESET: ""
};

const UNHANDLED_ACTION = "DONT_HANDLE_THIS_ACTION";

// action creators (=> addTodo): are nice way to document complex applications
const addTodo = todo => {
  if (todo === "") return { type: UNHANDLED_ACTION };
  return {
    type: ACTION.ADD_TODO,
    todo,
    id: CONSTANTS.TODO_ID++
  };
};

let AddTodo = ({ dispatch }) => {
  const input = React.createRef();
  return (
    <div>
      <input ref={input} type="text" placeholder={CONSTANTS.TODO_PLACEHOLDER} />
      <button
        onClick={() => {
          const todo = input.current.value;
          dispatch(addTodo(todo));
          input.current.value = CONSTANTS.TODO_INPUT_RESET;
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
