import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import GraphicsItem from "./GraphicsItem";
import AddGraphicsItem from "./AddGraphicsItem";
import SectionHeader from "../SectionHeader";
import { uploadFileApi } from "../../../../api/writeApi";
import * as write_graphic_actions from "../../../../redux/actions/writeAction";
import * as dashboard_load_actions from "../../../../redux/actions/dashBoardActions";
import _ from "lodash";
import ReactLoading from "react-loading";

class Graphics extends React.Component {
  state = {
    loading: false
  };
  constructor(props) {
    super(props);
    this.handleNewGraphicItem = this.handleNewGraphicItem.bind(this);
    this.saveInStore = this.saveInStore.bind(this);
  }
  saveInStore = payload => {
    //update graphics
    this.props.updateGraphicRequest(payload);
  };
  handleNewGraphicItem() {
    let newGraphic = this.props.store.write.graphics[0];

    if (newGraphic) {
      newGraphic = _.cloneDeep(newGraphic);
      newGraphic.graphicsId = Math.floor(Math.random() * 20);
      let graphicNumber =
        this.props.store.write.graphics.length * 10000 +
        Math.floor(1000 + Math.random() * 9000);
      newGraphic.shortCode = `[Graphic SHORTCODE #${graphicNumber}]`;
      this.props.showSuccessMsg("New Graphic Added");
      this.props.addGraphicsRequest(newGraphic); //state.write.graphics.push calling in writereducer
    }
  }
  uploadFile(graphicId, fileName, name, file, graphicShortCode) {
    let assignmentId = this.props.store.write.assignment.percolateId;
    let userId = this.props.user.userId;
    this.setState({ loading: true });
    uploadFileApi({
      file,
      url: "/graphics",
      assignmentId,
      userId,
      name,
      id: graphicId,
      graphicShortCode
    })
      .then(({ data }) => {
        this.setState({ loading: false });
        this.props.showSuccessMsg("Successfully Uploaded");
        this.props.updateGraphicRequest({
          data,
          graphicsId: graphicId,
          [fileName]: file.name
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        this.props.showErrorMsg("File Upload Failed");
      });
  }
  onFileChange = (graphicId, fileName, name, file, count) => {
    //const { graphic } = this.props;
    let graphic = this.props.store.write.graphics.filter(
      graphic => graphic.graphicsId == graphicId
    )[0];

    if (graphic.name == file.name) {
      const isConfirm = window.confirm("Are you sure you want to override ?");
      if (isConfirm) {
        this.uploadFile(graphicId, fileName, name, file, graphic.shortCode);
      }
    } else {
      this.uploadFile(graphicId, fileName, name, file, graphic.shortCode);
    }
  };
  handleDeleteGraphicsItem = graphicId => {
    let isConfirm = window.confirm(
      "Please remember to remove the reference from the body?"
    );
    if (isConfirm) {
      const { store } = this.props;
      this.props.deleteGraphicsRequest({
        graphicId,
        graphics: store.write.graphics
      });
    } else {
      console.log("Ok, We will not delete");
    }
  };
  renderItems = () => {
    const { classes, store } = this.props;
    if (Object.keys(store.write).length === 0) return "";
    return store.write.graphics
      .filter(graphic => graphic.graphicsId != "")
      .map((graphicItem, index) => {
        const count = ++index;
        const graphicField = graphicItem.fields[0];
        return (
          <GraphicsItem
            loading={this.state.loading}
            key={graphicItem.graphicsId}
            count={count}
            imageName={graphicItem.name}
            id={graphicItem.graphicsId}
            shortCode={graphicItem.shortCode}
            fileName={graphicItem.originalFileName}
            fieldProps={graphicItem.fields}
            name={graphicItem.name}
            onDeleteClick={this.handleDeleteGraphicsItem}
            onFileChange={this.onFileChange}
            saveInStore={this.saveInStore}
          />
        );
      });
  };
  render() {
    const { classes, store } = this.props;
    if (store.loading)
      return (
        <div>
          <ReactLoading type={"bubbles"} color={"#000000"} />
        </div>
      );
    return (
      <div className={"write-graphics-block content-block"}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <SectionHeader title="Article Graphics" id="graphics" />
            {this.renderItems()}
            <AddGraphicsItem onAddGraphicClick={this.handleNewGraphicItem} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    store: state.write,
    graphics: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(write_graphic_actions, dispatch)
  };
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Graphics);
export default ConnectedComponent;
