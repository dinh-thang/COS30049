import { useState } from "react";
import Search from "../components/Search";
import ReportList from "../components/ReportList";
import { TITLE1_CSS_CONFIGURATION } from "../constant";
// This is a sample hard-coded data for the report page, the data here is for demo purpose
// and the vulnerability data are taken from Slither documentation.
// Reference: https://github.com/crytic/slither/wiki/Detector-Documentation
import reportData from "../assets/reportData.json";

// this component represents a page that displays a list of reports
const Report = () => {
  // state variables to manage various aspects of the component's state
  const [reports, setReports] = useState(reportData); // to manage report data
  const [query, setQuery] = useState(""); // to manage search query, by default, the query is empty
  const [sortBy, setSortBy] = useState("contractName"); // to manage sort field, by default, sort by contractName
  const [orderBy, setOrderBy] = useState("asc"); // to manage sort order, by default, the report list is displayed in ascending order

  // function to check if a report matches the current query
  function reportMatchesQuery(report) {
    // filter reports based on various fields using the "query" state variable
    // convert both report field and query to lower case for case-insensitive search
    // check if each field e.g. contract name, submission time, etc. contains the query
    return (
      report.contractName.toLowerCase().includes(query.toLowerCase()) ||
      report.severity.toLowerCase().includes(query.toLowerCase()) ||
      report.reportId.includes(query) ||
      report.submissionDate.includes(query) ||
      report.submissionTime.toLowerCase().includes(query.toLowerCase())
    );
  }

  // function to compare and sort reports based on the current sorting criteria
  function sortReports(a, b) {
    let sortingOrder = orderBy === "asc" ? 1 : -1; // determine sorting order based on orderBy value

    // sort reports based on the selected sort field
    if (sortBy === "severity") {
      // custom sorting for severity levels, otherwise, severity levels are ordered alphabetically
      const severityOrder = {
        Low: 0,
        Medium: 1,
        High: 2,
      };

      // compare severity levels using custom order
      const severityComparison =
        severityOrder[a.severity] - severityOrder[b.severity];

      // if the severity levels are not the same, return the comparison result multiplied by the sorting order
      if (severityComparison !== 0) {
        return severityComparison * sortingOrder; // sort by severity using the custom order
      }
    }

    // Default sorting by other fields if the user does not select sort by "Severity"
    return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
      ? -1 * sortingOrder // Sort in ascending order
      : 1 * sortingOrder; // Sort in descending order
  }

  // filter and sort the reports based on search and sort criteria
  const filteredReports = reports.filter(reportMatchesQuery).sort(sortReports);

  // function to handle report deletion
  const handleDelete = (reportId) => {
    // delete the report with the given ID by filtering out the deleted report
    const updatedReports = reports.filter(
      (report) => report.reportId !== reportId
    );
    setReports(updatedReports); // update the reports state to the filtered report
  };

  return (
    <div>
      {/* Title using global styles */}
      <h1 className={TITLE1_CSS_CONFIGURATION}>Your Reports</h1>
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
      <ReportList reports={filteredReports} onDelete={handleDelete} />
    </div>
  );
};

export default Report;
