import React from "react";
import { MyStoreContext } from "./../index";
import { FILTERS, ACTION } from "./../index";

const handleSetVisibilityFilter = filter => {
  return {
    type: ACTION.SET_VISIBILITY_FILTER,
    filter
  };
};

const TodoFooter = ({ context }) => {
  const filters = Object.keys(FILTERS).map(key => ({
    filter: FILTERS[key],
    name: key.split("_").join(" ")
  }));
  return (
    <p>
      Filter Todos:
      {filters.map(({ filter, name }, index) => (
        <React.Fragment key={index}>
          <br />
          <FilterLink filter={filter} context={context}>
            {name}
          </FilterLink>
        </React.Fragment>
      ))}
    </p>
  );
};

class FilterLink extends React.Component {
  componentDidMount() {
    const store = this.props.context.getStore();
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter } = this.props;
    const { visibilityFilter } = this.props.context.getStoreState();
    const dispatchAction = action => this.props.context.dispatchAction(action);
    return (
      <Link
        active={filter === visibilityFilter}
        onClickHandler={() => dispatchAction(handleSetVisibilityFilter(filter))}
      >
        {this.props.children}
      </Link>
    );
  }
}

const Link = ({ children, active, onClickHandler }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        return onClickHandler();
      }}
    >
      {children}
    </a>
  );
};

export default props => (
  <MyStoreContext.Consumer>
    {context => <TodoFooter {...props} context={context} />}
  </MyStoreContext.Consumer>
);
