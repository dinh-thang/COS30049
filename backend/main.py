from fastapi import FastAPI, UploadFile, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
import services
import crud

app = FastAPI()

# CORS configuration to allow React app to access the API
origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uploading a contract file and creating audit report
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
        # validation
        if not contract:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file provided.")

        # validate if the uploaded file is a .sol file
        if not contract.filename.endswith(".sol"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file extension. Only .sol files are allowed.")
        
        # get current date and time
        submission_date = services.get_current_date()
        submission_time = services.get_current_time()
        
        # Save the uploaded Solidity file
        file_path = services.save_uploaded_file(contract)

        # extract Solidity version from the uploaded .sol file content
        with open(file_path, "r") as f:
            # read the first 500 characters of the uploaded file
            file_content = f.read(500)
            # extract the version used in the contract
            solidity_version = services.extract_solidity_version(file_content)

        # create and analyse the audit report -> get .md file
        md_path = services.analyze_contract(file_path, solidity_version)

        # filter the .md report
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
        
        return {"message": "Audit has been uploaded successfully."}
    except HTTPException as e:
        # raise HTTPException with specific error details e.g., invalid file type
        raise e
    except Exception as e:
        # 500 status code and generic error details
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error. Please try again.")

# Get all reports
@app.get("/reports/", status_code=status.HTTP_200_OK)
def get_reports(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    reports = crud.get_all_reports(db, skip=skip, limit=limit)
    return reports

# Get a specific report by ID
@app.get("/reports/{report_id}", status_code=status.HTTP_200_OK)
def get_report(report_id: int, db: Session = Depends(get_db)):
    return crud.get_report(db, report_id)

# Delete a specific audit report
@app.delete("/reports/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(report_id: int, db: Session = Depends(get_db)):
    return crud.delete_report(db, report_id)