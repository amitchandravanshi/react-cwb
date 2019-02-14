import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Button,
  GridList,
  GridListTile
} from "@material-ui/core";
import SlateEditor from "../../Form/FormField/SlateEditor/SlateEditor";
import configDeterminator from "../../../configs/configDeterminator";
import Image from "react-image-resizer";
import { Editor } from "slate-react";

const styles = theme => {
  return {
    root: {
      margin: "0px"
    },
    li: {
      listStyle: "none"
    }
  };
};
class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditor = this.renderEditor.bind(this);
  }
  renderEditor(value) {
    const { graphics } = this.props;
    graphics.forEach(graphic => {
      if (graphic.shortCode) {
        value = value.replace(
          graphic.shortCode,
          `<div>
            <img
              src=${configDeterminator.cwbApiEndpoint}/graphics/${
            graphic.graphicsId
          }
            />
            <span class="review-summary-graphic-name">${graphic.name}</span>
          </div>`
        );
      }
    });

    return value;
  }

  render() {
    const { classes, data } = this.props;
    let copyStatus = false;
    data.fields.forEach(copy => {
      if (
        copy.fieldValue != "" &&
        copy.fieldValue != "<p></p>" &&
        copy.fieldValue != "N/A"
      ) {
        copyStatus = true;
      }
    });
    if (!copyStatus) return null;
    return (
      <div className="review-summary-block review-subsection">
        {data.fields
          .filter(
            copy =>
              copy.fieldValue != "" &&
              copy.fieldValue != "<p></p>" &&
              copy.fieldValue != "N/A"
          )
          .map(copy => {
            return (
              <ul className="review-item">
                {copy.properties.fieldType == "Editor" ? (
                  <li className={classes.li}>
                    <Typography component="h3">{copy.fieldName}</Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.renderEditor(copy.fieldValue)
                      }}
                    />
                  </li>
                ) : (
                  <li className={classes.li}>
                    <Typography component="h3">{copy.fieldName}</Typography>
                    <Typography component="span">{copy.fieldValue}</Typography>
                  </li>
                )}
              </ul>
            );
          })}
      </div>
    );
  }
}
export default withStyles(styles)(Summary);
