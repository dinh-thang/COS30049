import { TITLE1_CSS_CONFIGURATION } from "../constant"
import { useParams } from "react-router-dom"
import reportData from "../assets/reportData.json"

// sample data is used here since the data retrieval method may varies when implementing back end
const DetailReport = () => {    
    // designated page for a single contract report

    // the id of the report
    let {id} = useParams();
    
    return (
        <div>
            <h1 className={TITLE1_CSS_CONFIGURATION}>Detail Report {id}</h1>

            <div>
                {reportData[parseInt(id)].vulnerabilities.map((v, index) => (
                    <div key={index}>
                        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-10">Vulnerability {index}</h2>
                        <p>Vulnerability name: {v.name}</p>
                        <p>Description: {v.description}</p>
                        <p>Recommendation: {v.recommendation}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DetailReport