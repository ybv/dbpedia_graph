import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import ZoomInIcon from "@material-ui/icons/ZoomIn";


import Grid from "@material-ui/core/Grid";

import { getFromLocation } from "./actions";
import FromLoc from "./FromLoc";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 4px",
    transform: "scale(0.8)"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    backgroundColor: "#d782d9",
    marginBottom: "10px"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  title: {
    flexGrow: 1
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
    this.showFromLoc = this.showFromLoc.bind(this);
  }

  showFromLoc(locId) {
    const { dispatch } = this.props;
    dispatch(getFromLocation(locId));
  }

  handleExpand() {}

  render() {
    const { classes, searchReducer } = this.props;
    const { results, fetching, failed, searchText } = searchReducer;

    if (fetching) {
      return <CircularProgress variant="indeterminate" />;
    }
    if (failed) {
      return "failed to fetch results";
    }

    let hasDetails = true;
    let fullName = false;
    let givenName = false;
    let gender = false;
    let description = false;
    let birthdate = false;
    let deathdate = false;
    let birthplace = false;
    let deathPlace = false;
    let generic = [];

    // results: {…}
    // ​​
    // result: null

    if (results && results.length > 0) {
      for (let result of results) {
        if (result.edge === "<http://xmlns.com/foaf/0.1/name>") {
          fullName = result.id;
        } else if (result.edge === "<http://dbpedia.org/ontology/deathPlace>") {
          deathPlace = result.id;
        } else if (result.edge === "<http://dbpedia.org/ontology/deathDate>") {
          deathdate = result.id;
          deathdate = deathdate
            .replace(`"^^<http://www.w3.org/2001/XMLSchema#date>`, "")
            .replace(`"`, "");
        } else if (result.edge === "<http://dbpedia.org/ontology/birthPlace>") {
          birthplace = result.id;
        } else if (result.edge === "<http://dbpedia.org/ontology/birthDate>") {
          birthdate = result.id;
          birthdate = birthdate
            .replace(`"^^<http://www.w3.org/2001/XMLSchema#date>`, "")
            .replace(`"`, "");
        } else if (result.edge === "<http://purl.org/dc/terms/description>") {
          description = result.id;
        } else if (result.edge === "<http://xmlns.com/foaf/0.1/givenName>") {
          givenName = result.id;
        } else if (result.edge === "<http://xmlns.com/foaf/0.1/gender>") {
          gender = result.id;
        } else {
          generic.push(result);
        }
      }
      hasDetails = true;
    }

    let resultComponent = null;
    if (!searchText) {
    }
    if (searchText && !hasDetails) {
      resultComponent = (
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              No details found
            </Typography>

            <Typography variant="body2" component="p">
              Try repeating your search with other names
            </Typography>
          </CardContent>
        </Card>
      );
    }

    const bull = <span className={classes.bullet}>•</span>;
    const genericcomponent = generic.map((g, i) => (
      <div style={{ width: "100%", margin: "5px 0" }}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {g.id}
        </Typography>
        <Typography
          variant="caption"
          style={{ fontSize: "10px" }}
          display="block"
        >
          {g.edge}
        </Typography>
      </div>
    ));

    if (fullName) {
      resultComponent = (
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.cardContent}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {fullName[0]}
            </Avatar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography component="span" variant="h6">
                {fullName}
              </Typography>
              {givenName && (
                <span style={{ paddingLeft: "10px" }}>
                  <Typography
                    className={classes.pos}
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    ({givenName})
                  </Typography>
                </span>
              )}{" "}
            </div>

            <div style={{ display: "flex" }}>
              {gender && (
                <Typography
                  className={classes.title}
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                >
                  {gender}
                </Typography>
              )}{" "}
              {bull}{" "}
              {birthdate && (
                <Typography
                  className={classes.title}
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                >
                  {birthdate}
                </Typography>
              )}
              {"    "}
              {bull}
              {"  "}
              {deathdate ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.title}
                  gutterBottom
                >
                  {deathdate}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.title}
                  gutterBottom
                >
                  present
                </Typography>
              )}
            </div>

            <div style={{ width: "100%", margin: "10px 0" }}>
              <Divider variant="middle" />
            </div>

            {description && (
              <div style={{ width: "100%", margin: "5px 0" }}>
                <Typography
                  variant="overline"
                  style={{ fontSize: "10px" }}
                  display="block"
                >
                  Bio
                </Typography>
                <Typography variant="subtitle2" component="p" gutterBottom>
                  {description}
                </Typography>
              </div>
            )}

            {birthplace && (
              <div style={{ width: "100%", margin: "5px 0" }}>
                <Typography
                  variant="overline"
                  style={{ fontSize: "10px" }}
                  display="block"
                >
                  birth place
                </Typography>
                <a onClick={() => this.showFromLoc(birthplace)} href="#">
                  {birthplace}
                </a>
              </div>
            )}

            {deathPlace && (
              <div style={{ width: "100%", margin: "5px 0" }}>
                <Typography
                  variant="overline"
                  style={{ fontSize: "10px" }}
                  display="block"
                >
                  death place
                </Typography>
                <a onClick={() => this.showFromLoc(deathPlace)} href="#">
                  {deathPlace}
                </a>
     
              </div>
            )}

            <div style={{ width: "100%", margin: "10px 0" }}>
              <Divider variant="middle" />
            </div>

            {genericcomponent}
          </CardContent>
        </Card>
      );
    }

    if (!searchText) {
      resultComponent = null;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {resultComponent}
        </Grid>
        <Grid item xs={6}>
          <FromLoc />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    searchReducer: state.searchReducer,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
