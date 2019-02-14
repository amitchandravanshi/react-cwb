import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import Summary from "./Summary";
import Back_Ups from "./Back_Ups";
import DisclosureSummary from "./DisclosureSummary";
import Graphics from "./Graphics";
import SectionHeader from "../Write/SectionHeader";
import configDeterminator from "../../../configs/configDeterminator";
import {
  createProofRequest,
  updateProofAction
} from "../../../redux/actions/writeAction";
import Twitters from "./Twitters";
import Linkedins from "./Linkedins";
import Facebooks from "./Facebooks";
const styles = theme => {
  return {
    root: {},
    heading: {
      fontWeight: 300,
      color: "#255d63",
      fontSize: "28px"
    },
    reviewContent: {
      color: "#000000",
      fontSize: "16px",
      fontWeight: "normal",
      fontfamily: "Avenir-Roman"
    },
    button: {
      width: "100%",
      background: "#73c0c9",
      color: "#fff",
      textTransform: "capitalize",
      fontWeight: "900",
      marginBottom: "0.4rem"
    },
    proofContainer: {
      margin: "1rem 0",
      display: "flex",
      flexDirection: "column",
      padding: "1rem"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  };
};
const ReviewSubmit = props => {
  const { classes, writes, assignment } = props;
  const updateProofAction = event => {
    props.updateProofAction({ proofStatus: event.target.value });
  };
  const sendProof = (assignmentId, recipients, proofList) => {
    props.createProofRequest({
      assignmentId,
      recipients,
      proofList
    });
  };

  return (
    <div className="review-block">
      <Toolbar className={"tab-header"}>
        <Typography variant="title">Review & Submit</Typography>
      </Toolbar>
      <div className="page-main-description">
        Review your work.Go back to any step to edit inputs as needed. When
        finished, download files for submission to WorkFront.
      </div>
      <Grid container>
        <Grid xs={9} className="review-draft-block">
          <div className="content-block">
            <SectionHeader title="Draft" />
            {writes.write.copy && (
              <Summary
                data={writes.write.copy}
                graphics={writes.write.graphics}
              />
            )}
            {writes.write.graphics && <Graphics data={writes.write.graphics} />}
            {writes.write.twitter && <Twitters data={writes.write.twitter} />}
            {writes.write.linkedIn && (
              <Linkedins data={writes.write.linkedIn} />
            )}
            {writes.write.facebook && (
              <Facebooks data={writes.write.facebook} />
            )}
            {writes.write.backups && <Back_Ups data={writes.write.backups} />}
            {props.disclosure && <DisclosureSummary data={props.disclosure} />}
          </div>
        </Grid>
        <Grid xs={3}>
          <Grid xs={12}>
            <Paper className={classes.proofContainer}>
              {/* <Input className={classes.prrofinput} /> */}
              <TextField
                label="Email Id"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoFocus
                onChange={updateProofAction}
                value={writes.proofStatus}
              />
              <Button
                variant="contained"
                className={classes.button}
                disabled={!writes.proofStatus}
                onClick={() =>
                  sendProof(assignment.id, writes.proofStatus, writes.proofUrl)
                }
              >
                Send Proof
              </Button>
              {writes.proofUrl &&
                writes.proofUrl.reverse().map((proof, index) => {
                  return (
                    <Button
                      href={proof.proofUrl}
                      key={index}
                      target="_blank"
                      variant="contained"
                    >
                      Go to proof v{writes.proofUrl.length - index}
                    </Button>
                  );
                })}
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              href={
                configDeterminator.cwbApiEndpoint +
                "/generate/" +
                assignment.id +
                "?fileType=pdf"
              }
              target="_blank"
            >
              Print
            </Button>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              href={
                configDeterminator.cwbApiEndpoint +
                "/generate/" +
                assignment.id +
                "?fileType=zip"
              }
            >
              DownLoad Zip File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    writes: state.write,
    disclosure: state.disclosures.disclosure,
    assignment: state.assignments.assignment
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createProofRequest, updateProofAction }
  )(ReviewSubmit)
);
