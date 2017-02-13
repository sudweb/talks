import React, { Component } from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AppView from "./AppView";

const mockTalks = [
  {
    title: "test"
  }
];

it("renders correctly", () => {
  const component = shallow(
    <AppView
      selectedTalk={0}
      count={{ all: 3, PK: 2, PK: 1 }}
      talks={mockTalks}
    />
  );
  expect(component).toMatchSnapshot();
});
