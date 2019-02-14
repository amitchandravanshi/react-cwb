import React from "react";
import RichTextEditor from "./RichTextEditor";
import HoverMenuEditor from "./HoverMenuEditor";

const SlateEditor = props => {
  if (props.rich) {
    return <RichTextEditor {...props} />;
  } else {
    return <HoverMenuEditor {...props} />;
  }
};

export default SlateEditor;
