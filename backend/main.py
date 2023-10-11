from fastapi import FastAPI, UploadFile, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
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
    # Create report involve: 
        (1) save the uploaded file to the 'uploads' directory
        (2) extract the solidity version - to solc-select cmd
        (3) create the report using analyze_contract(contract), return .md file path
        (4) filter_report(result.md), return the filtered report (parse audit report using regexp)
        (5) upload_report(report), upload the filtered report to the database and return status code
    This function then return the status code of (3) or some kind of notification
    """    
    try:
        # validate if the file is provided
        if not contract:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file provided.")

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
        crud.upload_report(db, report_data)
        
        # returns a success message if the upload and analysis are completed successfully.
        return {"message": "Audit has been uploaded successfully."}
    except HTTPException as e:
        # raise HTTPException with specific error details e.g., invalid file type
        raise e
    except Exception as e:
        # 500 status code and generic error details
        print (e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error. Please try again.")

# Get all reports endpoint, accepts optional parameters skip and limit to control pagination
@app.get("/reports/", status_code=status.HTTP_200_OK)
def get_reports(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    reports = crud.get_all_reports(db, skip, limit)
    return reports

# Get a specific report by ID
@app.get("/reports/{report_id}", status_code=status.HTTP_200_OK)
def get_report(report_id: int, db: Session = Depends(get_db)):
    return crud.get_report(db, report_id)

# Delete a specific audit report by ID endpoint, returns a response with a status code of 204 (NO_CONTENT), indicating a successful deletion.
@app.delete("/reports/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(report_id: int, db: Session = Depends(get_db)):
    return crud.delete_report(db, report_id)