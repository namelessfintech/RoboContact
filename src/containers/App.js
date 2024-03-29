import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../actions";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

// defines what state to listen and send down as props
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

// defines what props are actions to be dispatched
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots:()=> dispatch(requestRobots())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const {searchField, onSearchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });

    if (isPending) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <ErrorBoundary>
            <h1>Hello Robo Friends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </ErrorBoundary>
        </div>
      );
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
