import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PageNameField from "./PageNameField";
import orange from "@material-ui/core/colors/orange";
import classNames from "classnames";
import CWBTabs from "../Tabs/CWBTabs/Tabs";
import { toggleComment } from "../../redux/actions/commentAction";
import Moment from "moment";

import { uploadCopyFormData } from "../../redux/actions/writeAction";

import ShareWithOthers from "../Popups/ShareWithOthers";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#262d3a",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  navButton: {
    margin: theme.spacing.unit,
    color: "#FFFFFF",
    fontSize: "12px",
    textTransform: "capitalize"
  },
  autoSave: {
    color: "#FFFFFF",
    fontSize: "12px",
    padding: "15px"
  },
  fabButton: {
    margin: theme.spacing.unit,
    color: "#424242",
    backgroundColor: "#add8e6",
    height: "32px",
    minWidth: "32px",
    width: "32px"
  },
  toolbar: {
    padding: 0
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  toolbarTitle: {
    flex: 1
  },
  disabledButton: {
    margin: theme.spacing.unit,
    backgroundColor: "#aab2b5 !important",
    color: "#fff !important"
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    props.history.listen((location, action) => {
      this.setState({
        path: location.pathname
      });
    });
  }
  toggleComment = () => {
    this.props.toggleComment(!this.props.comments.commentToggle);
  };
  handleDrawerOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };
  shareUrl = () => {
    this.setState({
      popup: !this.state.popup
    });
  };
  componentDidMount() {
    this.timer = setInterval(() => this.saveTheForm(), 600000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  state = {
    open: false
  };
  saveTheForm = show => {
    const { dashBoardLoaded } = this.props.user;
    !dashBoardLoaded &&
      this.props.uploadCopyFormData({
        formData: this.props,
        show
      });
  };
  render() {
    const { user, dashBoardLoaded, assignment } = this.props.user;
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar
          position="fixed"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Grid container direction="row" justify="center">
            <Grid item lg={12}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="subheading" color="inherit">
                  React Project
                </Typography>
                <Typography
                  variant="subheading"
                  color="inherit"
                  noWrap
                  className={classes.toolbarTitle}
                >
                  <PageNameField assignmentDetails={this.props} />{" "}
                </Typography>{" "}
                {dashBoardLoaded && (
                  <Typography component="span" className={classes.autoSave}>
                    Last Saved at{" "}
                    {this.props.write.saveTime ||
                      (this.props.write.write &&
                        this.props.write.write.assignment &&
                        Moment(
                          this.props.write.write.assignment.updatedAt
                        ).format("MM/DD/YY [@] h:mm a"))}{" "}
                  </Typography>
                )}{" "}
                {dashBoardLoaded && (
                  <Fragment>
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={() => this.saveTheForm(true)}
                    >
                      Save{" "}
                    </Button>{" "}
                    <Button
                      variant="contained"
                      className={
                        this.state.path == "/write"
                          ? classes.button
                          : classes.disabledButton
                      }
                      onClick={this.toggleComment}
                      // disabled={dashBoardLoaded || this.state.path !== "/write"}
                    >
                      Comment{" "}
                    </Button>{" "}
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={this.shareUrl}
                      // disabled={!this.props.assignments.assignment.id}
                    >
                      Share{" "}
                    </Button>{" "}
                  </Fragment>
                )}
                <Button
                  variant="fab"
                  size="small"
                  className={classes.fabButton}
                >
                  {user}{" "}
                </Button>{" "}
              </Toolbar>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </AppBar>{" "}
        {this.state.popup && (
          <ShareWithOthers
            handleClose={this.shareUrl}
            postId={this.props.assignments.assignment.id}
          />
        )}{" "}
        {dashBoardLoaded && (
          <CWBTabs open={this.state.open} saveTheForm={this.saveTheForm} />
        )}{" "}
      </Fragment>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    write: state.write,
    comments: state.comment,
    assignments: state.assignments
  };
};
export default connect(
  mapStateToProps,
  {
    uploadCopyFormData,
    toggleComment
  }
)(withRouter(withStyles(styles)(TopBar)));
