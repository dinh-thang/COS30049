import { Link } from "react-router-dom"
import reportData from "../assets/reportData.json"

const ReportList = () => {
    
    "THIS IS THE PLACE HOLDER VERSION OF THE REPORT LIST ONLY."
    const tableCategories = ["Id", "Contract Name", "Submission Date", "Submission Time", "Severity", "Vulnerability Details"]
    
    return (
        <div className="flex justify-center">
            <table className="table">
                <thead>
                    <tr>
                        {/* looping through the tableCategories list */}

                        {tableCategories.map((category, index) => (
                            <th key={index} class="px-4 py-2">{category}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* looping through all the reportData records */}
                    {reportData.map((record, index) => (
                        <tr key={index}>
                            <td class="border px-4 py-2 text-center">{record.reportId}</td>
                            <td class="border px-4 py-2 text-center">{record.contractName}</td>
                            <td class="border px-4 py-2 text-center">{record.submissionDate}</td>
                            <td class="border px-4 py-2 text-center">{record.submissionTime}</td>
                            <td class="border px-4 py-2 text-center">{record.severity}</td>
                            <td class="border px-4 py-2 text-center">
                                <Link className="text-blue-500" to={"/report/" + record.reportId}>Details</Link>
                            </td>
                            {/* <td class="border px-4 py-2">{record.vulnerabilities}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportList