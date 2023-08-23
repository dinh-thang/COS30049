import Uploader from "../components/Uploader"
import { TITLE1_CSS_CONFIGURATION } from "../constant"

const Upload = () => {
    return (
        <div>
            <h1 className={TITLE1_CSS_CONFIGURATION}>Smart Contract Uploader</h1>
            <Uploader />
        </div>
    )
}
export default Upload