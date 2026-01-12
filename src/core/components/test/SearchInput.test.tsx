import { render, screen } from "@/core/utils/testUtils";
import { SearchInput } from "../SearchInput";
import userEvent from "@testing-library/user-event";
describe("Correct Search input component render", () => {
  test("Input is empty, posts are render", async () => {
    render(<SearchInput />);
    await userEvent.click(await screen.findByTestId("test-input"));
    await userEvent.type(await screen.findByTestId("test-input"), " ");
    expect(screen.getByTestId("OpenedSearch")).not.toBeUndefined();
  });
  test("Input is filled and posts are render", async () => {
    render(<SearchInput />);
    await userEvent.click(await screen.findByTestId("test-input"));
    await userEvent.type(await screen.findByTestId("test-input"), "Bob");
    expect(screen.getByTestId("OpenedSearch")).not.toBeUndefined();
  });
});

it("Posts are opened correctly", async () => {
  render(<SearchInput />);
  await userEvent.click(await screen.findByTestId("test-input"));
  await userEvent.type(await screen.findByTestId("test-input"), "Bob");
  const opened = screen.getByTestId("OpenedSearch");
  expect(opened).toMatchSnapshot();
});
