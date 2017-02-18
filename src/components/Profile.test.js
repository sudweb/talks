import React, { Component } from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Profile from "./Profile";

const fn = function() {
  console.log("signout");
};

describe("Profile component", () => {
  it("should renders correctly", () => {
    const component = shallow(
      <Profile
        profile={{ name: "Alex", email: "test@test.com" }}
        signout={fn}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("should render null", () => {
    const component = shallow(<Profile signout={fn} />);
    expect(component).toMatchSnapshot();
  });
});
