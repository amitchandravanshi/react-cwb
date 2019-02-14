import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import DashBoard from "./DashBoardComponent";

const props = {
  classes: {},
  store: {}
};
describe("<DashBoard> ", () => {
  it("<DashBoard> snapshot ", () => {
    const wrapper = shallow(<DashBoard {...props} />);
    console.log(wrapper.prop());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
