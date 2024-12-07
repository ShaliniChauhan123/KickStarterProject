import React from "react";

export function DataTable({ projects }) {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.length > 0 ? (
          projects.map((project) => (
            <tr key={project["s.no"]}>
              <td>{project["s.no"] + 1}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>${project["amt.pledged"].toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// export default DataTable;
