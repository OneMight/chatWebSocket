import { Comment } from "../ui/Comment";
import { render, screen } from "@testing-library/react";
describe("Correct Comment component render", () => {
  const comments = {
    id: 1,
    body: "This is a good idea",
    likes: 12,
    user: {
      id: 1,
      fullName: "Josh Smith",
    },
  };
  test("Props filled", () => {
    render(<Comment comm={comments} />);
    expect(screen.getByText("This is a good idea")).toBeDefined();
    expect(screen.getByText("Josh Smith")).toBeDefined();
  });
});
