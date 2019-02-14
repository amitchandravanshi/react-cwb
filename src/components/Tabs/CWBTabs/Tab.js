import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/LocalLibrary";
import DoneIcon from "@material-ui/icons/Done";
import HowToRegIcon from "@material-ui/icons/Info";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

const styles = theme => {
  return {
    tabLink: {
      textDecoration: "none"
    },
    tabButton: {
      margin: theme.spacing.unit,
      borderRadius: "0.5rem",
      backgroundColor: "#aab2b5"
    },
    tabLastButton: {
      minWidth: "250px",
      minHeight: "60px",
      backgroundColor: "#448aff57",
      margin: 0,
      marginRight: theme.spacing.unit,
      position: "absolute",
      right: 0
    },
    tabButtonActive: {
      margin: theme.spacing.unit,
      borderRadius: "0.4rem",
      backgroundColor: "#44959f"
    },
    menuItem: {
      "&:focus": {
        backgroundColor: "#aab2b5",
        "& $primary, & $icon": {
          color: theme.palette.common.white
        }
      }
    }
  };
};
let isconList = {
  dashboard: () => <HomeIcon />,
  create: () => <CreateIcon />,
  review: () => <DoneIcon />,
  search: () => <SearchIcon />,
  how_to_reg: () => <HowToRegIcon />
};

const Tab = ({ classes, label, to, icon, activeTab, onTabClick }) => {
  const { tabButton, tabButtonActive, tabLink } = classes;
  let activeButton =
    activeTab == label ? `${tabButton} ${tabButtonActive} tabButtonIsActive tabButton` : tabButton + " tabButton";
  return (
    <MenuList>
      <MenuItem
        button
        component={Link}
        to={to}
        className={activeButton}
        onClick={onTabClick}
      >
        <ListItemIcon>
          {isconList[icon] ? isconList[icon]() : <CreateIcon />}
        </ListItemIcon>
        <ListItemText primary={label} />
      </MenuItem>
    </MenuList>
  );
};

export default withStyles(styles)(Tab);
