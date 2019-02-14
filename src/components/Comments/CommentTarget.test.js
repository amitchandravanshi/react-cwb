import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import CommentTarget from "./CommentTarget";
const props = {
  classes: {}
};
describe("<CommentTarget> ", () => {
  it("<CommentControls> snapshot ", () => {
    const wrapper = mount(<CommentTarget {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
