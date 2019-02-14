import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import CommentMsg from "./CommentMsg";
const props = {
  classes: {}
};
describe("<CommentHeader> ", () => {
  it("<CommentHeader> snapshot ", () => {
    const wrapper = mount(<CommentMsg {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
