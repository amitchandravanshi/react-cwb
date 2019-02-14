import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import configDeterminator from "../../../configs/configDeterminator";
const styles = theme => {
  return {};
};
const Linkedins = props => {
  return (
    <div className="review-graphics-block review-subsection">
      {props.data
        .filter(linkedin => linkedin.linkedinId != "")
        .map((linkedin, index) => (
          <Fragment>
            <Typography component="h3" className={"review-graphic-header"}>
              <strong>Linkedin #{index + 1}</strong>
            </Typography>

            <GridList cellHeight={50} cols={1}>
              {linkedin.fields
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
            {linkedin.name && (
              <div className="review-item">
                <img
                  src={
                    configDeterminator.cwbApiEndpoint +
                    "/socialMedia/" +
                    linkedin.linkedinId
                  }
                />
                <Typography component="h3">{linkedin.name}</Typography>
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default withStyles(styles)(Linkedins);
