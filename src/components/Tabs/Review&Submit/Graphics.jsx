import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import configDeterminator from "../../../configs/configDeterminator";
import Image from "react-image-resizer";

const Graphics = props => {
  const { classes, data } = props;
  if (!data || data.length < 2) return null;
  const skipList = [
    "Graphic Headline",
    "Graphic Subhead 1",
    "Graphic Subhead 2"
  ];
  return (
    <div className="review-graphics-block review-subsection">
      {data
        .filter(graphic => graphic.graphicsId != "")
        .map((graphic, index) => (
          <Fragment>
            <Typography component="h3" className={"review-graphic-header"}>
              <strong>Graphics #{index + 1}</strong>
            </Typography>
            {graphic.name && (
              <div className="review-item">
                <img
                  src={
                    configDeterminator.cwbApiEndpoint +
                    "/graphics/" +
                    graphic.graphicsId
                  }
                />
              </div>
            )}
            <GridList cellHeight={50} cols={1}>
              {graphic.fields
                .filter(field => field.properties.fieldType != "FileUpload")
                .filter(
                  graphic =>
                    graphic.fieldValue != "" &&
                    graphic.fieldValue != "<p></p>" &&
                    graphic.fieldValue != "N/A" &&
                    graphic.fieldValue != "true" &&
                    graphic.fieldValue != true
                )
                .map((item, index) => {
                  const checkbox = graphic.fields.filter(
                    ({ properties: { fieldType } }) => fieldType == "CheckBox"
                  )[0];
                  if (
                    checkbox.fieldValue &&
                    skipList.includes(item.fieldName)
                  ) {
                    return null;
                  }
                  return (
                    <GridListTile
                      key={item.Image}
                      cols={1}
                      className={"review-item"}
                    >
                      <Typography component="h3">{item.fieldName}</Typography>
                      <Typography component="span">
                        {item.fieldValue || "N/A"}
                      </Typography>
                    </GridListTile>
                  );
                })}
            </GridList>
          </Fragment>
        ))}
    </div>
  );
};
export default Graphics;
