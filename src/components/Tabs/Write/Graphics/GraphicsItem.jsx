import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, GridList, GridListTile } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormField from "../../../Form/FormField/FormField";
import ShortCode from "./ShortCode";
import ReactLoading from "react-loading";

const styles = theme => {
  return {
    root: {
      margin: "0px"
    },
    header: {
      display: "flex",
      flexDirection: "row"
    }
  };
};

class GraphicsItem extends React.Component {
  state = {
    itemLoading: false
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveInStore = this.saveInStore.bind(this);
  }
  handleChange(event) {
    this.props.saveInStore({
      graphicsId: this.props.id,
      [event.target.name]: event.target.checked
    });
  }
  onFileChange = (graphicId, fieldName, file) => {
    if (this.props.onFileChange) {
      this.setState({ itemLoading: true });
      this.props.onFileChange(
        graphicId,
        fieldName,
        this.props.name,
        file,
        this.props.count
      );
    }
  };
  handleDeleteGraphicItem = () => {
    const { onDeleteClick, id } = this.props;
    if (onDeleteClick) {
      onDeleteClick(id);
    }
  };
  componentWillReceiveProps(newProps) {
    let { loading } = newProps;
    if (!loading) {
      this.setState({ itemLoading: loading });
    }
  }
  renderForm = () => {
    const { fieldProps = [] } = this.props;
    const checkbox = fieldProps.filter(
      ({ properties: { fieldType } }) => fieldType == "CheckBox"
    )[0];
    const skipList = [
      "Graphic Headline",
      "Graphic Subhead 1",
      "Graphic Subhead 2"
    ];
    const fieldData = fieldProps
      .filter(({ properties: { fieldType } }) => fieldType !== "CheckBox")
      .map((field, index) => {
        const { fieldName, properties, fieldId, fieldValue, imageName } = field;
        const { allowComments, ...restProps } = properties;
        if (checkbox.fieldValue && skipList.includes(field.fieldName)) {
          return null;
        }
        return (
          <FormField
            key={index}
            label={fieldName}
            onBlur={this.saveInStore}
            imageName={imageName}
            allowComments={false}
            name={fieldId + ""}
            value={fieldValue}
            id={this.props.id}
            onFileChange={this.onFileChange}
            onCommentBtnClick={this.handleCommentModal}
            {...restProps}
          />
        );
      });
    return <div>{fieldData}</div>;
  };
  saveInStore(event) {
    this.props.saveInStore({
      graphicsId: this.props.id,
      [event.target.name]: event.target.value
    });
  }
  getCheckBox(fieldData) {
    const checkbox = fieldData.filter(
      data => data.properties.fieldType == "CheckBox"
    )[0];
    const { fieldName, properties, fieldId, fieldValue } = checkbox;
    const { allowComments, ...restProps } = properties;
    return (
      <FormField
        key={0}
        label={fieldName}
        handleChange={this.handleChange}
        name={fieldId + ""}
        value={fieldValue}
        {...restProps}
      />
    );
  }
  render() {
    const {
      classes,
      fieldProps,
      id,
      count,
      loading,
      imageName,
      shortCode
    } = this.props;

    return (
      <div className={"write-graphics-add-section " + classes.root}>
        <div>
          <GridList cellHeight={90} className={classes.gridList} cols={4}>
            <GridListTile cols={1}>
              <div>
                <Typography
                  variant="display1"
                  component="span"
                  gutterBottom
                  className={"graphic-hdr"}
                >
                  {`Graphic #${count}`}
                  <Button
                    onClick={this.handleDeleteGraphicItem}
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </Typography>
              </div>
            </GridListTile>
            <GridListTile cols={1}>{this.getCheckBox(fieldProps)}</GridListTile>
            <GridListTile cols={2}>
              <ShortCode
                shortCode={shortCode}
                count={count}
                imgId={id}
                imageName={imageName}
              />
            </GridListTile>
          </GridList>
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

const ConnectedComponent = connect(
  null,
  null
)(GraphicsItem);
export default withStyles(styles)(ConnectedComponent);
