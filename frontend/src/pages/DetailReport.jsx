import { TITLE1_CSS_CONFIGURATION } from "../constant"; // import CSS config constants
import { useParams, Link } from "react-router-dom"; // import necessary hook for URL parameter extraction
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import api from "../api";


// This is the designated page for a single contract report
// sample data is used here since the data retrieval method may varies when implementing back end
const DetailReport = () => {
  // the id of the report from URL parameters
  let { id } = useParams();
  const [report, setReports] = useState([])
  const getReport = async() => {
    const fetchedReport = await api.get("/reports/" + id)
    setReports(fetchedReport.data)
  }

  useEffect(() => {
    getReport()
  })

  // const report = reportData[parseInt(id)]; // extract the report from the JSON file based on the id

  return (
    <div>
      {/* page title, convert id to integer and plus 1 because index start from 0 */}
      <h1 className={TITLE1_CSS_CONFIGURATION}>
        Detail Report {id}
      </h1>
      
      {/* display report details */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-blue-600">Report Details</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <span className="font-bold">Contract Name: </span>
            {report.contract_name}
          </li>
          <li>
            <span className="font-bold">Submission Date: </span>
            {report.submission_date}
          </li>
          <li>
            <span className="font-bold">Submission Time: </span>
            {report.submission_time}
          </li>
          <li>
            <span className="font-bold">Severity: </span> {report.number_of_vulnerabilities}
          </li>
        </ul>
      </section>

      <h2 className="text-xl font-bold mb-1 text-blue-600">
        Detected Vulnerability Details
      </h2>
      {/* mapping through each vulnerability in the report */}
      {report.length !== 0 ? ( 
        report.vulnerabilities_details.map((v, index) => (
          <section
            key={index}
            className="p-4 mb-4 border-b-2 last-of-type:border-none"
          >
            {/* vulnerability number, plus 1 because index start from 0 */}
            <h3 className="text-lg font-bold mb-2">Vulnerability {index + 1}</h3>
            <ul className="list-disc pl-6 mb-2">
              {/* display vulnerability details */}
              <li>
                <span className="font-bold">Vulnerability type: </span><ReactMarkdown children={v.vulnerability_type}/>
              </li>
              <li>
                <span className="font-bold">Vulnerability impact: </span><ReactMarkdown children={v.impact}/>
              </li>
              <li>
                <span className="font-bold">Vulnerability confidenct: </span><ReactMarkdown children={v.confidence}/>
              </li>
              <li>
                <span className="font-bold">Description: </span><ReactMarkdown children={v.description}/>
              </li>
              <li>
                <span className="font-bold">Recommendation: </span><ReactMarkdown children={v.recommendation}/>
              </li>
            </ul>
          </section>
        ))) : (
          <div></div>
      )}
      <Link
        to="/report"
            className="px-4 py-3 rounded text-white bg-blue-600 bg-opacity-100 hover:bg-opacity-80 sm:px-8"
      >
        Go Back
      </Link>
    </div>
  );
};
export default DetailReport;
