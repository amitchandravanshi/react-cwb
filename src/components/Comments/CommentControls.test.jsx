import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import CommentControls from "./CommentControls";
import { wrap } from "module";

const props = {};
describe("<CommentControls>", () => {
  it("<CommentControls> snapshort ", () => {
    let wrapper = shallow(<CommentControls {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("<CommentControls> classname should null ", () => {
    let wrapper = mount(<CommentControls {...props} />);
    console.log(wrapper.instance().props.classes);
    expect(wrapper.instance().props.classes).toBeUndefined();
  });
});
