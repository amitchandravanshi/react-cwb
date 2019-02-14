import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ReplyItem from "./ReplyItem";
const props = {
  classes: {},
  comment: {
    updatedAt: new Date(),
    commentId: "12",
    userInitials: "AK",
    commentStatus: "processing",
    createdAt: new Date(),
    commentValue: "testing",
    replyToId: "234"
  }
};
describe("<CommentControls> ", () => {
  it("<CommentControls> snapshot ", () => {
    const wrapper = mount(<ReplyItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
