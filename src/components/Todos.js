import React from "react";
import { ACTION, FILTERS } from "./../index";
import { MyStoreContext } from "./../index";

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

const handleToggleTodo = ({ id: index }) => {
  return {
    type: ACTION.TOGGLE_TODO,
    index
  };
};

class VisibleTodosList extends React.Component {
  componentDidMount() {
    const store = this.props.context.getStore();
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const todos = applyFilters(this.props.context.getStoreState());
    return (
      <MyStoreContext>
        {context => (
          <Todos
            todos={todos}
            onClickHandler={todo =>
              context.dispatchAction(handleToggleTodo(todo))
            }
          />
        )}
      </MyStoreContext>
    );
  }
}

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

export default props => (
  <MyStoreContext.Consumer>
    {context => <VisibleTodosList {...props} context={context} />}
  </MyStoreContext.Consumer>
);
