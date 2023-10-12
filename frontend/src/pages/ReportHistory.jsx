import { TITLE1_CSS_CONFIGURATION } from "../constant";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import ReportList from "../components/ReportList";
import api from "../api";

// this component represents a page that displays a list of reports
const ReportHistory = () => {
  // state variables to manage various aspects of the component's state
  const [reports, setReports] = useState([]); // to manage report data
  const [query, setQuery] = useState(""); // to manage search query, by default, the query is empty
  const [sortBy, setSortBy] = useState("submission_date"); // to manage sort field, by default, sort by submission date field
  const [orderBy, setOrderBy] = useState("asc"); // to manage sort order, by default, the report list is displayed in ascending order

  // trigger after the component is mounted
  useEffect(() => {
    getAllReportData()
  }, [])

  // function to check if a report matches the current query
  function matchesQuery(report) {
    // filter reports based on various fields using the "query" state variable
    // convert both report field and query to lower case for case-insensitive search
    // check if each field e.g. contract name, submission time, etc. contains the query
    return (
      report.report_id.toString().includes(query) ||
      report.contract_name.toLowerCase().includes(query.toLowerCase()) ||
      report.number_of_vulnerabilities.includes(query) ||
      report.submission_date.includes(query) ||
      report.submission_time.toLowerCase().includes(query.toLowerCase())
    );
  }

  // function to compare and sort reports based on the current sorting criteria
  function sortReports(a, b) {
    let sortingOrder = orderBy === "asc" ? 1 : -1; // determine sorting order based on orderBy value

    // Default sorting by other fields if the user does not select sort by "number of vuls"
    return a[sortBy].toString().toLowerCase() < b[sortBy].toString().toLowerCase()
      ? -1 * sortingOrder // Sort in ascending order
      : 1 * sortingOrder; // Sort in descending order
  }

  // get all the report each time the page is rendered
  async function getAllReportData() {
    try {
      const reportData = await api.get("/reports/")
      setReports(reportData.data)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  // delete a report from the database
  const deleteAReport = async(id) => {
    await api.delete("/reports/" + id)
  }

  // filter and sort the reports based on search and sort criteria
  const filteredReports = () => {
    if (Array.isArray(reports)) {
      return reports.filter(matchesQuery).sort(sortReports); 
    } else {
      return []
    }
  }
  // function to handle report deletion
  const handleDelete = async(report_id) => {
    try {
      // delete report from the database
      deleteAReport(report_id)

      // filtering out the deleted report
      const updatedReports = reports.filter(
        (report) => report.report_id !== report_id
      );
      // update the reports state to the filtered report
      setReports(updatedReports);   
      
    } catch(error) {
      console.error("An error occurred:", error)
    }
  };

  return (
    <div>
      {/* Title using global styles */}
      <h1 className={TITLE1_CSS_CONFIGURATION}>Report History</h1>
      {/* Search component */}
      <Search
        query={query}
        onQueryChange={(newQuery) => setQuery(newQuery)} // handle query changes
        sortBy={sortBy}
        onSortByChange={(newSortBy) => setSortBy(newSortBy)} // handle sort field changes
        orderBy={orderBy}
        onOrderByChange={(newOrderBy) => setOrderBy(newOrderBy)} // handle sort order changes
      />
      {/* display list of reports */}
      <ReportList reports={filteredReports()} onDelete={handleDelete} />
    </div>
  );
};

export default ReportHistory;