import { Comment } from "../ui/Comment";
import { render, screen } from "@testing-library/react";
const comments = {
  id: 1,
  body: "This is a good idea",
  likes: 12,
  user: {
    id: 1,
    fullName: "Josh Smith",
  },
};
describe("Correct Comment component render", () => {
  test("Props filled", () => {
    render(<Comment comm={comments} />);
    expect(screen.getByText("This is a good idea")).toBeDefined();
    expect(screen.getByText("Josh Smith")).toBeDefined();
  });
});

it("Correct render with snapshot test", () => {
  const component = render(<Comment comm={comments} />);
  expect(component).toMatchSnapshot();
});
