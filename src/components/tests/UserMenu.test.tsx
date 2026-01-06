import { render, screen } from "@/utils/test-utils";
import { UserMenu } from "../ui/UserMenu";
import userEvent from "@testing-library/user-event";
import { Header } from "@/layouts";
import { useAuth } from "@/app/context/UserContext";

jest.mock("@/app/context/UserContext", () => ({
  ...jest.requireActual("@/app/context/UserContext"),
  useAuth: jest.fn(),
}));
const setAccessTokenMock = jest.fn();
describe("UserMenu tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        firstName: "Josh",
        lastName: "Smith",
        username: "JoshSmith",
        email: "josh@example.com",
        company: {
          department: "Development",
          name: "innowise",
          title: "Intermship",
        },
        address: {
          country: "myCountry",
        },
        image: "Avatar.jpg",
      },
      isAuthenticated: true,
      userLoading: false,
      userError: false,
      setAccessToken: setAccessTokenMock,
    });
  });

  test("When Exit button clicked, user will be logout", async () => {
    render(
      <>
        <UserMenu />
      </>,
    );
    await userEvent.click(await screen.findByTestId("open-modal"));
    await userEvent.click(await screen.findByTestId("logout-button"));
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        firstName: "Josh",
        lastName: "Smith",
        username: "JoshSmith",
        email: "josh@example.com",
        company: {
          department: "Development",
          name: "innowise",
          title: "Intermship",
        },
        address: {
          country: "myCountry",
        },
        image: "Avatar.jpg",
      },
      isAuthenticated: false,
      userLoading: false,
      userError: false,
    });
    render(<Header />);
    expect(await screen.findByTestId("login-button")).not.toBeUndefined;
  });
});
