import React from "react";
import VisibleTodosList from "./components/Todos";
import AddTodo from "./components/AddTodo";
import TodoFooter from "./components/TodoFooter";

const App = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodosList />
      <TodoFooter />
    </div>
  );
};

export default App;
