from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

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
