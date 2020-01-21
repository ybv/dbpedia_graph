import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import logo from './dbpedia.png'; // Tell Webpack this JS file uses this image
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import FileInput from "./components/FileInput";
import AddQuadForm from "./components/Add";
import Search from './components/Search';

import {clearAddStatus} from './components/actions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1, 
    paddingLeft: '20px'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.clearAddStatus = this.clearAddStatus.bind(this);
  }

  clearAddStatus(){
    const {dispatch} = this.props;
    dispatch(clearAddStatus());
  }

  render() {
    const { classes, addReducer } = this.props;
    const { addSuccess, addFailure } = addReducer;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppBar color="secondary" position="static">
              <Toolbar variant="dense">
                <img style={{ height: "32px" }} src={logo} alt="Logo" />
                <Typography variant="h6" className={classes.title}>
                  DBpedia Person Explorer
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs="auto" sm={1}></Grid>
          <Grid item xs={12} sm={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Snackbar
                  open={addSuccess}
                  autoHideDuration={3000}
                  onClose={this.clearAddStatus}
                >
                  <Alert severity="success">Added successfully!</Alert>
                </Snackbar>
                <Snackbar
                  open={addFailure}
                  autoHideDuration={3000}
                  onClose={this.clearAddStatus}
                >
                  <Alert severity="error">Something went wrong!</Alert>
                </Snackbar>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" style={{ padding: "10px" }}>
                  <div style={{ padding: "10px 10px 0 10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Add a new triple
                    </Typography>
                  </div>

                  <AddQuadForm />
                  <Divider variant="middle" />
                  <div style={{ padding: "20px 10px 0 10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Bulk add triples
                    </Typography>
                  </div>

                  <FileInput />
                </Paper>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Search />
          </Grid>
          <Grid item xs="auto" sm={1}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));