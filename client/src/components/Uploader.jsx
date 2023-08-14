import { useState } from "react"

const Uploader = () => {
    // store the selected file using useState
    const [selectedFile, selectFile] = useState(null);
    
    // function to handle tasks when file is uploaded
    const handleFileUpload = () => {
        // this is used to connect to backend server ...
    }

    // function to update the file state
    const handleFileSelection = (e) => {
        // tesing purpose
        console.log(selectedFile);

        // e.target refers to the DOM element triggered the event (input element)
        // e.target.files is an object containing selected files
        const file = e.target.files[0];
        
        // set the file state to the first selected file in the e.target.files obj
        selectFile(file);
    }

    return (
        <form id="upload-form">
            <label htmlFor="upload-file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Contract File</label>
            <input id="upload-file" type="file" onChange={handleFileSelection}></input>
            <button className="inline-block transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200 rounded py-2 px-4" onClick={handleFileUpload}>Upload</button>
        </form>
    )
}

export default Uploader