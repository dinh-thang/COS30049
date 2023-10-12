import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { UPLOAD_CONTRACT_API } from "../constant";

// File uploader component allows the user to upload smart contract files
const Uploader = () => {
  const [selectedFile, selectFile] = useState(null);  // store the selected file using useState
  const [error, setError] = useState(null); // for error msg if exists
  const [isLoading, setIsLoading] = useState(false); // for keeping track of the loading state

  // store the navigate function from useNavigate hook of react router dom, this is for redirection
  const navigate = useNavigate();

  // function to handle tasks when file is uploaded
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("contract", selectedFile);

    try {
      setIsLoading(true); // Set loading to true when starting the upload

      const response = await api.post(UPLOAD_CONTRACT_API, formData);

      if (response.status === 201) {
        // On successful upload (status code 201), navigate to the detailed report page
        navigate(`/report/${response.data.report_id}`);
      } else if (response.status === 422) {
        setError("Invalid input data encoding format. Please try again.");
      }
    } catch (e) {
        // On error, set the error message
      setError(
        // the ? for optional chaining, this is to avoid errors if the response data of the fastapi backend does not exist
        e.response?.data?.detail ||
          "An error occurred while processing the file. Please try again."
      );
    } finally {
      setIsLoading(false); // Set loading to false when the upload is complete
    }
  };

  // function to update the file state
  const handleFileSelection = (e) => {
    // e.target refers to the DOM element triggered the event (input element)
    // e.target.files is an object containing selected files
    const file = e.target.files[0];

    // set the file state to the first selected file in the e.target.files obj
    selectFile(file);
    // Reset the error when a new file is selected
    setError(null);
  };

  // function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    // set the file state to the dropped file
    selectFile(file);
  };

  return (
    <form
      id="upload-form"
      className="flex flex-col py-6 px-9"
      onSubmit={handleFileUpload}
      encType="multipart/form-data"
    >
      <div
        className="flex justify-center mb-8"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="upload-file"
          className="w-full lg:w-1/2 relative min-h-[200px] items-center justify-center rounded-md border-2 border-[#e0e0e0] p-12 text-center hover:bg-gray-100 hover:border-dashed"
        >
          <p id="status-notification"></p>
          {selectedFile !== null ? (
            <div>
              <p id="status-notification-file">{selectedFile.name}</p>
              {/* insert a file icon for beautifulness */}
            </div>
          ) : (
            <div>
              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span className="items-center inline-block transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200 rounded py-2 px-4">
                Browse
              </span>
            </div>
          )}
        </label>

        {/* upload file input */}
        <input
          className="sr-only"
          id="upload-file"
          type="file"
          onChange={handleFileSelection}
        ></input>
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* Conditionally render the spinner or upload button based on the loading state */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <BeatLoader color="#1d4ed8" loading={isLoading} />
            <p>Your file is being processed. Please wait...</p>
          </div>
        ) : (
          // submit button
          <button
            className="w-full lg:w-1/2 items-center inline-block transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200 rounded py-2 px-4"
            type="submit"
          >
            Upload
          </button>
        )}
        {/* display error msg */}
        {error && (
          <div className="text-red-500 mt-2 flex justify-center items-center">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default Uploader;
