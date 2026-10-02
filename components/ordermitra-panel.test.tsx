import { useChat } from "@ai-sdk/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderMitraPanel } from "./ordermitra-panel";

jest.mock("@ai-sdk/react", () => ({
  useChat: jest.fn(),
}));

function createMockChat() {
  return {
    messages: [] as any[],
    input: "",
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    status: "ready" as string,
    stop: jest.fn(),
    reload: jest.fn(),
    error: undefined as Error | undefined,
  };
}

let mockChat: ReturnType<typeof createMockChat>;

beforeEach(() => {
  mockChat = createMockChat();
  (useChat as jest.Mock).mockReturnValue(mockChat);
});

test("shows the empty state when there are no messages", () => {
  // Arrange
  mockChat.messages = [];

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(
    screen.getByText("Ask about an order to get started."),
  ).toBeInTheDocument();
});

test("renders user and assistant messages with their role labels", () => {
  // Arrange
  mockChat.messages = [
    { id: "1", role: "user", content: "Where is order 123?" },
    { id: "2", role: "assistant", content: "Your order has shipped." },
  ];

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByText("You")).toBeInTheDocument();
  expect(screen.getByText("Where is order 123?")).toBeInTheDocument();
  expect(
    screen.getByText("OrderMitra", { selector: ".role" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Your order has shipped.")).toBeInTheDocument();
});

test("shows a high confidence badge for a confident assistant reply", () => {
  // Arrange
  mockChat.messages = [
    { id: "1", role: "assistant", content: "Your order has shipped." },
  ];

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByText("High confidence")).toBeInTheDocument();
});

test("shows a low confidence badge when the assistant is not sure", () => {
  // Arrange
  mockChat.messages = [
    { id: "1", role: "assistant", content: "I'm not sure about that order." },
  ];

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByText("Low confidence")).toBeInTheDocument();
});

test("typing in the input calls handleInputChange", async () => {
  // Arrange
  render(<OrderMitraPanel />);

  // Act
  await userEvent.type(screen.getByLabelText("Ask a question"), "a");

  // Assert
  expect(mockChat.handleInputChange).toHaveBeenCalled();
});

test("the send button is disabled when the input is empty", () => {
  // Arrange
  mockChat.input = "";

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
});

test("the send button is enabled once there is input", () => {
  // Arrange
  mockChat.input = "find Mr. Iyer's orders";

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
});

test("submitting the form calls handleSubmit", async () => {
  // Arrange
  mockChat.input = "find Mr. Iyer's orders";
  mockChat.handleSubmit = jest.fn((event) => event.preventDefault());
  render(<OrderMitraPanel />);

  // Act
  await userEvent.click(screen.getByRole("button", { name: "Send" }));

  // Assert
  expect(mockChat.handleSubmit).toHaveBeenCalledTimes(1);
});

test("shows a typing status and disables the input while streaming", () => {
  // Arrange
  mockChat.status = "streaming";

  // Act
  render(<OrderMitraPanel />);

  // Assert
  expect(screen.getByRole("status")).toHaveTextContent("OrderMitra is typing…");
  expect(screen.getByLabelText("Ask a question")).toBeDisabled();
});

test("clicking Stop generating calls stop()", async () => {
  // Arrange
  mockChat.status = "streaming";
  render(<OrderMitraPanel />);

  // Act
  await userEvent.click(screen.getByRole("button", { name: "Stop generating" }));

  // Assert
  expect(mockChat.stop).toHaveBeenCalledTimes(1);
});

test("clicking Retry calls reload()", async () => {
  // Arrange
  mockChat.error = new Error("Network error");
  render(<OrderMitraPanel />);
  expect(
    screen.getByText("Something went wrong: Network error"),
  ).toBeInTheDocument();

  // Act
  await userEvent.click(screen.getByRole("button", { name: "Retry" }));

  // Assert
  expect(mockChat.reload).toHaveBeenCalledTimes(1);
});
