import { render, screen } from "@testing-library/react";
import { DataTable } from ".";

// Sample data for the test
const mockProjects = [
  {
    "s.no": 0,
    "percentage.funded": 75,
    "amt.pledged": 5000,
  },
  {
    "s.no": 1,
    "percentage.funded": 50,
    "amt.pledged": 3000,
  },
  {
    "s.no": 2,
    "percentage.funded": 85,
    "amt.pledged": 7500,
  },
];

test("renders the DataTable with correct data", () => {
  render(<DataTable projects={mockProjects} />);

  // Check if the table headers are rendered correctly
  expect(screen.getByText("S.No.")).toBeInTheDocument();
  expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
  expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

  // Check if the data rows are rendered correctly
  expect(screen.getByText("1")).toBeInTheDocument(); // First row, S.No
  expect(screen.getByText("75%")).toBeInTheDocument(); // First row, Percentage Funded
  expect(screen.getByText("$5,000")).toBeInTheDocument(); // First row, Amount Pledged

  expect(screen.getByText("2")).toBeInTheDocument(); // Second row, S.No
  expect(screen.getByText("50%")).toBeInTheDocument(); // Second row, Percentage Funded
  expect(screen.getByText("$3,000")).toBeInTheDocument(); // Second row, Amount Pledged

  expect(screen.getByText("3")).toBeInTheDocument(); // Third row, S.No
  expect(screen.getByText("85%")).toBeInTheDocument(); // Third row, Percentage Funded
  expect(screen.getByText("$7,500")).toBeInTheDocument(); // Third row, Amount Pledged
});

test('displays "No data available" when the projects array is empty', () => {
  render(<DataTable projects={[]} />);

  // Ensure that the table headers are rendered
  expect(screen.getByText("S.No.")).toBeInTheDocument();
  expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
  expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

  // Ensure that "No data available" message is displayed
  const noDataMessage = screen.getByText(/No data available/i);
  expect(noDataMessage).toBeInTheDocument();
});
