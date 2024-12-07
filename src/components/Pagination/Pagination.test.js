import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from ".";
// import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  const mockPrePage = jest.fn();
  const mockNextPage = jest.fn();
  const mockChangeCurrentPage = jest.fn();

  const setup = (currentPage, totalPages) => {
    render(
      <Pagination
        currentPage={currentPage}
        prePage={mockPrePage}
        nextPage={mockNextPage}
        changeCurrentPage={mockChangeCurrentPage}
        totalPages={totalPages}
      />
    );
  };

  test("renders the correct number of page buttons", () => {
    setup(1, 10); // currentPage = 1, totalPages = 10
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBe(7); // 1 Prev + 5 Page Numbers + 1 Next
  });

  test("disables the Prev button on the first page", () => {
    setup(1, 10);
    const prevButton = screen.getByText("Prev");
    // expect(prevButton).toBeDisabled();
    expect(prevButton.disabled).toBe(true);
  });

  test("disables the Next button on the last page", () => {
    setup(10, 10);
    const nextButton = screen.getByText("Next");
    // expect(nextButton).toBeDisabled();
    expect(nextButton.disabled).toBe(true);
  });

  test("activates the correct page number button", () => {
    setup(3, 10); // currentPage = 3
    const activeButton = screen.getByText("3");
    // expect(activeButton).toHaveClass("active");
    expect(activeButton.classList.contains("active")).toBe(true);
  });

  test("calls prePage when Prev is clicked", () => {
    setup(3, 10); // currentPage = 3
    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);
    expect(mockPrePage).toHaveBeenCalledTimes(1);
  });

  test("calls nextPage when Next is clicked", () => {
    setup(3, 10); // currentPage = 3
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockNextPage).toHaveBeenCalledTimes(1);
  });

  test("calls changeCurrentPage with correct page number when a page button is clicked", () => {
    setup(3, 10); // currentPage = 3
    const pageButton = screen.getByText("5");
    fireEvent.click(pageButton);
    expect(mockChangeCurrentPage).toHaveBeenCalledWith(5);
  });

  test("renders only the appropriate number of page buttons for totalPages < windowSize", () => {
    setup(1, 3); // totalPages = 3
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBe(5); // 1 Prev + 3 Page Numbers + 1 Next
  });

  test("renders correct dynamic range of page numbers for currentPage in the middle", () => {
    setup(5, 10); // currentPage = 5
    const pageNumbers = screen.getAllByRole("button").slice(1, 6); // Exclude Prev and Next
    expect(pageNumbers.map((btn) => btn.textContent)).toEqual([
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
  });

  test("renders correct dynamic range of page numbers for currentPage near start", () => {
    setup(2, 10); // currentPage = 2
    const pageNumbers = screen.getAllByRole("button").slice(1, 6); // Exclude Prev and Next
    expect(pageNumbers.map((btn) => btn.textContent)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
  });

  test("renders correct dynamic range of page numbers for currentPage near end", () => {
    setup(9, 10); // currentPage = 9
    const pageNumbers = screen.getAllByRole("button").slice(1, 6); // Exclude Prev and Next
    expect(pageNumbers.map((btn) => btn.textContent)).toEqual([
      "6",
      "7",
      "8",
      "9",
      "10",
    ]);
  });
});
