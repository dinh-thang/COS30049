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

# TODO: add and import db dependency as needed


# func get current date and time as a string
def get_current_datetime():
    return datetime.now().strftime("%d-%m-%Y %I:%M %p")


# ! TEST ONLY
@app.post("/upload/")
async def upload_file(file: UploadFile):
    # validation 
    if not file:
        raise HTTPException(status_code=400, detail="No file provided.")

    if not file.filename.endswith(".sol"):
        raise HTTPException(status_code=400, detail="Invalid file extension. Only .sol files are allowed.")

    # get current date time
    current_datetime = get_current_datetime()

    # return the filename and submission date/time
    return {"filename": file.filename, "submission_datetime": current_datetime}


@app.post("/upload_contract")
async def create_report(contract: UploadFile):
    """
    Create report involve
        (1) create the report using analyze_contract(contract), return result.md file
        (2) filter_report(result.md), return the filtered report
        (3) upload_report(report), upload the filtered report to the database and return status code
    This function then return the status code of (3) or some kind of notification

    """
    report = services.analyze_contract(contract)
    filtered_report = services.filter_report(report)
    # msg to inform the user
    status_code = services.upload_report(filtered_report)

    return status_code


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



