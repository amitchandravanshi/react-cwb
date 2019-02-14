import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FormField from "./FormField";

const props = {
  classes: {}
};
describe("<FormField> ", () => {
  it("<FormField> snapshot ", () => {
    const wrapper = shallow(<FormField {...props} />);
    console.log(wrapper.prop());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
