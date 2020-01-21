import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import { searchTriple, clearLoc, changeSearch } from "./actions";
import SearchResults from "./SearchResults";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  title: {
    flexGrow: 1
  }
});

class FromLoc extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  componentWillUnmount(){
      const { dispatch, locReducer } = this.props;
      const { locId } = locReducer;
      dispatch(clearLoc(locId));
  }

  selectItem(name) {
    const { dispatch, locReducer } = this.props;
          const { locId } = locReducer;
    dispatch(searchTriple(name));
    dispatch(changeSearch(name));
    dispatch(clearLoc(locId));
  }

  render() {
    const { classes, searchReducer, locReducer } = this.props;
    const { searchText } = searchReducer;
    const { results, locId } = locReducer;

    let explore = null;

    if (results && results.length > 0) {
      let randomComponents = [];
      for (let result of results) {
        randomComponents.push(
          <Chip
            key={result.id}
            variant="outlined"
            size="small"
            color="primary"
            style={{ margin: "4px" }}
            label={result.id}
            onClick={() => this.selectItem(result.id)}
          />
        );
      }

      explore = (
        <Fragment>
          <Typography
            variant="caption"
            display="block"
          >
            More from {locId}
          </Typography>
          <div style={{ overflowX: "scroll" }}>{randomComponents}</div>
        </Fragment>
      );
    }

    return <div style={{ width: "330px", margin: "5px 0" }}>{explore}</div>;
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(FromLoc));
