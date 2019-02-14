import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UploadField from "./UploadField";

const props = {
  classes: {}
};
describe("<CommentControls> ", () => {
  it("<CommentControls> snapshot ", () => {
    const wrapper = shallow(<UploadField {...props} />);
    console.log(wrapper.prop());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
