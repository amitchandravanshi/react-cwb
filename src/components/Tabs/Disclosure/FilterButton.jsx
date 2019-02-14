import React from "react";
import "./../../../assets/scss/options.scss";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    margin: {
        margin: theme.spacing.unit
    },

    cssFocused: {},

    bootstrapRoot: {
        padding: 0,
        "label + &": {
            marginTop: theme.spacing.unit * 3
        }
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 12px",
        width: "80%",
        margin: "0px 0px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    },
    bootstrapFormLabel: {
        fontSize: 18
    }
});

class FilterButton extends React.Component  {
    render(){
        return ( 
                <React.Fragment>{this.props.storeArray && this.props.storeArray.map((items,index)=>
                   <Button  key={index}
                               variant="contained"
                               color="primary"
                               classes={{
                               root: "classes-state-btn-aud"}}>
                               {items.name}
                               {!items.isPercolate && <CancelIcon id={items.name} onClick={this.props.onClick}/>}
                   </Button>)}               
                </React.Fragment>);
               }
 }
         

export default FilterButton;

