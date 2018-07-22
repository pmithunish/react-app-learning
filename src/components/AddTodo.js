import React from "react";
import { MyStoreContext } from "./../index";
import { ACTION } from "./../index";

const CONSTANTS = {
  TODO_ID: 0,
  TODO_PLACEHOLDER: "Add your todo...",
  TODO_INPUT_RESET: ""
};

const handleAddTodo = todo => {
  if (todo === "") return;
  return {
    type: ACTION.ADD_TODO,
    todo,
    id: CONSTANTS.TODO_ID++
  };
};

const AddTodo = () => {
  const input = React.createRef();
  return (
    <MyStoreContext.Consumer>
      {context => (
        <div>
          <input
            ref={input}
            type="text"
            placeholder={CONSTANTS.TODO_PLACEHOLDER}
          />
          <button
            onClick={() => {
              context.dispatchAction(handleAddTodo(input.current.value));
              input.current.value = CONSTANTS.TODO_INPUT_RESET;
            }}
          >
            Add Todo
          </button>
        </div>
      )}
    </MyStoreContext.Consumer>
  );
};

export default AddTodo;
