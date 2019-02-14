import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import configDeterminator from "../../../configs/configDeterminator";

const Back_Ups = props => {
  const { classes, data } = props;
  if (!props.data || props.data.length < 2) return null;
  return (
    <div class="review-backup-block review-subsection">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography component="h3">
            <strong>Backup</strong>
          </Typography>
          {props.data
            .filter(
              backup =>
                backup.name != "" &&
                backup.name != "<p></p>" &&
                backup.name != "N/A"
            )
            .map(backup => (
              <GridListTile
                component="a"
                target="_blank"
                href={`${configDeterminator.cwbApiEndpoint}/backups/${
                  backup.backupId
                }`}
                className={"review-backup-link"}
              >
                <Typography>{backup.name}</Typography>
              </GridListTile>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Back_Ups;
