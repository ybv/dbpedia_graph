import React, { Component, Fragment } from "react";

import expStyles from "../spectre-exp.min.module.css";
import iconStyles from "../typicons.min.module.css";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import Dropzone from "react-dropzone";

import { bulkAddSingleTuple } from "./actions";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadinProgress: false
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {}

  onDrop(acceptedFiles) {
    const { dispatch } = this.props;
    let progStep = acceptedFiles.length;
    this.setState({
      uploadinProgress: true
    });
    console.log(acceptedFiles);

    acceptedFiles.forEach((file, fileIdx) => {
      const updateStates = downloadUrl => {
        const newarr = this.state.files.concat([downloadUrl]);
        const upDone = fileIdx === acceptedFiles.length - 1;

        this.setState({
          files: newarr,
          uploadinProgress: !upDone
        });

        progStep = progStep - 1;
        //setFieldValue(field.name, this.state.files);
      };
      dispatch(bulkAddSingleTuple(file, updateStates));
    });
  }

  render() {
    return (
      <Fragment>
        <Dropzone onDrop={this.onDrop} style={{ padding: "10px" }}>
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles
          }) => (
            <div
              {...getRootProps()}
              style={{
                border: "1px dotted #d4d4d4",
                background: "#fcfcfc",
                padding: "50px",
                margin: "20px 10px",
                cursor: "pointer"
              }}
            >
              <input {...getInputProps()} />
              {this.state.uploadinProgress ? <CircularProgress /> : null}
              <Typography variant="caption" display="block" gutterBottom>
                Drag and drop a triplet file here to upload in bulk
              </Typography>
            </div>
          )}
        </Dropzone>
        <div style={{ width: "100%" }}>
          {this.state.uploadinProgress ? (
            <progress
              style={{ width: "100%" }}
              className={expStyles.progress}
              max="100"
            />
          ) : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(FileInput);
