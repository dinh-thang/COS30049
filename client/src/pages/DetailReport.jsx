import { TITLE1_CSS_CONFIGURATION } from "../constant"; // import CSS config constants
import { useParams } from "react-router-dom"; // import necessary hook for URL parameter extraction
import reportData from "../assets/reportData.json"; // import report data from JSON file

// This is the designated page for a single contract report
// sample data is used here since the data retrieval method may varies when implementing back end
const DetailReport = () => {
  // the id of the report from URL parameters
  let { id } = useParams();
  const report = reportData[parseInt(id)];

  return (
    <div>
      {/* page title, convert id to integer and plus 1 because index start from 0 */}
      <h1 className={TITLE1_CSS_CONFIGURATION}>
        Detail Report {parseInt(id) + 1}
      </h1>
      {/* display report details */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-blue-600">Report Details</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <span className="font-bold">Contract Name: </span>
            {report.contractName}
          </li>
          <li>
            <span className="font-bold">Submission Date: </span>
            {report.submissionDate}
          </li>
          <li>
            <span className="font-bold">Submission Time: </span>
            {report.submissionTime}
          </li>
          <li>
            <span className="font-bold">Severity: </span> {report.severity}
          </li>
        </ul>
      </section>

      <h2 className="text-xl font-bold mb-1 text-blue-600">Vulnerability Details</h2>
      {/* mapping through each vulnerability in the report */}
      {reportData[parseInt(id)].vulnerabilities.map((v, index) => (
        <section
          key={index}
          className="p-4 mb-3 border-b-2 last-of-type:border-none"
        >
          {/* vulnerability number, plus 1 because index start from 0 */}
          <h3 className="text-lg font-bold mb-2">Vulnerability {index + 1}</h3>
          <ul className="list-disc pl-6 mb-2">
            {/* display vulnerability details */}
            <li>
              <span className="font-bold">Vulnerability name:</span> {v.name}
            </li>
            <li>
              <span className="font-bold">Description:</span> {v.description}
            </li>
            <li>
              <span className="font-bold">Recommendation:</span>
              {v.recommendation}
            </li>
          </ul>
        </section>
      ))}
    </div>
  );
};
export default DetailReport;
