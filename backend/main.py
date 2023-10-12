from fastapi import FastAPI, UploadFile, HTTPException, status, Depends, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
import services
import crud

app = FastAPI() # initialize FastAPI app

# CORS configuration to allow React app to access the API
origins = [
    "http://localhost:3000",  # React uses port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uploading a contract file and creating audit report endpoint
@app.post("/upload_contract", status_code=status.HTTP_201_CREATED)
async def create_report(contract: UploadFile, db: Session = Depends(get_db)):
    """
    Create report involving:
        (1) Save the uploaded file to the 'uploads' directory
        (2) Extract the solidity version - to solc-select cmd
        (3) Create the report using analyze_contract(contract), return .md file path
        (4) Filter_report(result.md), return the filtered report (parse audit report using regexp)
        (5) Upload_report(report), upload the filtered report to the database and return status code
    """  
    try:
        # validate if the file is provided
        if not contract:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file provided. Please upload a .sol file.")

        # validate if the uploaded file is a .sol file
        if not contract.filename.endswith(".sol"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file extension. Only .sol files are allowed for auditing.")
        
        # get current date and time of submission
        submission_date = services.get_current_date()
        submission_time = services.get_current_time()
        
        # Save the uploaded Solidity file to the server
        file_path = services.save_uploaded_file(contract)
        
        # extract Solidity version from the uploaded .sol file content
        solidity_version = services.extract_solidity_version(file_path)

        # create and analyse the audit report -> get .md file
        md_path = services.analyze_contract(file_path, solidity_version)

        # filter the .md report to extract relevant info
        filtered_report = services.filter_report(md_path)
        
        # prepare the report data in the required format
        report_data = {
            "contract_name": contract.filename,
            "submission_date": submission_date,
            "submission_time": submission_time,
            "number_of_vulnerabilities": None, # initialise the number of vulnerabilities
            "vulnerabilities_details": filtered_report,
        }
        
        # upload the filtered report to the database
        report_id = crud.upload_report(db, report_data)
        
        # returns a success message if the upload and analysis are completed successfully and report_id to redirect after success
        return {"message": "Audit has been uploaded successfully.", "report_id": report_id}
    except HTTPException as e:
        # raise HTTPException with specific error details e.g., invalid file type
        raise e
    except Exception as e:
        # 500 status code and generic error details
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error. Please try again.")

@app.get("/reports/", status_code=status.HTTP_200_OK)
async def get_reports(skip: int = 0, limit: int = 15, db: Session = Depends(get_db)):
    """Get all reports endpoint, accepts optional parameters skip and limit to control pagination."""
    return crud.get_all_reports(db, skip, limit)

@app.get("/reports/{report_id}", status_code=status.HTTP_200_OK)
async def get_report(report_id: int, db: Session = Depends(get_db)):
    """Get a specific report by ID."""
    return crud.get_report(db, report_id)

@app.delete("/reports/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(report_id: int, db: Session = Depends(get_db)):
    """Delete a specific audit report by ID endpoint, returns a response with a status code of 204 (NO_CONTENT), indicating a successful deletion."""
    return crud.delete_report(db, report_id)
