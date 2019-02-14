import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import configDeterminator from "../../../configs/configDeterminator";
const styles = theme => {
  return {};
};
const Facebooks = props => {
  return (
    <div className="review-graphics-block review-subsection">
      {props.data
        .filter(facebook => facebook.facebookId != "")
        .map((facebook, index) => (
          <Fragment>
            <Typography component="h3" className={"review-graphic-header"}>
              <strong>Facebook #{index + 1}</strong>
            </Typography>

            <GridList cellHeight={50} cols={1}>
              {facebook.fields
                .filter(field => field.properties.fieldType != "FileUpload")
                .filter(
                  field =>
                    field.fieldValue != "" &&
                    field.fieldValue != "<p></p>" &&
                    field.fieldValue != "N/A" &&
                    field.fieldValue != "true" &&
                    field.fieldValue != true
                )
                .map((item, index) => {
                  return (
                    <GridListTile
                      key={item.Image}
                      cols={1}
                      className={"review-item"}
                    >
                      <Typography component="h3">{item.fieldName}</Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.fieldValue
                        }}
                      />
                    </GridListTile>
                  );
                })}
            </GridList>
            {facebook.name && (
              <div className="review-item">
                <img
                  src={
                    configDeterminator.cwbApiEndpoint +
                    "/socialMedia/" +
                    facebook.facebookId
                  }
                />
                <Typography component="h3">{facebook.name}</Typography>
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default withStyles(styles)(Facebooks);
