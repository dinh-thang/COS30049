from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import services

app = FastAPI()

# CORS configuration
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

# # ! TEST ONLY
# @app.post("/upload/")
# async def upload_file(file: UploadFile):
#     # validation 
#     if not file:
#         raise HTTPException(status_code=400, detail="No file provided.")

#     if not file.filename.endswith(".sol"):
#         raise HTTPException(status_code=400, detail="Invalid file extension. Only .sol files are allowed.")

#     # get current date time
#     current_datetime = get_current_datetime()

#     # return the filename and submission date/time
#     return {"filename": file.filename, "submission_datetime": current_datetime}

# endpoint for uploading a Solidity contract and get the audit report
@app.post("/upload_contract")
async def create_report(contract: UploadFile):
    """
    Create report involve
        (0) extract the solidity version - to solc-select
        (1) create the report using analyze_contract(contract), return .md file path
        (2) filter_report(result.md), return the filtered report (parse audit report using regexp)
        (3) upload_report(report), upload the filtered report to the database and return status code
    This function then return the status code of (3) or some kind of notification
    """
    # validation
    if not contract:
        raise HTTPException(status_code=400, detail="No file provided.")

    if not contract.filename.endswith(".sol"):
        raise HTTPException(status_code=400, detail="Invalid file extension. Only .sol files are allowed.")

    # save the uploaded Solidity file
    file_path = services.save_uploaded_file(contract)

    # extract Solidity version from the uploaded .sol file content
    with open(file_path, "r") as f:
        file_content = f.read(500)
        solidity_version = services.extract_solidity_version(file_content)

    # Create and analyse the contract report -> get .md file
    md_path = services.analyze_contract(file_path, solidity_version)

    # filter the .md report
    filtered_report = services.filter_report(md_path)

    # upload the filtered report to the database
    status_code = services.upload_report(filtered_report)

    return status_code


@app.get("/get_report")
async def get_report(report_id: int):
    """
    Fetch the json report data from the db
    """


@app.get("/get_detail_report")
async def get_detail_report(report_id: int):
    """
    Fetch the json detail report data from the db
    """
    pass


@app.get("/get_recommendation")
async def get_recommendation(report_id):
    """
    Get the recommendation based on the vulnerability categories of a report
    """
    pass
