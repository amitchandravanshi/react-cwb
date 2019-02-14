import React from "react";
import { connect } from "react-redux";
import Copy from "./Copy";
import Graphics from "./Graphics/Graphics";
import Backups from "./Backups/Backups";
import { fetchAllFieldsRequest } from "../../../redux/actions/writeAction";
import { Toolbar, Typography } from "@material-ui/core";
import Modal from "../../Modal/Modal";
import CommentList from "../../Comments/CommentList";
import Twitter from "./social/Twitter";
import Linkedin from "./social/Linkedin";
import Facebook from "./social/Facebook";
import { Sections } from "./Section";
import scrollToComponent from "react-scroll-to-component";

class Write extends React.Component {
  constructor() {
    super();
    this.sections = [
      {
        refname: "copy",
        name: "Article Copy"
      },
      {
        refname: "graphic",
        name: "Article Graphic"
      },
      {
        refname: "twitter",
        name: "Twitter"
      },
      {
        refname: "linkedin",
        name: "Linkedin"
      },
      {
        refname: "facebook",
        name: "Facebook"
      },
      {
        refname: "backups",
        name: "Backup"
      }
    ];
  }
  componentDidMount() {
    this.props.fetchAllFieldsRequest(this.props);
  }
  renderJumpLink() {
    return (
      <Toolbar className={"tab-nav"}>
        {this.sections.map(section => (
          <Sections
            key={section.name}
            name={section.name}
            component={section.refname}
            action={() =>
              scrollToComponent(this.refs[section.refname], {
                offset: 0,
                align: "top",
                duration: 1500
              })
            }
          />
        ))}
      </Toolbar>
    );
  }
  render() {
    const { write } = this.props;
    if (write.error) return "Error from server";
    return (
      <div>
        <Toolbar className={"tab-header"}>
          <Typography variant="title">Write</Typography>
        </Toolbar>

        <div className="write-block">
          {this.renderJumpLink()}
          <Copy ref="copy" />
          {this.renderJumpLink()}
          <Graphics ref="graphic" />
          {this.renderJumpLink()}
          <Twitter ref="twitter" />
          {this.renderJumpLink()}
          <Linkedin ref="linkedin" />
          {this.renderJumpLink()}
          <Facebook ref="facebook" />
          {this.renderJumpLink()}
          <Backups ref="backups" />

          {this.props.comment.commentToggle && (
            <Modal>
              <CommentList />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ write, comment }) => {
  return {
    write: write,
    comment
  };
};

export default connect(
  mapStateToProps,
  { fetchAllFieldsRequest }
)(Write);
