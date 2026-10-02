import { render, screen } from "@testing-library/react";
import { ConfidenceBadge } from "./confidence-badge";

test("high level shows the right text and color class", () => {
  // Arrange & Act
  render(<ConfidenceBadge level="high" />);
  const badge = screen.getByText("High confidence");

  // Assert
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveClass("badge-green");
});

test("medium level shows the right text and color class", () => {
  // Arrange & Act
  render(<ConfidenceBadge level="medium" />);
  const badge = screen.getByText("Medium confidence");

  // Assert
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveClass("badge-amber");
});

test("low level shows the right text and color class", () => {
  // Arrange & Act
  render(<ConfidenceBadge level="low" />);
  const badge = screen.getByText("Low confidence");

  // Assert
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveClass("badge-red");
});
