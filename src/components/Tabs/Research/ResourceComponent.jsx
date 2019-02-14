import React from "react";
import orange from "@material-ui/core/colors/orange";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  cssRoot: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  resource: {
    marginTop: "2rem"
  },
  resourceContent: {
    color: "#0a3039"
  },
  button: {
    width: "300px",
    textTransform: "capitalize",
    color: "#fafafa"
  }
});

function Resource(props) {
  const { classes } = props;
  return (
    <div className={'content-block ' + classes.container}>
      <Paper className={'tab-subhead'}>
        <Typography variant="subheading">Resources</Typography>
      </Paper>
      <div className={classes.resource}>
        <Typography component="p" className={classes.resourceContent}>
          Use the <b>Discover</b> search tool to find related
          articles, image, or other research to assist you in your work. In the
          future this service will be incorporated into this page.
        </Typography>
        <a href={props.daaUrl} className="anchor-text" target="_blank">
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classNames(
              classes.margin,
              classes.cssRoot,
              classes.button
            )}
          >
            DISCOVER
          </Button>
        </a>
      </div>
    </div>
  );
}

export default withStyles(styles)(Resource);
