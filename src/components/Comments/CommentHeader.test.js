import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import CommentHeader from "./CommentHeader";

const props = {
  classes: {}
};
describe("<CommentHeader> ", () => {
  it("<CommentHeader> snapshot ", () => {
    const wrapper = mount(<CommentHeader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
