import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NoDashBoard from "./NoDashBoard";

const props = {
  classes: {}
};
describe("<CommentControls> ", () => {
  it("<CommentControls> snapshot ", () => {
    const wrapper = shallow(<NoDashBoard {...props} />);
    console.log(wrapper.prop());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
