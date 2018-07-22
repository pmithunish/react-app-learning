import React from "react";
import { connect } from "react-redux";
import { FILTERS, ACTION } from "./../index";

// action creators (=> setVisibilityFilter): are nice way to document complex applications
const setVisibilityFilter = filter => {
  return {
    type: ACTION.SET_VISIBILITY_FILTER,
    filter
  };
};

const TodoFooter = () => {
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
          <FilterLink filter={filter}>{name}</FilterLink>
        </React.Fragment>
      ))}
    </p>
  );
};

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

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickHandler: () => dispatch(setVisibilityFilter(ownProps.filter))
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default TodoFooter;
