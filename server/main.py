from fastapi import FastAPI, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import services

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
@app.post("/upload_contract")
async def create_report(contract: UploadFile):
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

        # Save the uploaded Solidity file
        file_path = services.save_uploaded_file(contract)

        # extract Solidity version from the uploaded .sol file content
        with open(file_path, "r") as f:
            # read the 1st 500 characters of the uplaoded file
            file_content = f.read(500)
            # extract the version used in the contract
            solidity_version = services.extract_solidity_version(file_content)

        # create and analyse the audit report -> get .md file
        md_path = services.analyze_contract(file_path, solidity_version)

        # filter the .md report
        filtered_report = services.filter_report(md_path)

        # upload the filtered report to the database
        status_code = services.upload_report(filtered_report)
        
        # ! Check
        # return the filtered report
        return filtered_report
    except HTTPException as e:
        # raise HTTPException with specific error details e.g., invalid file type
        raise e
    except Exception as e:
        # 500 status code and generic error details
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error. Please try again.")


@app.get("/get_report")
async def get_report(report_id: int):
    """
    Fetch the json report data from the db
    """


@app.get("/get_all_vulnerabilities")
async def get_all_vulnerabilities(report_id: int):
    """
    Fetch the json vulnerability data from the db
    """
    pass



