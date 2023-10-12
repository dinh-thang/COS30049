import React, { useState } from "react";
import api from "../api";

// File uploader component allows the user to upload smart contract files
const Uploader = () => {
  // store the selected file using useState
  const [selectedFile, selectFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // function to handle tasks when file is uploaded
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contract", selectedFile);

    try {
      const response = await api.post("/upload_contract/", formData);

      if (response.status === 422) {
        setUploadStatus("Invalid input data encoding format");
      } else {
        // set new status
        setUploadStatus(response.data.message.toString());

        // update the placeholder text
        document.getElementById("status-notification").textContent = uploadStatus;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // function to update the file state
  const handleFileSelection = (e) => {
    const file = e.target.files[0];

    // set the file state to the first selected file in the e.target.files obj
    selectFile(file);
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

      <div className="flex justify-center items-center">
        {/* submit button */}
        <button
          className="w-full lg:w-1/2 items-center inline-block transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200 rounded py-2 px-4"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default Uploader;
