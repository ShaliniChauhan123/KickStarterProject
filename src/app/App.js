import React, { useEffect, useState } from "react";
import axios from "axios";
import "../app/styles/App.css";
import { Pagination } from "../components/Pagination";
import { DataTable } from "../components/DataTable";
import { recordsPerPage } from "../utils/constants";

function App() {
  const [projects, setProjects] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Pagination logic

  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = projects.slice(firstIndex, lastIndex);
  const npage = Math.ceil(projects.length / recordsPerPage);

  const prePage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage != lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Kickstarter Project</h1>
      <DataTable projects={records} />
      {records.length > 0 && (
        <Pagination
          currentPage={currentPage}
          prePage={prePage}
          nextPage={nextPage}
          changeCurrentPage={changeCurrentPage}
          totalPages={npage}
        />
      )}
    </div>
  );
}

export default App;
