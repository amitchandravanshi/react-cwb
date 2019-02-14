import { Editor } from "slate-react";
import { Value } from "slate";
import Html from "slate-html-serializer";

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import initialValue from "./value.json";
import styled from "react-emotion";
import { Button, Icon, Menu } from "./Components";
import controls from "./controls.json";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

/**
 * Give the menu some styles.
 *
 * @type {Component}
 */

const DEFAULT_NODE = "paragraph";
const StyledMenu = styled(Menu)`
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
  width: 35%;
`;
const Emoji = styled("span")`
  outline: ${props => (props.selected ? "2px solid blue" : "none")};
`;
function unwrapLink(editor) {
  editor.unwrapInline("link");
}
function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: { href }
  });

  editor.moveToEnd();
}
/**
 * The hovering menu.
 *
 * @type {Component}
 */

class HoverMenu extends React.Component {
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, innerRef } = this.props;
    const root = window.document.getElementById("root");

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderControls()}
      </StyledMenu>,
      root
    );
  }

  /**
   * loop thorugh controls property
   * renders button for each value
   *
   * @return {Element}
   */
  hasMark = type => {
    const { value } = this.props;
    return value.activeMarks.some(mark => mark.type == type);
  };

  hasEmoji = type => {
    const { value } = this.props;
    return false;
  };
  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.props;
    return value.blocks.some(node => node.type == type);
  };
  hasLinks = () => {
    const { value } = this.props;
    return value.inlines.some(inline => inline.type == "link");
  };
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  renderControls = () => {
    const { value } = this.props;
    const activeStyle = {
      backgroundColor: "#84dae4",
      padding: "8px 7px 6px",
      color: "#000"
    };
    let special = controls.map(({ type, icon, node }, index) => {
      let isActive = this.hasEmoji("emoji");

      if (node == "special") {
        return (
          <Button
            key={index}
            active={isActive}
            style={isActive ? activeStyle : { padding: "8px 7px 6px" }}
            onMouseDown={event => this.onClickSpecial(event, icon)}
          >
            <Icon>{icon}</Icon>
          </Button>
        );
      }
    });
    const { anchorEl } = this.state;

    let hoverMenu = controls.map(({ type, icon, node }, index) => {
      let isActive;
      if (node == "wrap") {
        isActive = this.hasMark(type);
        return (
          <Button
            key={index}
            active={isActive}
            style={isActive ? activeStyle : { padding: "8px 7px 6px" }}
            onMouseDown={event => this.onClickMark(event, type)}
          >
            <Icon>
              {icon == "superscript" ? (
                <svg
                  style={{ width: "24px", height: "24px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={isActive ? "#000" : "#ccc"}
                    d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59 ,
                    6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 
                    20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,
                    2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,
                    4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z"
                  />
                </svg>
              ) : (
                icon
              )}
            </Icon>
          </Button>
        );
      } else if (node == "block") {
        isActive = this.hasBlock(type);
        if (
          ["numbered-list", "bulleted-list"].includes(type) &&
          value.blocks.first()
        ) {
          const parent = value.document.getParent(value.blocks.first().key);
          isActive =
            this.hasBlock("list-item") && parent && parent.type === type;
        }
        return (
          <Button
            key={index}
            active={isActive}
            style={isActive ? activeStyle : { padding: "8px 7px 6px" }}
            onMouseDown={event => this.onClickBlock(event, type)}
          >
            <Icon>{icon}</Icon>
          </Button>
        );
      } else if (node == "link") {
        isActive = this.hasLinks(type);
        return (
          <Button
            key={index}
            active={isActive}
            style={isActive ? activeStyle : { padding: "8px 7px 6px" }}
            onMouseDown={event => this.onClickLink(event, type)}
          >
            <Icon>{icon}</Icon>
          </Button>
        );
      }
    });
    hoverMenu.push(special);
    return hoverMenu;
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */
  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value, onChange } = this.props;
    const change = value.change();
    const { document } = value;
    // Handle everything but list buttons.
    if (type != "bulleted-list" && type != "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");
      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });
      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        change
          .unwrapBlock(
            type == "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        change.setBlocks("list-item").wrapBlock(type);
      }
    }
    onChange(change);
  };
  onClickLink = (event, type) => {
    event.preventDefault();
    const hasLinks = this.hasLinks(type);
    const { value, onChange } = this.props;
    const change = value.change();
    if (hasLinks) {
      change.unwrapInline("link").moveToEnd();
      onChange(change);
      return;
    } else if (this.props.editor.value.selection.isExpanded) {
      const href = window.prompt("Enter the URL of the link:");
      if (href === null) {
        return;
      }

      this.props.editor.change(change => {
        let text = change.value.characters,
          str = "";
        for (let i = 0; i < text.size; i++) {
          if (i == text.size - 1) {
            if (text.get(i).text.trim().length > 0) {
              str += text.get(i).text;
            }
          } else {
            str += text.get(i).text;
          }
        }
        change
          .wrapInline({
            type: "link",
            data: { href, value: str }
          })
          .moveToEnd()
          .insertText(" ");
      });
    }
  };
  onClickMark(event, type) {
    event.preventDefault();
    const { value, onChange } = this.props;
    const change = value.change().toggleMark(type);
    onChange(change);
  }
  onClickSpecial = (e, code) => {
    e.preventDefault();
    const { value, onChange } = this.props;

    this.props.editor.change(change => {
      let text = change.value.characters,
        str = "";
      for (let i = 0; i < text.size; i++) {
        if (i == text.size - 1) {
          if (text.get(i).text.trim().length > 0) {
            str += text.get(i).text;
          }
        } else {
          str += text.get(i).text;
        }
      }
      change
        .insertText(str)
        .insertInline({
          type: "emoji",
          data: { code }
        })
        .moveToStartOfNextText()
        .insertText(" ")
        .focus();
    });
  };
}

/**
 * The hovering menu example.
 *
 * @type {Component}
 */
const BLOCK_TAGS = {
  blockquote: "block-quote",
  p: "paragraph",
  ul: "bulleted-list",
  li: "list-item",
  ol: "numbered-list",
  Emoji: "emoji"
};
// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underlined",
  sup: "superscript"
};
const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes)
        };
      }

      if (el.tagName.toLowerCase() == "a") {
        return {
          object: "inline",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
            value: el.text
          }
        };
      }
    },

    serialize(obj, children) {
      if (obj.object == "inline") {
        switch (obj.type) {
          case "emoji": {
            const code = obj.data.get("code");
            return (
              <Emoji onDrop={noop}>
                <span>{code}</span>
              </Emoji>
            );
          }
          case "link": {
            const href = obj.data.get("href");
            const value = obj.data.get("value");
            if (!obj.text) return <a>{obj.text}</a>;
            return (
              <a
                href={href}
                className={obj.data.get("className")}
                target="_blank"
              >
                {value}
              </a>
            );
          }
        }
      } else if (obj.object == "block") {
        switch (obj.type) {
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "list-item":
            return <li className={obj.data.get("className")}>{children}</li>;
          case "numbered-list":
            return <ol>{children}</ol>;
          case "bulleted-list":
            return <ul>{children}</ul>;
          case "block-quote":
            return <blockquote>{children}</blockquote>;
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underlined":
            return <u>{children}</u>;
          case "block-quote":
            return <blockquote>{children}</blockquote>;
          case "superscript":
            return <sup>{children}</sup>;
        }
      }
    }
  }
];
const html = new Html({ rules });
const noop = e => e.preventDefault();
class HoveringMenu extends React.Component {
  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  state = {
    value: this.props.fieldValue
      ? html.deserialize(this.props.fieldValue)
      : this.props.value
      ? html.deserialize(this.props.value)
      : html.deserialize("<p></p>")
  };

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const { value } = this.state;
    const menu = this.menu;
    if (!menu) return;

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute("style");
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    let left =
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;
    if (left < 0) {
      left = rect.left + window.pageXOffset;
    } else if (left > 850) {
      left = 778;
    }
    menu.style.left = `${left}px`;
  };

  /**
   * Render.
   *
   * @return {Element}
   */
  handlerBlur() {
    this.props.onBlur({
      target: {
        name: this.props.name,
        value: html.serialize(this.state.value)
      }
    });
  }
  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "link": {
        const { data } = node;
        const href = data.get("href");
        const value = data.get("value");
        if (!node.text) {
          return "";
        }
        return (
          <a href={href} target="_blank">
            {value}
          </a>
        );
      }
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "emoji": {
        const code = node.data.get("code");
        return (
          <Emoji {...props.attributes} contenteditable={true}>
            <span>{code}</span>
          </Emoji>
        );
      }
    }
  };
  ref = editor => {
    this.editor = editor;
  };
  schema = {
    inlines: {
      emoji: {
        isVoid: true
      },
      link: {
        isVoid: true
      }
    }
  };
  render() {
    return (
      <div className="slateWrapper" style={this.props.styles}>
        <HoverMenu
          innerRef={menu => (this.menu = menu)}
          value={this.state.value}
          onChange={this.onChange}
          editor={this.editor}
        />
        <Editor
          className="slateEditor"
          placeholder="Enter some text..."
          value={this.state.value}
          ref={this.ref}
          schema={this.schema}
          onChange={this.onChange}
          renderMark={this.renderMark}
          onBlur={() => this.handlerBlur()}
          name={this.props.name}
          readOnly={this.props.readOnly}
          renderNode={this.renderNode}
        />
      </div>
    );
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = props => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "superscript":
        return <sup {...attributes}>{children}</sup>;
    }
  };

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (this.props.onChangeHandler)
      this.props.onChangeHandler({ target: { value: value.document.text } });
    this.setState({ value });
  };
}

/**
 * Export.
 */

export default HoveringMenu;
