import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import StoryBoardRoute from "../src/public/components/StoryBoardRoute";

Enzyme.configure({ adapter: new Adapter() });

describe("<Hello />", () => {
  it("renders <Hello />", () => {
    const wrapper = shallow(<StoryBoardRoute />);
    const actual = wrapper.find("h1").text();
    const expected = "Hello, tests!";

    expect(actual).not.to.be.equal(expected);
  });
});
