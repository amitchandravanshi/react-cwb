import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReactLoading from "react-loading";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit
  },
  searchField: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: "5px 10px",
    width: "350px"
  },
  searchButton: {
    color: "#FFFFFF",
    minHeight: "42px"
  }
});

function PageNameField(props) {
  const { controlClass, user } = props.assignmentDetails;

  const { classes } = props;

  if (user.error) return "";

  if (user.dashBoardLoaded) return "";

  if (user.loading)
    return (
      <div>
        <ReactLoading
          type={"bubbles"}
          color={"#ffffff"}
          height={"5%"}
          width={"5%"}
        />
      </div>
    );
  return (
    <div className={classes.wrapper}>
      <Grid container spacing={8}>
        <Grid item>
          <TextField
            value={user.assignment.name}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.bootstrapInput,
                root: classes.searchField
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PageNameField);
