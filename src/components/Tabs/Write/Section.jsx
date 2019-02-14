import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import scrollToComponent from "react-scroll-to-component";
export const Sections = ({ component, name, action }) => {
  if (!component) return null;
  return (
    <Fragment>
      <Typography variant="title" component={Button} onClick={() => action()}>
        {name}
      </Typography>
      <Typography component="span" className={"tab-nav-divider"}>
        |
      </Typography>
    </Fragment>
  );
};
