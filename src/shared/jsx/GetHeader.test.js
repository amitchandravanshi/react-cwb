import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GeHeader from "./GeHeader";
const props = {
  styles: {}
};
describe("<GeHeader> component ", () => {
  it("shallow copy component", () => {
    const wrapper = shallow(<GeHeader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
