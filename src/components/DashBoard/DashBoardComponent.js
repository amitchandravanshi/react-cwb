import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import * as R from "ramda";
import { withRouter, Route, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import orange from "@material-ui/core/colors/orange";
import get from "lodash/get";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  fabButton: {
    margin: theme.spacing.unit,
    color: "#424242",
    backgroundColor: "#add8e6",
    height: "35px",
    minWidth: "32px",
    width: "35px"
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  },
  iconStyleContent: {
    display: "inline-block",
    fontWeight: 500,
    color: "#0a3039"
  },
  contentHeading: {
    backgroundColor: "#def6f9",
    padding: "0.6rem 1rem",
    borderRadius: "2px",
    fontSize: "1rem",
    fontFamily: "AvenirNextLT-Demi",
    fontWeight: 900,
    color: "#73c0c9"
  }
});

function DashBoard(props) {
  const { allAssignments, loading, error, userDetails } = props.assignments;
  const { classes } = props;
  if (loading)
    return (
      <div>
        <ReactLoading type={"bubbles"} color={"#000000"} />{" "}
      </div>
    );
  if (error) return <div> Error while fetching data </div>;
  if (R.isEmpty(allAssignments)) return "";
  if (R.isEmpty(allAssignments) || R.isEmpty(allAssignments.assignments))
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <main>
          {" "}
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="headline" component="h2">
                There is no content assigned to you.{" "}
              </Typography>{" "}
              <Typography>
                {" "}
                Any content that is assigned to you will appear on your
                homepage.{" "}
              </Typography>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </main>{" "}
      </div>
    );

  return (
    <div>
      <main>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="baseLine"
            spacing={40}
          >
            <Grid item xs={10}>
              <Toolbar className={"tab-header"}>
                <Typography variant="title">
                  Assignments from Percolate{" "}
                </Typography>{" "}
              </Toolbar>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead className={classes.contentHeading}>
                    <TableRow>
                      <CustomTableCell> CONTENT </CustomTableCell>{" "}
                      <CustomTableCell numeric> STATUS </CustomTableCell>{" "}
                      <CustomTableCell numeric>
                        {" "}
                        DATE SCHEDULED{" "}
                      </CustomTableCell>{" "}
                      <CustomTableCell numeric> CHANNEL </CustomTableCell>{" "}
                      <CustomTableCell numeric> PRIMARY TEAM </CustomTableCell>{" "}
                      <CustomTableCell numeric> ASSIGNEE </CustomTableCell>{" "}
                      <CustomTableCell numeric />
                    </TableRow>{" "}
                  </TableHead>{" "}
                  <TableBody>
                    {" "}
                    {Object.keys(get(allAssignments, "assignments", {})).map(
                      (assignment, index) => {
                        return (
                          <TableRow className={classes.container} key={index}>
                            <CustomTableCell component="th" scope="row">
                              {" "}
                              {
                                allAssignments.assignments[assignment].title
                              }{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              {" "}
                              {
                                allAssignments.assignments[assignment].status
                              }{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              {" "}
                              {Moment(
                                allAssignments.assignments[assignment].liveAt
                              ).isValid()
                                ? Moment(
                                    allAssignments.assignments[assignment]
                                      .liveAt
                                  ).format("MMMM Do, YYYY")
                                : "TBD"}{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              {" "}
                              {
                                allAssignments.assignments[assignment].channel
                              }{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              {" "}
                              {allAssignments.assignments[assignment].team}{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              <Avatar className={classes.fabButton}>
                                {" "}
                                {userDetails.user}{" "}
                              </Avatar>{" "}
                            </CustomTableCell>{" "}
                            <CustomTableCell numeric>
                              <Button
                                component={Link}
                                to={
                                  "/" +
                                  allAssignments.assignments[assignment].id
                                }
                                size="small"
                                className={classes.button}
                              >
                                Edit{" "}
                              </Button>{" "}
                            </CustomTableCell>{" "}
                          </TableRow>
                        );
                      }
                    )}{" "}
                  </TableBody>{" "}
                </Table>{" "}
              </Paper>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#def6f9",
    color: theme.palette.common.black,
    textAlign: "left"
  },
  body: {
    fontSize: 14,
    textAlign: "left"
  }
}))(TableCell);

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(DashBoard));
