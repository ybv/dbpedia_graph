import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import { addSingleTuple } from "./actions";

class AddQuadForm extends Component {
  constructor(props) {
    super(props);
    this.addSingleTuple = this.addSingleTuple.bind(this);
  }

  addSingleTuple(triple) {
    const { dispatch } = this.props;
    dispatch(addSingleTuple(triple));
  }

  render() {
    return (
      <Formik
        initialValues={{ subject: "", predicate: "", object: "" }}
        onSubmit={(values, actions) => {
          this.addSingleTuple(values);
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div style={{ padding: "0 10px" }}>
              <Field
                name="subject"
                label="Subject"
                type="text"
                style={{ padding: "5px 0" }}
                fullWidth
      
                component={TextField}
              />

              <Field
                name="predicate"
                label="Predicate"
                type="text"
                style={{ padding: "5px 0" }}
                fullWidth
       
                component={TextField}
              />
              <Field
                name="object"
                label="Object"
                type="text"
                style={{ padding: "5px 0" }}
                fullWidth
      
                component={TextField}
              />
            </div>

            <div style={{ padding: "20px 10px 30px 10px" }}>
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}

              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(AddQuadForm);
