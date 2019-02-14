import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Description";
import HelpIcon from "@material-ui/icons/Help";
import ImageIcon from "@material-ui/icons/Image";
import BackupIcon from "@material-ui/icons/Backup";
import Popup from 'reactjs-popup'

const getIcon = id => {
  switch (id) {
    case "copy":
      return <MenuIcon />;
    case "graphics":
      return <ImageIcon />;
    case "backup":
      return <BackupIcon />;
    case "twitter":
      return <MenuIcon />;
    case "linkedIn":
      return <MenuIcon />;
    case "Facebook":
      return <MenuIcon />;
  }
};

const Tooltips = (props) => (
  <Popup
    trigger={<HelpIcon />}
    position="right top"
    on="hover"
    closeOnDocumentClick
  >
    <span dangerouslySetInnerHTML={{__html: props.content}} />
  </Popup>
)
  
function SectionHeader(props) {
  const { classes, title = "", id } = props;

  return (
    <div>
      <Paper className={"tab-subhead"}>
        <IconButton color="inherit">{getIcon(id)}</IconButton>
        <Typography variant="subheading">{title}</Typography>
        {props.tooltip && (
            <Tooltips content={props.tooltip} />
        )}
      </Paper>
    </div>
  );
}

export default SectionHeader;
