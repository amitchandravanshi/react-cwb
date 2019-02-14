import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, Typography } from "@material-ui/core";

const DisclosureSummary = ({ data, classes }) => {
  if (!data.Results) return <nul />;
  let disclosure_lang = data.Results.filter(
    lang => lang.language.length > 1
  ).map(lang => {
    return (
      <Typography
        component="span"
        dangerouslySetInnerHTML={{ __html: lang.language }}
        className={"review-disclosure-item"}
      />
    );
  });
  let disclosure_link = data.Results.map(lang => {
    return (
      <Typography component="span" className={"review-rendition-path-item"}>
        renditionPath:{" "}
        <div
          dangerouslySetInnerHTML={{
            __html: lang.renditionPath.toString().replace(/,/g, "<br/>")
          }}
        />
      </Typography>
    );
  });
  return (
    <div className="review-disclosure-block review-subsection">
      <Typography component="h3">
        <strong>Disclosure</strong>
      </Typography>
      {disclosure_lang}
      <Typography component="h3" className="review-rendition-header">
        <strong>Disclosure Rendition Paths</strong>
      </Typography>
      {disclosure_link}
    </div>
  );
};

export default DisclosureSummary;
