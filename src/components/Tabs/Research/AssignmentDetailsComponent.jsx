import React from "react";
import ReactLoading from "react-loading";
import Toolbar from "@material-ui/core/Toolbar";
import WebIcon from "@material-ui/icons/Web";
import { ListItemIcon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as R from "ramda";

import {
  GridList,
  GridListTile,
  Button,
  Typography,
  Paper
} from "@material-ui/core";
const styles = theme => ({
  scrollTheSection: {
    fontSize: "16px"
  },
  iconStyle: {
    color: theme.palette.primary.main,
    display: "inline-block",
    marginRight: "5px"
  },
  iconStyleContent: {
    marginLeft: "5px",
    display: "inline-block",
    fontWeight: 500,
    color: "#0a3039"
  },
  tableContentHeading: {
    fontSize: "1rem",
    color: "rgba(0, 0, 0, 0.4)"
  },
  tableContent: {
    fontSize: "0.8rem",
    lineHeight: "19px",
    color: "#395356"
  },
  link: {
    color: "#44959f"
  },
  assignmentButtons: {
    height: "20px",
    color: "#73c0c9",
    lineHeight: "19px",
    fontSize: "16px",
    fontFamily: "Avenir-Heavy",
    fontWeight: 900,
    margin: "25px auto",
    padding: "5px"
  }
});
function AssignmentDetailsComponent(props) {
  const { assignment, loading, error } = props.assignmentDetails;
  const { classes } = props;
  if (loading)
    return (
      <div>
        <ReactLoading type={"bubbles"} color={"#000000"} />
      </div>
    );
  if (error) return <div>Error while fetching data </div>;
  if (R.isEmpty(assignment)) return "";

  return (
    <div>
      <Toolbar className={"tab-header"}>
        <Typography variant="title">Research</Typography>
      </Toolbar>
      <Toolbar className={"tab-nav"}>
        <Typography variant="title" component={Button}>
          Percolate Assignment
        </Typography>
        <Typography component="span" className={"tab-nav-divider"}>
          |
        </Typography>
        <Typography variant="title" component={Button}>
          Resources (Discover Search)
        </Typography>
      </Toolbar>
      <div className="content-block">
        <Paper className={"tab-subhead"}>
          <div className={classes.iconStyle}>
            <ListItemIcon className={classes.iconStyle}>
              <WebIcon />
            </ListItemIcon>
            <span>Web</span>
          </div>
          <div className={classes.iconStyleContent}>
            <Typography variant="subheading">{assignment.name}</Typography>
          </div>
        </Paper>
        <div className={"research-assignment-grid " + classes.contentContainer}>
          <GridList cellHeight={60} className={classes.gridList} cols={6}>
            <GridListTile cols={6}>
              <div>
                <Typography
                  variant="headline"
                  component="h3"
                  className={classes.tableContentHeading}
                >
                  Percolate Assignment{" "}
                </Typography>
                <Typography
                  component="a"
                  href={assignment.percolateUrl}
                  target="_blank"
                  className={classes.link}
                >
                  {assignment.percolateUrl}
                </Typography>
              </div>
            </GridListTile>
            {Object.keys(assignment.metaData).map((key, index) => {
              return (
                <GridListTile key={key} cols={1}>
                  <div>
                    <Typography
                      variant="headline"
                      component="h3"
                      className={classes.tableContentHeading}
                    >
                      {key}
                    </Typography>
                    <Typography component="p" className={classes.tableContent}>
                      {assignment.metaData[key]}
                    </Typography>
                  </div>
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(AssignmentDetailsComponent);
