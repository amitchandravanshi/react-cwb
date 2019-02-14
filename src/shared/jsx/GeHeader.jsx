import React from "react";
import Button from "@material-ui/core/Button";
import ShareWithOthers from "../../components/Popups/ShareWithOthers";
import "../scss/header.css";

const GeHeader = () => (
  <div>
    <header className="App-header">
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control headerTxt"
            placeholder="CAP-IDEAS-4-roles"
          />
          <Button
            variant="contained"
            color="primary"
            classes={{
              root: "classes-state-root"
            }}
          >
            Save
          </Button>
        </div>
        <div className="col-md-8">
          <div className="lbl-comments">
            <label>Show Resolved Comments</label>
            <ShareWithOthers />
            <span className="badge badge-light">GP</span>
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default GeHeader;