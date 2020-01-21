import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

import Random from './Random';
import { searchTriple, changeSearch } from "./actions";
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

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  onChange(event) {
    const {dispatch} = this.props;
 
    if (event.key === "Enter") {
    //  
    } else {
        dispatch(changeSearch(event.target.value));
    }
  }

  keyPress(e) {
    const { dispatch, searchReducer } = this.props;
    const { searchText } = searchReducer;

    if (e.keyCode == 13) {
      if (searchText) {
        dispatch(searchTriple(searchText));
      }
    }
  }

  render() {
    const { classes, searchReducer } = this.props;
    const { searchText } = searchReducer;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} style={{marginTop: '30px'}}>
          <Paper className={classes.root}>
            <InputBase
              onKeyDown={this.keyPress}
              value={searchText}
              onChange={this.onChange}
              className={classes.input}
              placeholder="Search by Person Name"
              inputProps={{ "aria-label": "search Person Name" }}
            />

            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12}>
            <Random />
        </Grid>
        <Grid item xs={12}>
          <SearchResults />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Search));
