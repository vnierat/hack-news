import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

test("renders learn react link", () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const linkElement = screen.getByText(/Hacker News/i);
  expect(linkElement).toBeInTheDocument();
});
