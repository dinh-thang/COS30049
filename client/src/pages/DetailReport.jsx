import { TITLE_CSS_CONFIGURATION } from "../constant"
import { useParams } from "react-router-dom"

// sample data is used here since the data retrieval method may varies when implementing back end

const DetailReport = () => {    
    // designated page for a single contract report

    let {id} = useParams();
    
    return (
        <h1 className={TITLE_CSS_CONFIGURATION}>Detail Report {id}</h1>
    )
}
export default DetailReport